import React from 'react';
import { Chip, Box, styled } from '@mui/material';

export const categories = [
  'Health',
  'Learning',
  'Creativity',
  'Coding',
  'Nutrition',
  'Self Care',
  'Education',
  'Work',
];

export const categoryColors = {
  'Health': '#4CAF50',
  'Learning': '#2196F3',
  'Creativity': '#9C27B0',
  'Coding': '#3F51B5',
  'Nutrition': '#FF9800',
  'Self Care': '#E91E63',
  'Education': '#00BCD4',
  'Work': '#607D8B',
};

const useStyles = styled((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(1),
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const HabitCategories = ({ selectedCategory, onSelectCategory }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Chip
        label="All"
        color={selectedCategory === 'all' ? 'primary' : 'default'}
        onClick={() => onSelectCategory('all')}
        variant={selectedCategory === 'all' ? 'filled' : 'outlined'}
      />
      {categories.map((category) => (
        <Chip
          key={category}
          label={category}
          onClick={() => onSelectCategory(category)}
          variant={selectedCategory === category ? 'filled' : 'outlined'}
          style={{
            backgroundColor: selectedCategory === category ? categoryColors[category] : 'transparent',
            color: selectedCategory === category ? '#fff' : 'inherit',
            borderColor: categoryColors[category],
          }}
        />
      ))}
    </Box>
  );
};

export default HabitCategories;
