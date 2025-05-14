export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  country?: string;
  description?: string;

  avatarUrl?: string;
  rating?: number;

  role: 'CLIENT' | 'PROVIDER' | 'ADMIN';
  createdAt: string;
}

  export interface Reservation {
    id: string;
    serviceId: string;
    clientId: string;
    providerId: string;
    date: string;       // формат ISO: "2025-05-08T14:00:00Z"
    durationMinutes: number;
    status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
    notes?: string;     // додаткові побажання
    createdAt: string;
  }
  export interface RegisterRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role?: 'CLIENT' | 'PROVIDER'; // не передається якщо не вибрано, або дефолт на бекенді
  }
  export interface LoginRequest {
    email: string;
    password: string;
  }
  export interface LoginResponse {
    token: string;           // JWT або session token
    user: {
      id: string;
      fullName: string;
      email: string;
      role: 'CLIENT' | 'PROVIDER' | 'ADMIN';
      avatarUrl?: string;
    };
  }
          