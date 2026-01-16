import {ChatType} from "@constants/ChatType.ts";
import {useChatAction, useChatSelector} from "@features/chat/chatSlice.ts";
import RoomChat from "@models/RoomChat.ts";
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {TabContext, TabPanel} from "@mui/lab";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    List,
    ListItemIcon,
    Menu,
    MenuItem,
    OutlinedInput,
    TextField,
    Tooltip,
    Typography
} from "@mui/material";
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import chatService from "@services/ChatService.ts";
import React, {useEffect, useState} from 'react';
import RoomItem from "../../components/RoomItem";
import {useRoomAction, useRoomSelector} from "@features/chat/roomSlice.ts";
import {useAppDispatch} from "@redux/store.ts";
import Message from "@models/Message.ts";
import {useAuthSelector} from "@features/auth/authSlice.ts";
import {PersonAdd} from "@mui/icons-material";
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import {enqueueSnackbar} from "notistack";

export interface RoomDisplay {
    chat: RoomChat,
    highlight: boolean
    message: number;
}




const RoomList = () => {

    const [value, setValue] = React.useState(ChatType.People);
    const [searchKeyWord, setSearchKeyWord] = useState<string>("");
    const [openModal, setOpenModal] = React.useState(false);
    const {target, newMessages} = useChatSelector()
    const dispatch = useAppDispatch();
    const {addNewRoom, addRooms} = useRoomAction();
    const {roomList} = useRoomSelector()
    const {setTarget} = useChatAction()
    const {user} = useAuthSelector()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [modalValue, setModalValue] = useState("")
    const [action, setAction] = useState(0)

    useEffect(() => {
        chatService.findRoomChat().then((rooms) => {
            const displayRooms = rooms.map(room => ({
                chat: room,
                highlight: false,
                message: 0// Khởi tạo highlight là false cho mỗi phòng chat
            }));
            dispatch(addRooms(displayRooms))
        });
    }, []);

    const check = (room: RoomDisplay, message: Message) => {
        return (room.chat.name === message.name && room.chat.type === 0) || (room.chat.name === message.to && room.chat.type === 1)
    }

    // Effect đẩy dữ liệu người mới vừa nhắn lên trên đầu
    useEffect(() => {
        dispatch(addRooms(handleNewMessage([...roomList])));
    }, [newMessages]);

    const handleChange = (event: React.SyntheticEvent, newValue: ChatType) => {
        setValue(newValue);
    };


    useEffect(() => {
        setSearchKeyWord("")
    }, [target]);



    const handleSubmit = () => {
        if (!modalValue) {
            setOpenModal(false)
            return;
        }
        if (action == 0) {
            dispatch(addNewRoom({
                chat: {
                    name: modalValue,
                    type: 0,
                    actionTime: new Date()
                },
                highlight: false,
                message: 0
            }))
            dispatch(setTarget({target: modalValue, type: ChatType.People}))
            setOpenModal(false)


        } else if (action == 1) {
            chatService.createGroup(modalValue)
                .then((data) => {
                    dispatch(addNewRoom({
                        chat: {
                            name: data.name,
                            type: 1,
                            actionTime: new Date()
                        },
                        highlight: false,
                        message: 0
                    }))
                    dispatch(setTarget({target: data.name, type: ChatType.Group}))
                })
                .catch(reason => enqueueSnackbar(reason.mes, {variant: "error"}))
                .finally(() => setOpenModal(false))
        } else if (action == 2) {
            chatService.joinRoom(modalValue)
                .then((data) => {
                    dispatch(addNewRoom({
                        chat: {
                            name: data.name,
                            type: 1,
                            actionTime: new Date()
                        },
                        highlight: false,
                        message: 0
                    }))
                    dispatch(setTarget({target: data.name, type: ChatType.Group}))
                })
                .catch(reason => enqueueSnackbar(reason.mes, {variant: "error"}),)
                .finally(() => setOpenModal(false))
        }
        setModalValue("");
    }

    const handleClose = () => {
        setOpenModal(false);
    };

    const handleNewMessage = (roomList: RoomDisplay[]) => {
        newMessages.forEach((message: Message) => {
            const index = roomList.findIndex(room => check(room, message));
            if (index > -1) {
                const [topRoomUpdated] = roomList.splice(index, 1);
                roomList.unshift({
                    ...topRoomUpdated,
                    highlight: true,
                    message: newMessages.filter(m => check(topRoomUpdated, m)).length
                });
            }
        });
        return roomList;
    }

    function handleDropdownClose() {
        setAnchorEl(null);

    }

    function handleAddPerson() {
        setAction(0)
        setOpenModal(true)
        setAnchorEl(null);

    }
    function handleCrateGroup() {
        setAction(1)
        setOpenModal(true)
        setAnchorEl(null);

    }

    function handleJoinGroup() {
        setAction(2)
        setOpenModal(true)
        setAnchorEl(null);

    }


    const handleInputSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchKeyWord(value);
    }

    function renderModelLabel() {
        switch (action) {
            case 0:
                return "Add people"
            case 1:
                return "Add group"
            case 2:
                return "Join group"
            default:
                return "";
        }
    }

    return (
        <Box sx={{
            gridArea: "room-list",
            width: "320px",
            height: "100vh",
            padding: 2,
            display: "flex",
            flexDirection: "column"

        }}>
            <Box>
                <Typography fontSize={24} fontWeight={500} color={(theme) => theme.palette.grey["600"]}>
                    Live Chat
                </Typography>
            </Box>

            <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: 0.5
            }}>
                <Box sx={{paddingY: 2}}>

                    <OutlinedInput placeholder="Search" value={searchKeyWord}  size="medium" onChange={handleInputSearch}/>
                </Box>

                <Box display="flex" alignItems="center">
                    <Tooltip title="Option">

                        <IconButton
                            onClick={(e) =>     setAnchorEl(e.currentTarget)}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >
                            <MoreVertIcon/>
                        </IconButton>
                    </Tooltip>
                    <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleDropdownClose}
                        onClick={handleDropdownClose}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                '&::before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >

                        <MenuItem onClick={handleAddPerson}>
                            <ListItemIcon>
                                <PersonAdd fontSize="small" />
                            </ListItemIcon>
                            Add people
                        </MenuItem>
                        <MenuItem onClick={handleCrateGroup}>
                            <ListItemIcon>
                                <GroupAddIcon fontSize="small" />
                            </ListItemIcon>
                            Create group
                        </MenuItem>
                        <MenuItem onClick={handleJoinGroup}>
                            <ListItemIcon>
                                <GroupAddIcon fontSize="small"/>
                            </ListItemIcon>
                            Join Group
                        </MenuItem>
                    </Menu>
                    <Dialog
                        open={openModal}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title" sx={{
                            fontWeight: "bold",
                            fontSize: "20px"
                        }}>
                            {renderModelLabel()}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description" sx={{paddingTop: "10px"}}>
                                <TextField
                                    id="outlined-basic"
                                    label={renderModelLabel()}
                                    variant="outlined"
                                    sx={{width: 300}}
                                    name={"name"}
                                    onChange={(e) => setModalValue(e.target.value)}
                                />
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions sx={{paddingRight: "24px"}}>
                            <Button onClick={handleClose} variant="text">Cancel</Button>
                            <Button onClick={handleSubmit} autoFocus color="primary" variant="contained">
                                Confirm
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Box>
            </Box>
            <TabContext value={value}>
                <Tabs value={value} onChange={handleChange} aria-label="icon tabs example" variant="fullWidth">
                    <Tab icon={<ChatBubbleOutlineOutlinedIcon fontSize="small"/>} aria-label="favorite" value={null}/>
                    <Tab icon={<PersonOutlineOutlinedIcon fontSize="small"/>} value={ChatType.People}
                         aria-label="phone"/>
                    <Tab icon={<GroupOutlinedIcon fontSize="small"/>} aria-label="favorite" value={ChatType.Group}/>
                </Tabs>

                <Box sx={{flex: 1, overflowY: "auto"}}>

                    <TabPanel value={ChatType.People} sx={{padding: 0, overflowY: "auto"}}>
                        <List sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper',}}>
                            {roomList.filter(displayRoom => displayRoom.chat.type === 0 && displayRoom.chat.name != user.name && (displayRoom.chat.name.toLowerCase().includes(searchKeyWord.toLowerCase()))).map((displayRoom) =>
                                <RoomItem active={target == displayRoom.chat.name}
                                          data={displayRoom}
                                          chatType={value}
                                          key={displayRoom.chat.name}
                                          />)}
                        </List>
                    </TabPanel>
                    <TabPanel value={ChatType.Group} sx={{padding: 0, overflowY: "auto"}}>
                        <List sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper', overflowY: "auto"}}>
                            {roomList.filter(displayRoom => displayRoom.chat.type === 1 && displayRoom.chat.name != user.name && (displayRoom.chat.name.toLowerCase().includes(searchKeyWord.toLowerCase()))).map((displayRoom) =>
                                <RoomItem active={target == displayRoom.chat.name}
                                          data={displayRoom}
                                          chatType={value}
                                          key={displayRoom.chat.name}
                                         />)}
                        </List>
                    </TabPanel>
                    <TabPanel value={null} sx={{padding: 0, overflowY: "auto"}}>
                        <List sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper', overflowY: "auto"}}>
                            {roomList.filter(displayRoom => displayRoom.chat.name != user.name && (displayRoom.chat.name.toLowerCase().includes(searchKeyWord.toLowerCase()))).map((displayRoom) =>
                                <RoomItem active={target == displayRoom.chat.name}
                                          data={displayRoom}
                                          chatType={value}
                                          key={displayRoom.chat.name}
                                />)}
                        </List>
                    </TabPanel>
            </Box>
            </TabContext>

        </Box>
    );
};

export default RoomList;
