import {useChatSelector} from "@features/chat/chatSlice.ts";
import {Avatar, Badge, Box, IconButton, Theme, Typography} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React, {useEffect, useState} from 'react';
import authService from "@services/AuthService.ts";

const ChatHeader = () => {
    const {target,} = useChatSelector();
    const [isActivity, setIsActivity] = useState(false)
    useEffect(() => {
        authService.checkActivity(target)
            .then(res => {
                setIsActivity(res.status);
                console.log(res)
            })
            .catch(reason => console.log(reason))
    }, [target]);

    return (
        <Box boxShadow={"rgba(17, 17, 26, 0.1) 0px 0px 16px;"}
             sx={{paddingY: 1.5, paddingX: 2.5, borderRadius: 2, display: "flex", justifyContent: "space-between", alignItems:"center"}}>
            <Box sx={{display: "flex", alignItems: "center", gap: 1}}>
                <Badge
                    badgeContent={""}
                    color={isActivity ? "success" : "default"}
                    overlap="circular"
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    variant="dot"
                    sx={{
                        '& .MuiBadge-badge': {
                            backgroundColor: isActivity ? "#44b700" : "#6b7a99",
                            color: isActivity ? "#44b700" : "#6b7a99",
                            boxShadow: (theme: Theme) => `0 0 0 2px ${theme.palette.background.paper}`,
                            '&::after': {
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                borderRadius: '50%',
                                animation: isActivity ? 'ripple 1.2s infinite ease-in-out' : undefined,
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
                    <Avatar sx={{width: 40, height: 40}}></Avatar>
                </Badge>
                <Box display="flex" flexDirection="column" marginLeft={1}>
                    <Typography variant="subtitle1">
                        {target}
                    </Typography>
                    {
                        isActivity ? (
                            <Typography variant="caption" color="success.main" lineHeight="1.2">
                                online
                            </Typography>
                        ) : (
                            <Typography variant="caption" color="#6b7a99" lineHeight="1.2">
                                offline
                            </Typography>
                        )
                    }
                </Box>

            </Box>
            <Box>
                <IconButton>
                    <MoreVertIcon/>
                </IconButton>
            </Box>
        </Box>
    );
};

export default ChatHeader;
