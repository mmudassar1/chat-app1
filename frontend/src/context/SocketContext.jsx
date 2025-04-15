import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useAuthContext } from "./AuthContext";

const SocketContext = createContext();

export const useSocketContext = () => {
	return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
	const { authUser } = useAuthContext();

	useEffect(() => {
		if (authUser) {
			const newSocket = io("http://localhost:8080", {
				withCredentials: true,
				transports: ["websocket"],
				auth: {
					userId: authUser._id,
				},
			});

			newSocket.on("connect", () => {
				console.log("Socket connected");
				setSocket(newSocket);
			});

			newSocket.on("connect_error", (error) => {
				console.error("Socket connection error:", error);
				setSocket(null);
			});

			newSocket.on("getOnlineUsers", (users) => {
				setOnlineUsers(users);
			});

			return () => {
				newSocket.off("connect");
				newSocket.off("connect_error");
				newSocket.off("getOnlineUsers");
				newSocket.close();
			};
		} else {
			if (socket) {
				socket.close();
				setSocket(null);
				setOnlineUsers([]);
			}
		}
	}, [authUser]);

	return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
};