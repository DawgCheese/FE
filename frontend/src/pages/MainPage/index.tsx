import {useAuthAction} from "../../features/auth/authSlice.ts";
import {Room} from "@mui/icons-material";
import {Box} from "@mui/material";
import {useAppDispatch} from "../../redux/store.ts";
import authService from "../../services/AuthService.ts";
import React, {useEffect} from 'react';
import ChatPane from "../../layouts/ChatPane";
import RoomList from "../../layouts/RoomList/Index.tsx";
import SideBar from "../../layouts/SideBar";
import style from "./style.ts";

const MainPage = () => {
    const dispatch = useAppDispatch();
    const {setUser} = useAuthAction()
    console.log("main page")
    useEffect(() => {
        console.log("main");

    }, []);
    return (
        <Box sx={style.main}>
            <SideBar/>
            <RoomList/>
            <ChatPane/>
        </Box>
    );
};

export default MainPage;
