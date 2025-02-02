import React from 'react';
import { List, ListItem, IconButton, Typography, Tooltip, Chip } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { categoryColors } from './HabitCategories';
import '../styles/HabitList.css';

const HabitList = ({ habits, selectedDate, completions, onToggle, onDelete }) => {
  if (!habits || habits.length === 0) {
    return (
      <div className="empty-state">
        <Typography variant="body1" color="textSecondary" align="center" style={{ padding: '20px' }}>
          No habits added yet. Add your first habit below!
        </Typography>
      </div>
    );
  }

  return (
    <List className="habit-list">
      {habits.map(habit => (
        <ListItem
          key={habit._id}
          className="habit-item"
          secondaryAction={
            <Tooltip title="Delete habit">
              <IconButton
                edge="end"
                onClick={() => onDelete(habit._id)}
                size="small"
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          }
        >
          <div className="habit-content">
            <div className="habit-info">
              <label className="habit-label">
                <input
                  type="checkbox"
                  checked={completions[habit._id] || false}
                  onChange={() => onToggle(habit._id)}
                  className="habit-checkbox"
                />
                <span className="habit-name">{habit.title}</span>
              </label>
              <Chip
                size="small"
                label={habit.category}
                style={{
                  backgroundColor: categoryColors[habit.category] || '#666',
                  color: 'white',
                  marginLeft: '8px',
                }}
              />
            </div>
            {habit.description && (
              <Typography variant="caption" color="textSecondary" className="habit-description">
                {habit.description}
              </Typography>
            )}
          </div>
        </ListItem>
      ))}
    </List>
  );
};

export default HabitList;
