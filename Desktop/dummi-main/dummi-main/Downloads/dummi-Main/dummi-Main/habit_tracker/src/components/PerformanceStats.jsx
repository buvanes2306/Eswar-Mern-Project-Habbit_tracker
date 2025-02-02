import React from 'react';

const PerformanceStats = ({ stats }) => {
  return (
    <div className="stats-grid">
      <div className="stat-card">
        <h3>Weekly Progress</h3>
        <div className="stat-value">{stats.weeklyProgress}%</div>
      </div>
      <div className="stat-card">
        <h3>Total Habits</h3>
        <div className="stat-value">{stats.totalHabits}</div>
      </div>
      <div className="stat-card">
        <h3>Completed Today</h3>
        <div className="stat-value">{stats.completedToday}</div>
      </div>
      <div className="stat-card">
        <h3>Current Streak</h3>
        <div className="stat-value">{stats.streak} days</div>
      </div>
    </div>
  );
};

export default PerformanceStats;
