"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { apolloClient } from "@core/apollo";
import { darkTheme, lightTheme, themeVar } from "@core/config";
import { ApolloProvider, useReactiveVar } from "@apollo/client/react";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const currentTheme = useReactiveVar(themeVar);

  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={currentTheme === 'dark' ? darkTheme : lightTheme}>
        <CssBaseline />
        <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
