import axiosInstance from '../lib/axiosInstance';

export const signupApi = data => axiosInstance.post('/auth/signup', data);
export const loginApi = data => axiosInstance.post('/auth/login', data);
export const logoutApi = () => axiosInstance.post('/auth/logout');
export const checkAuthApi = () => axiosInstance.get('/auth/profile');
export const refreshTokenApi = () => axiosInstance.post('/auth/refresh-token');