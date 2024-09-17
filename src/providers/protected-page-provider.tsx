"use client"

import React from "react";
import { useAuth } from "oidc-react";

interface TProps {
    children: React.ReactNode,
    loading?: React.ReactElement
}

const loadingStyle: React.CSSProperties = { width: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }

const ProtectedPageProvider = ({ children, loading }: TProps) => {

    const { userData, signIn, isLoading } = useAuth();

    // const token = getUser()?.access_token;

    // const searchParams = useSearchParams();

    // const router = useRouter();

    // const pathname = usePathname();

    if (isLoading) return (loading || <div style={loadingStyle}>loading ...</div>);

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

export default ProtectedPageProvider;