import api from '../api/axios';
import { LoginRequest, LoginResponse, RegisterRequest } from '../types/types';

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const res = await api.post<LoginResponse>('/auth/login', data);
  return res.data;
};

export const register = async (data: RegisterRequest): Promise<LoginResponse> => {
  const res = await api.post<LoginResponse>('/auth/register', data);
  return res.data;
};

export const logout = async (): Promise<void> => {
  await api.post('/auth/logout');
};
