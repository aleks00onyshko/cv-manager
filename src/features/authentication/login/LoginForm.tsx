'use client';

import type { AuthResult } from 'cv-graphql';
import { useAuth } from '@core/authentication';
import { AuthForm } from '../ui/AuthForm';
import type { AuthFormValues } from '../ui/AuthForm';
import { LOGIN_QUERY } from './login.query';
import {useLazyQuery} from "@apollo/client/react";

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
            submitLabel="LOG IN"
            loading={loading}
            error={error?.message}
            onSubmit={onSubmit}
        />
    );
}