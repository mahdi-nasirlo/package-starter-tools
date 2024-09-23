"use client";

import * as signalR from "@microsoft/signalr";
import { AxiosInstance } from "axios";
import { AuthProvider, AuthProviderProps } from "oidc-react";
import ProtectedPageRouter from "./protected-page-provider";
import { useSignOutRedirect } from "../hooks";
import React, { useEffect, useState } from "react";
import { exitCode } from "process";

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