export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  description: string;
  avatarUrl?: string;
  rating?: number;

  firstName: string;
  lastName: string;

  role: 'USER' | 'ADMIN';
  createdAt: string;
}

  export interface Reservation {
    id: string;
    serviceId: string;
    clientId: string;
    providerId: string;
    date: string;
    durationMinutes: number;
    status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
    notes?: string;
    createdAt: string;
  }
  export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
    role?: 'USER';
  }
  export interface LoginRequest {
    email: string;
    password: string;
  }
  export interface LoginResponse {
    token: string;
    user: User;
  }
          