import axios from 'axios';
import {
  AuthResponse,
  UserLoginRequest,
  UserRegisterRequest,
  TodoCreateRequest,
  TodoResponse,
  TodoUpdateRequest,
} from '../types';

const api = axios.create({
  baseURL: '/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  register: async (data: UserRegisterRequest): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  login: async (data: UserLoginRequest): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },
};

export const todoApi = {
  create: async (data: TodoCreateRequest): Promise<TodoResponse> => {
    const response = await api.post('/todos', data);
    return response.data;
  },

  getAll: async (): Promise<TodoResponse[]> => {
    const response = await api.get('/todos');
    return response.data;
  },

  getById: async (id: number): Promise<TodoResponse> => {
    const response = await api.get(`/todos/${id}`);
    return response.data;
  },

  update: async (id: number, data: TodoUpdateRequest): Promise<TodoResponse> => {
    const response = await api.patch(`/todos/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/todos/${id}`);
  },
};
