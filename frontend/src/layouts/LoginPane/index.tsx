import { useAuthAction } from "../../features/auth/authSlice.ts";
import SocketError from "../../models/SocketError.ts";
import { AccountCircle, Lock } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
    Box,
    FormControl,
    FormHelperText,
    InputAdornment,
    Link,
    OutlinedInput,
    Theme
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { useAppDispatch } from "../../redux/store.ts";
import authService from "../../services/AuthService.ts";
import { enqueueSnackbar } from "notistack";
import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import validator from "../../Validator.ts";

/* ✅ TYPE CHO ERROR */
type FormError = {
    username?: string;
    password?: string;
};

const LoginPane = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<FormError>({});
    const [loading, setLoading] = useState(false);

    const dispatch = useAppDispatch();
    const { setUser } = useAuthAction();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const usernameErr = validator.validateUsername(username);
        const passwordErr = validator.validatePassword(password);

        if (usernameErr || passwordErr) {
            setError({
                username: usernameErr,
                password: passwordErr
            });
            return;
        }

        setLoading(true);
        authService
            .login({ user: username, pass: password })
            .then((data) => dispatch(setUser(data)))
            .then(() => navigate("/"))
            .catch((e: SocketError) =>
                enqueueSnackbar(e.mes, { variant: "error" })
            )
            .finally(() => setLoading(false));
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            width="70%"
            position="fixed"
            top="50%"
            left="50%"
            sx={{
                transform: "translate(-50%, -50%)",
                backgroundColor: "background.paper"
            }}
            padding={5}
            borderRadius={2}
        >
            <Grid2 container>
                <Grid2 sm={7}>
                    <img src="/img.png" style={{ maxWidth: "100%" }} />
                </Grid2>

                <Grid2
                    container
                    spacing={1.5}
                    sm={5}
                    alignItems="center"
                    alignContent="center"
                >
                    <Grid2 sm={12}>
                        <Box
                            fontSize={28}
                            fontWeight={600}
                            textAlign="center"
                            color={(theme: Theme) =>
                                theme.palette.grey["500"]
                            }
                        >
                            Login
                        </Box>
                    </Grid2>

                    {/* USERNAME */}
                    <Grid2 sm={12}>
                        <FormControl fullWidth error={Boolean(error.username)}>
                            <OutlinedInput
                                placeholder="Username"
                                value={username}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                }
                                onChange={(e) =>
                                    setUsername(e.target.value)
                                }
                                onBlur={() =>
                                    setError((e) => ({
                                        ...e,
                                        username:
                                            validator.validateUsername(
                                                username
                                            )
                                    }))
                                }
                                onFocus={() =>
                                    setError((e) => ({
                                        ...e,
                                        username: undefined
                                    }))
                                }
                            />
                            <FormHelperText>
                                {error.username}
                            </FormHelperText>
                        </FormControl>
                    </Grid2>

                    {/* PASSWORD */}
                    <Grid2 sm={12}>
                        <FormControl fullWidth error={Boolean(error.password)}>
                            <OutlinedInput
                                placeholder="Password"
                                type="password"
                                value={password}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <Lock />
                                    </InputAdornment>
                                }
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                onBlur={() =>
                                    setError((e) => ({
                                        ...e,
                                        password:
                                            validator.validatePassword(
                                                password
                                            )
                                    }))
                                }
                                onFocus={() =>
                                    setError((e) => ({
                                        ...e,
                                        password: undefined
                                    }))
                                }
                            />
                            <FormHelperText>
                                {error.password}
                            </FormHelperText>
                        </FormControl>
                    </Grid2>

                    <Grid2 sm={12}>
                        <Link>Forgot password?</Link>
                    </Grid2>

                    <Grid2 sm={12}>
                        <LoadingButton
                            fullWidth
                            variant="contained"
                            type="submit"
                            loading={loading}
                        >
                            Login
                        </LoadingButton>
                    </Grid2>

                    <Grid2 sm={12} textAlign="center">
                        <span>
                            Don't have account?
                            <Link component={RouterLink} to="/sign-up">
                                {" "}
                                Sign up
                            </Link>
                        </span>
                    </Grid2>
                </Grid2>
            </Grid2>
        </Box>
    );
};

export default LoginPane;
