import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Tabs,
  Tab,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  TrendingUp,
  CalendarToday,
  Timeline,
  BarChart,
  Star,
  Weekend,
} from '@mui/icons-material';

const Root = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

const InsightCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
}));

const InsightIcon = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  fontSize: '2rem',
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const HabitInsights = ({ habits, completions }) => {
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const calculateInsights = () => {
    // Calculate various insights here
    const totalCompletions = Object.values(completions).reduce(
      (sum, dayCompletions) => sum + Object.values(dayCompletions).filter(Boolean).length,
      0
    );

    const habitsByCategory = habits.reduce((acc, habit) => {
      acc[habit.category] = (acc[habit.category] || 0) + 1;
      return acc;
    }, {});

    const mostPopularCategory = Object.entries(habitsByCategory).reduce(
      (a, b) => (b[1] > a[1] ? b : a),
      ['', 0]
    )[0];

    return {
      totalCompletions,
      habitCount: habits.length,
      mostPopularCategory,
    };
  };

  const insights = calculateInsights();

  return (
    <Root>
      <StyledTypography variant="h5">
        Habit Insights
      </StyledTypography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <InsightCard>
            <InsightIcon>
              <TrendingUp color="primary" fontSize="inherit" />
            </InsightIcon>
            <Typography variant="h6">Total Completions</Typography>
            <Typography variant="h4" color="primary">
              {insights.totalCompletions}
            </Typography>
          </InsightCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <InsightCard>
            <InsightIcon>
              <Star color="primary" fontSize="inherit" />
            </InsightIcon>
            <Typography variant="h6">Active Habits</Typography>
            <Typography variant="h4" color="primary">
              {insights.habitCount}
            </Typography>
          </InsightCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <InsightCard>
            <InsightIcon>
              <BarChart color="primary" fontSize="inherit" />
            </InsightIcon>
            <Typography variant="h6">Most Popular Category</Typography>
            <Typography variant="h4" color="primary">
              {insights.mostPopularCategory || 'N/A'}
            </Typography>
          </InsightCard>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Tabs value={selectedTab} onChange={handleTabChange} centered>
          <Tab icon={<Timeline />} label="Trends" />
          <Tab icon={<CalendarToday />} label="Calendar View" />
          <Tab icon={<Weekend />} label="Weekly Stats" />
        </Tabs>
      </Box>

      <Box sx={{ mt: 3 }}>
        {selectedTab === 0 && (
          <Paper>
            <List>
              <ListItem>
                <ListItemIcon>
                  <TrendingUp color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Completion Rate"
                  secondary="View your habit completion rate over time"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <Star color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Streak Analysis"
                  secondary="Track your longest streaks and patterns"
                />
              </ListItem>
            </List>
          </Paper>
        )}
        {selectedTab === 1 && (
          <Paper>
            <List>
              <ListItem>
                <ListItemIcon>
                  <CalendarToday color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Monthly Overview"
                  secondary="See your habit completion patterns by month"
                />
              </ListItem>
            </List>
          </Paper>
        )}
        {selectedTab === 2 && (
          <Paper>
            <List>
              <ListItem>
                <ListItemIcon>
                  <Weekend color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Weekly Performance"
                  secondary="Analyze your habits by day of the week"
                />
              </ListItem>
            </List>
          </Paper>
        )}
      </Box>
    </Root>
  );
};

export default HabitInsights;
