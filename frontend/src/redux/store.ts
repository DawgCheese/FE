import authSlice from "../features/auth/authSlice.ts";
import chatSlice from "../features/chat/chatSlice.ts";
import {TypeDivider} from "@mui/material/styles/createPalette";
import { configureStore } from '@reduxjs/toolkit'
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import roomSlice from "../features/chat/roomSlice.ts";
// ...

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        chat: chatSlice.reducer,
        room: roomSlice.reducer
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
