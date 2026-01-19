import authSlice from "../features/auth/authSlice.ts";
import chatSlice from "../features/chat/chatSlice.ts";
import {TypeDivider} from "@mui/material/styles/createPalette";
import { configureStore } from '@reduxjs/toolkit'
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import roomSlice from "../features/chat/roomSlice.ts";
// ... nơi lưu dữ liệu của ứng dụng

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        chat: chatSlice.reducer,
        room: roomSlice.reducer
    },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
