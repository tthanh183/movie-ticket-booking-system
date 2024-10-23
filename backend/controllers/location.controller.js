import Location from '../models/location.model.js';
import errorCreator from '../utils/errorCreator.js';

export const getAllLocations = async (req, res, next) => {
  try {
    const locations = await Location.find();

    res.status(200).json({
      success: true,
      locations,
    });
  } catch (error) {
    console.log('Error in getLocations', error);
    next(error);
  }
};

export const createLocation = async (req, res, next) => {
  const { name } = req.body;
  try {
    const location = await Location.create({ name });

    res.status(201).json({
      success: true,
      message: 'Location created successfully',
      location,
    });
  } catch (error) {
    console.log('Error in createLocation', error);
    next(error);
  }
};

export const getLocationById = async (req, res, next) => {
  const { locationId } = req.params;

  try {
    const location = await Location.findById(locationId);
    if (!location) {
      return next(errorCreator('Location not found', 404));
    }

    res.status(200).json({
      success: true,
      location,
    });
  } catch (error) {
    console.log('Error in getLocationById', error);
    next(error);
  }
}
