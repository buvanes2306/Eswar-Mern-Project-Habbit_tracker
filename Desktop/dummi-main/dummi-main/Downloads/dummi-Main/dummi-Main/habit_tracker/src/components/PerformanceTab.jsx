import React from 'react';
import { useUser } from '../context/UserContext';
import HeatmapCalendar from './HeatmapCalendar';
import LineChart from './LineChart';
import { Grid, Typography, Box, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  height: '100%',
  marginBottom: theme.spacing(3),
}));

const StyledBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const PerformanceTab = ({ habits, completions }) => {
  const { user } = useUser();

  // Prepare data for heatmap
  const heatmapData = Object.entries(completions).map(([date, dayCompletions]) => {
    const totalHabits = habits.length;
    const completedHabits = Object.values(dayCompletions).filter(Boolean).length;
    const value = totalHabits > 0 ? (completedHabits / totalHabits) * 100 : 0;
    
    return {
      day: date,
      value: Math.round(value)
    };
  });

  // Prepare data for line chart
  const lineData = [{
    id: 'Completion Rate',
    data: Object.entries(completions).map(([date, dayCompletions]) => {
      const totalHabits = habits.length;
      const completedHabits = Object.values(dayCompletions).filter(Boolean).length;
      const value = totalHabits > 0 ? (completedHabits / totalHabits) * 100 : 0;
      
      return {
        x: date,
        y: Math.round(value)
      };
    })
  }];

  return (
    <StyledBox>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <StyledPaper>
            <StyledTypography variant="h6">
              Daily Performance Heatmap
            </StyledTypography>
            <HeatmapCalendar data={heatmapData} />
          </StyledPaper>
        </Grid>
        <Grid item xs={12}>
          <StyledPaper>
            <StyledTypography variant="h6">
              Performance Trend
            </StyledTypography>
            <LineChart data={lineData} />
          </StyledPaper>
        </Grid>
      </Grid>
    </StyledBox>
  );
};

export default PerformanceTab;
