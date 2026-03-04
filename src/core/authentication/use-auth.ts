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
    accessTokenVar(payload.access_token);
    refreshTokenVar(payload.refresh_token);
    currentUserVar(payload.user);

    router.push("/users");
  };

  const logout = () => {
    accessTokenVar(null);
    refreshTokenVar(null);
    currentUserVar(null);

    router.push("/auth/login");
  };

  return {
    currentUser,
    isAuthenticated: !!accessToken,
    handleAuthenticationSuccess,
    logout,
  };
}
