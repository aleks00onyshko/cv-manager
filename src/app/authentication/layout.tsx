import type { ReactNode } from 'react';
import { Box } from '@mui/material';

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Box sx={{ width: '100%', maxWidth: 420, p: 4 }}>
                {children}
            </Box>
        </Box>
    );
}