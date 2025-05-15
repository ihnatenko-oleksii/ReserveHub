import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080', // lub import.meta.env.VITE_API_URL
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default instance;
