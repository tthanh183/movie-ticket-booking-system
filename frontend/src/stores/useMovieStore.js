import { create } from 'zustand';

import showToast from '../lib/showToast';
import {
  createMovieApi,
  deleteMovieApi,
  getAllMoviesApi,
  getAllShowingMoviesApi,
  getMovieByIdApi,
  toggleShowingMovieApi,
  updateMovieApi,
} from '../api/movieApi';

export const useMovieStore = create((set, get) => ({
  movies: [],
  filter: 'all',
  searchTerm: '',
  selectedMovie: null,
  movieLoading: false,

  toggleShowingMovie: async id => {
    try {
      const response = await toggleShowingMovieApi(id);
      if (response.data.success) {
        const updatedMovies = get().movies.map(movie =>
          movie._id === id ? response.data.movie : movie
        );
        set({ movies: updatedMovies });
        showToast('Movie status updated successfully.', 'success');
      } else {
        showToast('Failed to update movie status. Please try again.', 'error');
      }
    } catch (error) {
      showToast(
        error.response.data.message ||
          'Something went wrong. Please try again later.'
      );
    }
  },

  getShowingMovies: async () => {
    set({ movieLoading: true });
    try {
      const response = await getAllShowingMoviesApi();
      if (response.data.success) {
        set({ movies: response.data.movies });
      } else {
        showToast('Failed to fetch movies. Please try again.', 'error');
      }
    } catch (error) {
      showToast(
        error.response.data.message ||
          'Something went wrong. Please try again later.'
      );
    } finally {
      set({ movieLoading: false });
    }
  },

  getAllMovies: async () => {
    set({ movieLoading: true });
    try {
      const response = await getAllMoviesApi();
      if (response.data.success) {
        set({ movies: response.data.movies });
      } else {
        showToast('Failed to fetch movies. Please try again.', 'error');
      }
    } catch (error) {
      showToast(
        error.response.data.message ||
          'Something went wrong. Please try again later.'
      );
    } finally {
      set({ movieLoading: false });
    }
  },

  getMovieById: async id => {
    set({ movieLoading: true });
    try {      
      const response = await getMovieByIdApi(id);
      if (response.data.success) {
        set({ selectedMovie: response.data.movie });
      } else {
        showToast('Failed to fetch movie. Please try again.', 'error');
      }
    } catch (error) {
      showToast(
        error.response.data.message ||
          'Something went wrong. Please try again later.'
      );
    } finally {
      set({ movieLoading: false });
    }
  },
  createMovie: async data => {
    set({ movieLoading: true });
    try {
      const response = await createMovieApi(data);
      if (response.data.success) {
        set(prevState => ({
          movies: [...prevState.movies, response.data.movie],
        }));
        showToast('Movie created successfully.', 'success');
      } else {
        showToast('Failed to create movie. Please try again.', 'error');
      }
    } catch (error) {
      showToast(
        error.response.data.message ||
          'Something went wrong. Please try again later.'
      );
    } finally {
      set({ movieLoading: false });
    }
  },
  updateMovie: async (id, data) => {
    set({ movieLoading: true });
    try {
      const response = await updateMovieApi(id, data);
      if (response.data.success) {
        const updatedMovies = get().movies.map(movie =>
          movie._id === id ? response.data.movie : movie
        );
        set({ movies: updatedMovies });
        showToast('Movie updated successfully.', 'success');
      } else {
        showToast('Failed to update movie. Please try again.', 'error');
      }
    } catch (error) {
      showToast(
        error.response.data.message ||
          'Something went wrong. Please try again later.'
      );
    } finally {
      set({ movieLoading: false });
    }
  },
  deleteMovie: async id => {
    set({ movieLoading: true });
    try {
      const response = await deleteMovieApi(id);
      if (response.data.success) {
        const updatedMovies = get().movies.filter(movie => movie._id !== id);
        set({ movies: updatedMovies });
        showToast('Movie deleted successfully.', 'success');
      } else {
        showToast('Failed to delete movie. Please try again.', 'error');
      }
    } catch (error) {
      showToast(
        error.response.data.message ||
          'Something went wrong. Please try again later.'
      );
    } finally {
      set({ movieLoading: false });
    }
  },
  setSelectedMovie: movie => set({ selectedMovie: movie }),
  clearSelectedMovie: () => set({ selectedMovie: null }),
  setFilter: filter => set({ filter }),
  setSearchTerm: term => set({ searchTerm: term }),
  filteredMovies: () => {
    const { movies, filter, searchTerm } = get();
    return movies
      .filter(
        movie => filter === 'all' || (filter === 'showing' && movie.isShowing)
      )
      .filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
  },
}));
