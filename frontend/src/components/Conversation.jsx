import { useSocket } from "../context/SocketContext";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useConversation from "../zustand/useConversation";
import Message from "./Message";
import Input from "./Input";

const Conversation = () => {
    const socket = useSocket();
    const { id } = useParams();
    const { messages, setMessages } = useConversation();
    const [input, setInput] = useState("");

    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            newMessage.shouldShake = true;
            setMessages([...messages, newMessage]);
        });

        return () => socket?.off("newMessage");
    }, [socket, setMessages, messages]);

    const handleSendMessage = () => {
        if (input.trim()) {
            const newMessage = {
                id: Date.now(),
                text: input,
                sender: "me",
                shouldShake: false,
            };
            setMessages([...messages, newMessage]);
            socket?.emit("sendMessage", newMessage);
            setInput("");
        }
    };

    return (
        <div className="conversation">
            <div className="messages">
                {messages.map((message) => (
                    <Message key={message.id} message={message} />
                ))}
            </div>
            <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onSend={handleSendMessage}
            />
        </div>
    );
};

export default Conversation;