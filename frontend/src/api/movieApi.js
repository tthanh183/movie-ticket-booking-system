import axiosInstance from '../lib/axiosInstance';

export const toggleShowingMovieApi = movieId =>
  axiosInstance.put(`/movies/${movieId}/showing/`);
export const getAllShowingMoviesApi = () => axiosInstance.get('/movies');
export const getAllMoviesApi = () => axiosInstance.get('/movies/all');
export const getMovieByIdApi = movieId =>
  axiosInstance.get(`/movies/${movieId}`);
export const createMovieApi = data => axiosInstance.post('/movies', data);
export const updateMovieApi = (movieId, data) =>
  axiosInstance.put(`/movies/${movieId}`, data);
export const deleteMovieApi = movieId =>
  axiosInstance.delete(`/movies/${movieId}`);
