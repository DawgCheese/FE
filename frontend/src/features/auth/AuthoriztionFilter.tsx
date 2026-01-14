import {Key} from "@constants/Key.ts";
import {useAuthAction, useAuthSelector} from "@features/auth/authSlice.ts";
import {useAppDispatch} from "@redux/store.ts";
import authService from "@services/AuthService.ts";
import React, {JSX, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import Loader from "../../components/Loader";

interface AuthorizationFilter {
    children: JSX.Element
}

const AuthorizationFilter = ({children}: AuthorizationFilter) => {
    const navigate = useNavigate()
    const {user} = useAuthSelector()
    const {setUser} = useAuthAction()
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!user) {
            const localUser = localStorage.getItem(Key.USER);
            if (localUser) {
                authService.reLogin(JSON.parse(localUser))
                    .then((user) => dispatch(setUser(user)))
                    .catch((error) => {
                        console.log(error)
                        localStorage.removeItem(Key.USER)
                        navigate("/login")
                    })
                    .finally(() => setLoading(false))
            } else {
                navigate("/login")
            }
        } else {
            setLoading(false)
        }

    }, [user]);

    return (
        <>
            {loading ? <Loader/> : children}
        </>
    );
};

export default AuthorizationFilter;
