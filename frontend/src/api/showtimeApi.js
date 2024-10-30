import axiosInstance from '../lib/axiosInstance';

export const getShowtimeByHallIdApi = hallId =>
  axiosInstance.get(`/showtimes/halls/${hallId}`);

export const createShowtimeApi = showtimeData =>
  axiosInstance.post('/showtimes', showtimeData);

export const updateShowtimeApi = (showtimeId, showtimeData) =>
  axiosInstance.put(`/showtimes/${showtimeId}`, showtimeData);

export const deleteShowtimeApi = showtimeId =>
  axiosInstance.delete(`/showtimes/${showtimeId}`);
