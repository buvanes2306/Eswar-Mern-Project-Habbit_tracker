import React from 'react';
import { Typography, Paper, Box } from '@mui/material';
import { Whatshot } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(1),
  borderRadius: theme.spacing(1),
  background: 'linear-gradient(45deg, #FF6B6B 30%, #FF8E53 90%)',
  color: 'white',
  marginBottom: theme.spacing(2),
}));

const StyledIcon = styled(Whatshot)(({ theme }) => ({
  marginRight: theme.spacing(1),
  animation: '$flame 1.5s ease-in-out infinite',
  color: theme.palette.primary.main,
}));

const StyledCount = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '1.2rem',
  marginRight: theme.spacing(1),
}));

const StyledText = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
}));

const StreakCounter = ({ streak }) => {

  const getStreakMessage = (streak) => {
    if (streak === 0) return "Start your streak today!";
    if (streak < 3) return "Keep it going!";
    if (streak < 7) return "You're on fire!";
    if (streak < 14) return "Unstoppable!";
    if (streak < 30) return "Incredible streak!";
    return "Legendary streak!";
  };

  return (
    <StyledPaper elevation={3}>
      <StyledIcon />
      <StyledCount variant="h6" component="span">
        {streak}
      </StyledCount>
      <StyledText variant="body1" component="span">
        Day Streak - {getStreakMessage(streak)}
      </StyledText>
    </StyledPaper>
  );
};

export default StreakCounter;
