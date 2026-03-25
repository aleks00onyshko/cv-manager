'use client';

import { usePathname } from 'next/navigation';
import { Box, List } from '@mui/material';
import { useAuth } from '@core/authentication';
import { Navigation } from './Navigation';
import { NAV_ITEMS } from './config/config';
import {User} from "cv-graphql";

export interface ConfiguredNavigationProps {
    user: User;
}

export function ConfiguredNavigation({ user }: ConfiguredNavigationProps) {
    const { logout } = useAuth();
    const pathname = usePathname();

    return (
        <Navigation>
            <List
                disablePadding
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: { xs: 'row', lg: 'column' },
                    width: '100%',
                    pt: { lg: 2 },
                    justifyContent: {
                        xs: 'space-evenly',
                        lg: 'initial'
                    }
                }}
            >
                {NAV_ITEMS.map(({ label, icon, navigatePath }) => (
                    <Box key={navigatePath} sx={{ height: { xs: 'auto', lg: '3.5rem' } }}>
                        <Navigation.Item
                            label={label}
                            icon={icon}
                            navigatePath={navigatePath}
                            isActive={pathname.startsWith(navigatePath)}
                        />
                    </Box>
                ))}
            </List>

            <Box
                sx={{
                    p: 2,
                    display: { xs: 'none', lg: 'flex' },
                    alignItems: 'center',
                    gap: 1,
                    mt: 'auto',
                }}
            >
                <Navigation.UserLogo user={user} />
            </Box>
        </Navigation>
    );
}