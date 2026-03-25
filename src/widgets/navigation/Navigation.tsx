'use client';

import { Box } from '@mui/material';
import type { ReactNode } from 'react';
import { NavigationItem } from './NavigationItem';
import { NavigationUserLogo } from './NavigationUserLogo';

interface NavigationProps {
    children: ReactNode;
}

function Navigation({ children }: NavigationProps) {
    return (
        <Box
            component="aside"
            sx={{
                backgroundColor: 'background.paper',
                width: { xs: '100%', lg: '12.5rem' },
                minHeight: { xs: 'auto', lg: '100vh' },
                flexDirection: { xs: 'row', lg: 'column' },
                position: { xs: 'fixed', lg: 'relative' },
                bottom: { xs: 0, lg: 'auto' },
                left: { xs: 0, lg: 'auto' },
                right: { xs: 0, lg: 'auto' },
                zIndex: { xs: 100, lg: 'auto' },
                display: 'flex',
                flexShrink: 0,
            }}
        >
            {children}
        </Box>
    );
}

Navigation.Item = NavigationItem;
Navigation.UserLogo = NavigationUserLogo;

export { Navigation };