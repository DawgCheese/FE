import SocketError from "@models/SocketError.ts";
import {AccountCircle, Lock} from "@mui/icons-material";
import AutorenewIcon from '@mui/icons-material/Autorenew';
import {LoadingButton} from "@mui/lab";
import {
    Box,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormHelperText,
    InputAdornment,
    Link,
    OutlinedInput,
    Theme
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import Grid2 from "@mui/material/Unstable_Grid2";
import authService from "@services/AuthService.ts";
import {enqueueSnackbar} from "notistack";
import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import validator from "../../Validator.ts";

const RegisterPane = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirm, setConfirm] = useState("")
    const [error, setError] = useState({})
    const [loading, setLoading] = useState(false)

    function handleSubmit(e: any) {
        e.preventDefault();
        if (validate()) {
            setLoading(true)
            authService.register({pass: password, user: username})
                .then((message) => enqueueSnackbar(message, {variant: "success"}))
                .then(() => navigate("/login"))
                .catch((error: SocketError) => setError({...error, username: error.mes}))
                .finally(() => setLoading(false))
        }

    }

    function validate() {
        const v1 = validator.validateUsername(username)
        const v2 = validator.validatePassword(password)
        const v3 = validator.validateConfirmPassword(password, confirm)
        setError({username: v1, password: v2, confirm: v3})
        return !(v1 || v2 || v3)

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
                <Grid2 container sm={5} alignItems={"center"} alignContent={"center"} spacing={1.5}>
                    <Grid2 sm={12}>
                        <Box
                            fontSize={28}
                            fontWeight={600}
                            textAlign={"center"}
                            color={(theme: Theme) => theme.palette.grey["500"]}
                            paddingY={1}
                        >
                            Sign Up
                        </Box>
                    </Grid2>
                    <Grid2 sm={12} >
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
                    <Grid2 sm={12} >
                        <FormControl fullWidth>
                            <OutlinedInput
                                fullWidth
                                placeholder="Password"
                                type="password"
                                value={password}
                                onChange={({target}) => setPassword(target.value)}
                                startAdornment={(
                                    <InputAdornment position="start">
                                        <Lock sx={{color: (theme: Theme) => theme.palette.grey["400"]}}/>
                                    </InputAdornment>
                                )}
                                onFocus={() => setError({...error, password: undefined})}
                                onBlur={() => setError({...error, password: validator.validatePassword(password)})}
                                error={error['password']}
                            />
                            <FormHelperText sx={{color: "error.main"}}>
                                {error['password']}
                            </FormHelperText>
                        </FormControl>
                    </Grid2>
                    <Grid2 sm={12} >
                        <FormControl fullWidth>
                            <OutlinedInput
                                fullWidth
                                placeholder="Confirm password"
                                type="password"
                                value={confirm}
                                onChange={({target}) => setConfirm(target.value)}
                                startAdornment={(
                                    <InputAdornment position="start">
                                        <AutorenewIcon sx={{color: (theme: Theme) => theme.palette.grey["400"]}}/>
                                    </InputAdornment>
                                )}
                                onFocus={() => setError({...error, confirm: undefined})}
                                onBlur={() => setError({
                                    ...error,
                                    confirm: validator.validateConfirmPassword(password, confirm)
                                })}
                                error={error['confirm']}
                            />
                            <FormHelperText sx={{color: "error.main"}}>
                                {error['confirm']}
                            </FormHelperText>
                        </FormControl>
                    </Grid2>
                    <Grid2 sm={12} >
                        <FormControlLabel control={<Checkbox defaultChecked/>}
                                          label="I agree to the Terms and Conditions"/>
                    </Grid2>
                    <Grid2 sm={12}>
                        <LoadingButton fullWidth variant="contained" type="submit" loading={loading}>Sign
                            up</LoadingButton>
                    </Grid2>
                    <Grid2 sm={12} textAlign="center">
                    <span>
                        <span>Already have account ?</span>
                        <Link component={RouterLink} to="/login"> Login</Link>
                    </span>
                    </Grid2>

                </Grid2>
                <Grid2 sm={7}>
                    <img src="/img.png" style={{maxWidth: "100%"}}/>
                </Grid2>
            </Grid2>

        </Box>
    );
};

export default RegisterPane;
