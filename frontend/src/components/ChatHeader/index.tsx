import {useChatSelector} from "../../features/chat/chatSlice.ts";
import {Avatar, Badge, Box, Theme, Typography} from "@mui/material";
import React from 'react';

const ChatHeader = () => {
    const {target, } = useChatSelector();

    return (
        <Box boxShadow={"rgba(17, 17, 26, 0.1) 0px 0px 16px;"}
             sx={{paddingY: 1, paddingX: 2, borderRadius: 2}}>
            <Box sx={{display: "flex", alignItems: "center", gap: 1}}>
                <Badge
                    badgeContent={""}
                    color="success"
                    overlap="circular"
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    variant="dot"
                    sx={{
                        '& .MuiBadge-badge': {
                            backgroundColor: '#44b700',
                            color: '#44b700',
                            boxShadow: (theme: Theme) => `0 0 0 2px ${theme.palette.background.paper}`,
                            '&::after': {
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                borderRadius: '50%',
                                animation: 'ripple 1.2s infinite ease-in-out',
                                border: '1px solid currentColor',
                                content: '""',
                            },
                        },
                        '@keyframes ripple': {
                            '0%': {
                                transform: 'scale(.8)',
                                opacity: 1,
                            },
                            '100%': {
                                transform: 'scale(2.4)',
                                opacity: 0,
                            },
                        },
                    }}
                >
                    <Avatar sx={{width: 36, height: 36}}></Avatar>
                </Badge>
                <Typography variant="subtitle1">
                    {target}
                </Typography>

            </Box>
        </Box>
    );
};

export default ChatHeader;
