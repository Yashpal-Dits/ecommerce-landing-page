import axios from 'axios';
import { NewUser, User } from '@/types';

const API_URL = (import.meta.env.VITE_API_URL as string | undefined) || '';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const getErrorMessage = (error: unknown) => {
  if (axios.isAxiosError(error)) {
   
    if (!error.response) {
      return 'Unable to connect to server. Please ensure json-server is running: npm run dev:all';
    }
    return error.response
      ? `Server error (${error.response.status}): ${error.response.statusText}`
      : error.message;
  }

  return error instanceof Error ? error.message : 'Unknown error';
};

export const fetchUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const { data: users } = await apiClient.get<User[]>('/users', {
      params: { email },
    });

    return users.length ? users[0] : null;
  } catch (error) {
    console.error('Fetch user error:', error);
    throw new Error(`Failed to fetch user: ${getErrorMessage(error)}`);
  }
};

export const createUser = async (newUser: NewUser): Promise<User> => {
  try {
    const { data: user } = await apiClient.post<User>('/users', newUser);
    return user;
  } catch (error) {
    console.error('Create user error:', error);
    throw new Error(`Failed to create user: ${getErrorMessage(error)}`);
  }
};

export const fetchUsersByRole = async (role: string): Promise<User[]> => {
  const endpoint = role === 'admin' ? 'admins' : role === 'super_admin' ? 'super_admins' : 'customers';

  try {
    const { data: users } = await apiClient.get<User[]>(`/${endpoint}`);
    return users;
  } catch (error) {
    console.error('Fetch users by role error:', error);
    throw new Error(`Failed to fetch users by role: ${getErrorMessage(error)}`);
  }
};

export const updateUser = async (user: User): Promise<User> => {
  try {
    const { data: updatedUser } = await apiClient.put<User>(`/users/${user.id}`, user);
    return updatedUser;
  } catch (error) {
    console.error('Update user error:', error);
    throw new Error(`Failed to update user: ${getErrorMessage(error)}`);
  }
};