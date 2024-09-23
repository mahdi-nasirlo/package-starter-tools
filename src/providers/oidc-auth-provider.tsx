"use client";

import { AxiosInstance } from "axios";
import { AuthProvider, AuthProviderProps } from "oidc-react";
import ProtectedPageRouter from "./protected-page-provider";
import React from "react";

type TProps = {
  children: any,
  axiosInstance?: AxiosInstance[],
}


type TUseLive = {
  onEvent?: (data: {
    data: any;
    signOut: boolean;
    type: "error" | "warning" | "success";
    onClose: () => void;
  }) => void;
};

export const SocketProps = React.createContext<TUseLive>({})

export default function OidcAuthProvider({ children, axiosInstance, onEvent, ...props }: TProps & AuthProviderProps & TUseLive) {
  return (
    <AuthProvider {...props}>
      {props.autoSignIn && <SocketProps.Provider value={{ onEvent }}>
        <ProtectedPageRouter axiosInstance={axiosInstance}>{children}</ProtectedPageRouter>
      </SocketProps.Provider>}
      {!props.autoSignIn && <>{children}</>}
    </AuthProvider>
  );
}