"use client";

import ProtectedPageRouter from "./protected-page-provider";
import { AuthProvider, AuthProviderProps } from "oidc-react";
import { AxiosInstance } from "axios";

type TProps = {
  children: any,
  axiosInstance?: AxiosInstance[]
} & AuthProviderProps


export default function OidcAuthProvider({ children, axiosInstance, ...props }: TProps) {
  return (
    <AuthProvider {...props}>
      {props.autoSignIn && <ProtectedPageRouter axiosInstance={axiosInstance}>{children}</ProtectedPageRouter>}
      {!props.autoSignIn && <>{children}</>}
    </AuthProvider>
  );
}
