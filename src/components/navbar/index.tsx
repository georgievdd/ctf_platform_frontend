import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import MaterialMenu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { Container } from '@mui/material';
import { IUser } from '../../interfaces/user';
import { Link } from 'react-router-dom';
import { PATH } from '../../router';

export function AuthNavbar({
  user
}: {user: IUser}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <Container sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center', textAlign: 'center' }}>
        <Typography sx={{ minWidth: 100 }}><Link to={PATH.TEAM}>team</Link></Typography>
        <Typography sx={{ minWidth: 100 }}><Link to={PATH.USER}>user</Link></Typography>
        <Typography sx={{ minWidth: 100 }}><Link to={PATH.CHALLENGE}>challenge</Link></Typography>
        <Typography sx={{ minWidth: 100 }}><Link to={PATH.EVENT}>event</Link></Typography>
        <Tooltip title={user.name}>
          <IconButton
            onClick={handleClick}
            size="large"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{width: '60px', height: '60px'}} src='https://w.forfun.com/fetch/03/03f8cd3f6796daaacc1fe43ffb7704b7.jpeg'>
              {user.name[0] + user.surname[0]}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Container>
      <Menu anchorEl={anchorEl} handleClose={handleClose} open={open}/>
    </div>
  );
}



function Menu({
  anchorEl,
  handleClose,
  open
}: {
  anchorEl: any,
  handleClose: any,
  open: any,
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
        <MenuItem onClick={handleClose}>
          <Avatar src='https://w.forfun.com/fetch/03/03f8cd3f6796daaacc1fe43ffb7704b7.jpeg' sx={{marginRight: '10px'}}/> Profile
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </MaterialMenu>
  );
}