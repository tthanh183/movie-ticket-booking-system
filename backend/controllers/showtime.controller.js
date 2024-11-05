import Showtime from '../models/showtime.model.js';
import Hall from '../models/hall.model.js';
import Movie from '../models/movie.model.js';
import Cinema from '../models/cinema.model.js';
import Location from '../models/location.model.js';
import errorCreator from '../utils/errorCreator.js';

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

export const getShowtimesByMovieAndLocation = async (req, res, next) => {
  const { movieId, locationId } = req.params;
  const { date, priceRange } = req.body;

  try {
    const movieExists = await Movie.findById(movieId);
    if (!movieExists) {
      return next(errorCreator('Movie not found', 404));
    }
    const locationExists = await Location.findById(locationId);
    if (!locationExists) {
      return next(errorCreator('Location not found', 404));
    }

    const cinemas = await Cinema.find({ location: locationId });
    if (!cinemas.length) {
      return res.status(200).json({ success: true, showtimesByCinema: [] });
    }

    const cinemaIds = cinemas.map(cinema => cinema._id);
    const halls = await Hall.find({ cinema: { $in: cinemaIds } });
    const hallIds = halls.map(hall => hall._id);

    const query = {
      movie: movieId,
      hall: { $in: hallIds },
    };

    if (date) {
      query.startTime = {
        $gte: new Date(date),
        $lt: new Date(new Date(date).setDate(new Date(date).getDate() + 1)),
      };
    }

    if (priceRange) {
      const [minPrice, maxPrice] = priceRange.split('-').map(Number);
      query.price = {
        $gte: minPrice,
        $lte: maxPrice,
      };
    }

    const showtimes = await Showtime.find(query).populate({
      path: 'hall',
      select: 'name cinema',
      populate: { path: 'cinema', select: 'name' },
    });

    const showtimesByCinema = cinemas.map(cinema => ({
      cinemaId: cinema._id,
      cinemaName: cinema.name,
      showtimes: showtimes
        .filter(
          showtime =>
            showtime.hall &&
            showtime.hall.cinema &&
            showtime.hall.cinema._id.toString() === cinema._id.toString()
        )
        .map(showtime => ({
          id: showtime._id,
          time: showtime.startTime,
          price: showtime.price,
        })),
    }));

    res.status(200).json({ success: true, showtimesByCinema });
  } catch (error) {
    console.error('Error in getShowtimesByMovieAndLocation:', error);
    next(error);
  }
};

export const getShowtimeById = async (req, res, next) => {
  const { showtimeId } = req.params;  
  try {
    const showtime = await Showtime.findById(showtimeId);
    if (!showtime) {
      return next(errorCreator('Showtime not found', 404));
    }
    res.status(200).json({
      success: true,
      showtime,
    });
  } catch (error) {
    errorCreator(error, res);
  }
};
