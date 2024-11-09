import axiosInstance from '../lib/axiosInstance';

export const getShowtimeByIdApi = async showtimeId =>
  await axiosInstance.get(`/showtimes/${showtimeId}`);
export const getShowtimeByHallIdApi = async hallId =>
  await axiosInstance.get(`/showtimes/halls/${hallId}`);

export const createShowtimeApi = async (hallId, showtimeData) =>
  await axiosInstance.post(`/showtimes/halls/${hallId}`, showtimeData);

export const updateShowtimeApi = async (showtimeId, showtimeData) =>
  await axiosInstance.put(`/showtimes/${showtimeId}`, showtimeData);

export const deleteShowtimeApi = async showtimeId =>
  await axiosInstance.delete(`/showtimes/${showtimeId}`);

export const getShowtimesByMovieAndLocationApi = async (
  movieId,
  locationId,
  filters
) =>
  await axiosInstance.post(
    `/showtimes/movies/${movieId}/locations/${locationId}`,
    filters
  );

export const bookSeatsApi = async (showtimeId, seats) =>
  await axiosInstance.patch(`/showtimes/${showtimeId}/seats/book`, { seats });

export const confirmPaymentApi = async sessionId =>
  await axiosInstance.get(`/showtimes/payment/confirm?session_id=${sessionId}`);
