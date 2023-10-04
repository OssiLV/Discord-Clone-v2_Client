import React, { createContext, useContext, useEffect, useState } from "react";
import { io as ClientIo, Socket } from "socket.io-client";

type SocketContextType = {
    socket: Socket | null;
    isConnected: boolean;
};

const SocketContext = createContext<SocketContextType>({
    socket: null,
    isConnected: false,
});

export const useSocket = () => {
    return useContext(SocketContext);
};

interface SocketProviderProps {
    children: React.ReactNode;
    token: string;
}
export const SocketProvider = ({ children, token }: SocketProviderProps) => {
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        // const socketInstance = new (ClientIo as any)(
        //     import.meta.env.VITE_API_SOCKET_ENDPOINT,
        //     {
        //         // path: "/api/socket/io",
        //         // addTrailingSlash: false,
        //     },
        // );
        const socketInstance: any = ClientIo(
            import.meta.env.VITE_API_SOCKET_ENDPOINT,
            {
                extraHeaders: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        socketInstance.on("connect", () => {
            setIsConnected(true);
        });

        socketInstance.on("disconnect", () => {
            setIsConnected(false);
        });

        setSocket(socketInstance);

        return () => {
            socketInstance.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket, isConnected }}>
            {children}
        </SocketContext.Provider>
    );
};
