"use client";

import ProtectedPageRouter from "./protected-page-provider";
import { AuthProvider, AuthProviderProps } from "oidc-react";
import { AxiosInstance } from "axios";
import { TUseLive } from "../hooks";

type TProps = {
  children: any,
  axiosInstance?: AxiosInstance[],
}


export default function OidcAuthProvider({ children, onEvent, axiosInstance, ...props }: TProps & AuthProviderProps & TUseLive) {
  return (
    <AuthProvider {...props}>
      {props.autoSignIn && <ProtectedPageRouter onEvent={onEvent} axiosInstance={axiosInstance}>{children}</ProtectedPageRouter>}
      {!props.autoSignIn && <>{children}</>}
    </AuthProvider>
  );
}
