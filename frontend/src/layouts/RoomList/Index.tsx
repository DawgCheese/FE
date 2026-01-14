import {ChatType} from "../../constants/ChatType.ts";
import RoomChat from "../../models/RoomChat.ts";
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import {TabContext, TabPanel} from "@mui/lab";
import {
    Avatar,
    Box,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    TextField,
    Typography
} from "@mui/material";
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import chatService from "../../services/ChatService.ts";
import React, {useEffect, useState} from 'react';
import RoomItem from "../../components/RoomItem";

export interface RoomDisplay {
    chat: RoomChat,
    highlight: boolean
    message: number;
}


const RoomList = () => {

    const [value, setValue] = React.useState(ChatType.People);
    const [rooms, setRooms] = useState<RoomChat[]>([])
    const handleChange = (event: React.SyntheticEvent, newValue: ChatType) => {
        setValue(newValue);
    };

    useEffect(() => {
        chatService.findRoomChat().then((rooms) => setRooms(rooms))
    }, []);

    return (
        <Box sx={{
            gridArea: "room-list",
            width: "320px",
            padding: 2,
            display: "flex",
            flexDirection: "column"

        }}>
            <Box>
                <Typography fontSize={24} fontWeight={500} color={(theme) => theme.palette.grey["600"]}>
                    Live Chat
                </Typography>
            </Box>
            <Box sx={{paddingY: 2}}>
                <TextField fullWidth size="medium"/>
            </Box>
            <Box sx={{flex: 1}}>
                <TabContext value={value}>
                    <Tabs value={value} onChange={handleChange} aria-label="icon tabs example" variant="fullWidth">
                        <Tab icon={<PersonOutlineOutlinedIcon fontSize="small"/>} value={ChatType.People}
                             aria-label="phone"/>
                        <Tab icon={<GroupOutlinedIcon fontSize="small"/>} aria-label="favorite" value={ChatType.Group}/>
                    </Tabs>
                    <TabPanel value={ChatType.People} sx={{padding: 0}}>
                        <List sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
                            {rooms.map((room)=> <RoomItem data={room} chatType={value} key={room.name}/>)}
                        </List>
                    </TabPanel>
                    <TabPanel value={ChatType.Group}>Item Two</TabPanel>
                </TabContext>
            </Box>
        </Box>
    );
};

export default RoomList;
