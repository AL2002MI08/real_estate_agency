import * as React from 'react';
import { TextField, Alert, Divider, Typography, Box } from '@mui/material';
import { FormCard } from '../components/FormCard';
import { Link as RouterLink } from 'react-router-dom';
import Button from '../components/ui/Button';
import { useRegister } from '../hooks/useRegister';

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
    const [fieldErrors, setFieldErrors] = React.useState<Record<string, string>>({});
    const [apiError, setApiError] = React.useState('');
    const { loading, register } = useRegister();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (fieldErrors[name]) setFieldErrors(prev => ({ ...prev, [name]: '' }));
        if (apiError) setApiError('');
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Valid email is required';
        }
        if (formData.password.length < 8) newErrors.password = 'Password must be 8+ characters';
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords must match';
        }
        setFieldErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setApiError(''); 
        
        if (!validate()) return;

        try {
            await register(formData.name, formData.email, formData.password, formData.confirmPassword);
            onSuccess?.();
        } catch (error) {
            setApiError(typeof error === 'string' ? error : 'Registration failed');
        }
    };

    return (
        <FormCard variant="outlined">
            <Typography component="h1" variant="h4" sx={{ fontWeight: 600, textAlign: 'center' }}>
                Create Account
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {apiError && <Alert severity="error">{apiError}</Alert>}

                <TextField
                    fullWidth
                    label="Full Name"
                    name="name"
                    type='text'
                    value={formData.name}
                    onChange={handleChange}
                    error={!!fieldErrors.name}
                    helperText={fieldErrors.name}
                    disabled={loading}
                    required
                />

                <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={!!fieldErrors.email}
                    helperText={fieldErrors.email}
                    disabled={loading}
                    required
                />

                <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    error={!!fieldErrors.password}
                    helperText={fieldErrors.password}
                    disabled={loading}
                    required
                />

                <TextField
                    fullWidth
                    label="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={!!fieldErrors.confirmPassword}
                    helperText={fieldErrors.confirmPassword}
                    disabled={loading}
                    required
                />

                <Button type="submit" variant="primary" disabled={loading}>
                    {loading ? 'Creating Account...' : 'Sign Up'}
                </Button>
            </Box>

            <Divider sx={{ my: 2 }}>or</Divider>

            <Typography variant="body2" sx={{ textAlign: 'center' }}>
                Already have an account?{' '}
                <RouterLink to='/login' className="underline text-purple-500">
                    Sign in
                </RouterLink>
            </Typography>
        </FormCard>
    );
}