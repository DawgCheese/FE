import {ChatType} from "@constants/ChatType.ts";
import {useChatAction, useChatSelector} from "@features/chat/chatSlice.ts";
import MessageRes from "@models/Message.ts";
import {Box, Theme} from "@mui/material";
import {useAppDispatch} from "@redux/store.ts";
import chatService from "@services/ChatService.ts";
import socketService from "@services/SocketService.ts";
import React, {useEffect, useRef, useState} from 'react';
import ChatHeader from "../../components/ChatHeader";
import ChatInput from "../../components/ChatInput";
import MessageScroll from "../../components/MessageScroll";

const chatType = [ChatType.People, ChatType.Group]

const ChatPane = () => {
    const [messages, setMessages] = useState<MessageRes[]>([])
    const {target, type, newMessages} = useChatSelector();
    const dispatch = useAppDispatch();
    const {addNewMessage, removeNewMessage, setTarget} = useChatAction()
    const [loading, setLoading] = useState(false)
    const audioRef = useRef<HTMLAudioElement>(null)

    useEffect(() => {
        setLoading(true)
        chatService.findPeopleChats(target)
            .then((data) => {
                setMessages(data)
            })
            .then(() => setLoading(false))
            .catch((error) => console.log(error))

        socketService.receiveMessageHandler = (message) => {
            console.log(message)
            if (message.name === target) {
                setMessages(prevState => [message, ...prevState])

            } else {
                dispatch(addNewMessage(message));

            }


        }

        dispatch(removeNewMessage({target, type}))
    }, [target, type])

    useEffect(() => {
        if (audioRef.current) {
            const temp = [...newMessages];
            const item = temp.pop()
            if (item) {
                if (!temp.some(value => value.name == item.name && value.type == item.type)) {

                    audioRef.current.currentTime = 0;
                    audioRef.current.play();


                }
            }

        }
    }, [newMessages.length]);


    useEffect(() => {
        const temp = newMessages.filter(mes => mes.name == target && chatType[mes.type] == type);
        if (temp.length == 0)
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
            {!!target ? (
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
                    <MessageScroll messages={messages} loading={loading}/>
                    <ChatInput onSubmit={(message) => setMessages([message, ...messages])}/>
                </Box>
            ) : (
                <Box
                    sx={{
                        height: "100%",
                        borderRadius: 2,
                        display: "grid",
                        placeItems: "center"

                    }}
                >

                    <Box component="img" maxWidth="40%" src="/img.png">
                    </Box>
                </Box>
            )
            }
            <audio src="/interface-124464.mp3" hidden ref={audioRef}/>
        </Box>
    );
};

export default ChatPane;
