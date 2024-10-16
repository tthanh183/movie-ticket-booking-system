import { create } from 'zustand';
import axiosInstance from '../lib/axiosInstance';
import toast from 'react-hot-toast';

export const useUserStore = create((set, get) => ({
  user: null,
  loading: false,
  checkingAuth: true,

  signup: async ({ name, email, password, confirmPassword }) => {
    set({ loading: true });
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      set({ loading: false });
      return;
    }
    try {
      const response = await axiosInstance.post('/auth/signup', {
        name,
        email,
        password,
      });
      if (response.data.success) {
        set({ user: response.data.user, loading: false });
        toast.success(response.data.message);
      } else {
        toast.error('Signup failed. Please try again.');
      }
    } catch (error) {
      toast.error(
        error.response.data.message ||
          'Something went wrong. Please try again later.'
      );
      set({ loading: false });
    }
  },

  login: async ({ email, password }) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.post('/auth/login', {
        email,
        password,
      });

      if (response.data.success) {
        set({ user: response.data.user, loading: false });
        toast.success(response.data.message);
      } else {
        toast.error('Login failed. Please try again.');
      }
    } catch (error) {
      toast.error(
        error.response.data.message ||
          'Something went wrong. Please try again later.'
      );
      set({ loading: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post('/auth/logout');
      set({ user: null });
    } catch (error) {
      toast.error(
        error.response.data.message ||
          'Something went wrong. Please try again later.'
      , { duration: 2000 });
      set({ loading: false });
    }
  },

  checkAuth: async () => {
    set({ checkingAuth: true });
    try {
      const response = await axiosInstance.get('/auth/profile');
      if (response.data.success) {
        set({ user: response.data.user, checkingAuth: false });
      }
    } catch (error) {
      console.log(error.message);
      set({ user: null, checkingAuth: false });
    }
  },

  refreshToken: async () => {
    if (get().checkingAuth) return;
    set({ checkingAuth: true });
    try {
      const response = await axiosInstance.post('/auth/refresh-token');
      if (response.data.success) {
        set({ checkingAuth: false });
      }
      return response.data;
    } catch (error) {
      toast.error(
        error.response.data.message ||
          'Something went wrong. Please try again later.'
      );
      set({ user: null, checkingAuth: false });
    }
  },
}));

let refreshPromise = null;

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // If a refresh is already in progress, wait for it to complete
        if (refreshPromise) {
          await refreshPromise;
          return axiosInstance(originalRequest);
        }

        // Start a new refresh process
        refreshPromise = useUserStore.getState().refreshToken();
        await refreshPromise;
        refreshPromise = null;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // If refresh fails, redirect to login or handle as needed
        useUserStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
