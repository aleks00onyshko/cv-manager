'use client';

import {Icon, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {NavItem} from "./config/config";

export interface NavigationItemProps extends NavItem {
    isActive: boolean;
}

export function NavigationItem({ navigatePath, isActive, icon: Icon, label }: NavigationItemProps) {
    return (
        <ListItemButton
            key={navigatePath}
            href={navigatePath}
            selected={isActive}
            sx={{
                height: '3.5rem',
                borderTopRightRadius: { xs: 0, lg: '12.5rem' },
                borderBottomRightRadius: { xs: 0, lg: '12.5rem' },
                flexDirection: { xs: 'column', lg: 'row' },
                justifyContent: { xs: 'center', lg: 'flex-start' },
                mb: { xs: 0, lg: 1 },
                '&.Mui-selected': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                },
            }}
        >
            <ListItemIcon sx={{minWidth: { xs: 'auto', lg: 40 }, justifyContent: 'center'}}>
                <Icon />
            </ListItemIcon>
            <ListItemText
                primary={label}
                slotProps={{
                    primary: {
                        sx: {
                            fontSize: { xs: '0.75rem', lg: '1rem' },
                            fontWeight: 400,
                            letterSpacing: '0.15px',
                            textAlign: { xs: 'center', lg: 'left' },
                        },
                    },
                }}
            />
        </ListItemButton>
    )
}