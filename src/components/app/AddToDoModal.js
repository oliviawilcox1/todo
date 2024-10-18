import React, { useState } from 'react';
// MUI
import { Modal, Stack,  Box, Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius: 4,
  p: 4,
};

const AddToDoModal = ({ open, handleClose, onAddTodo }) => {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (title && status) {
      onAddTodo({ title, status });
      handleClose(); 
      setTitle('');
      setStatus('');
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Stack spacing={2}>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                label="Status"
                required
              >
                <MenuItem value="To Do">To Do</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
              </Select>
            </FormControl>
            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
              Add Todo
            </Button>
          </form>
        </Stack>
      </Box>
    </Modal>
  );
};

export default AddToDoModal;
