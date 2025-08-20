import * as React from "react";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import { FormCard } from "../components/FormCard";
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import Button from "../components/ui/Button";
import { useAuth } from "../hooks/useAuth";
import { IconButton, InputAdornment } from "@mui/material";
import ClosedEyeIcon from "../assets/ClosedEyeIcon";
import OpenEyeIcon from "../assets/OpenEyeIcon";

interface LoginFormProps {
    onForgotPassword: () => void;
}

export function LoginForm({ onForgotPassword }: LoginFormProps) {
    const [errors, setErrors] = React.useState({ email: "", password: "", login: "" });
    const [formData, setFormData] = React.useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const validate = (name: string, value: string) => {
        if (name === "email") {
            return !value.trim() ? "Email is required." :
                !/\S+@\S+\.\S+/.test(value) ? "Invalid email address." : "";
        }
        if (name === "password") {
            return !value.trim() ? "Password is required." :
                value.length < 8 ? "Password must be at least 8 characters." : "";
        }
        return "";
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: validate(name, value), login: "" }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const emailError = validate("email", formData.email);
        const passwordError = validate("password", formData.password);

        if (emailError || passwordError) {
            setErrors(prev => ({ ...prev, email: emailError, password: passwordError }));
            return;
        }
        setLoading(true);
        try {
            await login(formData.email, formData.password);
            navigate("/")
        } catch (error) {
            setErrors(prev => ({
                ...prev,
                login: typeof error === 'string' ? error : "Login failed. Invalid email or password."
            }));
        }
    };

    return (
        <FormCard variant="outlined">
            <Typography component="h1" variant="h4" sx={{ fontWeight: 600, textAlign: 'center' }}>
                Sign in
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {errors.login && <Alert severity="error">{errors.login}</Alert>}

                <TextField
                    error={!!errors.email}
                    helperText={errors.email}
                    name="email"
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={loading}
                    fullWidth
                    required
                    autoComplete="email"
                />

                <TextField
                    error={!!errors.password}
                    helperText={errors.password}
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    disabled={loading}
                    fullWidth
                    required
                    autoComplete="current-password"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(p => !p)} edge="end">
                                    {showPassword ? <OpenEyeIcon /> : <ClosedEyeIcon />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                <FormControlLabel
                    control={<Checkbox color="primary" />}
                    label="Remember me"
                    disabled={loading}
                />

                <Button type="submit" variant="primary" disabled={loading}>
                    {loading ? 'Signing in...' : 'Sign in'}
                </Button>

                <Link component="button" type="button" onClick={onForgotPassword} variant="body2" sx={{ alignSelf: 'center' }}>
                    Forgot your password?
                </Link>
            </Box>

            <Divider sx={{ my: 2 }}>or</Divider>

            <Typography variant="body2" sx={{ textAlign: 'center' }}>
                Don't have an account?{' '}
                <RouterLink to='/register' className="underline text-purple-500">
                    Sign up
                </RouterLink>
            </Typography>
        </FormCard>
    );
}