import * as React from 'react';
import {
    TextField,
    CircularProgress,
    Alert,
    Divider,
    Typography,
    Box,
} from '@mui/material';
import { Button } from '../components/Button';
import { FormCard } from '../components/FormCard';
import { Link as RouterLink } from 'react-router-dom';

interface SignUpFormProps {
    onSuccess?: () => void;
}

export default function SignUpForm({ onSuccess }: SignUpFormProps) {
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = React.useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Valid email is required';
        }
        if (formData.password.length < 8) newErrors.password = 'Password must be 8+ characters';
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords must match';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            setSuccess(true);
            onSuccess?.();
        } finally {
            setIsLoading(false);
        }
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
                Create Account
            </Typography>

            {success ? (
                <Alert severity="success">
                    Account created successfully!
                </Alert>
            ) : (
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                >
                    <TextField
                        fullWidth
                        label="Full Name"
                        name="name"
                        autoComplete="name"
                        variant="outlined"
                        value={formData.name}
                        onChange={handleChange}
                        error={!!errors.name}
                        helperText={errors.name}
                        required
                    />
                    
                    <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        name="email"
                        autoComplete="email"
                        variant="outlined"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        error={!!errors.email}
                        helperText={errors.email}
                        required
                    />
                    
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        name="password"
                        autoComplete="new-password"
                        variant="outlined"
                        placeholder="••••••"
                        value={formData.password}
                        onChange={handleChange}
                        error={!!errors.password}
                        helperText={errors.password}
                        required
                    />
                    
                    <TextField
                        fullWidth
                        label="Confirm Password"
                        type="password"
                        name="confirmPassword"
                        autoComplete="new-password"
                        variant="outlined"
                        placeholder="••••••"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword}
                        required
                    />

                    <Button
                        type="submit"
                        buttonVariant="primary"
                        disabled={isLoading}
                    >
                        {isLoading ? <CircularProgress size={24} /> : 'Sign Up'}
                    </Button>
                </Box>
            )}

            <Divider sx={{ my: 2 }}>or</Divider>

            <Typography variant="body2" sx={{ textAlign: 'center', mt: 1 }}>
                Already have an account?{' '}
                <RouterLink to='/login' className="underline text-purple-500">
                    Sign in
                </RouterLink>
            </Typography>
        </FormCard>
    );
}