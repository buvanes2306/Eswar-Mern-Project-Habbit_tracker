import React from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  MenuItem,
  styled,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { categoryColors, categories } from './HabitCategories';

const useStyles = styled((theme) => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 200,
  },
  colorPreview: {
    width: 20,
    height: 20,
    borderRadius: '50%',
    marginRight: theme.spacing(1),
    display: 'inline-block',
  },
}));

const HabitForm = ({ onSubmit }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [preferredTime, setPreferredTime] = React.useState(dayjs());

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setName('');
    setCategory('');
    setPreferredTime(dayjs());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && category) {
      onSubmit({
        title: name.trim(),
        category,
        frequency: 'daily',
        description: `Preferred time: ${preferredTime.format('HH:mm')}`,
      });
      handleClose();
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Fab
        color="primary"
        className={classes.fab}
        onClick={handleOpen}
      >
        <AddIcon />
      </Fab>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Habit</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Habit Name"
            type="text"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            select
            margin="dense"
            label="Category"
            fullWidth
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={classes.formControl}
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                <div
                  className={classes.colorPreview}
                  style={{ backgroundColor: categoryColors[cat] }}
                />
                {cat}
              </MenuItem>
            ))}
          </TextField>
          <TimePicker
            label="Preferred Time"
            value={preferredTime}
            onChange={setPreferredTime}
            renderInput={(params) => (
              <TextField
                {...params}
                margin="dense"
                fullWidth
                className={classes.formControl}
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} color="primary">
            Add Habit
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
};

export default HabitForm;
