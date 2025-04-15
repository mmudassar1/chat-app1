import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const configureSocketServer = (server) => {
    const io = new Server(server, {
        cors: {
            origin: ["http://localhost:5173", "http://localhost:3000"], // Your frontend URLs
            methods: ["GET", "POST"],
            credentials: true
        },
        pingTimeout: 60000
    });

    io.on('connection', (socket) => {
        console.log('A user connected', socket.id);

        socket.on('disconnect', () => {
            console.log('User disconnected', socket.id);
        });

        socket.on('error', (error) => {
            console.log('Socket error:', error);
        });
    });

    return io;
};

const io = configureSocketServer(server);

const userSocketMap = {}; // {userId: socketId}

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};

io.on("connection", (socket) => {
    console.log("a user connected", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId && userId !== "undefined") {
        userSocketMap[userId] = socket.id;
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    }

    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
        if (userId) {
            delete userSocketMap[userId];
            io.emit("getOnlineUsers", Object.keys(userSocketMap));
        }
    });
});

export { app, io, server };