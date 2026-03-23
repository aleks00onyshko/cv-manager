'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Box, Button, TextField, Typography, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {ReactNode, useState} from "react";

const authSchema = z.object({
    email: z.email('Invalid email'),
    password: z.string().min(6, 'Password must have at least 6 characters'),
});

export type AuthFormValues = z.infer<typeof authSchema>;

interface AuthFormProps {
    title: string;
    subtitle: string;
    submitLabel: string;
    loading: boolean;
    error?: string;
    onSubmit: (values: AuthFormValues) => void;
    slots?: {
        belowButton?: ReactNode
    }
}

export function AuthForm({
                             title,
                             subtitle,
                             submitLabel,
                             loading,
                             error,
                             onSubmit,
                             slots: { belowButton } = {},
                         }: AuthFormProps) {
    const { register, handleSubmit, formState: { errors, isValid, touchedFields } } = useForm<AuthFormValues>({
        resolver: zodResolver(authSchema),
        mode: 'all',
    });
    const [showPassword, setShowPassword] = useState(true)

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                width: '100%',
                maxWidth: '35rem',
                px: { xs: 2, sm: 0 },
            }}
        >
            <Typography variant="h4" textAlign="center">
                {title}
            </Typography>

            <Typography
                variant="subtitle1"
                textAlign="center"
                mb={2}
            >
                {subtitle}
            </Typography>

            <TextField
                placeholder="Email"
                fullWidth
                {...register('email')}
                error={touchedFields.email && !!errors.email}
                helperText={touchedFields.email && errors.email?.message}
            />

            <TextField
                placeholder="Password"
                fullWidth
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                error={touchedFields.password && !!errors.password}
                helperText={touchedFields.password && errors.password?.message}
                slotProps={{
                    input: {
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowPassword(prev => !prev)}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    },
                }}
            />

            {error && (
                <Typography color="error" variant="body2">
                    {error}
                </Typography>
            )}

            <Button
                type="submit"
                variant="contained"
                loading={loading}
                disabled={!isValid}
                sx={{ mt: 2 }}
            >
                {submitLabel}
            </Button>

            {belowButton}
        </Box>
    );
}