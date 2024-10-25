import { create } from 'zustand';

import showToast from '../lib/showToast';

import {
  createCinemaApi,
  deleteCinemaApi,
  getAllCinemasApi,
  getCinemaByIdApi,
  updateCinemaApi,
} from '../api/cinemaApi';

const transformCinemasByLocation = cinemas => {
  return cinemas.reduce((acc, cinema) => {
    const location = cinema.location;
    if (!acc[location]) {
      acc[location] = [];
    }
    acc[location].push(cinema);
    return acc;
  }, {});
};

export const useCinemaStore = create((set, get) => ({
  cinemas: [],
  transformedCinemas: {},
  selectedCinema: null,
  cinemaLoading: false,

  getCinemas: async () => {
    set({ cinemaLoading: true });
    try {
      const response = await getAllCinemasApi();
      if (response.data.success) {
        const transformedCinemas = transformCinemasByLocation(
          response.data.cinemas
        );

        set({ cinemas: response.data.cinemas, transformedCinemas });
      } else {
        showToast('Failed to fetch cinemas. Please try again.', 'error');
      }
    } catch (error) {
      showToast(
        error.response.data.message ||
          'Something went wrong. Please try again later.'
      );
    } finally {
      set({ cinemaLoading: false });
    }
  },

  getCinemaById: async id => {
    set({ cinemaLoading: true });
    try {
      const response = await getCinemaByIdApi(id);
      if (response.data.success) {
        set({ selectedCinema: response.data.cinema });
      } else {
        showToast('Failed to fetch cinema. Please try again.', 'error');
      }
    } catch (error) {
      showToast(
        error.response.data.message ||
          'Something went wrong. Please try again later.'
      );
    } finally {
      set({ cinemaLoading: false });
    }
  },

  createCinema: async data => {
    set({ cinemaLoading: true });
    try {
      const response = await createCinemaApi(data);
      if (response.data.success) {
        const updatedCinemas = [...get().cinemas, response.data.cinema];
        const updatedTransformedCinemas =
          transformCinemasByLocation(updatedCinemas);
        set({
          cinemas: updatedCinemas,
          transformedCinemas: updatedTransformedCinemas,
        });
        showToast(response.data.message, 'success');
      } else {
        showToast('Failed to create cinema. Please try again.', 'error');
      }
    } catch (error) {
      showToast(
        error.response.data.message ||
          'Something went wrong. Please try again later.'
      );
    } finally {
      set({ cinemaLoading: false });
    }
  },

  updateCinema: async (id, data) => {
    set({ cinemaLoading: true });
    try {
      const response = await updateCinemaApi(id, data);
      if (response.data.success) {
        const updatedCinemas = get().cinemas.map(cinema =>
          cinema._id === id ? response.data.cinema : cinema
        );
        const updatedTransformedCinemas =
          transformCinemasByLocation(updatedCinemas);
        set({
          cinemas: updatedCinemas,
          transformedCinemas: updatedTransformedCinemas,
        });

        showToast(response.data.message, 'success');
      } else {
        showToast('Failed to update cinema. Please try again.', 'error');
      }
    } catch (error) {
      showToast(
        error.response.data.message ||
          'Something went wrong. Please try again later.'
      );
    } finally {
      set({ cinemaLoading: false });
    }
  },

  deleteCinema: async id => {
    set({ cinemaLoading: true });
    try {
      const response = await deleteCinemaApi(id);
      if (response.data.success) {
        const updatedCinemas = get().cinemas.filter(
          cinema => cinema._id !== id
        );
        const updatedTransformedCinemas =
          transformCinemasByLocation(updatedCinemas);
        set({
          cinemas: updatedCinemas,
          transformedCinemas: updatedTransformedCinemas,
        });
        showToast(response.data.message, 'success');
      } else {
        showToast('Failed to delete cinema. Please try again.', 'error');
      }
    } catch (error) {
      showToast(
        error.response.data.message ||
          'Something went wrong. Please try again later.'
      );
    } finally {
      set({ cinemaLoading: false });
    }
  },
  setSelectedCinema: cinema => set({ selectedCinema: cinema }),
  clearSelectedCinema: () => set({ selectedCinema: null }),
}));
