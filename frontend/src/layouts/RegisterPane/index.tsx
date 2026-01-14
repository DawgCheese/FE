import SocketError from "../../models/SocketError.ts";
import { AccountCircle, Lock } from "@mui/icons-material";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { LoadingButton } from "@mui/lab";
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
import Grid2 from "@mui/material/Unstable_Grid2";
import authService from "../../services/AuthService.ts";
import { enqueueSnackbar } from "notistack";
import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import validator from "../../Validator.ts";

/* ✅ TYPE ERROR */
type FormError = {
    username?: string;
    password?: string;
    confirm?: string;
};

const RegisterPane = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [error, setError] = useState<FormError>({});
    const [loading, setLoading] = useState(false);

    const validate = () => {
        const v1 = validator.validateUsername(username);
        const v2 = validator.validatePassword(password);
        const v3 = validator.validateConfirmPassword(password, confirm);

        setError({
            username: v1,
            password: v2,
            confirm: v3
        });

        return !(v1 || v2 || v3);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validate()) return;

        setLoading(true);
        authService
            .register({ user: username, pass: password })
            .then((message) =>
                enqueueSnackbar(message, { variant: "success" })
            )
            .then(() => navigate("/login"))
            .catch((err: SocketError) =>
                setError({ username: err.mes })
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
                <Grid2
                    container
                    sm={5}
                    alignItems="center"
                    alignContent="center"
                    spacing={1.5}
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
                            Sign Up
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

                    {/* CONFIRM */}
                    <Grid2 sm={12}>
                        <FormControl fullWidth error={Boolean(error.confirm)}>
                            <OutlinedInput
                                placeholder="Confirm password"
                                type="password"
                                value={confirm}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <AutorenewIcon />
                                    </InputAdornment>
                                }
                                onChange={(e) =>
                                    setConfirm(e.target.value)
                                }
                                onBlur={() =>
                                    setError((e) => ({
                                        ...e,
                                        confirm:
                                            validator.validateConfirmPassword(
                                                password,
                                                confirm
                                            )
                                    }))
                                }
                                onFocus={() =>
                                    setError((e) => ({
                                        ...e,
                                        confirm: undefined
                                    }))
                                }
                            />
                            <FormHelperText>
                                {error.confirm}
                            </FormHelperText>
                        </FormControl>
                    </Grid2>

                    <Grid2 sm={12}>
                        <FormControlLabel
                            control={<Checkbox defaultChecked />}
                            label="I agree to the Terms and Conditions"
                        />
                    </Grid2>

                    <Grid2 sm={12}>
                        <LoadingButton
                            fullWidth
                            variant="contained"
                            type="submit"
                            loading={loading}
                        >
                            Sign up
                        </LoadingButton>
                    </Grid2>

                    <Grid2 sm={12} textAlign="center">
                        <span>
                            Already have account?
                            <Link component={RouterLink} to="/login">
                                {" "}
                                Login
                            </Link>
                        </span>
                    </Grid2>
                </Grid2>

                <Grid2 sm={7}>
                    <img src="/img.png" style={{ maxWidth: "100%" }} />
                </Grid2>
            </Grid2>
        </Box>
    );
};

export default RegisterPane;
