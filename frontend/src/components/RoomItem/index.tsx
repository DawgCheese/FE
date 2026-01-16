import {ChatType} from "@constants/ChatType.ts";
import {useChatAction} from "@features/chat/chatSlice.ts";
import {Avatar, Chip, ListItem, ListItemAvatar, ListItemButton, ListItemText, Typography} from "@mui/material";
import {useAppDispatch} from "@redux/store.ts";
import React, {useCallback} from 'react';
import {useRoomAction} from "@features/chat/roomSlice.ts";
import {RoomDisplay} from "../../layouts/RoomList/Index.tsx";
import avatarUtils from "../../utils/AvatarUtils.ts";


interface RoomItemProps {
    chatType: ChatType
    data: RoomDisplay
    active: boolean
}

const RoomItem = ({data, chatType, active}: RoomItemProps) => {
    // useState cho set trạng thái của highlight
    const {setTarget} = useChatAction();
    const {setHighlight} = useRoomAction();
    const dispatch = useAppDispatch();





    function handleClick() {
        dispatch(setHighlight({highlight: false, name: data.chat.name}))
        dispatch(setTarget({target: data.chat.name, type: chatType}))
        dispatch(setHighlight({ name: data.chat.name, highlight: false }));
    }

    return (
        <ListItem alignItems="flex-start" disablePadding
                  secondaryAction={data.highlight ? <Chip color="primary" size="small" label={data.message}/> : ""}
        >
            <ListItemButton onClick={() => handleClick()} selected={active} sx={{borderRadius: 2}}>
                <ListItemAvatar>
                    <Avatar {...avatarUtils.avatar(data.chat.name, "44px", "18px")}/>
                </ListItemAvatar>
                <ListItemText
                    primary={data.chat.name}
                    secondary={
                        <React.Fragment>
                            <Typography
                                sx={{display: 'inline'}}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                {data.chat.actionTime.toDateString()}
                            </Typography>
                        </React.Fragment>
                    }
                    primaryTypographyProps={{
                        sx: {
                            fontWeight: data.highlight ? 'bold' : 'normal',
                        }
                    }}
                />
            </ListItemButton>
        </ListItem>
    );
};

export default RoomItem;
