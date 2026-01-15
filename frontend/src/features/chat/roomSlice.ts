import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {useAppSelector} from "../../redux/store.ts";
import {RoomDisplay} from "../../layouts/RoomList/Index.tsx";

export interface RoomList {
    roomList: RoomDisplay[]
}

const initialState: RoomList = {
    roomList: []
}

const roomSlice = createSlice({
    name: "room",
    initialState,
    reducers: {
        addNewRoom(state, action: PayloadAction<RoomDisplay>) {
            state.roomList = [...state.roomList, action.payload];
        },
        addRooms(state, action: PayloadAction<RoomDisplay[]>) {
            state.roomList = action.payload;
            console.log(state.roomList);
        },
        setHighlight(state, action: PayloadAction<{ name: string; highlight: boolean }>) {
            const index = state.roomList.findIndex(room => room.chat.name === action.payload.name);
            if (index > -1) {
                state.roomList[index].highlight = action.payload.highlight;
            }
        }
    }
});

export const useRoomAction = () => {
    return roomSlice.actions;
}

export const useRoomSelector = () => {
    return useAppSelector(state => state.room)
}

export default roomSlice;