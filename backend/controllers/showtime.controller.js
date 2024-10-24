import Showtime from '../models/showtime.model.js';
import Hall from '../models/hall.model.js';
import errorCreator from '../utils/errorCreator.js';

export const getShowtimesByHallId = async (req, res) => {
  const { hall } = req.params;
  try {
    const showtimes = await Showtime.find({ hall });
    res.status(200).json({
      success: true,
      showtimes,
    });
  } catch (error) {
    errorCreator(error, res);
  }
};
export const getShowtimesByMovieId = async (req, res) => {
  const { movie } = req.params;
  try {
    const showtimes = await Showtime.find({ movie });
    res.status(200).json({
      success: true,
      showtimes,
    });
  } catch (error) {
    errorCreator(error, res);
  }
};
export const createShowTimes = async (req, res) => {
  const { hall, movie, startTime, price } = req.body;
  try {
    const hallExists = await Hall.findById(hall);
    if (!hallExists) {
      return res.status(404).json({
        success: false,
        message: 'Hall not found',
      });
    }
    const availableSeats = hallExists.totalSeats;
    const showtime = await Showtime.create({
      hall,
      movie,
      startTime,
      price,
      availableSeats,
    });

    res.status(201).json({
      success: true,
      message: 'Showtime created successfully',
      showtime,
    });
  } catch (error) {
    errorCreator(error, res);
  }
};
