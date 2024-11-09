import axiosInstance from '../lib/axiosInstance';

export const getAllLocationsApi = () => axiosInstance.get('/locations');
export const createLocationApi = (location) => axiosInstance.post('/locations', location);