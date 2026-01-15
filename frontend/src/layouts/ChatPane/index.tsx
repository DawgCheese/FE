import { ChatType } from "../../constants/ChatType.ts";
import { useChatAction, useChatSelector } from "../../features/chat/chatSlice.ts";
import Message from "../../models/Message.ts";
import { Box, Theme } from "@mui/material";
import { useAppDispatch } from "../../redux/store.ts";
import chatService from "../../services/ChatService.ts";
import socketService from "../../services/SocketService.ts";
import React, { useEffect, useState } from "react";
import ChatHeader from "../../components/ChatHeader";
import ChatInput from "../../components/ChatInput";
import MessageScroll from "../../components/MessageScroll";

const chatTypeMap = [ChatType.People, ChatType.Group];

const ChatPane = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);

    const { target, type, newMessages } = useChatSelector();
    const dispatch = useAppDispatch();
    const { addNewMessage } = useChatAction();

    /* LOAD CHAT */
    useEffect(() => {
        if (!target) return;

        setLoading(true);
        setMessages([]);

        chatService
            .findPeopleChats(target)
            .then(setMessages)
            .catch(console.error)
            .finally(() => setLoading(false));

        socketService.receiveMessageHandler = (message) => {
            if (message.name === target) {
                setMessages((prev) => [message, ...prev]);
            } else {
                dispatch(addNewMessage(message));
            }
        };

        return () => {
            socketService.receiveMessageHandler = undefined;
        };
    }, [target, type, dispatch, addNewMessage]);

    /* HANDLE NEW MESSAGES FROM STORE */
    useEffect(() => {
        if (!target) return;

        const temp = newMessages.filter(
            (m) => m.name === target && chatTypeMap[m.type] === type
        );

        if (temp.length === 0) return;

        setMessages((prev) => [...temp, ...prev]);
    }, [newMessages, target, type]);

    return (
        <Box sx={{ gridArea: "chat-pane", padding: 2, maxHeight: "100vh" }}>
            <Box
                sx={{
                    display: "grid",
                    gridTemplateRows: "min-content 1fr min-content",
                    backgroundColor: (theme: Theme) =>
                        theme.palette.grey["50"],
                    borderRadius: 2,
                    height: "100%",
                    padding: 2
                }}
            >
                <ChatHeader />
                <MessageScroll messages={messages} loading={loading} />
                <ChatInput
                    onSubmit={(message) =>
                        setMessages((prev) => [message, ...prev])
                    }
                />
            </Box>
        </Box>
    );
};

export default ChatPane;
