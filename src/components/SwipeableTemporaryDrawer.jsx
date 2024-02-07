import React, { useState } from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { FiInbox } from "react-icons/fi";
import { TbChartInfographic } from "react-icons/tb";
import { CiBoxes } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';

export default function SwipeableTemporaryDrawer() {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };

  const handleMenuItemClick = (path) => {
    navigate(path);
    setIsDrawerOpen(false); 
  };

  const list = (
    <Box
    sx={{
      width: 250,
      marginTop: 1, 
      color: 'black',
    }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleMenuItemClick('/')}>
            <ListItemIcon>
              <FiInbox style={{ color: 'orange', fontSize: 30 }}/>
            </ListItemIcon>
            <ListItemText primary="Pedidos" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleMenuItemClick('/inventario')}>
            <ListItemIcon>
              <CiBoxes style={{ color: 'orange', fontSize: 30 }}/>
            </ListItemIcon>
            <ListItemText primary="Inventario" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleMenuItemClick('/estadisticas')}>
            <ListItemIcon>
              <TbChartInfographic style={{ color: 'orange',  fontSize: 30 }}/>
            </ListItemIcon>
            <ListItemText primary="Visitas" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2, display: { xs: 'block', md: 'none' } }} onClick={toggleDrawer(true)} >
        <MenuIcon />
      </IconButton>
      <SwipeableDrawer
        anchor="left"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {list}
      </SwipeableDrawer>
    </div>
  );
}
