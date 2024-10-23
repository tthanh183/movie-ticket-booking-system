import { locations } from '../constants/location.js';

export const getLocations = async (req, res, next) => {
  try {
    const locations = locations;
    res.status(200).json({
      success: true,
      locations,
    });
  } catch (error) {
    console.log('Error in getLocations', error);
    next(error);
  }
};
