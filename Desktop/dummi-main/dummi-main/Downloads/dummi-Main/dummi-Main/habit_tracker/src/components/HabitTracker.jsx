import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HabitList from './HabitList';
import HabitForm from './HabitForm';
import DateNavigation from './DateNavigation';
import HabitCategories from './HabitCategories';
import StreakCounter from './StreakCounter';
import HabitStats from './HabitStats';
import CalendarView from './CalendarView';
import Achievements from './Achievements';
import HabitInsights from './HabitInsights';
import { Tabs, Tab, Paper, Box, CircularProgress } from '@mui/material';
import {
  ViewDay,
  ViewWeek,
  Assessment,
  EmojiEvents,
  TrendingUp,
} from '@mui/icons-material';
import dayjs from 'dayjs';
import '../styles/HabitTracker.css';

const API_URL = 'http://localhost:5000/api';

const HabitTracker = ({ onHabitUpdate, onCompletionUpdate }) => {
  const [habits, setHabits] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [completions, setCompletions] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [streak, setStreak] = useState(0);
  const [view, setView] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalHabits: 0,
    longestStreak: 0,
    totalCompletions: 0,
    perfectWeeks: 0,
    uniqueCategories: 0,
    daysTracking: 0,
    monthlyRate: 0,
  });

  // Fetch habits from API
  const fetchHabits = async () => {
    try {
      const response = await axios.get(`${API_URL}/habits`);
      setHabits(response.data);
      
      // Convert completedDates to the format expected by the frontend
      const completionsMap = {};
      response.data.forEach(habit => {
        habit.completedDates.forEach(date => {
          const dateStr = dayjs(date).format('YYYY-MM-DD');
          if (!completionsMap[dateStr]) {
            completionsMap[dateStr] = {};
          }
          completionsMap[dateStr][habit._id] = true;
        });
      });
      setCompletions(completionsMap);
      
      if (onHabitUpdate) {
        onHabitUpdate(response.data);
      }
      if (onCompletionUpdate) {
        onCompletionUpdate(completionsMap);
      }
    } catch (error) {
      console.error('Error fetching habits:', error);
      setError('Failed to load habits. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  const addHabit = async (habitData) => {
    try {
      const response = await axios.post(`${API_URL}/habits`, habitData);
      setHabits(prev => [...prev, response.data]);
      if (onHabitUpdate) {
        onHabitUpdate([...habits, response.data]);
      }
    } catch (error) {
      console.error('Error adding habit:', error);
      throw new Error(error.response?.data?.error || 'Failed to add habit');
    }
  };

  const toggleHabitCompletion = async (habitId, date) => {
    const dateStr = date.format('YYYY-MM-DD');
    const isCompleted = completions[dateStr]?.[habitId];

    try {
      if (!isCompleted) {
        await axios.post(`${API_URL}/habits/${habitId}/complete`, { date: dateStr });
      }

      const newCompletions = {
        ...completions,
        [dateStr]: {
          ...(completions[dateStr] || {}),
          [habitId]: !isCompleted
        }
      };

      setCompletions(newCompletions);
      if (onCompletionUpdate) {
        onCompletionUpdate(newCompletions);
      }
    } catch (error) {
      console.error('Error toggling habit completion:', error);
      // Revert the optimistic update if the API call fails
      setError('Failed to update habit completion. Please try again.');
    }
  };

  const deleteHabit = async (habitId) => {
    try {
      await axios.delete(`${API_URL}/habits/${habitId}`);
      const updatedHabits = habits.filter(h => h._id !== habitId);
      setHabits(updatedHabits);
      if (onHabitUpdate) {
        onHabitUpdate(updatedHabits);
      }
    } catch (error) {
      console.error('Error deleting habit:', error);
      throw new Error(error.response?.data?.error || 'Failed to delete habit');
    }
  };

  useEffect(() => {
    // Calculate stats
    const uniqueCategories = new Set(habits.map(h => h.category)).size;
    const firstCompletion = Object.keys(completions).sort()[0];
    const daysTracking = firstCompletion
      ? Math.ceil((new Date() - new Date(firstCompletion)) / (1000 * 60 * 60 * 24))
      : 0;

    // Calculate monthly completion rate
    const today = new Date();
    const last30Days = new Array(30).fill(0).map((_, i) => {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      return date.toISOString().split('T')[0];
    });

    const monthlyCompletions = last30Days.reduce((acc, date) => {
      const dayCompletions = completions[date] || {};
      return acc + Object.values(dayCompletions).filter(Boolean).length;
    }, 0);

    const totalPossibleMonthly = habits.length * 30;
    const monthlyRate = totalPossibleMonthly ? (monthlyCompletions / totalPossibleMonthly) * 100 : 0;

    // Calculate perfect weeks
    const perfectWeeks = Math.floor(streak / 7);

    setStats({
      totalHabits: habits.length,
      longestStreak: streak,
      totalCompletions: Object.values(completions).reduce(
        (acc, day) => acc + Object.values(day).filter(Boolean).length,
        0
      ),
      perfectWeeks,
      uniqueCategories,
      daysTracking,
      monthlyRate,
    });
  }, [habits, completions, streak]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <div className="error-message">{error}</div>
      </Box>
    );
  }

  const filteredHabits = selectedCategory === 'all'
    ? habits
    : habits.filter(habit => habit.category === selectedCategory);

  const handleViewChange = (event, newValue) => {
    setView(newValue);
  };

  return (
    <div className="habit-tracker">
      <Paper className="habit-tracker-container">
        <Tabs
          value={view}
          onChange={handleViewChange}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab icon={<ViewDay />} label="Daily" />
          <Tab icon={<ViewWeek />} label="Calendar" />
          <Tab icon={<Assessment />} label="Stats" />
          <Tab icon={<EmojiEvents />} label="Achievements" />
          <Tab icon={<TrendingUp />} label="Insights" />
        </Tabs>

        {view === 0 && (
          <>
            <DateNavigation
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
            />
            <HabitCategories
              categories={[...new Set(habits.map(h => h.category))]}
              selectedCategory={selectedCategory}
              onCategorySelect={setSelectedCategory}
            />
            <HabitForm onSubmit={addHabit} />
            <HabitList
              habits={filteredHabits}
              completions={completions[selectedDate.format('YYYY-MM-DD')] || {}}
              onToggle={(habitId) => toggleHabitCompletion(habitId, selectedDate)}
              onDelete={deleteHabit}
              selectedDate={selectedDate}
            />
            <StreakCounter streak={streak} />
          </>
        )}

        {view === 1 && (
          <CalendarView
            habits={habits}
            completions={completions}
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
          />
        )}

        {view === 2 && (
          <HabitStats
            habits={habits}
            stats={{
              totalHabits: habits.length,
              longestStreak: streak,
              totalCompletions: Object.values(completions).reduce(
                (acc, day) => acc + Object.values(day).filter(Boolean).length,
                0
              ),
              monthlyRate: stats.monthlyRate,
            }}
          />
        )}
        {view === 3 && <Achievements stats={stats} />}
        {view === 4 && (
          <HabitInsights
            habits={habits}
            completions={completions}
            stats={stats}
          />
        )}
      </Paper>
    </div>
  );
};

export default HabitTracker;
