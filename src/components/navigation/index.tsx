import * as React from 'react';
import { styled } from '@mui/system';
import { buttonClasses } from '@mui/base/Button';
import { Tabs } from '@mui/base/Tabs';
import { Box, Container, Divider, Drawer, Grid, IconButton, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import { Tab as BaseTab, tabClasses } from '@mui/base/Tab';
import { TabsList as BaseTabsList } from '@mui/base/TabsList';
import { useTheme } from '../../theme';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {ILink} from "../header";
import {useEffect, useState} from "react";
import {prepareLinks} from "../../datafunc";
import MenuIcon from '@mui/icons-material/Menu';

const drawerWidth = 240;
export default function NavLinks({ links, window }: { links: ILink[], window?: () => Window }) {

  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const container = window !== undefined ? () => window().document.body : undefined;
  const drawer = (
      <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
        <Typography variant="h6" sx={{ my: 2 }}>
        CTF
        </Typography>
        <Divider />
        <List>
          {links.map(({name, to}) => (
            <ListItem key={name} disablePadding>
              <ListItemButton onClick={() => navigate(to)} sx={{ textAlign: 'center' }}>
                <ListItemText primary={name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
  );

  const currentSelect = prepareLinks(links);
  const { pathname } = useLocation();

  const { colors } = useTheme();
  const navigate = useNavigate();
  const Tab = styled(BaseTab)(({ theme }) => `
  color: ${theme.palette.mode === 'light' ? colors.primary[300] : theme.palette.text.primary};
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: bold;
  background-color: transparent;
  width: 100%;
  padding: 12px;
  margin: 6px;
  border: none;
  border-radius: 7px;
  display: flex;
  justify-content: center;

    &:focus {
      color: ${colors.primary[100]};
      outline: 3px solid ${colors.primary[400]};
    }

    &.${tabClasses.selected} {
      background-color: ${colors.primary[300]};
      color: ${theme.palette.mode === 'light' ? colors.secondary.DEFAULT : theme.palette.text.primary};
    }

    &.${buttonClasses.disabled} {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `);

  const TabsList = styled(BaseTabsList)(
    ({ theme }) => `
    min-width: 400px;
    background-color: ${colors.secondary.DEFAULT};
    border-radius: 12px;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: space-between;
    box-shadow: 0px 4px 8px ${theme.palette.mode === 'dark' ? '#1C2025' : '#B0B8C4'};
    `,
  );

  const getChecked = () => {
    try {
      return currentSelect[pathname].index;
    } catch {
      return -1;
    }
  }

  return (
    <div>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{display: {xs: 'block', md: 'none', lg: 'none'}, ml: '20px'}}
      >
        <MenuIcon />
      </IconButton>
      <Box sx={{display: {xs: 'none', md: 'block', lg: 'block'}}}>
        <Tabs
          defaultValue={getChecked()}
          selectionFollowsFocus
          onChange={e => {
            e?.preventDefault();
            navigate((e!.target as HTMLElement).id);
          }}
        >
          <TabsList>
            {links.map(({name, to}, idx) => (
                <Tab id={to} key={name}>{name}</Tab>
            ))}
          </TabsList>
        </Tabs>
      </Box>
      <nav>
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
                keepMounted: true,
            }}
            sx={{
              display: { xs: 'block', md: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
          {drawer}
          </Drawer>
      </nav>
    </div>
  );
}