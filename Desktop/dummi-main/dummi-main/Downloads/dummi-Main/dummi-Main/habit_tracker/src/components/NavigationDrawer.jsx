import React from 'react';
import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Divider 
} from '@mui/material';
import { 
  Dashboard as DashboardIcon, 
  Today as TodayIcon, 
  Settings as SettingsIcon 
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: 240,
  flexShrink: 0,
}));

const StyledToolbar = styled('div')(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

const NavigationDrawer = ({ open, onClose, onNavigate }) => {
  const menuItems = [
    { text: 'Today', icon: <TodayIcon />, action: () => onNavigate('today') },
    { text: 'Dashboard', icon: <DashboardIcon />, action: () => onNavigate('dashboard') },
    { text: 'Settings', icon: <SettingsIcon />, action: () => onNavigate('settings') },
  ];

  const handleItemClick = (action) => {
    action();
    onClose();
  };

  return (
    <StyledDrawer
      variant="temporary"
      anchor="left"
      open={open}
      onClose={onClose}
    >
      <StyledToolbar />
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem button key={item.text} onClick={() => handleItemClick(item.action)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </StyledDrawer>
  );
};

export default NavigationDrawer;
