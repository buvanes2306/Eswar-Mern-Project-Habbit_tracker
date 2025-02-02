import React from 'react';
import { IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import dayjs from 'dayjs';
import '../styles/DateNavigation.css';

const DateNavigation = ({ selectedDate, onDateChange }) => {
  if (!selectedDate) {
    selectedDate = dayjs();
  }

  const formatDisplayDate = (date) => {
    return dayjs(date).format('dddd, MMMM D, YYYY');
  };

  const handlePrevDay = () => {
    onDateChange(dayjs(selectedDate).subtract(1, 'day'));
  };

  const handleNextDay = () => {
    onDateChange(dayjs(selectedDate).add(1, 'day'));
  };

  const handleToday = () => {
    onDateChange(dayjs());
  };

  return (
    <div className="date-navigation">
      <IconButton onClick={handlePrevDay}>
        <ChevronLeft />
      </IconButton>
      
      <div className="date-display">
        <span className="date-text">{formatDisplayDate(selectedDate)}</span>
        <button className="today-button" onClick={handleToday}>
          Today
        </button>
      </div>

      <IconButton onClick={handleNextDay}>
        <ChevronRight />
      </IconButton>
    </div>
  );
};

export default DateNavigation;
