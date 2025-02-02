import React from 'react';
import { styled } from '@mui/material/styles';
import { 
  Switch, 
  FormControlLabel, 
  Typography, 
  Paper, 
  Grid, 
  Button, 
  Divider, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  Slider 
} from '@mui/material';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';

const useStyles = styled((theme) => ({
  root: {
    position: 'fixed',
    top: 0,
    right: 0,
    width: '400px',
    height: '100vh',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    overflowY: 'auto',
    zIndex: 1200,
    animation: '$slideIn 0.3s ease-out',
  },
  section: {
    marginBottom: theme.spacing(4),
  },
  formControl: {
    minWidth: 200,
    marginTop: theme.spacing(2),
  },
  slider: {
    marginTop: theme.spacing(4),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(2),
    top: theme.spacing(2),
  },
  '@keyframes slideIn': {
    from: {
      transform: 'translateX(100%)',
    },
    to: {
      transform: 'translateX(0)',
    },
  },
}));

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
];

const Settings = ({ onClose }) => {
  const classes = useStyles();
  const { theme, toggleTheme } = useTheme();
  const { user, updateUserPreferences } = useUser();

  const handleLanguageChange = (event) => {
    updateUserPreferences({ language: event.target.value });
  };

  const handleGoalChange = (event, newValue) => {
    updateUserPreferences({ performanceGoal: newValue });
  };

  return (
    <Paper className={classes.root}>
      <Button onClick={onClose} className={classes.closeButton}>
        ×
      </Button>
      
      <Typography variant="h5" gutterBottom>
        Settings
      </Typography>

      <div className={classes.section}>
        <Typography variant="h6" gutterBottom>
          Appearance
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={theme === 'dark'}
              onChange={toggleTheme}
              color="primary"
            />
          }
          label="Dark Mode"
        />
      </div>

      <Divider />

      <div className={classes.section}>
        <Typography variant="h6" gutterBottom>
          Language
        </Typography>
        <FormControl className={classes.formControl}>
          <InputLabel>Select Language</InputLabel>
          <Select
            value={user?.language || 'en'}
            onChange={handleLanguageChange}
          >
            {languages.map((lang) => (
              <MenuItem key={lang.code} value={lang.code}>
                {lang.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <Divider />

      <div className={classes.section}>
        <Typography variant="h6" gutterBottom>
          Performance
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography id="goal-slider" gutterBottom>
              Daily Goal
            </Typography>
            <Slider
              className={classes.slider}
              value={user?.performanceGoal || 80}
              onChange={handleGoalChange}
              aria-labelledby="goal-slider"
              valueLabelDisplay="auto"
              step={5}
              marks
              min={0}
              max={100}
            />
          </Grid>
        </Grid>
      </div>
    </Paper>
  );
};

export default Settings;
