'use client';

import { useMutation } from '@apollo/client/react';
import type { AuthResult } from 'cv-graphql';
import { useAuth } from '@core/authentication';
import { AuthForm } from '../ui/AuthForm';
import type { AuthFormValues } from '../ui/AuthForm';
import { SIGNUP_MUTATION } from './signup.mutation';
import { Link } from '@mui/material';
import NextLink from "next/link";
import {ROUTES} from "@core/config";

export function SignupForm() {
    const { handleAuthenticationSuccess } = useAuth();

    const [signup, { loading, error }] = useMutation<{ signup: AuthResult }>(SIGNUP_MUTATION);

    const onSubmit = (values: AuthFormValues) => {
        signup({ variables: { auth: values } }).then(({ data }) => {
            if (data) handleAuthenticationSuccess(data.signup);
        })
    };

    return (
        <AuthForm
            title="Create account"
            subtitle="Heppy to see you. Create account, to continue"
            submitLabel="SIGN UP"
            loading={loading}
            error={error?.message}
            onSubmit={onSubmit}
            slots={{
                belowButton: (
                    <Link
                        component={NextLink}
                        href={ROUTES.authentication.login}
                        color="text.secondary"
                        variant="button"
                        underline="none"
                    >
                        I have an account
                    </Link>
                ),
            }}
        />
    );
}