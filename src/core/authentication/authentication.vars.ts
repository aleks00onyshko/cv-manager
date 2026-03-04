import { makeVar } from "@apollo/client";

import { User } from "cv-graphql";

export const accessTokenVar = makeVar<string | null>(null);
export const refreshTokenVar = makeVar<string | null>(null);
export const currentUserVar = makeVar<User | null>(null);

export const clearAuth = (postAction: () => void) => {
  accessTokenVar(null);
  refreshTokenVar(null);
  currentUserVar(null);

  postAction();
};
