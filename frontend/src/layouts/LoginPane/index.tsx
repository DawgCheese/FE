import {useAuthAction} from "@features/auth/authSlice.ts";
import SocketError from "@models/SocketError.ts";
import {AccountCircle, Lock} from "@mui/icons-material";
import {LoadingButton} from "@mui/lab";
import {Box, Button, FormControl, FormHelperText, InputAdornment, Link, OutlinedInput, Theme} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import {useAppDispatch} from "@redux/store.ts";
import authService from "@services/AuthService.ts";
import {enqueueSnackbar} from "notistack";
import React, {useState} from 'react';
import {Link as RouterLink, useNavigate} from "react-router-dom";
import validator from "../../Validator.ts";

const LoginPane = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState({})
    const [loading, setLoading] = useState(false)
    const dispatch = useAppDispatch();
    const {setUser} = useAuthAction()
    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault();
        setLoading(true)
        authService.login({user: username, pass: password})
            .then(data => dispatch(setUser(data)))
            .then(() => navigate("/"))
            .catch((e: SocketError) => enqueueSnackbar(e.mes, {variant: "error"}))
            .finally(()=> setLoading(false))
    }

    return (
        <Box component="form"
             onSubmit={handleSubmit}
             width={"70%"}
             position="fixed" top="50%" left="50%"
             sx={{transform: "translate(-50%, -50%)", backgroundColor: "background.paper"}}
             boxShadow="gba(0, 0, 0, 0.1) 0px 4px 12px;"
             padding={5}
             borderRadius={2}
        >
            <Grid2 container>
                <Grid2 sm={7}>
                    <img src="/img.png" style={{maxWidth: "100%"}}/>
                </Grid2>
                <Grid2 container spacing={1.5} sm={5} alignItems={"center"} alignContent={"center"}>
                    <Grid2 sm={12}>
                        <Box
                            fontSize={28}
                            fontWeight={600}
                            textAlign={"center"}
                            color={(theme: Theme) => theme.palette.grey["500"]}
                        >
                            Login
                        </Box>
                    </Grid2>
                    <Grid2 sm={12}>
                        <FormControl fullWidth>
                            <OutlinedInput size="medium"
                                           fullWidth
                                           placeholder="Username"
                                           startAdornment={(
                                               <InputAdornment position="start">
                                                   <AccountCircle
                                                       sx={{color: (theme: Theme) => theme.palette.grey["400"]}}/>
                                               </InputAdornment>
                                           )}
                                           onFocus={() => setError({...error, username: undefined})}
                                           onBlur={() => setError({
                                               ...error,
                                               username: validator.validateUsername(username)
                                           })}
                                           error={error['username']}
                                           value={username}
                                           onChange={({target}) => setUsername(target.value)}/>
                            <FormHelperText sx={{color: "error.main"}}>
                                {error['username']}
                            </FormHelperText>
                        </FormControl>
                    </Grid2>
                    <Grid2 sm={12}>
                        <FormControl fullWidth>
                            <OutlinedInput size="medium"
                                           fullWidth
                                           placeholder="password"
                                           startAdornment={(
                                               <InputAdornment position="start">
                                                   <Lock
                                                       sx={{color: (theme: Theme) => theme.palette.grey["400"]}}/>
                                               </InputAdornment>
                                           )}
                                           onFocus={() => setError({...error, password: undefined})}
                                           onBlur={() => setError({
                                               ...error,
                                               password: validator.validatePassword(password)
                                           })}
                                           error={error['password']}
                                           type="password"
                                           value={password}
                                           onChange={({target}) => setPassword(target.value)}/>
                            <FormHelperText sx={{color: "error.main"}}>
                                {error['password']}
                            </FormHelperText>
                        </FormControl>
                    </Grid2>
                    <Grid2 sm={12}>
                        <Link>Forgot password ?</Link>
                    </Grid2>
                    <Grid2 sm={12}>
                        <LoadingButton fullWidth variant="contained" type="submit" loading={loading}>Login</LoadingButton>
                    </Grid2>
                    <Grid2 sm={12} textAlign="center">
                    <span>
                        <span>Don't have account ?</span>
                            <Link component={RouterLink} to="/sign-up"> Sign up</Link>

                    </span>
                    </Grid2>
                </Grid2>
            </Grid2>
        </Box>
    )
        ;
};

export default LoginPane;
