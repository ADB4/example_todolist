export interface UserRegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface UserLoginRequest {
  username: string;
  password: string;
}

export interface UserResponse {
  id: number;
  username: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: UserResponse;
}

export interface TodoCreateRequest {
  title: string;
  description?: string;
  dueDate?: string;
  priority?: 'LOW' | 'MEDIUM' | 'HIGH';
}

export interface TodoUpdateRequest {
  title?: string;
  description?: string;
  completed?: boolean;
  dueDate?: string;
  priority?: 'LOW' | 'MEDIUM' | 'HIGH';
}

export interface TodoResponse {
  id: number;
  title: string;
  description: string | null;
  completed: boolean;
  dueDate: string | null;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  createdAt: string;
  updatedAt: string;
}
