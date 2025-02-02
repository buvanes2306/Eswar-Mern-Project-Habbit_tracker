import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const habitService = {
  // Get all habits
  getAllHabits: async () => {
    try {
      const response = await axios.get(`${API_URL}/habits`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Failed to fetch habits';
    }
  },

  // Create a new habit
  createHabit: async (habitData) => {
    try {
      const response = await axios.post(`${API_URL}/habits`, habitData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Failed to create habit';
    }
  },

  // Update a habit
  updateHabit: async (habitId, habitData) => {
    try {
      const response = await axios.patch(`${API_URL}/habits/${habitId}`, habitData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Failed to update habit';
    }
  },

  // Delete a habit
  deleteHabit: async (habitId) => {
    try {
      await axios.delete(`${API_URL}/habits/${habitId}`);
    } catch (error) {
      throw error.response?.data?.error || 'Failed to delete habit';
    }
  },

  // Mark habit as complete for a date
  markHabitComplete: async (habitId, date) => {
    try {
      const response = await axios.post(`${API_URL}/habits/${habitId}/complete`, { date });
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Failed to mark habit as complete';
    }
  }
};
