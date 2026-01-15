import MessageRes from "@models/Message.ts";
import {Box, Skeleton, Stack} from "@mui/material";
import React, {useEffect, useRef, useState} from 'react';
import Message from "../Message/Message.tsx";

interface MessageScrollProps {
    messages: MessageRes[]
    loading: boolean
    onLoadMore: () => void;
}

const MessageScroll = ({messages, loading, onLoadMore}: MessageScrollProps) => {
    const pivotRef = useRef(null)
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0];
            if (entry.isIntersecting){
                onLoadMore()
            }
        });
        observer.observe(pivotRef.current)
    }, [onLoadMore]);
    return (
        <Box sx={{overflow: "auto", display: "flex", flexDirection: "column-reverse", gap: 1, paddingY: 2}}>

            {!loading && messages.map(message => <Message key={message.id} message={message}/>)}
            <div ref={pivotRef}></div>
        </Box>
    );
};

export default MessageScroll;
