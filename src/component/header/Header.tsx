"use client"
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import WaterfallChartIcon from '@mui/icons-material/WaterfallChart';
import ToggleThemeButton from '../toggleThemeButton';
import { useUser } from '@/context/userContext/userProvider';
import { useAuth } from '@/context/authContext/authProvider';
import Link from 'next/link';


export type HeaderProps ={
  ColorModeContext: React.Context<{ toggleColorMode: () => void; }>
}

function Header(props: HeaderProps) {
  const { ColorModeContext = React.createContext({ toggleColorMode: () => {} })} = props;
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const { user } = useUser();
  const { logout } = useAuth();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <WaterfallChartIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            HydroSentinel
          </Typography>
          
          <WaterfallChartIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            HydroSentinel
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex'}}}>
          { user && <Typography >
                  Welcome {user.userName}
                  </Typography>}
          </Box>

          <ToggleThemeButton ColorModeContext={ColorModeContext} />

          <Box sx={{ flexGrow: 0, justifySelf: 'flex-end' }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={user !== null? user.userName: "username"} src="" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
                { user && <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">
                  <Link href="/profile">Profile</Link>
                  </Typography>
                </MenuItem>}
                { user === null ? <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">
                  <Link href="/auth/login">Login</Link>
                  </Typography>
                </MenuItem> : <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" onClick={logout}>Logout</Typography>
                </MenuItem>}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
