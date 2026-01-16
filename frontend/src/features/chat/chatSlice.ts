import {ChatType} from "@constants/ChatType.ts";
import Message from "@models/Message.ts";
import {useAppSelector} from "@redux/store.ts";
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

const chatType = [ChatType.People, ChatType.Group]



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
        removeNewMessage(state, action: PayloadAction<{target: string, type: ChatType}>){
            state.newMessages = state.newMessages.filter(m => m.name !== action.payload.target && action.payload.type !== chatType[m.type]);
            console.log(state.newMessages)
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