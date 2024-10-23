import axiosInstance from '../lib/axiosInstance';

export const getAllShowtimesApi = async () =>
  axiosInstance.get('/api/showtimes');

export const createShowtimeApi = async showtimeData =>
  axiosInstance.post('/api/showtimes', showtimeData);

export const updateShowtimeApi = async (showtimeId, showtimeData) =>
  axiosInstance.put(`/api/showtimes/${showtimeId}`, showtimeData);

export const deleteShowtimeApi = async showtimeId =>
  axiosInstance.delete(`/api/showtimes/${showtimeId}`);
