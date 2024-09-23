"use client"

import * as signalR from "@microsoft/signalr";
import React, { useContext, useEffect, useState } from "react";
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

    const { onEvent } = useContext(SocketProps);

    const singOut = useSignOutRedirect();

    const [hubConnection, setHubConnection] = useState<signalR.HubConnection>();

    const { userData, signIn, isLoading } = useAuth();

    useEffect(() => {

        const startConnection = () => {
            const connection = new signalR.HubConnectionBuilder()
                .withUrl(`${process.env.NEXT_PUBLIC_OPIC_AUTHORITY}/notificationHub`)
                .build();

            connection
                .start()
                .then(() => {
                    console.log("Connection started");

                    connection.on("ReceiveMessage", async (data: any) => {
                        await onEvent?.({
                            data,
                            signOut: true,
                            type: "error",
                            onClose: singOut,
                        });
                    });

                    connection.on("KillUser", async (data: any) => {
                        await onEvent?.({
                            data,
                            signOut: true,
                            type: "error",
                            onClose: singOut,
                        });
                    });
                })
                .catch((err: Error) =>
                    console.error("Error while starting connection: " + err)
                );

            setHubConnection(connection);
        };

        startConnection();

        return () => {
            if (hubConnection) {
                hubConnection?.stop();
            }
        };

    }, []);

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