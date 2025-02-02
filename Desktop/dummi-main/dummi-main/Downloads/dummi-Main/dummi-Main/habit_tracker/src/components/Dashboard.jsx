import React from 'react';
import WeekBarChart from './WeekBarChart';
import PerformanceStats from './PerformanceStats';
import PerformanceTab from './PerformanceTab';
import '../styles/Dashboard.css';

const Dashboard = ({ habits, completions, onClose }) => {
  // Calculate weekly data
  const weekData = [];
  const today = new Date();
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    
    const dayCompletions = completions[dateStr] || {};
    const totalHabits = habits.length;
    const completedHabits = Object.values(dayCompletions).filter(Boolean).length;
    const failedHabits = totalHabits - completedHabits;
    
    const completedPercentage = totalHabits > 0 ? (completedHabits / totalHabits) * 100 : 0;
    const failedPercentage = totalHabits > 0 ? (failedHabits / totalHabits) * 100 : 0;
    
    weekData.push({
      date: dateStr,
      completed: Math.round(completedPercentage),
      failed: Math.round(failedPercentage)
    });
  }

  // Calculate performance stats
  const todayStr = today.toISOString().split('T')[0];
  const todayCompletions = completions[todayStr] || {};
  const completedToday = Object.values(todayCompletions).filter(Boolean).length;

  // Calculate streak
  let streak = 0;
  let currentDate = new Date(today);
  
  while (true) {
    const dateStr = currentDate.toISOString().split('T')[0];
    const dayCompletions = completions[dateStr] || {};
    const totalCompleted = Object.values(dayCompletions).filter(Boolean).length;
    
    if (totalCompleted > 0) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      break;
    }
  }

  const performanceStats = {
    weeklyProgress: Math.round(
      weekData.reduce((acc, day) => acc + day.completed, 0) / 7
    ),
    totalHabits: habits.length,
    completedToday,
    streak
  };

  return (
    <div className="dashboard-container">
      <button className="close-button" onClick={onClose}>×</button>
      
      <div className="dashboard-content">
        <h1>Your Progress Dashboard</h1>
        
        <div className="stats-container">
          <PerformanceStats stats={performanceStats} />
        </div>
        
        <div className="chart-container">
          <h2>Weekly Performance</h2>
          <WeekBarChart data={weekData} />
        </div>

        <div className="performance-tab-container">
          <h2>Long-term Performance</h2>
          <PerformanceTab habits={habits} completions={completions} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
