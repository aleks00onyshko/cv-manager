import type { ReactNode } from 'react';
import { getServerUser } from '@core/authentication/get-server-user';
import { ProtectedLayoutClient } from './ProtectedLayoutClient';
import {redirect} from "next/navigation";
import {ROUTES} from "@core/config";

export default async function ProtectedLayout({ children }: { children: ReactNode }) {
    const user = await getServerUser();

    if (!user) {
        redirect(ROUTES.authentication.login);
    }

    return (
        <ProtectedLayoutClient user={user}>
            {children}
        </ProtectedLayoutClient>
    );
}