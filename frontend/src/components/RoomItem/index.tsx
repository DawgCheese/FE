import {ChatType} from "@constants/ChatType.ts";
import {useChatAction} from "@features/chat/chatSlice.ts";
import {Avatar, Chip, ListItem, ListItemAvatar, ListItemButton, ListItemText, Typography} from "@mui/material";
import {useAppDispatch} from "@redux/store.ts";
import React, {useCallback} from 'react';
import {useRoomAction, useRoomSelector} from "@features/chat/roomSlice.ts";
import {RoomDisplay} from "../../layouts/RoomList/Index.tsx";


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
                width: "38px",
                height: "38px",
            },
            children: `${name[0]}${name[1]}`.toUpperCase(),
        };
    }, [stringToColor])

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
                    <Avatar {...stringAvatar(data.chat.name)}/>

                </ListItemAvatar>

                <div>
                    <p>

                    </p>
                </div>
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
