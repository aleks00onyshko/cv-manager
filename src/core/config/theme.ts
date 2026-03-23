import { createTheme, type ThemeOptions } from '@mui/material/styles';
import { makeVar } from '@apollo/client';

const sharedTokens: ThemeOptions = {
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h4: {
      fontWeight: 400,
      fontSize: '2.125rem',
      lineHeight: 1.235,
      letterSpacing: '0.25px',
    },
    button: {
      fontWeight: 500,
      fontSize: '0.875rem',
      lineHeight: 1.75,
      letterSpacing: '0.4px',
      textTransform: 'uppercase',
    },
    subtitle1: {
      fontWeight: 400,
      fontSize: '1rem',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 768,
      md: 1024,
      lg: 1440,
      xl: 1920,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '2.5rem',
          height: '3rem',
          width: '13.75rem',
          color: '#FFFFFF',
          boxShadow: '0px 1px 5px rgba(0,0,0,0.12), 0px 2px 2px rgba(0,0,0,0.14)',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          height: '3rem',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          width: '9.375rem',
          height: '3rem',
          fontWeight: 500,
          fontSize: '0.875rem',
          letterSpacing: '0.4px',
          textTransform: 'uppercase',
          lineHeight: '1.094rem',
          minWidth: '9.375rem',
          minHeight: '3rem',
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: '#C63031',
          height: '0.125rem',
        },
      },
    },
  },
};

export const darkTheme = createTheme({
  ...sharedTokens,
  palette: {
    mode: 'dark',
    primary: {
      main: '#C63031',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#121212',
      paper: '#353535',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#767676',
    },
    divider: 'rgba(255, 255, 255, 0.23)',
  },
});

export const lightTheme = createTheme({
  ...sharedTokens,
  palette: {
    mode: 'light',
    primary: {
      main: '#C63031',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#FFFFFF',
      paper: '#F5F5F7',
    },
    text: {
      primary: '#2E2E2E',
      secondary: '#767676',
    },
    divider: 'rgba(0, 0, 0, 0.23)',
  },
});

export const themeVar = makeVar<'light' | 'dark'>('dark');