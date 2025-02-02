import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { CssBaseline, Container, Box } from '@mui/material';
import HabitTracker from './HabitTracker';
import AppBar from './AppBar';
import Settings from './Settings';
import NavigationDrawer from './NavigationDrawer';
import Dashboard from './Dashboard';

const AppContent = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [showSettings, setShowSettings] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [habits, setHabits] = useState([]);
  const [completions, setCompletions] = useState({});

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  // If not authenticated, don't render the app content
  if (!user) {
    return null;
  }

  const handleSettingsClick = () => {
    setShowSettings(true);
    setShowDashboard(false);
  };

  const handleSettingsClose = () => {
    setShowSettings(false);
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleNavigation = (destination) => {
    switch (destination) {
      case 'today':
        setShowDashboard(false);
        setShowSettings(false);
        break;
      case 'dashboard':
        setShowDashboard(true);
        setShowSettings(false);
        break;
      case 'settings':
        setShowSettings(true);
        setShowDashboard(false);
        break;
      default:
        break;
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar onMenuClick={handleDrawerToggle} onSettingsClick={handleSettingsClick} />
      <NavigationDrawer
        open={drawerOpen}
        onClose={handleDrawerToggle}
        onNavigate={handleNavigation}
      />
      <Container>
        {showSettings ? (
          <Settings onClose={handleSettingsClose} />
        ) : showDashboard ? (
          <Dashboard habits={habits} completions={completions} />
        ) : (
          <HabitTracker onHabitsUpdate={setHabits} onCompletionsUpdate={setCompletions} />
        )}
      </Container>
    </Box>
  );
};

export default AppContent;
