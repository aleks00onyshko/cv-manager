import { catchError, EMPTY, from, switchMap, tap } from "rxjs";
import { ErrorLink } from "@apollo/client/link/error";
import { ApolloLink, CombinedGraphQLErrors } from "@apollo/client";
import { UpdateTokenResult } from "cv-graphql";

import {
  accessTokenVar,
  refreshTokenVar,
  clearAuth,
} from "../../authentication";

const refreshAccessToken = async (): Promise<UpdateTokenResult | null> => {
  const refreshToken = refreshTokenVar();

  if (!refreshToken) return null;

  const response = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_URL!, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        mutation UpdateToken {
          updateToken {
            access_token
            refresh_token
          }
      }
  `,
    }),
  });

  const { data } = await response.json();

  return data?.refreshToken ?? null;
};

const handleUnauthorizedError = (
  operation: ApolloLink.Operation,
  forward: ApolloLink.ForwardFunction,
) => {
  return from(refreshAccessToken()).pipe(
    tap((result) => {
      if (result) {
        accessTokenVar(result.access_token);
        refreshTokenVar(result.refresh_token);
      }
    }),
    switchMap((result) => {
      if (!result) {
        clearAuth(() => (window.location.href = "/auth/login"));

        return EMPTY;
      }
      return forward(operation);
    }),
    catchError(() => {
      clearAuth(() => (window.location.href = "/auth/login"));

      return EMPTY;
    }),
  );
};

export const errorLink = new ErrorLink(({ error, operation, forward }) => {
  if (CombinedGraphQLErrors.is(error)) {
    for (const { message } of error.errors) {
      if (message === "Unauthorized") {
        return handleUnauthorizedError(operation, forward);
      }
    }
  }

  console.error("[Network error]:", error);
});
