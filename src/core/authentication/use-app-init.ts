import { useEffect } from "react";

import { accessTokenVar, refreshTokenVar } from "./authentication.vars";

export function useAppInit() {
  useEffect(() => {
    const getCookie = (key: string): string | null => {
      return (
        document.cookie
          .split("; ")
          .find((row) => row.startsWith(`${key}=`))
          ?.split("=")[1] ?? null
      );
    };

    const accessToken = getCookie("access_token");
    const refreshToken = getCookie("refresh_token");

    if (accessToken) accessTokenVar(accessToken);
    if (refreshToken) refreshTokenVar(refreshToken);
  }, []);
}
