import { create } from 'zustand';

import showToast from '../lib/showToast';
import { createShowtimeApi, getShowtimeByHallIdApi } from '../api/showtimeApi';

export const useShowtimeStore = create((set, get) => ({
  showtimes: [],
  selectedShowtime: null,
  showtimeLoading: false,

  getShowtimesByHall: async hallId => {
    set({ showtimeLoading: true });
    try {
      console.log(hallId);
      const response = await getShowtimeByHallIdApi(hallId);

      if (response.data.success) {
        set({ showtimes: response.data.showtimes });
        console.log(response.data.showtimes);
      } else {
        showToast('Failed to fetch showtimes. Please try again.', 'error');
      }
    } catch (error) {
      showToast(
        error.response.data.message ||
          'Something went wrong. Please try again later.'
      );
    } finally {
      set({ showtimeLoading: false });
    }
  },
  
  createShowtime: async (hallId, showtime) => {
    set({ showtimeLoading: true });
    try {
      const response = await createShowtimeApi(hallId, showtime);
      if (response.data.success) {
        showToast(response.data.message, 'success');
        const updatedShowtimes = [...get().showtimes, response.data.showtime];
        set({ showtimes: updatedShowtimes });
      }
    } catch (error) {
      showToast(
        error.response.data.message ||
          'Something went wrong. Please try again later.',
        'error'
      );
    } finally {
      set({ showtimeLoading: false });
    }
  },

  setSelectedShowtime: showtime => set({ selectedShowtime: showtime }),
  clearSelectedShowtime: () => set({ selectedShowtime: null }),
}));
