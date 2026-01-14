import {Key} from "../../constants/Key.ts";
import chatSlice from "../../features/chat/chatSlice.ts";
import User from "../../models/User.ts";
import {useAppSelector} from "../../redux/store.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface AuthState{
    user: User | null
    loading: boolean
}

const initialState : AuthState = {
    loading: false,
    user: null
}


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User>){
            state.user = action.payload
            localStorage.setItem(Key.USER, JSON.stringify(action.payload))
        }
    }
})

export const useAuthAction = () =>{
    return authSlice.actions;
}

export const useAuthSelector = () => {
    return useAppSelector(state => state.auth)
}


export default authSlice