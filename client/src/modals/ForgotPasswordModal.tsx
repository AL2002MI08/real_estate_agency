import * as React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,

    CircularProgress,
    Alert,
    Typography
} from '@mui/material';
import { Button } from '../components/Button'

interface ForgotPasswordProps {
    open: boolean;
    handleClose: () => void;
}

export default function ForgotPassword({ open, handleClose }: ForgotPasswordProps) {
    const [email, setEmail] = React.useState('');
    const [emailError, setEmailError] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            setEmailError('Please enter a valid email address');
            setIsLoading(false);
            return;
        }

        setTimeout(() => {
            console.log('Password reset requested for:', email);
            setIsLoading(false);
            setSuccess(true);
            setTimeout(() => {
                handleClose();
                setSuccess(false);
                setEmail('');
            }, 2000);
        }, 1500);
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
            <DialogTitle>Reset your password</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    {success ? (
                        <Alert severity="success">
                            Password reset link sent to your email!
                        </Alert>
                    ) : (
                        <>
                            <Typography variant="body2" gutterBottom>
                                Enter your email and we'll send you a link to reset your password.
                            </Typography>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Email Address"
                                type="email"
                                fullWidth
                                variant="outlined"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setEmailError('');
                                }}
                                error={!!emailError}
                                helperText={emailError}
                                disabled={isLoading}
                            />
                        </>
                    )}
                </DialogContent>
                <DialogActions sx={{ p: 3, pt: 0 }}>
                    <Button onClick={handleClose} disabled={isLoading}>
                        Cancel
                    </Button>
                    {!success && (
                        <Button

                            buttonVariant="primary"
                            disabled={isLoading || !email}
                        >
                            {isLoading ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : (
                                'Send Reset Link'
                            )}
                        </Button>
                    )}
                </DialogActions>
            </form>
        </Dialog>
    );
}