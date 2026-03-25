import {Avatar, Typography} from "@mui/material";
import {User} from "cv-graphql";

export interface NavigationUserLogoProps {
    user: User;
}

export function NavigationUserLogo({ user }: NavigationUserLogoProps) {
    return (
        <>
            <Avatar
                src={user.profile?.avatar ?? undefined}
                sx={{ bgcolor: 'primary.main', width: '2rem', height: '2rem'}}
            >
                {user.email[0].toUpperCase()}
            </Avatar>
            <Typography variant="body2" noWrap>
                {user.profile?.full_name ?? user.email}
            </Typography>
        </>
    )
}