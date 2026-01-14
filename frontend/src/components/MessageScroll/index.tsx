import MessageRes from "../../models/Message.ts";
import {Box, Skeleton, Stack} from "@mui/material";
import React, {useEffect, useState} from 'react';
import Message from "../Message/Message.tsx";
interface MessageScrollProps{
    messages : MessageRes[]
    loading: boolean
}
const MessageScroll = ({messages, loading}: MessageScrollProps) => {

    useEffect(() => {

    }, []);
    return (
        <Box sx={{overflow: "auto", display: "flex", flexDirection: "column-reverse", gap: 1, paddingY: 2}}>

            {!loading && messages.map(message =><Message key={message.id} message={message}/> )}

        </Box>
    );
};

export default MessageScroll;
