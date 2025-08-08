import * as React from "react";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { FormCard } from "../components/FormCard";
import { Button } from "../components/Button";
import {Link as RouterLink} from 'react-router-dom'

interface LoginFormProps {
    onForgotPassword: () => void;
    onSubmit?: (email: string, password: string) => void;
}


export function LoginForm({ onForgotPassword }: LoginFormProps) {
    const [emailError, setEmailError] = React.useState("");
    const [passwordError, setPasswordError] = React.useState("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (emailError || passwordError) return;

        const formData = new FormData(event.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        console.log({ email, password });
        // onSubmit?.(email, password);
    };

    const validateEmail = (email: string) => {
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            setEmailError("Please enter a valid email address.");
            return false;
        }
        setEmailError("");
        return true;
    };

    const validatePassword = (password: string) => {
        if (!password || password.length < 8) {
            setPasswordError("Password must be at least 8 characters long.");
            return false;
        }
        setPasswordError("");
        return true;
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "email") validateEmail(value);
        if (name === "password") validatePassword(value);
    };

    return (
        <FormCard variant="outlined">
            <Typography
                component="h1"
                variant="h4"
                sx={{
                    fontWeight: 600,
                    textAlign: 'center',
                    color: 'text.primary'
                }}
            >
                Sign in
            </Typography>

            <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >
                <TextField
                    error={!!emailError}
                    helperText={emailError}
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="your@email.com"
                    variant="outlined"
                    fullWidth
                    required
                    onBlur={handleBlur}
                    autoComplete="email"
                />

                <TextField
                    error={!!passwordError}
                    helperText={passwordError}
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="••••••"
                    variant="outlined"
                    fullWidth
                    required
                    onBlur={handleBlur}
                    autoComplete="password"
                />

                <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                    sx={{ alignSelf: 'flex-start' }}
                />

                <Button
                    type="submit"
                    buttonVariant="primary"
                >
                    Sign in
                </Button>

                <Link
                    component="button"
                    type="button"
                    onClick={onForgotPassword}
                    variant="body2"
                    sx={{ alignSelf: 'center', mt: 1 }}
                >
                    Forgot your password?
                </Link>
            </Box>

            <Divider sx={{ my: 2 }}>or</Divider>

            <Typography variant="body2" sx={{ textAlign: 'center', mt: 1 }}>
                Don't have an account?{' '}
                <RouterLink to='/register' className="underline text-purple-500">
                    Sign up
                </RouterLink>
            </Typography>
        </FormCard>
    );
}