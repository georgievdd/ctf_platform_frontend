import { createContext, useState, useMemo } from 'react'
import { createTheme } from '@mui/material'
import { useTheme as useMUITheme } from '@mui/material'
import { THEME } from './consts'

export const tokens = (mode: string) => ({
    ...(mode === 'dark'
        ? {
              primary: {
                DEFAULT: '#1C2025',
                50: '#6B7A8E',
                100: '#627082',
                200: '#515C6B',
                300: '#3F4853',
                400: '#2E343C',
                500: '#1C2025',
                600: '#1A1D22',
                700: '#181B1F',
                800: '#15181C',
                900: '#131619',
                950: '#121518'
              },
              secondary:{
                DEFAULT: '#32363D',
                50: '#000000',
                100: '#191B1E',
                200: '#32363D',
                300: '#4B525C',
                400: '#646D7B',
                500: '#778191',
                600: '#8E96A3',
                700: '#A4ABB5',
                800: '#BBC0C7',
                900: '#C6CAD1',
                950: '#646D7B',
              },
              black: {
                  DEFAULT: '#000000',
                  100: '#000000',
                  200: '#000000',
                  300: '#000000',
                  400: '#000000',
                  500: '#0F0E0E',
                  600: '#292929',
                  700: '#3D3D3D',
                  800: '#525252',
                  900: '#5C5C5C',
              },
              white: {
                  DEFAULT: '#FFFFFF',
                  100: '#F7F7F7',
              },
              gray: {
                DEFAULT: '#9BB4B5',
                100: '#646C6C',
              },
              accentMain: '#0F0E0E',
              borderColor: '#3C3C3C',
              blue: '#1900D5',
              highligh: '#DD1313',
          }
        : {
              white: {
                  DEFAULT: '#FFFFFF',
                  100: '#F7F7F7',
                  200: '#D1D1D1',
              },
            primary: {
                DEFAULT: '#DAECEB',
                50: '#FFFFFF',
                100: '#FFFFFF',
                200: '#F5FAFA',
                300: '#DAECEB',
                400: '#B5D9D7',
                500: '#90C6C3',
                600: '#6BB3AF',
                700: '#4E9894',
                800: '#3B7370',
                900: '#284E4B',
                950: '#1E3B39'
            },
            secondary: {
                DEFAULT: '#406E66', //'#1C312D',
                50: '#31544E',
                100: '#406E66',
                200: '#4F887E',
                300: '#57948A',
                400: '#57948A',
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
                DEFAULT: '#6E7F80',
                100: '#646C6C',
              },
              accentMain: '#F7F7F7',
              borderColor: '#D1D1D1',
              blue: '#1900D5',
              highligh: '#DD1313',
          }),
})

export const themeSettings: any = (mode: string) => {
    const colors = tokens(mode);
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
                          light: colors.white[100],
                      },
                      background: {
                        paper: colors.secondary.DEFAULT
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
                          light: colors.white[100],
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