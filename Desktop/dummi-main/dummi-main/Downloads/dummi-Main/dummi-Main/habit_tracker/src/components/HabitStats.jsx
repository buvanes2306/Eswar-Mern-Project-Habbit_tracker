import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  LinearProgress,
} from '@mui/material';
import {
  TrendingUp,
  CalendarToday,
  Star,
  Timer,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import dayjs from 'dayjs';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(2),
  '& .MuiCardContent-root': {
    padding: theme.spacing(2),
    width: '100%',
    textAlign: 'center',
  },
  '& .icon': {
    fontSize: 40,
    marginBottom: theme.spacing(1),
    color: theme.palette.primary.main,
  },
  '& .value': {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: theme.spacing(0.5),
  },
  '& .label': {
    color: theme.palette.text.secondary,
  },
  '& .progress': {
    width: '100%',
    marginTop: theme.spacing(1),
    height: 8,
    borderRadius: 4,
  },
}));

const StatCard = ({ icon: Icon, value, label, progress }) => (
  <Grid item xs={12} sm={6} md={3}>
    <StyledCard>
      <CardContent>
        <Icon className="icon" />
        <Typography variant="h4" className="value">
          {typeof value === 'number' ? Math.round(value) : value}
        </Typography>
        <Typography variant="body2" className="label">
          {label}
        </Typography>
        {progress !== undefined && (
          <LinearProgress
            variant="determinate"
            value={Math.min(100, Math.max(0, progress))}
            className="progress"
          />
        )}
      </CardContent>
    </StyledCard>
  </Grid>
);

const HabitStats = ({ habits = [], stats = {} }) => {
  const {
    totalHabits = 0,
    longestStreak = 0,
    totalCompletions = 0,
    monthlyRate = 0,
  } = stats;

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <StatCard
          icon={CalendarToday}
          value={totalHabits}
          label="Active Habits"
        />
        <StatCard
          icon={Star}
          value={longestStreak}
          label="Longest Streak"
        />
        <StatCard
          icon={Timer}
          value={totalCompletions}
          label="Total Completions"
        />
        <StatCard
          icon={TrendingUp}
          value={`${Math.round(monthlyRate)}%`}
          label="Monthly Success Rate"
          progress={monthlyRate}
        />
      </Grid>
      
      {habits.length === 0 && (
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="body1" color="textSecondary">
            Add some habits to see your statistics!
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default HabitStats;
