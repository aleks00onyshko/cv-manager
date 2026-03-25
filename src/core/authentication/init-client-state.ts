import {accessTokenVar, currentUserVar, refreshTokenVar} from "./authentication.vars";
import {User} from "cv-graphql";

export function initializeClientState(user: User | null) {
  const getCookie = (key: string) =>
      document.cookie.split('; ').find(row => row.startsWith(`${key}=`))?.split('=')[1] ?? null;

  if (getCookie('access_token')) accessTokenVar(getCookie('access_token'));
  if (getCookie('refresh_token')) refreshTokenVar(getCookie('refresh_token'));
  if (user) currentUserVar(user);
}