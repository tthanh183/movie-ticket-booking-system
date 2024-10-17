import { create } from 'zustand';
import showToast from '../lib/showToast';
import {
  signupApi,
  loginApi,
  logoutApi,
  checkAuthApi,
  refreshTokenApi,
} from '../api/authApi';
import axiosInstance from '../lib/axiosInstance';

export const useUserStore = create((set, get) => ({
  user: null,
  loading: false,
  checkingAuth: true,

  signup: async ({ name, email, password, confirmPassword }) => {
    set({ loading: true });
    if (password !== confirmPassword) {
      showToast('Passwords do not match.', 'error');
      set({ loading: false });
      return;
    }
    try {
      const response = await signupApi({ name, email, password });
      if (response.data.success) {
        set({ user: response.data.user, loading: false });
        showToast(response.data.message, 'success');
      } else {
        showToast('Signup failed. Please try again.', 'error');
      }
    } catch (error) {
      showToast(
        error.response.data.message ||
          'Something went wrong. Please try again later.'
      );
      set({ loading: false });
    }
  },

  login: async ({ email, password }) => {
    set({ loading: true });
    try {
      const response = await loginApi({ email, password });
      if (response.data.success) {
        set({ user: response.data.user, loading: false });
        showToast(response.data.message, 'success');
      } else {
        showToast('Login failed. Please try again.', 'error');
      }
    } catch (error) {
      showToast(
        error.response.data.message ||
          'Something went wrong. Please try again later.'
      );
      set({ loading: false });
    }
  },

  logout: async () => {
    try {
      await logoutApi();
      set({ user: null });
    } catch (error) {
      showToast(
        error.response.data.message ||
          'Something went wrong. Please try again later.'
      );
      set({ loading: false });
    }
  },

  checkAuth: async () => {
    set({ checkingAuth: true });
    try {
      const response = await checkAuthApi();
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
      const response = await refreshTokenApi();
      if (response.data.success) {
        set({ checkingAuth: false });
      }
      return response.data;
    } catch (error) {
      showToast(
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
