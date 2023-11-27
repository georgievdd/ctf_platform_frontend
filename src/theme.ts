import { createContext, useState, useMemo } from 'react'
import { createTheme } from '@mui/material'
import { useTheme as useMUITheme } from '@mui/material'
import { THEME } from './consts'

export const tokens = (mode: string) => ({
    ...(mode === 'dark'
        ? {
              primary: {
                DEFAULT: '#001A13',
                50: '#002A1F',
                100: '#004836',
                200: '#00674E',
                300: '#008567',
                400: '#00A480',
                500: '#00D7AA',
                600: '#0BFFCE',
                700: '#3EFFDA',
                800: '#71FFE6',
                900: '#8BFFEB',
                950: '#00A480',
              },
              secondary: {
                DEFAULT: '#1C0451',
                50: '#25066C',
                100: '#3709A1',
                200: '#4A0CD6',
                300: '#6527F3',
                400: '#8B5CF6',
                500: '#996FF7',
                600: '#A783F8',
                700: '#B496F9',
                800: '#C2A9FA',
                900: '#C9B3FB',
                950: '#8B5CF6',
              },
              black: {
                DEFAULT: '#000000',
                100: '#525252',
                200: '#3D3D3D',
                300: '#292929',
                400: '#141414',
                500: '#000000',
                600: '#000000',
                700: '#000000',
                800: '#000000',
                900: '#000000',
            },
            gray: {
              DEFAULT: '#3C3C3C',
              100: '#646C6C',
            },
            white: {
              DEFAULT: '#FFFFFF',
            },
            accentMain: '#0F0E0E',
            borderColor: '#3C3C3C',
            blue: '#1900D5',
            highligh: '#DD1313',
          }
        : {
            primary: {
                DEFAULT: '#00A480',
                50: '#5DFFDB',
                100: '#48FFD7',
                200: '#1FFFCE',
                300: '#00F6C0',
                400: '#00CDA0',
                500: '#00A480',
                600: '#006C54',
                700: '#003428',
                800: '#000000',
                900: '#000000',
                950: '#000000'
              },
            secondary: {
                DEFAULT: '#8B5CF6',
                50: '#C9B3FB',
                100: '#C2A9FA',
                200: '#B496F9',
                300: '#A783F8',
                400: '#996FF7',
                500: '#8B5CF6',
                600: '#6527F3',
                700: '#4A0CD6',
                800: '#3709A1',
                900: '#25066C',
                950: '#1C0451',
              },
              black: {
                  DEFAULT: '#000000',
                  100: '#525252',
                  200: '#3D3D3D',
                  300: '#292929',
                  400: '#141414',
                  500: '#000000',
                  600: '#000000',
                  700: '#000000',
                  800: '#000000',
                  900: '#000000',
              },
              gray: {
                DEFAULT: '#3C3C3C',
                100: '#646C6C',
              },
              white: {
                DEFAULT: '#FFFFFF',
              },
              accentMain: '#F7F7F7',
              borderColor: '#D1D1D1',
              blue: '#1900D5',
              highligh: '#DD1313',
          }),
})

export const themeSettings: any = (mode: string) => {
    const colors = tokens(mode)
    return {
        palette: {
            mode: mode,
            ...(mode === 'dark'
                ? {
                      primary: {
                          main: colors.primary.DEFAULT,
                      },
                      secondary: {
                          main: colors.secondary.DEFAULT,
                      },
                      neutral: {
                          dark: colors.black[500],
                          light: colors.white.DEFAULT,
                      },
                  }
                : {
                      primary: {
                          main: colors.primary.DEFAULT,
                      },
                      secondary: {
                          main: colors.secondary.DEFAULT,
                      },
                      neutral: {
                          dark: colors.black[500],
                          light: colors.white.DEFAULT,
                      },
                  }),
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
  const colors = tokens(theme.palette.mode);
  return {
    theme,
    colors,
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