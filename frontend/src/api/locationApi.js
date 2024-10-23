import axiosInstance from '../lib/axiosInstance';

export const getAllLocationsApi = async () => axiosInstance.get('/locations');
export const createLocationApi = async (location) => axiosInstance.post('/locations', location);