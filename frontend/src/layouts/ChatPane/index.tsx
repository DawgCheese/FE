import {ChatType} from "../../constants/ChatType.ts";
import {useChatAction, useChatSelector} from "../../features/chat/chatSlice.ts";
import MessageRes from "../../models/Message.ts";
import {Box, Theme} from "@mui/material";
import chatService from "../../services/ChatService.ts";
import React, {useEffect, useState} from 'react';
import ChatHeader from "../../components/ChatHeader";
import ChatInput from "../../components/ChatInput";
import MessageScroll from "../../components/MessageScroll";

const chatType = [ChatType.People, ChatType.Group]

const ChatPane = () => {
    const [messages, setMessages] = useState<MessageRes[]>([])
    const {target, type, newMessages} = useChatSelector();
    const {removeNewMessage} = useChatAction();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log("chat pane");
        chatService.findPeopleChats(target)
            .then((data) => {
            setMessages(data)
            console.log(data)
        }).catch((error) => console.log(error))
    }, [target, type])

    useEffect(() => {
        const temp = newMessages.filter(mes => mes.name == target && chatType[mes.type] == type);
        if(temp.length == 0)
            return
        else {
            setMessages((prev) => [...prev, ...messages])
        }
    }, [newMessages, target, type]);

    return (
        <Box sx={{
            gridArea: "chat-pane",
            padding: 2,
            maxHeight: "100vh"

        }}>
            <Box
                sx={{
                    display: "grid",
                    gridTemplateRows: "min-content 1fr min-content",
                    backgroundColor: (theme: Theme) => theme.palette.grey["50"],
                    borderRadius: 2,
                    height: "100%",
                    padding: 2,
                }}
            >
                <ChatHeader/>
               <MessageScroll messages={messages} loading={loading} />

              <ChatInput onSubmit={(message) =>setMessages((prev) => [message, ...prev])}/>
            </Box>
        </Box>
    );
};

export default ChatPane;
