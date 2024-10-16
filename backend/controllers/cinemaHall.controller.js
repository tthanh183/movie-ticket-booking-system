import Cinema from '../models/cinema.model.js';
import CinemaHall from '../models/cinemaHall.model.js';
import errorCreator from '../utils/errorCreator.js';

export const getAllCinemaHalls = async (req, res, next) => {
  try {
    const cinemaHalls = await CinemaHall.find();
    res.status(200).json({
      success: true,
      cinemaHalls,
    });
  } catch (error) {
    console.log('Error in getAllCinemaHalls', error);
    next(error);
  }
};

export const getCinemaHallById = async (req, res, next) => {
  const { cinemaHallId } = req.params;

  try {
    const cinemaHall = await CinemaHall.findById(cinemaHallId);
    if (!cinemaHall) {
      return next(errorCreator('Cinema Hall not found', 404));
    }
    res.status(200).json({
      success: true,
      cinemaHall,
    });
  } catch (error) {
    console.log('Error in getCinemaHallById', error);
    next(error);
  }
};

export const createCinemaHall = async (req, res, next) => {
  const { name, totalSeats, cinemaId } = req.body;
  try {
    const cinema = await Cinema.findById(cinemaId);
    if (!cinema) {
      return next(errorCreator('Cinema not found', 404));
    }

    const cinemaHall = await CinemaHall.create({ name, totalSeats, cinemaId });
    res.status(201).json({
      success: true,
      cinemaHall,
    });
  } catch (error) {
    console.log('Error in createCinemaHall', error);
    next(error);
  }
};

export const updateCinemaHall = async (req, res, next) => {
  const { cinemaHallId } = req.params;
  const { name, totalSeats } = req.body;

  try {
    const cinemaHall = await CinemaHall.findById(cinemaHallId);
    if (!cinemaHall) {
      return next(errorCreator('Cinema Hall not found', 404));
    }

    cinemaHall.name = name;
    cinemaHall.totalSeats = totalSeats;

    await cinemaHall.save();

    res.status(200).json({
      success: true,
      cinemaHall,
    });
  } catch (error) {
    console.log('Error in updateCinemaHall', error);
    next(error);
  }
};

export const deleteCinemaHall = async (req, res, next) => {
  const { cinemaHallId } = req.params;

  try {
    const cinemaHall = await CinemaHall.findById(cinemaHallId);
    if (!cinemaHall) {
      return next(errorCreator('Cinema Hall not found', 404));
    }

    await cinemaHall.findByIdAndDelete(cinemaHallId);

    res.status(200).json({
      success: true,
      message: 'Cinema hall deleted successfully',
    });
  } catch (error) {
    console.log('Error in deleteCinemaHall', error);
    next(error);
  }
};
