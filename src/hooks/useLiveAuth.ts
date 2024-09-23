import * as signalR from "@microsoft/signalr";
import { useContext, useEffect, useState } from "react";
import { useSignOutRedirect } from "../hooks";
import { SocketProps } from "../providers/oidc-auth-provider";

export default function useLiveAuth() {
  const { onEvent } = useContext(SocketProps);

  const singOut = useSignOutRedirect();

  const [hubConnection, setHubConnection] = useState<signalR.HubConnection>();

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
}
