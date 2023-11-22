import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import MaterialMenu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import TokenIcon from '@mui/icons-material/Token';
import { Box, Container, Drawer, Grid, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { IUser } from '../../interfaces/user';
import ThemeSwitcherComponent from "../theme-switcher";
import Typography from "@mui/material/Typography";
import {tokens, useTheme} from "../../theme";
import NavLinks from '../navigation';
import { PATH } from '../../consts';
import {addTokenToBuffer} from "../../datafunc";
import { useNavigate } from 'react-router-dom';

export function Header({user}: {user: IUser}) {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const { colors } = useTheme();
    
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const logout = () => {
        localStorage.removeItem('accessJwt');
        navigate(PATH.AUTH.LOGIN);
    }
    return (
        <div style={{paddingTop: '30px'}}>
            <Grid sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'center' }}>
                <NavLinks links={links}/>
                <Grid display='flex' justifyContent='end'>
                    <Box sx={{display: {xs: 'none', md: 'block', lg: 'block'}}}>
                        <ThemeSwitcherComponent />
                    </Box>
                    <Grid sx={{marginLeft: '0'}}>
                        <Typography variant='h4' style={{ minWidth: 100, marginBottom: 0, padding: 0 }}>{user.name} {user.surname}</Typography>
                        {user.admin
                        &&<Typography variant='h6' style={{
                            minWidth: 100,
                            marginTop: 0,
                            color: colors.highligh,
                            textAlign: 'end'
                        }}>админитратор</Typography>}
                    </Grid>
                    <Tooltip title={user.name} style={{marginLeft: "10px"}}>
                        <IconButton
                            onClick={handleClick}
                            size="small"
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >
                            <Avatar sx={{width: '60px', height: '60px', marginTop: '-5px', backgroundColor: colors.secondary.DEFAULT}} src='https://w.forfun.com/fetch/03/03f8cd3f6796daaacc1fe43ffb7704b7.jpe'>
                                {user.name[0] + user.surname[0]}
                            </Avatar>
                        </IconButton>
                    </Tooltip>
                </Grid>
            </Grid>
            <Menu 
                user={user}
                anchorEl={anchorEl} 
                handleClose={handleClose} 
                open={open} 
                colors={colors}
                adminNavigate={() => navigate(PATH.ADMIN.HOME)}
                logout={logout}
                toProfilePage={() => navigate(PATH.PUBLIC.ME)}
            />
        </div>
    );
}



function Menu({
                  anchorEl,
                  handleClose,
                  open,
                  colors,
                  user,
                  adminNavigate,
                  logout,
                  toProfilePage,
              }: {
    anchorEl: any,
    handleClose: any,
    open: any,
    colors: any,
    user: IUser,
    adminNavigate: any,
    logout: () => void,
    toProfilePage: () => void,
}) {
    return (
        <MaterialMenu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            <MenuItem onClick={e => {toProfilePage(); handleClose()}}>
                <Avatar sx={{marginRight: '10px', backgroundColor: colors.secondary.DEFAULT}}/> Profile
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClose}>
                <ListItemIcon>
                    <Settings fontSize="small" />
                </ListItemIcon>
                Настройки
            </MenuItem>
            {user.admin && 
            <MenuItem onClick={adminNavigate}>
                <ListItemIcon>
                    <AdminPanelSettingsIcon fontSize="small" />
                </ListItemIcon>
                Админ панель
            </MenuItem>}
            <MenuItem onClick={addTokenToBuffer}>
                <ListItemIcon>
                    <TokenIcon fontSize="small" />
                </ListItemIcon>
                Копировать токен
            </MenuItem>
            <MenuItem onClick={e => {logout(); handleClose()}}>
                <ListItemIcon>
                    <Logout fontSize="small" />
                </ListItemIcon>
                Выйти
            </MenuItem>
        </MaterialMenu>
    );
}

export interface ILink {
    to: string;
    name: string;
}

const links: ILink[] = [
    {
        to: PATH.PUBLIC.USER,
        name: 'Участники'
    },
    {
        to: PATH.PUBLIC.TEAM,
        name: 'Команды'
    },
    {
        to: PATH.PUBLIC.EVENT,
        name: 'События'
    },
    {
        to: PATH.PUBLIC.CHALLENGE,
        name: 'Соревнования'
    },
];