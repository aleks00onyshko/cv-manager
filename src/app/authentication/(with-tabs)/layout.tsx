'use client';

import type { ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Box, Tabs, Tab } from '@mui/material';
import { ROUTES } from '@core/config';

export default function AuthLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();

    const activeTab = pathname.includes('signup') ? 1 : 0;

    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center' }}>
            <Box>
                <Tabs
                    value={activeTab}
                    onChange={(_, value) =>
                        router.push(value === 0 ? ROUTES.authentication.login : ROUTES.authentication.signup)
                    }
                    centered
                >
                    <Tab label="LOG IN" />
                    <Tab label="SIGN UP" />
                </Tabs>
            </Box>

            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    px: 2,
                    width: 'min(35rem, 100%)',
                }}
            >
                {children}
            </Box>
        </Box>
    );
}