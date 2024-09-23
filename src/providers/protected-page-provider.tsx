"use client"

import * as signalR from "@microsoft/signalr";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useAuth } from "oidc-react";
import { AxiosInstance } from "axios";
import { SocketProps } from "./oidc-auth-provider";
import useSignOutRedirect from "../hooks/useSignOutRedirect";

interface TProps {
    children: React.ReactNode,
    loading?: React.ReactElement,
    axiosInstance?: AxiosInstance[],
}

const loadingStyle: React.CSSProperties = { width: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }

const ProtectedPageProvider = ({ children, loading, axiosInstance }: TProps) => {

    const signOut = useSignOutRedirect()

    const { socketEventKeys, onKillUser } = useContext(SocketProps);

    const [hubConnection, setHubConnection] = useState<signalR.HubConnection>();

    const { userData, signIn, isLoading } = useAuth();

    const idleTimeoutRef = useRef<any | null>(null);

    const idleTimeLimit = 30 * 60 * 1000; // 30 minutes in milliseconds

    useEffect(() => {

        const startConnection = () => {
            const connection = new signalR.HubConnectionBuilder()
                .withUrl(`${process.env.NEXT_PUBLIC_OPIC_AUTHORITY}/notificationHub`)
                .build();

            connection
                .start()
                .then(() => {
                    console.log("Connection started");

                    connection.on("ReceiveMessage", (data: any) => onKillUser?.(data))
                    connection.on("KillUser", (data: any) => onKillUser?.(data))

                    socketEventKeys?.map(i => connection.on(i.eventName, async (data: any) => {
                        await i.onClose?.(data);
                    }))
                })
                .catch((err: Error) =>
                    console.error("Error while starting connection: " + err)
                );

            setHubConnection(connection);
        };

        if (Array.isArray(socketEventKeys)) startConnection();

        return () => {
            if (hubConnection) {
                hubConnection?.stop();
            }
        };

    }, []);


    useEffect(() => {

        const resetIdleTimer = () => {
            console.log("clear event");
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

    if (isLoading) return (loading || <div style={loadingStyle}>loading ...</div>);

    axiosInstance?.map((i) => baseAxiosRequestInterceptor(userData?.access_token as string, i))

    if (userData) {
        return children;
    }

    signIn();
};

const baseAxiosRequestInterceptor = (
    token: string,
    instance: AxiosInstance
) => {
    instance.interceptors.request.use(
        (conf) => {
            conf.headers["Authorization"] = "Bearer " + token;
            return conf;
        },
        (err) => {
            throw Error(err)
        }
    );
};

export default ProtectedPageProvider;