"use client"

import React from "react";
import { useAuth } from "oidc-react";
import { AxiosInstance } from "axios";
import { useLiveAuth, TUseLive } from "../hooks/index";

interface TProps {
    children: React.ReactNode,
    loading?: React.ReactElement,
    axiosInstance?: AxiosInstance[],
}

const loadingStyle: React.CSSProperties = { width: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }

const ProtectedPageProvider = ({ children, loading, axiosInstance, onEvent }: TProps & TUseLive) => {

    const { userData, signIn, isLoading } = useAuth();

    useLiveAuth({ onEvent })

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