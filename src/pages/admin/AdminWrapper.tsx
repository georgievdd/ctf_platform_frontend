import React, { useContext } from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { IUser } from '../../interfaces/user';
import { useAuth } from '../../store/slices/auth';
import { Outlet, useLocation, useNavigate, useNavigation } from 'react-router-dom';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { Container, SvgIconTypeMap } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import EventIcon from '@mui/icons-material/Event';
import ChellengeIcon from '@mui/icons-material/EmojiEvents';
import ThemeSwitcherComponent from '../../components/theme-switcher';
import { DarkMode, LightMode, Logout } from '@mui/icons-material';
import { PATH, THEME } from '../../consts';
import { ColorModeContext } from '../../theme';

const AdminWrapper = () => {
  const theme = useTheme();
  const { pathname } = useLocation();
  const colorMode = useContext(ColorModeContext);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" noWrap component="div">
            {user?.name} {user?.surname}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
        <NavItem theme={theme} current={pathname === PATH.ADMIN.USER} Icon={PersonIcon} text='пользователи' open={open} onClick={() => navigate(PATH.ADMIN.USER)}/>
        <NavItem theme={theme} current={pathname === PATH.ADMIN.TEAM} Icon={GroupIcon} text='команды' open={open} onClick={() => navigate(PATH.ADMIN.TEAM)}/>
        <NavItem theme={theme} current={pathname === PATH.ADMIN.EVENT} Icon={EventIcon} text='собатия' open={open} onClick={() => navigate(PATH.ADMIN.EVENT)}/>
        <NavItem theme={theme} current={pathname === PATH.ADMIN.CHALLENGE} Icon={ChellengeIcon} text='соревнования' open={open} onClick={() => navigate(PATH.ADMIN.CHALLENGE)}/>
        </List>
        <Divider />
        <NavItem Icon={theme.palette.mode === THEME.DARK ? DarkMode : LightMode} text='тема' open={open} onClick={colorMode.toggleColorMode}/>
        <NavItem Icon={Logout} text='назад' open={open} onClick={() => navigate(PATH.PUBLIC.HOME)}/>

      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
}

export default AdminWrapper;

const drawerWidth = 240;

const NavItem = ({current, open, Icon, text, onClick, theme}: {theme?: any, current?: boolean, onClick: any, text: string, open: any, Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>}) => (
  <ListItem disablePadding sx={{ display: 'block', 
    backgroundColor: current?(theme.palette.mode === 'light' ? '#d9d9d9' : 'rgb(67, 67, 67)'):'transparent' 
  }} onClick={onClick}>
    <ListItemButton
      sx={{
        minHeight: 48,
        justifyContent: open ? 'initial' : 'center',
        px: 2.5,
      }}
    >
      <ListItemIcon
        sx={{
          minWidth: 0,
          mr: open ? 3 : 'auto',
          justifyContent: 'center',
        }}
      >
        <Icon />
      </ListItemIcon>
      <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
    </ListItemButton>
  </ListItem>
)

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);