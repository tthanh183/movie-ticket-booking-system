import { create } from 'zustand';

import showToast from '../lib/showToast';
import {
  createHallApi,
  deleteHallApi,
  getHallByIdApi,
  getHallsByCinemaIdApi,
  updateHallApi,
} from '../api/hallApi';

export const useHallStore = create(set => ({
  halls: [],
  selectedHall: null,
  hallLoading: false,

  getHallsByCinema: async cinemaId => {
    set({ hallLoading: true });
    try {
      const response = await getHallsByCinemaIdApi(cinemaId);
      if (response.data.success) {
        set({ halls: response.data.halls });
      } else {
        showToast('Failed to fetch halls. Please try again.', 'error');
      }
    } catch (error) {
      showToast(
        error.response.data.message ||
          'Something went wrong. Please try again later.'
      );
    } finally {
      set({ hallLoading: false });
    }
  },

  getHallById: async hallId => {
    set({ hallLoading: true });
    try {
      const response = await getHallByIdApi(hallId);
      if (response.data.success) {
        set({ selectedHall: response.data.hall });
      } else {
        showToast('Failed to fetch hall. Please try again.', 'error');
      }
    } catch (error) {
      showToast(
        error.response.data.message ||
          'Something went wrong. Please try again later.'
      );
    } finally {
      set({ hallLoading: false });
    }
  },
  createHall: async (cinemaId, data) => {
    try {
      const response = await createHallApi(cinemaId, data);
      if (response.data.success) {
        set(state => ({ halls: [...state.halls, response.data.hall] }));
        showToast(response.data.message, 'success');
      }
    } catch (error) {
      showToast(error.response?.data?.message, 'error');
    }
  },
  updateHall: async (cinemaId, hallId, data) => {
    try {
      const response = await updateHallApi(cinemaId, hallId, data);
      if (response.data.success) {
        set(state => ({
          halls: state.halls.map(h =>
            h._id === hallId ? response.data.hall : h
          ),
        }));
        showToast(response.data.message, 'success');
      }
    } catch (error) {
      showToast(error.response?.data?.message, 'error');
    }
  },
  deleteHall: async (cinemaId, hallId) => {
    try {
      const response = await deleteHallApi(cinemaId, hallId);
      if (response.data.success) {
        set(state => ({
          halls: state.halls.filter(h => h._id !== hallId),
        }));
        showToast(response.data.message, 'success');
      }
    } catch (error) {
      showToast(error.response?.data?.message, 'error');
    }
  },
  setSelectedHall: hall => set({ selectedHall: hall }),
  clearSelectedHall: () => set({ selectedHall: null }),
  
}));
