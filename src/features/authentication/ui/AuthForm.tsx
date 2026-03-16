'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Box, Button, TextField, Typography } from '@mui/material';

const authSchema = z.object({
    email: z.email('Invalid email'),
    password: z.string().min(6, 'Password must have at least 6 characters'),
});

export type AuthFormValues = z.infer<typeof authSchema>;

interface AuthFormProps {
    title: string;
    submitLabel: string;
    loading: boolean;
    error?: string;
    onSubmit: (values: AuthFormValues) => void;
}

export function AuthForm({ title, submitLabel, loading, error, onSubmit }: AuthFormProps) {
    const { register, handleSubmit, formState: { errors, isValid, touchedFields } } = useForm<AuthFormValues>({
        resolver: zodResolver(authSchema),
        mode: 'all',
    });

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
            <Typography variant="h5">{title}</Typography>

            <TextField
                label="Email"
                {...register('email')}
                error={touchedFields.email && !!errors.email}
                helperText={touchedFields.email && errors.email?.message}
            />

            <TextField
                label="Password"
                type="password"
                {...register('password')}
                error={touchedFields.password && !!errors.password}
                helperText={touchedFields.password && errors.password?.message}
            />

            {error && (
                <Typography color="error">{error}</Typography>
            )}

            <Button
                type="submit"
                variant="contained"
                loading={loading}
                disabled={!isValid}
            >
                {submitLabel}
            </Button>
        </Box>
    );
}