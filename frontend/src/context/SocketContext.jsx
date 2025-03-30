import React, { createContext, useState, useEffect, useContext } from "react";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error("useSocketContext must be used within SocketContextProvider");
    }
    return context;
};

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);

    useEffect(() => {
        const socket = io("http://localhost:8080", {
            withCredentials: true,
            transports: ["websocket"],
            auth: {
                token: localStorage.getItem("token")
            }
        });

        setSocket(socket);

        return () => {
            socket.close();
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
};