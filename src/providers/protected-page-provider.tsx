"use client"

import React from "react";
import { useAuth } from "oidc-react";
import { AxiosInstance } from "axios";

interface TProps {
    children: React.ReactNode,
    loading?: React.ReactElement,
    axiosInstance?: AxiosInstance[]
}

const loadingStyle: React.CSSProperties = { width: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }

const ProtectedPageProvider = ({ children, loading, axiosInstance }: TProps) => {

    const { userData, signIn, isLoading } = useAuth();

    // const token = getUser()?.access_token;

    // const searchParams = useSearchParams();

    // const router = useRouter();

    // const pathname = usePathname();

    if (isLoading) return (loading || <div style={loadingStyle}>loading ...</div>);

    axiosInstance?.map((i) => baseAxiosRequestInterceptor(userData?.access_token as string, i))

    // if (searchParams.has("code")) {
    //     localStorage.removeItem("userInfo");
    //     router.push("/");
    // }

    // router.replace(pathname, undefined);

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