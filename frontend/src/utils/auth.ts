import axios from 'axios';
import { LoginRequest, LoginResponse, RegisterRequest } from '../types/types';

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const res = await axios.post<LoginResponse>('/api/auth/login', data);
  return res.data;
};

export const register = async (data: RegisterRequest): Promise<LoginResponse> => {
  const res = await axios.post<LoginResponse>('/api/auth/register', data);
  return res.data;
};

export const logout = async (): Promise<void> => {
    await axios.post('/api/auth/logout');
};
  
  

