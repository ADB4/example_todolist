import React, { useEffect, useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  AppBar,
  Toolbar,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { todoApi } from '../services/api';
import { TodoResponse } from '../types';
import { TodoItem } from '../components/TodoItem';
import { TodoForm } from '../components/TodoForm';

export const TodoList: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [todos, setTodos] = useState<TodoResponse[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<TodoResponse | null>(null);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const data = await todoApi.getAll();
      setTodos(data);
    } catch (error) {
      console.error('Failed to load todos', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleToggleComplete = async (todo: TodoResponse) => {
    try {
      const updated = await todoApi.update(todo.id, {
        completed: !todo.completed,
      });
      setTodos(todos.map((t) => (t.id === todo.id ? updated : t)));
    } catch (error) {
      console.error('Failed to update todo', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await todoApi.delete(id);
      setTodos(todos.filter((t) => t.id !== id));
    } catch (error) {
      console.error('Failed to delete todo', error);
    }
  };

  const handleEdit = (todo: TodoResponse) => {
    setEditingTodo(todo);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingTodo(null);
  };

  const handleFormSubmit = async () => {
    await loadTodos();
    handleFormClose();
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Todo App
          </Typography>
          <Typography sx={{ mr: 2 }}>Welcome, {user?.username}</Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
          }}
        >
          <Typography variant="h4">My Todos</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setIsFormOpen(true)}
          >
            Add Todo
          </Button>
        </Box>

        <Box>
          {todos.length === 0 ? (
            <Typography variant="body1" color="text.secondary" align="center">
              No todos yet. Create one to get started!
            </Typography>
          ) : (
            todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggleComplete={handleToggleComplete}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          )}
        </Box>
      </Container>

      <TodoForm
        open={isFormOpen}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
        editingTodo={editingTodo}
      />
    </>
  );
};
