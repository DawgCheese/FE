import {SocketEvent} from "../../constants/SocketEvent.ts";
import {SendOutlined} from "@mui/icons-material";
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import InsertEmoticonOutlinedIcon from '@mui/icons-material/InsertEmoticonOutlined';
import KeyboardVoiceOutlinedIcon from '@mui/icons-material/KeyboardVoiceOutlined';
import {Box, IconButton, InputBase} from "@mui/material";
import socketService from "../../services/SocketService.ts";
import {useState} from 'react';
import style from "./style.ts";

const ChatInput = () => {
    const [message, setMessage] = useState("");

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setMessage("")
        console.log(message)
        socketService.send(
            SocketEvent.Login,
            {
                user: "21130402",
                pass: "12345"
            }
        )
    }

    return (
        <Box component="form" sx={style.wrapper} onSubmit={handleSubmit}>
            <Box>
                <IconButton>
                    <InsertEmoticonOutlinedIcon fontSize="small"/>
                </IconButton>
                <IconButton>
                    <AttachFileOutlinedIcon fontSize="small"/>
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
