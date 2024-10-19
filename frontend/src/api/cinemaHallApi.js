import axiosInstance from '../lib/axiosInstance';

export const getAllCinemaHallsApi = () => axiosInstance.get('/cinemaHalls');
export const getCinemaHallByIdApi = cinemaHallId =>
  axiosInstance.get(`/cinemaHalls/${cinemaHallId}`);
export const createCinemaHallApi = data =>
  axiosInstance.post('/cinemaHalls', data);
export const updateCinemaHallApi = (cinemaHallId, data) =>
  axiosInstance.put(`/cinemaHalls/${cinemaHallId}`, data);
export const deleteCinemaHallApi = cinemaHallId =>
  axiosInstance.delete(`/cinemaHalls/${cinemaHallId}`);
