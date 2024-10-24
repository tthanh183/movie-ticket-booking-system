import { create } from 'zustand';

import showToast from '../lib/showToast';
import { getAllLocationsApi } from '../api/locationApi';

export const useLocationsStore = create(set => ({
  locations: [],
  locationLoading: false,

  getLocations: async () => {
    set({ locationLoading: true });
    try {
      const response = await getAllLocationsApi();
      if (response.data.success) {
        set({ locations: response.data.locations });
      } else {
        showToast('Failed to fetch locations. Please try again.', 'error');
      }
    } catch (error) {
      showToast(
        error.response.data.message ||
          'Something went wrong. Please try again later.'
      );
    } finally {
      set({ locationLoading: false });
    }
  },
}));
