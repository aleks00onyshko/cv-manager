import { SetContextLink } from "@apollo/client/link/context";
import { accessTokenVar } from "@/src/core/authentication";

export const authLink = new SetContextLink((prevContext) => {
  const token = accessTokenVar();
  const prevHeaders = (prevContext as Record<string, any>).headers ?? {};

  return {
    headers: {
      ...prevHeaders,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };
});
