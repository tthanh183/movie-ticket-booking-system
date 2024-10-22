import axiosInstance from '../lib/axiosInstance';

export const getShowingMoviesApi = async () =>
  axiosInstance.get('/movies/showing');
export const toggleShowingMovieApi = async movieId =>
  axiosInstance.put(`/movies/showing/${movieId}`);
export const getAllMoviesApi = async () => axiosInstance.get('/movies');
export const getMovieByIdApi = async movieId =>
  axiosInstance.get(`/movies/${movieId}`);
export const createMovieApi = async data => axiosInstance.post('/movies', data);
export const updateMovieApi = async (movieId, data) =>
  axiosInstance.put(`/movies/${movieId}`, data);
export const deleteMovieApi = async movieId =>
  axiosInstance.delete(`/movies/${movieId}`);