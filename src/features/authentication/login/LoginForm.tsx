'use client';

import type { AuthResult } from 'cv-graphql';
import { useAuth } from '@core/authentication';
import { AuthForm } from '../ui/AuthForm';
import type { AuthFormValues } from '../ui/AuthForm';
import { LOGIN_QUERY } from './login.query';
import {useLazyQuery} from "@apollo/client/react";
import { Link } from '@mui/material';
import NextLink from "next/link";
import { ROUTES } from "@core/config";

export function LoginForm() {
    const { handleAuthenticationSuccess } = useAuth();

    const [login, { loading, error }] = useLazyQuery<{ login: AuthResult }>(LOGIN_QUERY);

    const onSubmit = (values: AuthFormValues) => {
        login({ variables: { auth: values } }).then(({ data }) => {
            if (data) handleAuthenticationSuccess(data.login);
        });
    };

    return (
        <AuthForm
            title="Welcome back"
            subtitle="Heppy to see you. Login, to continue"
            submitLabel="LOG IN"
            loading={loading}
            error={error?.message}
            onSubmit={onSubmit}
            slots={{
                belowButton: (
                    <Link
                        component={NextLink}
                        href={ROUTES.authentication.forgotPassword}
                        color="text.secondary"
                        variant="button"
                        underline="none"
                    >
                        Forgot password
                    </Link>
                ),
            }}
        />
    );
}