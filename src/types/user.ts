export interface User {
  id: string;
  name: string;
  role: string;
  phone?: string;
  company?: string;
  address?: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo?: {
      lat: string;
      lng: string;
    };
  };
  username?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  newUsers: number;
  avgUsersPerDay: number;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface UserFilters {
  name?: string;
  email?: string;
  company?: string;
}

export interface ApiResponse<T> {
  data: T;
  pagination?: PaginationInfo;
}