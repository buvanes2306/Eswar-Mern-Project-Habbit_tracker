import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  LinearProgress,
  Tooltip,
  Zoom,
  Box,
  styled,
} from '@mui/material';
import {
  EmojiEvents,
  Whatshot,
  Star,
  Timer,
  TrendingUp,
  Public,
  Favorite,
  LocalCafe,
} from '@mui/icons-material';

const Root = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

const BadgeContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(2),
  cursor: 'pointer',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const AchievementIcon = styled(Box)(({ theme }) => ({
  fontSize: 40,
  marginBottom: theme.spacing(1),
}));

const LockedBadge = styled(Box)({
  opacity: 0.5,
  filter: 'grayscale(100%)',
});

const ProgressText = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1),
  fontSize: '0.75rem',
  color: theme.palette.text.secondary,
}));

const TitleText = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const achievements = [
  {
    id: 'first_habit',
    icon: Star,
    name: 'First Steps',
    description: 'Create your first habit',
    color: '#FFD700',
    condition: (stats) => stats.totalHabits > 0,
  },
  {
    id: 'streak_7',
    icon: Whatshot,
    name: 'On Fire',
    description: 'Maintain a 7-day streak',
    color: '#FF4081',
    condition: (stats) => stats.longestStreak >= 7,
  },
  {
    id: 'streak_30',
    icon: LocalCafe,
    name: 'Habit Master',
    description: 'Maintain a 30-day streak',
    color: '#9C27B0',
    condition: (stats) => stats.longestStreak >= 30,
  },
  {
    id: 'completions_100',
    icon: EmojiEvents,
    name: 'Century Club',
    description: 'Complete 100 total habit check-ins',
    color: '#FFA726',
    condition: (stats) => stats.totalCompletions >= 100,
  },
  {
    id: 'perfect_week',
    icon: TrendingUp,
    name: 'Perfect Week',
    description: 'Complete all habits for 7 days straight',
    color: '#4CAF50',
    condition: (stats) => stats.perfectWeeks > 0,
  },
  {
    id: 'variety',
    icon: Public,
    name: 'Well Rounded',
    description: 'Create habits in 5 different categories',
    color: '#2196F3',
    condition: (stats) => stats.uniqueCategories >= 5,
  },
  {
    id: 'dedication',
    icon: Timer,
    name: 'Dedication',
    description: 'Track habits for 3 months',
    color: '#607D8B',
    condition: (stats) => stats.daysTracking >= 90,
  },
  {
    id: 'consistency',
    icon: Favorite,
    name: 'Consistency King',
    description: 'Maintain 80% completion rate for a month',
    color: '#E91E63',
    condition: (stats) => stats.monthlyRate >= 80,
  },
];

const Achievements = ({ stats }) => {
  return (
    <Card className={Root}>
      <CardContent>
        <TitleText variant="h5">
          Achievements
        </TitleText>
        <Grid container spacing={3}>
          {achievements.map((achievement) => {
            const Icon = achievement.icon;
            const isUnlocked = achievement.condition(stats);
            
            return (
              <Grid item xs={6} sm={4} md={3} key={achievement.id}>
                <Tooltip
                  title={
                    <>
                      <Typography variant="subtitle2">{achievement.name}</Typography>
                      <Typography variant="body2">{achievement.description}</Typography>
                      {!isUnlocked && (
                        <Typography variant="caption">
                          🔒 Locked - Keep going!
                        </Typography>
                      )}
                    </>
                  }
                  TransitionComponent={Zoom}
                  arrow
                >
                  <BadgeContainer
                    className={isUnlocked ? '' : LockedBadge}
                  >
                    <Icon
                      className={AchievementIcon}
                      style={{ color: achievement.color }}
                    />
                    <Typography variant="subtitle2" align="center">
                      {achievement.name}
                    </Typography>
                  </BadgeContainer>
                </Tooltip>
              </Grid>
            );
          })}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Achievements;
