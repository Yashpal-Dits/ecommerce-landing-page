import { NewUser, User } from '@/types';

const API_URL = (import.meta.env.VITE_API_URL as string | undefined) || 'http://localhost:4000';

export const fetchUserByEmail = async (email: string): Promise<User | null> => {
  const url = `${API_URL}/users?email=${encodeURIComponent(email)}`;
  console.log('Fetching user from:', url);
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const users: User[] = await response.json();
    return users.length ? users[0] : null;
  } catch (error) {
    console.error('Fetch error:', error);
    throw new Error(`Failed to fetch user: ${(error as Error).message}`);
  }
};

export const createUser = async (newUser: NewUser): Promise<User> => {
  const url = `${API_URL}/users`;
  console.log('Creating user at:', url);
  
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newUser),
  });

  if (!response.ok) {
    throw new Error(`Failed to create user: HTTP ${response.status}`);
  }

  return response.json();
};

export const fetchUsersByRole = async (role: string): Promise<User[]> => {
  const endpoint = role === 'admin' ? 'admins' : role === 'super_admin' ? 'super_admins' : 'customers';
  const url = `${API_URL}/${endpoint}`;
  console.log('Fetching users by role from:', url);
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch users by role');
  }
  return response.json();
};
