"use client"

import * as signalR from "@microsoft/signalr";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useAuth } from "oidc-react";
import { AxiosInstance } from "axios";
import { SocketProps } from "./oidc-auth-provider";
import useSignOutRedirect from "../hooks/useSignOutRedirect";
import { jwtDecode } from "jwt-decode";

interface TProps {
    children: React.ReactNode,
    loading?: React.ReactNode,
    authority?: string,
    axiosInstance?: AxiosInstance[],
}

const loadingStyle: React.CSSProperties = { width: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }

const ProtectedPageProvider = ({ children, loading, axiosInstance, authority }: TProps) => {

    const signOut = useSignOutRedirect()

    const { socketEventKeys, onKillUser } = useContext(SocketProps);

    const [hubConnection, setHubConnection] = useState<signalR.HubConnection>();

    const { userData, signIn, isLoading } = useAuth();

    const idleTimeoutRef = useRef<any | null>(null);

    const idleTimeLimit = 30 * 60 * 1000; // 30 minutes in milliseconds

    let access_token = userData?.access_token

    useEffect(() => {

        if (access_token) {
            const decodedToken: any = jwtDecode(access_token);
            if (decodedToken.access_client == "0") {
                if (authority) {
                    window.location.href = authority
                }
                else signOut()
            }
        }

    }, [access_token])

    useEffect(() => {

        const startConnection = () => {
            const connection = new signalR.HubConnectionBuilder()
                .withUrl(`${process.env.NEXT_PUBLIC_OPIC_AUTHORITY}/notificationHub`)
                .build();

            connection
                .start()
                .then(() => {
                    console.log("Connection started");

                    connection.on("ReceiveMessage", (data: any) => onKillUser?.(data, signOut))
                    connection.on("KillUser", (data: any) => onKillUser?.(data, signOut))

                    socketEventKeys?.map(i => connection.on(i.eventName, async (data: any) => {
                        await i.onClose?.(data);
                    }))
                })
                .catch((err: Error) =>
                    console.error("Error while starting connection: " + err)
                );

            setHubConnection(connection);
        };


        if (Array.isArray(socketEventKeys) || onKillUser) startConnection();

        return () => {
            if (hubConnection) {
                hubConnection?.stop();
            }
        };

    }, []);


    useEffect(() => {

        const resetIdleTimer = () => {
            clearTimeout(idleTimeoutRef.current);
            idleTimeoutRef.current = setTimeout(signOut, idleTimeLimit);
        };

        window.addEventListener('mousemove', resetIdleTimer);
        window.addEventListener('keydown', resetIdleTimer);
        window.addEventListener('scroll', resetIdleTimer);

        resetIdleTimer();

        return () => {
            clearTimeout(idleTimeoutRef.current);
            window.removeEventListener('mousemove', resetIdleTimer);
            window.removeEventListener('keydown', resetIdleTimer);
            window.removeEventListener('scroll', resetIdleTimer);
        };

    }, [])

    if (isLoading || !userData?.access_token) return (loading || <div style={loadingStyle}>loading ...</div>);

    axiosInstance?.map((i) => i.interceptors.request.use(
        (conf) => {
            conf.headers["Authorization"] = "Bearer " + userData?.access_token;
            return conf;
        },
        (err) => {
            throw Error(err)
        }
    ))

    if (userData) {
        return children;
    }

    signIn();
};


export default ProtectedPageProvider;