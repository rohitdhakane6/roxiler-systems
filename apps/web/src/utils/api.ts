import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3001/api",
});

// automatically attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// API response interceptor for consistent error handling
api.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (error && typeof error === "object" && "response" in error) {
      const axiosError = error as { response?: { status?: number } };
      if (axiosError.response?.status === 401) {
        // Clear auth data on unauthorized
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
        console.log(error);
      }
    }
    return Promise.reject(error);
  }
);

// API Types based on backend responses
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: {
    message: string;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  address: string;
  role: "ADMIN" | "USER" | "STORE_OWNER";
  createdAt: string;
  updatedAt: string;
}

export interface Store {
  id: string;
  name: string;
  address: string;
  ownerId: string;
  averageRating?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Rating {
  id: string;
  storeId: string;
  userId: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
  store?: {
    id: string;
    name: string;
    address: string;
  };
}

export interface StoreWithRating extends Store {
  userRating: number | null;
}

export interface AuthData {
  token: string;
  user: {
    id: string;
    name: string;
    role: "ADMIN" | "USER" | "STORE_OWNER";
  };
}

// Auth API functions
export const authApi = {
  login: (data: { email: string; password: string }) =>
    api.post<ApiResponse<AuthData>>("/auth/login", data),

  signup: (data: {
    name: string;
    email: string;
    address: string;
    password: string;
  }) => api.post<ApiResponse<AuthData>>("/auth/signup", data),

  updatePassword: (data: { currentPassword: string; newPassword: string }) =>
    api.post<ApiResponse>("/auth/update-password", data),
};

// User API functions (USER role specific)
export const userApi = {
  getAllStores: () =>
    api.get<ApiResponse<{ stores: StoreWithRating[] }>>("/user/stores"),

  updateRating: (storeId: string, rating: number) =>
    api.put<ApiResponse<{ rating: Rating }>>(`/user/ratings/${storeId}`, {
      rating,
    }),
};

// Store API functions (STORE_OWNER role specific)
export const storeApi = {
  getMyStore: () => api.get<ApiResponse<Store>>("/store"),
  createStore: (data: { name: string; address: string }) =>
    api.post<ApiResponse<Store>>("/store", data),
  updateStore: (data: { name: string; address: string }) =>
    api.put<ApiResponse<Store>>("/store", data),
  getMyStoreRatings: () =>
    api.get<
      ApiResponse<
        Array<{
          id: string;
          rating: number;
          createdAt: string;
          updatedAt: string;
          user: { id: string; name: string; email: string };
        }>
      >
    >("/store/ratings"),
  getStoreAnalytics: () =>
    api.get<
      ApiResponse<{
        store: { id: string; name: string; address: string };
        statistics: {
          averageRating: number;
          totalRatings: number;
          rating1: number;
          rating2: number;
          rating3: number;
          rating4: number;
          rating5: number;
        };
        recentRatings: Array<{
          id: string;
          rating: number;
          createdAt: string;
          user: { name: string };
        }>;
      }>
    >("/store/analytics"),
};
