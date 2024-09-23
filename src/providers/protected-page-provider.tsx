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

    const [hubConnection, setHubConnection] = useState()

    const { userData, signIn, isLoading } = useAuth();

    useEffect(() => {

    }, []);

    // useLiveAuth()

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