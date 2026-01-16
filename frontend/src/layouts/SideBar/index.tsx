import {Key} from "@constants/Key.ts";
import SocketError from "@models/SocketError.ts";
import {LogoutOutlined,} from "@mui/icons-material";
import SentimentSatisfiedAltOutlinedIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import {Avatar, Badge, Box, IconButton, Theme, Tooltip} from "@mui/material";
import authService from "@services/AuthService.ts";
import {enqueueSnackbar} from "notistack";
import React from 'react';
import {useAuthSelector} from "@features/auth/authSlice.ts";

const SideBar = () => {
    const {user} = useAuthSelector();

    function handleLogout() {
        authService.logout()
            .then(() => localStorage.removeItem(Key.USER))
            .then(() => window.location.href = "/login")
            .catch((error: SocketError) => enqueueSnackbar(error.mes, {variant: "error"}))


    }

    return (
        <Box
            sx={{
                gridArea: "sidebar",
                width: "72px",
                height: "100vh",
                borderRight: (theme: Theme) => `2px solid ${theme.palette.grey["100"]}`,
                paddingX: 1,
                paddingY: 3,
                display: "flex",
                flexDirection: "column",
                gap: 3

            }}>
            <Box sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                gap: 1,
                paddingBottom: 4
            }}>
                <SentimentSatisfiedAltOutlinedIcon sx={{
                    color: "primary.main",
                    fontSize: 28
                }}/>
            </Box>

            <Box sx={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                gap: 1,
            }}>
                <IconButton >
                    <ForumOutlinedIcon sx={{color: "primary.main", fontSize: 18}}/>
                </IconButton>
                <IconButton>
                    <SettingsOutlinedIcon sx={{fontSize: 18}}/>
                </IconButton>
            </Box>

            <Box sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                gap: 1
            }}>
                <Tooltip title={user.name}>
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
                    > <Avatar sx={{width: 28, height: 28}}></Avatar>

                    </Badge>
                </Tooltip>
                <IconButton onClick={() => handleLogout()}>
                    <LogoutOutlined/>
                </IconButton>
            </Box>
        </Box>
    );
};

export default SideBar;
