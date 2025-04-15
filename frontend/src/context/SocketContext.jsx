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
			const newSocket = io("https://chat-app-yt.onrender.com", {
				withCredentials: true,
				transports: ["websocket", "polling"],
				auth: {
					userId: authUser._id,
				},
			});

			setSocket(newSocket);

			// socket.on() is used to listen to the events. can be used both on client and server side
			newSocket.on("getOnlineUsers", (users) => {
				setOnlineUsers(users);
			});

			return () => newSocket.close();
		} else {
			if (socket) {
				socket.close();
				setSocket(null);
			}
		}
	}, [authUser]);

	return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
};