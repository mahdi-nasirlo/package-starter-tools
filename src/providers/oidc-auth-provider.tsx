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
  onKillUser?: (data: any, signOut: () => void) => void
  socketEventKeys?: {
    eventName: string,
    onClose: (data: any) => void;
  }[]
};

export const SocketProps = React.createContext<TUseLive>({})

export default function OidcAuthProvider({ children, axiosInstance, socketEventKeys, ...props }: TProps & AuthProviderProps & TUseLive) {
  return (
    <AuthProvider {...props}>
      {props.autoSignIn && <SocketProps.Provider value={{ socketEventKeys }}>
        <ProtectedPageRouter axiosInstance={axiosInstance}>{children}</ProtectedPageRouter>
      </SocketProps.Provider>}
      {!props.autoSignIn && <>{children}</>}
    </AuthProvider>
  );
}