import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
} from '@mui/material';
import { todoApi } from '../services/api';
import { TodoResponse } from '../types';

interface TodoFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  editingTodo: TodoResponse | null;
}

export const TodoForm: React.FC<TodoFormProps> = ({
  open,
  onClose,
  onSubmit,
  editingTodo,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'MEDIUM' as 'LOW' | 'MEDIUM' | 'HIGH',
  });

  useEffect(() => {
    if (editingTodo) {
      setFormData({
        title: editingTodo.title,
        description: editingTodo.description || '',
        dueDate: editingTodo.dueDate
          ? new Date(editingTodo.dueDate).toISOString().split('T')[0]
          : '',
        priority: editingTodo.priority,
      });
    } else {
      setFormData({
        title: '',
        description: '',
        dueDate: '',
        priority: 'MEDIUM',
      });
    }
  }, [editingTodo, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        dueDate: formData.dueDate
          ? new Date(formData.dueDate).toISOString()
          : undefined,
      };

      if (editingTodo) {
        await todoApi.update(editingTodo.id, payload);
      } else {
        await todoApi.create(payload);
      }

      onSubmit();
    } catch (error) {
      console.error('Failed to save todo', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>{editingTodo ? 'Edit Todo' : 'Create Todo'}</DialogTitle>

        <DialogContent>
          <TextField
            fullWidth
            label="Title"
            margin="normal"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />

          <TextField
            fullWidth
            label="Description"
            margin="normal"
            multiline
            rows={3}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />

          <TextField
            fullWidth
            label="Due Date"
            type="date"
            margin="normal"
            value={formData.dueDate}
            onChange={(e) =>
              setFormData({ ...formData, dueDate: e.target.value })
            }
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            fullWidth
            select
            label="Priority"
            margin="normal"
            value={formData.priority}
            onChange={(e) =>
              setFormData({
                ...formData,
                priority: e.target.value as 'LOW' | 'MEDIUM' | 'HIGH',
              })
            }
          >
            <MenuItem value="LOW">Low</MenuItem>
            <MenuItem value="MEDIUM">Medium</MenuItem>
            <MenuItem value="HIGH">High</MenuItem>
          </TextField>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            {editingTodo ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
