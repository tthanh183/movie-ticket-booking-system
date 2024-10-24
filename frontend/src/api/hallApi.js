import axiosInstance from '../lib/axiosInstance';

export const getHallsByCinemaIdApi = cinemaId =>
  axiosInstance.get(`/cinemas/${cinemaId}/halls`);
export const getHallByIdApi = (cinemaId, hallId) =>
  axiosInstance.get(`/cinemas/${cinemaId}/halls/${hallId}`);
export const createHallApi = (cinemaId, data) =>
  axiosInstance.post(`/cinemas/${cinemaId}/halls`, data);
export const updateHallApi = (cinemaId, hallId, data) =>
  axiosInstance.put(`/cinemas/${cinemaId}/halls/${hallId}`, data);
export const deleteHallApi = (cinemaId, hallId) =>
  axiosInstance.delete(`/cinemas/${cinemaId}/halls/${hallId}`);