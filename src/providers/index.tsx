"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { apolloClient } from "@core/apollo";
import { theme } from "@core/config";
import { useAppInit } from "@core/authentication";
import { ApolloProvider } from "@apollo/client/react";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  useAppInit();

  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
