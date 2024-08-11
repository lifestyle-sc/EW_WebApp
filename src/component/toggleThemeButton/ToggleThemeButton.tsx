import * as React from "react";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import useMediaQuery from "@mui/material/useMediaQuery";
import { Typography } from "@mui/material";

export type ThemeToggleButtonProps = {
    ColorModeContext: React.Context<{ toggleColorMode: () => void; }>
}

const ToggleThemeButton = (props: ThemeToggleButtonProps) => {
    const mobileCheck = useMediaQuery('(min-width: 500px)');
    const { ColorModeContext = React.createContext({ toggleColorMode: () => {} })} = props;
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);
    return (
        <>
            {mobileCheck && (
                <Typography>{theme.palette.mode}</Typography>
            )}
          <IconButton sx={{ mr: 2 }} title={theme.palette.mode} onClick={colorMode.toggleColorMode} color="inherit">
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </>
      );
}

export default ToggleThemeButton;