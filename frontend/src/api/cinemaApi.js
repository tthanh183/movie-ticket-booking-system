import axiosInstance from '../lib/axiosInstance';

export const getAllCinemasApi = () => axiosInstance.get('/cinemas');
export const getCinemaByIdApi = cinemaId =>
  axiosInstance.get(`/cinemas/${cinemaId}`);
export const createCinemaApi = data => axiosInstance.post('/cinemas', data);
export const updateCinemaApi = (cinemaId, data) =>
  axiosInstance.put(`/cinemas/${cinemaId}`, data);
export const deleteCinemaApi = cinemaId =>
  axiosInstance.delete(`/cinemas/${cinemaId}`);
