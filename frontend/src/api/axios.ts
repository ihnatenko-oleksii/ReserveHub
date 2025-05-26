import axios from 'axios';

// Створюємо інстанс з базовою конфігурацією
const api = axios.create({
  baseURL: 'http://localhost:8080/api', // змінити при необхідності
  withCredentials: true, // якщо використовуєш HttpOnly cookie
  xsrfCookieName: 'NO-CSRF',
  xsrfHeaderName: 'NO-CSRF',
});

// Додаємо токен до кожного запиту, якщо він є
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
