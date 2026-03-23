'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@apollo/client/react';
import { Box, Button, TextField, Typography, Link } from '@mui/material';
import NextLink from 'next/link';
import { ROUTES } from '@core/config';
import { FORGOT_PASSWORD_MUTATION } from './forgot-password.mutation';
import {useRouter} from "next/navigation";

const forgotPasswordSchema = z.object({
    email: z.email('Invalid email'),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordForm() {
    const router = useRouter();

    const { register, handleSubmit, formState: { errors, isValid, touchedFields } } = useForm<ForgotPasswordFormValues>({
        resolver: zodResolver(forgotPasswordSchema),
        mode: 'all',
    });

    const [forgotPassword, { loading, error, called }] = useMutation(FORGOT_PASSWORD_MUTATION);

    const onSubmit = (values: ForgotPasswordFormValues) => {
        forgotPassword({ variables: { auth: { email: values.email } } }).then(() =>
            router.push(ROUTES.authentication.login)
        );
    };

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
                maxWidth: { xs: '100%', sm: '35rem' },
            }}
        >
            <Typography variant="h4" textAlign="center">
                Forgot password
            </Typography>

            <Typography variant="subtitle1" textAlign="center" color="text.secondary" mb={2}>
                We will send you an email with further instructions
            </Typography>

            <TextField
                placeholder="Email"
                fullWidth
                {...register('email')}
                error={touchedFields.email && !!errors.email}
                helperText={touchedFields.email && errors.email?.message}
            />

            {error && (
                <Typography color="error" variant="body2">
                    {error.message}
                </Typography>
            )}

            {called && !error && (
                <Typography color="success.main" variant="body2">
                    Check your email for further instructions
                </Typography>
            )}

            <Button
                type="submit"
                variant="contained"
                loading={loading}
                disabled={!isValid}
                sx={{ mt: 2 }}
            >
                Reset password
            </Button>

            <Link
                component={NextLink}
                href={ROUTES.authentication.login}
                color="text.secondary"
                underline="none"
                sx={{ fontSize: '0.875rem', fontWeight: 500, letterSpacing: '0.4px' }}
            >
                CANCEL
            </Link>
        </Box>
    );
}