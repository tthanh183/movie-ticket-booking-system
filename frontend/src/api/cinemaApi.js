import axiosInstance from '../lib/axiosInstance';

export const getAllCinemasApi = () => axiosInstance.get('/cinemas');
export const getCinemaByIdApi = cinemaId =>
  axiosInstance.get(`/cinemas/${cinemaId}`);
export const getAllCinemasByLocationApi = locationId =>
  axiosInstance.get('/cinemas/location', { params: { locationId } });
export const createCinemaApi = data => axiosInstance.post('/cinemas', data);
export const updateCinemaApi = (cinemaId, data) =>
  axiosInstance.put(`/cinemas/${cinemaId}`, data);
export const deleteCinemaApi = cinemaId =>
  axiosInstance.delete(`/cinemas/${cinemaId}`);
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
