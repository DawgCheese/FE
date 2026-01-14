import {ChatType} from "../../constants/ChatType.ts";
import {useChatAction} from "../../features/chat/chatSlice.ts";
import RoomChat from "../../models/RoomChat.ts";
import {Avatar, ListItem, ListItemAvatar, ListItemButton, ListItemText, Typography} from "@mui/material";
import {useAppDispatch} from "../../redux/store.ts";
import React, {useCallback} from 'react';

interface RoomItemProps {
    chatType: ChatType
    data: RoomChat
}

const RoomItem = ({data, chatType}: RoomItemProps) => {
    const {setTarget} = useChatAction();
    const dispatch = useAppDispatch();

    const stringToColor = useCallback((string: string) => {

        let hash = 0;
        let i;

        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */
        console.log(color)
        return color;
    }, [])

    const stringAvatar = useCallback((name: string) => {

        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: `${name[0]}${name[1] }`.toUpperCase(),
        };
    }, [stringToColor])



    function handleClick() {
        dispatch(setTarget({target: data.name, type: chatType}))
    }

    return (
        <ListItem alignItems="flex-start" disablePadding
        >
            <ListItemButton onClick={() => handleClick()}>
                <ListItemAvatar>
                    <Avatar {...stringAvatar(data.name)}/>

                </ListItemAvatar>

                    <div>
                        <p>

                        </p>
                    </div>
                <ListItemText
                    primary={data.name}
                    secondary={
                        <React.Fragment>
                            <Typography
                                sx={{display: 'inline'}}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                {data.actionTime.toDateString()}
                            </Typography>
                        </React.Fragment>
                    }
                />
            </ListItemButton>
        </ListItem>
    );
};

export default RoomItem;
