import React from 'react';
import {
  Paper,
  Box,
  Checkbox,
  Typography,
  IconButton,
  Chip,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { TodoResponse } from '../types';

interface TodoItemProps {
  todo: TodoResponse;
  onToggleComplete: (todo: TodoResponse) => void;
  onEdit: (todo: TodoResponse) => void;
  onDelete: (id: number) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggleComplete,
  onEdit,
  onDelete,
}) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'HIGH':
        return 'error';
      case 'MEDIUM':
        return 'warning';
      case 'LOW':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        mb: 2,
        display: 'flex',
        alignItems: 'center',
        opacity: todo.completed ? 0.6 : 1,
      }}
    >
      <Checkbox
        checked={todo.completed}
        onChange={() => onToggleComplete(todo)}
      />

      <Box sx={{ flexGrow: 1, ml: 2 }}>
        <Typography
          variant="h6"
          sx={{
            textDecoration: todo.completed ? 'line-through' : 'none',
          }}
        >
          {todo.title}
        </Typography>

        {todo.description && (
          <Typography variant="body2" color="text.secondary">
            {todo.description}
          </Typography>
        )}

        <Box sx={{ mt: 1, display: 'flex', gap: 1, alignItems: 'center' }}>
          <Chip label={todo.priority} color={getPriorityColor(todo.priority)} size="small" />
          {todo.dueDate && (
            <Typography variant="caption" color="text.secondary">
              Due: {new Date(todo.dueDate).toLocaleDateString()}
            </Typography>
          )}
        </Box>
      </Box>

      <Box>
        <IconButton onClick={() => onEdit(todo)} color="primary">
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => onDelete(todo.id)} color="error">
          <DeleteIcon />
        </IconButton>
      </Box>
    </Paper>
  );
};
