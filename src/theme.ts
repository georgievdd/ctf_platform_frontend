import { createContext, useState, useMemo } from 'react'
import { createTheme } from '@mui/material'
import { useTheme as useMUITheme } from '@mui/material'
import { THEME } from './consts'

export const themeSettings: any = (mode: string) => {
    return {
        palette: {
            mode: mode,
        },
        typography: {
            fontFamily: [
                'Montserrat', 
                'sans-serif',
              ].join(','),
            fontSize: 14,
            h1: {
                fontFamily: [
                    'Montserrat', 
                    'sans-serif',
                  ].join(','),
                fontSize: 40,
                fontWeight: 600,
            },
            h2: {
                fontFamily: [
                    'Montserrat', 
                    'sans-serif',
                  ].join(','),
                fontSize: 35,
                fontWeight: 600,
            },
            h3: {
                fontFamily: [
                    'Montserrat', 
                    'sans-serif',
                  ].join(','),
                fontSize: 30,
                fontWeight: 500,
            },
            h4: {
                fontFamily: [
                    'Montserrat', 
                    'sans-serif',
                  ].join(','),
                fontSize: 25,
                fontWeight: 500,
            },
            h5: {
                fontFamily: [
                    'Montserrat', 
                    'sans-serif',
                  ].join(','),
                fontSize: 25,
                fontWeight: 600,
            },
            h6: {
                fontFamily: [
                    'Montserrat', 
                    'sans-serif', 
                  ].join(','),
                fontSize: 15,
                fontWeight: 600,
            },
            p: {
                fontFamily: [
                    'Montserrat', 
                    'sans-serif',
                  ].join(','),
                fontSize: 20,
            },
        },
    }
}

export const useTheme = () => {
  const theme = useMUITheme();
  return {
    theme,
  }
}

export const ColorModeContext = createContext<{ toggleColorMode: () => void }>({
    toggleColorMode: () => {},
});

export const useMode = () => {
    const [mode, setMode] = useState(localStorage.getItem("theme") || 'light');

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () =>
                setMode((prev) => {
                    localStorage.setItem("theme", prev === THEME.LIGHT ? THEME.DARK : THEME.LIGHT);
                    return(prev === THEME.LIGHT ? THEME.DARK : THEME.LIGHT);
                }),
        }),
        [],
    );

    const theme: any = useMemo(() => createTheme(themeSettings(mode)), [mode]);

    return [theme, colorMode];
}