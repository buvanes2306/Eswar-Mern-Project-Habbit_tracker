import React from 'react';
import { styled } from '@mui/material/styles';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import { Menu as MenuIcon, Settings as SettingsIcon, ExitToApp as LogoutIcon } from '@mui/icons-material';
import { useUser } from '../context/UserContext';

const useStyles = styled((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  toolbar: {
    justifyContent: 'space-between',
  },
}));

const AppBarComponent = ({ onSettingsClick, onMenuClick }) => {
  const classes = useStyles();
  const { user, logout } = useUser();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={onMenuClick}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography variant="h6" className={classes.title}>
            Habit Tracker
          </Typography>

          <div>
            <IconButton color="inherit" onClick={onSettingsClick}>
              <SettingsIcon />
            </IconButton>
            
            {user && (
              <Button
                color="inherit"
                startIcon={<LogoutIcon />}
                onClick={logout}
              >
                Logout
              </Button>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default AppBarComponent;
