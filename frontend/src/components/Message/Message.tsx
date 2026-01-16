import {useAuthSelector} from "@features/auth/authSlice.ts";
import MessageRes from "@models/Message.ts";
import {Avatar, Box, Tooltip, Typography} from "@mui/material";
import avatarUtils from "../../utils/AvatarUtils.ts";


interface MessageProps{
    message: MessageRes
    showAvatar?: boolean
}

const Message = ({message, showAvatar}: MessageProps) => {
    const {user} = useAuthSelector()


    const isOwner = user && user.name == message.name

    return (
        <Box display="flex" justifyContent={isOwner ? "flex-end" : "flex-start"} alignItems="center">
            <Box sx={{marginRight: 1, minWidth: "28px"}}>
                {(showAvatar && !isOwner) && <Avatar {...avatarUtils.avatar(message.name, "28px", "10px")}/>}
            </Box>
            <Tooltip title={message.name}>
                <Typography paddingX={2} paddingY={1} sx={{
                    backgroundColor: isOwner ? "primary.main" : "background.paper",
                    color: isOwner ? "#fff" : "text.main",
                    width: "auto",
                    borderRadius: 2,
                    maxWidth: "55%"
                }}>
                    {message.mes}
                </Typography>
            </Tooltip>
        </Box>
    );
};

export default Message;
