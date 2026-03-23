import type { ReactNode } from 'react';
import { Box } from '@mui/material';

export default function AuthWithoutTabsLayout({ children }: { children: ReactNode }) {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                px: 2,
            }}
        >
            {children}
        </Box>
    );
}