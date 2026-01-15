import {ChatType} from "../../constants/ChatType.ts";
import Message from "../../models/Message.ts";
import {useAppSelector} from "../../redux/store.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface ChatState {
    target: string
    newMessages: Message[]
    type: ChatType
}

const initialState: ChatState = {
    target: "",
    newMessages: [],
    type: ChatType.People
}


const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        addNewMessage(state, action: PayloadAction<Message>) {
            state.newMessages = [...state.newMessages, action.payload]
        },
        setTarget(state, action: PayloadAction<any>) {
            state.target = action.payload.target
            state.type = action.payload.type
        },
        removeNewMessage(state, action: PayloadAction<Message>){
            
        }
    }
})

export const useChatAction = () => {
    return chatSlice.actions;
}

export const useChatSelector = () => {
    return useAppSelector(state => state.chat)
}
export default chatSlice