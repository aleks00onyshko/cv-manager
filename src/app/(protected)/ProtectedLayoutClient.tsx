'use client';

import { useEffect } from 'react';
import { Box } from '@mui/material';
import type { User } from 'cv-graphql';
import type { ReactNode } from 'react';
import { initializeClientState} from '@core/authentication';
import {ConfiguredNavigation} from "@widgets/navigation";

interface ProtectedLayoutClientProps {
    children: ReactNode;
    user: User;
}

export function ProtectedLayoutClient({ children, user }: ProtectedLayoutClientProps) {
    useEffect(() => {
        initializeClientState(user);
    }, [user]);

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <ConfiguredNavigation user={user}/>
            <Box component="main" sx={{ flex: 1, p: 3 }}>
                {children}
            </Box>
        </Box>
    );
}