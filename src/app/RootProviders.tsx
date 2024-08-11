"use client"
import Header from "@/component/header";
import { AuthProvider } from "@/context/authContext/authProvider";
import { UserProvider } from "@/context/userContext/userProvider";
import darkTheme from "@/theme/darkTheme";
import lightTheme from "@/theme/lightTheme";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as React from "react";

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const RootProviders = ({
    children,
}: {
    children: React.ReactNode,
}) => {
    const [mode, setMode] = React.useState<'light' | 'dark'>('dark');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      }
    }),
    []
  )

  const darkThemeChosen = React.useMemo(
    () => 
      createTheme({
        ...darkTheme
      }),
      [mode]
  );

  const lightThemeChosen = React.useMemo(
    () => 
      createTheme({
        ...lightTheme
      }),
      [mode]
  )

  return (
    <UserProvider>
    <AuthProvider>
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={mode === 'dark'? darkThemeChosen : lightThemeChosen}>
      <CssBaseline />
      <Header ColorModeContext={ColorModeContext} />
        <>
        {children}
        </>
      </ThemeProvider>
      </ColorModeContext.Provider>
      </AuthProvider>
      </UserProvider>
  )
}

export default RootProviders;