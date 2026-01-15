import {useAuthSelector} from "@features/auth/authSlice.ts";
import {useChatAction, useChatSelector} from "@features/chat/chatSlice.ts";
import Message from "@models/Message.ts";
import {SendOutlined} from "@mui/icons-material";
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import InsertEmoticonOutlinedIcon from '@mui/icons-material/InsertEmoticonOutlined';
import KeyboardVoiceOutlinedIcon from '@mui/icons-material/KeyboardVoiceOutlined';
import {Box, IconButton, InputBase} from "@mui/material";
import chatService from "@services/ChatService.ts";
import Picker from "emoji-picker-react"
import {EmojiClickData} from "emoji-picker-react/src/types/exposedTypes.ts";
import {FormEvent, useEffect, useState} from 'react';
import style from "./style.ts";

interface ChatInputProps {
    onSubmit: (message: Message) => void
}

const ChatInput = ({onSubmit}: ChatInputProps) => {
    const [message, setMessage] = useState("");
    const [showPicker, setShowPicker] = useState(false);
    const {target, type} = useChatSelector();
    const {user} = useAuthSelector();

    useEffect(() => {
        setMessage("")
    }, [target]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!message)
            return;
        chatService.sendMessage(message, target);
        setMessage("")
        const messageObject: Message = {
            createAt: new Date().toDateString(),
            id: 0,
            mes: message,
            name: user.name,
            to: target,
            type: type
        }
        onSubmit(messageObject)


    }

    const onEmojiClick = (emojiObject: EmojiClickData) => {
        setMessage((prevInput) => prevInput + emojiObject.emoji);
        setShowPicker(false);
    };


    return (
        <Box component="form" sx={style.wrapper} onSubmit={handleSubmit}>
            <Box>
                <IconButton onClick={() => setShowPicker(!showPicker)}>
                    <InsertEmoticonOutlinedIcon fontSize="small"/>
                </IconButton>

                <IconButton sx={{position: "relative"}}>
                    <AttachFileOutlinedIcon fontSize="small"/>
                    {showPicker && <Picker onEmojiClick={onEmojiClick}
                                           style={{position: "absolute", zIndex: 100, top: "-470px", left: "0"}}
                                           lazyLoadEmojis/>}
                </IconButton>
            </Box>
            <Box sx={{flex: 1}}>
                <InputBase onChange={event => setMessage(event.target.value)} placeholder="Enter any things..."
                           sx={style.input} value={message} size="medium"/>
            </Box>
            <Box>
                {
                    message ? (<IconButton type="submit" sx={style.actionButton}>
                        <SendOutlined fontSize="small"/>

                    </IconButton>) : (
                        <IconButton sx={style.actionButton}>
                            <KeyboardVoiceOutlinedIcon fontSize="small"/>

                        </IconButton>)
                }

            </Box>
        </Box>
    );
};

export default ChatInput;
