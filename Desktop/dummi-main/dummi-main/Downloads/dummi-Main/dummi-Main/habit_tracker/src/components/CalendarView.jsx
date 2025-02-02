import React from 'react';
import {
  Paper,
  Typography,
  Grid,
  Box,
  IconButton,
  Tooltip,
  Button,
  ButtonGroup,
  styled,
} from '@mui/material';
import {
  NavigateBefore,
  NavigateNext,
  Today,
  ViewWeek,
  ViewModule,
} from '@mui/icons-material';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';
import { categoryColors } from './HabitCategories';

dayjs.extend(weekOfYear);
dayjs.extend(weekday);
dayjs.extend(localeData);

const CalendarContainer = styled(Box)(({ theme }) => ({
  height: 'calc(100vh - 200px)',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
}));

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const WeekDayHeader = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(1),
  borderBottom: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '50px',
}));

const DayCell = styled(Box)(({ theme, isToday }) => ({
  height: '120px',
  padding: theme.spacing(1),
  borderRight: `1px solid ${theme.palette.divider}`,
  borderBottom: `1px solid ${theme.palette.divider}`,
  backgroundColor: isToday ? theme.palette.action.hover : 'inherit',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const EventChip = styled(Box)(({ theme, color }) => ({
  backgroundColor: color || theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(0.5, 1),
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(0.5),
  fontSize: '0.875rem',
  cursor: 'pointer',
  '&:hover': {
    opacity: 0.9,
  },
}));

const CalendarView = ({ habits, completions, month = dayjs() }) => {
  const [currentDate, setCurrentDate] = React.useState(dayjs(month));
  const [view, setView] = React.useState('month');

  const getDaysInMonth = (date) => {
    const start = date.startOf('month').startOf('week');
    const end = date.endOf('month').endOf('week');
    const days = [];
    let current = start;

    while (current.isBefore(end)) {
      days.push(current);
      current = current.add(1, 'day');
    }

    return days;
  };

  const formatDate = (date) => {
    return date.format('YYYY-MM-DD');
  };

  const isToday = (date) => {
    return date.isSame(dayjs(), 'day');
  };

  const getHabitEventsForDay = (date) => {
    const dateStr = formatDate(date);
    const dayCompletions = completions[dateStr] || {};
    return habits
      .filter(habit => dayCompletions[habit.id])
      .map(habit => ({
        ...habit,
        time: habit.preferredTime || '09:00',
      }));
  };

  const handlePrevMonth = () => {
    setCurrentDate(currentDate.subtract(1, 'month'));
  };

  const handleNextMonth = () => {
    setCurrentDate(currentDate.add(1, 'month'));
  };

  const handleToday = () => {
    setCurrentDate(dayjs());
  };

  const days = getDaysInMonth(currentDate);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <CalendarContainer>
      <Header>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <ButtonGroup variant="contained" color="primary">
            <Button startIcon={<Today />} onClick={handleToday}>
              Today
            </Button>
            <Button onClick={handlePrevMonth}>
              <NavigateBefore />
            </Button>
            <Button onClick={handleNextMonth}>
              <NavigateNext />
            </Button>
          </ButtonGroup>
          <Typography variant="h6">
            {currentDate.format('MMMM YYYY')}
          </Typography>
        </Box>
      </Header>

      <Grid container>
        {weekDays.map((day) => (
          <Grid item xs key={day}>
            <WeekDayHeader>
              <Typography variant="subtitle2">{day}</Typography>
            </WeekDayHeader>
          </Grid>
        ))}
      </Grid>

      <Grid container>
        {days.map((date) => (
          <Grid item xs key={date.format('YYYY-MM-DD')}>
            <DayCell isToday={isToday(date)}>
              <Typography
                variant="body2"
                color={date.month() === currentDate.month() ? 'textPrimary' : 'textSecondary'}
                sx={{ mb: 1 }}
              >
                {date.format('D')}
              </Typography>
              {getHabitEventsForDay(date).map((habit) => (
                <EventChip
                  key={habit.id}
                  color={categoryColors[habit.category]}
                >
                  {habit.name}
                </EventChip>
              ))}
            </DayCell>
          </Grid>
        ))}
      </Grid>
    </CalendarContainer>
  );
};

export default CalendarView;
