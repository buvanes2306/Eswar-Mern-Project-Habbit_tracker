const express = require('express');
const Habit = require('../models/Habit');
const auth = require('../middleware/auth');
const router = express.Router();

// Get all habits for a user
router.get('/', auth, async (req, res) => {
  try {
    const habits = await Habit.find({ userId: req.user._id, isArchived: false });
    res.json(habits);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new habit
router.post('/', auth, async (req, res) => {
  try {
    const habit = new Habit({
      ...req.body,
      userId: req.user._id
    });
    await habit.save();
    res.status(201).json(habit);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a habit
router.patch('/:id', auth, async (req, res) => {
  try {
    const habit = await Habit.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );
    
    if (!habit) {
      return res.status(404).json({ error: 'Habit not found' });
    }
    
    res.json(habit);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a habit
router.delete('/:id', auth, async (req, res) => {
  try {
    const habit = await Habit.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });
    
    if (!habit) {
      return res.status(404).json({ error: 'Habit not found' });
    }
    
    res.json({ message: 'Habit deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mark habit as complete for a specific date
router.post('/:id/complete', auth, async (req, res) => {
  try {
    const { date } = req.body;
    const habit = await Habit.findOne({
      _id: req.params.id,
      userId: req.user._id
    });
    
    if (!habit) {
      return res.status(404).json({ error: 'Habit not found' });
    }
    
    if (!habit.completedDates.includes(date)) {
      habit.completedDates.push(date);
      await habit.save();
    }
    
    res.json(habit);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
