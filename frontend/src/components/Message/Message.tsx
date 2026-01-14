import {useAuthSelector} from "../../features/auth/authSlice.ts";
import {useChatSelector} from "../../features/chat/chatSlice.ts";
import MessageRes from "../../models/Message.ts";
import {Avatar, Box, Theme, Typography} from "@mui/material";
import {useAppSelector} from "../../redux/store.ts";
import React, {useEffect} from 'react';


interface MessageProps{
    message: MessageRes
    showAvatar?: boolean
}

const Message = ({message, showAvatar}: MessageProps) => {
    const {user} = useAuthSelector()
    const {target, newMessages} = useChatSelector();

    useEffect(() => {

    }, [target]);

    const isOwner = user && user.name == message.name

    return (
        <Box display="flex" justifyContent={isOwner ? "flex-end" : "flex-start"} alignItems="flex-end">
            <Box sx={{marginRight: 1, minWidth: "24px"}}>
                {(showAvatar && !isOwner) && <Avatar sx={{width: "24px", height: "24px", }}/>}
            </Box>
            <Typography paddingX={2} paddingY={1} sx={{
                backgroundColor: isOwner ? "primary.main" : "background.paper",
                color: isOwner ? "#fff" : "text.main",
                width: "auto",
                borderRadius: 2,
                maxWidth: "55%"
            }}>
                {message.mes}
            </Typography>
        </Box>
    );
};

export default Message;
