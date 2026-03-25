import { useReactiveVar } from "@apollo/client/react";
import { AuthResult } from "cv-graphql";
import { useRouter } from "next/navigation";

import {
  accessTokenVar,
  currentUserVar,
  refreshTokenVar,
} from "./authentication.vars";

export function useAuth() {
  const currentUser = useReactiveVar(currentUserVar);
  const accessToken = useReactiveVar(accessTokenVar);
  const router = useRouter();

  const handleAuthenticationSuccess = (payload: AuthResult) => {
    document.cookie = `access_token=${payload.access_token}; path=/; SameSite=Strict`;
    document.cookie = `refresh_token=${payload.refresh_token}; path=/; SameSite=Strict`;
    document.cookie = `user_id=${payload.user.id}; path=/; SameSite=Strict`;

    accessTokenVar(payload.access_token);
    refreshTokenVar(payload.refresh_token);
    currentUserVar(payload.user);

    router.push("/users");
  };

  const logout = () => {
    accessTokenVar(null);
    refreshTokenVar(null);
    currentUserVar(null);

    router.push("/authentication/login");
  };

  return {
    currentUser,
    isAuthenticated: !!accessToken,
    handleAuthenticationSuccess,
    logout,
  };
}
