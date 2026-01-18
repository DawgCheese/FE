import './App.css'
import AuthorizationFilter from "@features/auth/AuthoriztionFilter.tsx";
import {useAuthAction} from "@features/auth/authSlice.ts";
import {useChatAction} from "@features/chat/chatSlice.ts";
import {useAppDispatch} from "@redux/store.ts";
import socketService from "@services/SocketService.ts";

import {useEffect, useState} from "react";
import {Route, Routes} from "react-router-dom";
import Loader from "./components/Loader";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
    const [loading, setLoading] = useState(true)

    useEffect(() => {


        if (socketService.isOpen()) {
            setLoading(false)

        } else {
            socketService.onOpen = () => {
                setLoading(() => false)

            }
        }


        return () => {
        }
    }, [])


    return (
        <>
            {loading ? (<Loader/>) : (
                <Routes>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/sign-up" element={<RegisterPage/>}/>
                    <Route path="/" element={<AuthorizationFilter><MainPage/></AuthorizationFilter>}/>
                </Routes>
            )}
        </>
    )
}

export default App
