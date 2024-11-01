import Showtime from '../models/showtime.model.js';
import Hall from '../models/hall.model.js';
import errorCreator from '../utils/errorCreator.js';
import Movie from '../models/movie.model.js';

export const getShowtimesByHallId = async (req, res, next) => {
  const { hallId } = req.params;
  try {
    const showtimes = await Showtime.find({ hall: hallId }).populate('movie');
    res.status(200).json({
      success: true,
      showtimes,
    });
  } catch (error) {
    errorCreator(error, res);
  }
};

export const getShowtimesByMovieId = async (req, res, next) => {
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


export const createShowTimes = async (req, res, next) => {
  const { hall, movie, startTime, price } = req.body;

  try {
    const movieExists = await Movie.findById(movie);
    if (!movieExists) {
      return next(errorCreator('Movie not found', 404));
    }

    const hallExists = await Hall.findById(hall);
    if (!hallExists) {
      return next(errorCreator('Hall not found', 404));
    }
    const availableSeats = hallExists.totalSeats;

    const duration = movieExists.duration; 
    const startTimeDate = new Date(startTime);
    const endTime = new Date(startTimeDate.getTime() + duration * 60000); 

    const conflictingShowtimes = await Showtime.find({
      hall,
      $or: [{ startTime: { $lt: endTime }, endTime: { $gt: startTimeDate } }],
    });

    if (conflictingShowtimes.length > 0) {
      return next(
        errorCreator('Showtime conflicts with existing showtime', 400)
      );
    }

    const showtime = await Showtime.create({
      hall,
      movie,
      startTime,
      endTime, 
      price,
      availableSeats,
    });

    res.status(201).json({
      success: true,
      message: 'Showtime created successfully',
      showtime,
    });
  } catch (error) {
    console.log('Error in createShowTimes', error);
    next(error);
  }
};

