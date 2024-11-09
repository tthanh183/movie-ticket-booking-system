import Showtime from '../models/showtime.model.js';
import Hall from '../models/hall.model.js';
import Movie from '../models/movie.model.js';
import Cinema from '../models/cinema.model.js';
import Location from '../models/location.model.js';
import errorCreator from '../utils/errorCreator.js';

import { stripe } from '../lib/stripe.js';

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

    const seatsStatus = hallExists.seatLayout.map(rowItem => ({
      row: rowItem.row,
      seats: rowItem.seats.map(seat => ({
        col: seat.col,
        status: 'available',
      })),
    }));

    const showtime = await Showtime.create({
      hall,
      movie,
      startTime,
      endTime,
      price,
      seatsStatus,
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
    const showtime = await Showtime.findById(showtimeId).populate(
      'hall',
      'seatLayout'
    );
    if (!showtime) {
      return next(errorCreator('Showtime not found', 404));
    }
    res.status(200).json({
      success: true,
      showtime,
    });
  } catch (error) {
    console.log('Error in getShowtimeById', error);
    next(error);
  }
};

export const bookSeats = async (req, res, next) => {
  const { showtimeId } = req.params;
  const { seats } = req.body;

  try {
    const showtime = await Showtime.findById(showtimeId);
    if (!showtime) {
      return next(errorCreator('Showtime not found', 404));
    }

    const hall = await Hall.findById(showtime.hall);
    if (!hall) {
      return next(errorCreator('Hall not found', 404));
    }

    if (!showtime.seatsStatus || showtime.seatsStatus.length === 0) {
      showtime.seatsStatus = hall.seatLayout.map(rowItem => ({
        row: rowItem.row,
        seats: rowItem.seats.map(seat => ({
          col: seat.col,
          status: 'available',
        })),
      }));
    }

    for (let seatRequest of seats) {
      const rowItem = showtime.seatsStatus.find(
        seat => seat.row === Number(seatRequest.row)
      );
      if (!rowItem) {
        return next(errorCreator(`Row ${seatRequest.row} not found`, 404));
      }

      const seat = rowItem.seats.find(s => s.col === Number(seatRequest.col));
      if (!seat) {
        return next(errorCreator(`Seat ${seatRequest.col} not found`, 404));
      }

      if (seat.status === 'booked') {
        return next(
          errorCreator(
            `Seat ${seatRequest.row}-${seatRequest.col} is already booked`,
            400
          )
        );
      }

      if ((seat.status = 'available')) {
        seat.status = 'blocked';
      }
    }

    await showtime.save();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: seats.map(seatRequest => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: `Seat ${seatRequest.row}-${seatRequest.col}`,
          },
          unit_amount: showtime.price * 100,
        },
        quantity: 1,
      })),
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/payment-cancel`,
      metadata: {
        showtimeId: showtime._id.toString(),
        seats: JSON.stringify(seats),
      },
    });

    res.status(200).json({
      success: true,
      message: 'Your seats are blocked for 10 minutes',
      checkout_url: session.url,
    });
  } catch (error) {
    console.log('Error in bookSeats', error);
    next(error);
  }
};

export const confirmPayment = async (req, res, next) => {
  const { session_id } = req.query;

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    
    const seats = JSON.parse(session.metadata.seats);

    const showtime = await Showtime.findById(session.metadata.showtimeId);
    if (!showtime) {
      return next(errorCreator('Showtime not found', 404));
    }

    for (let seatRequest of seats) {
      const rowItem = showtime.seatsStatus.find(
        seat => seat.row === Number(seatRequest.row)
      );
      if (!rowItem) {
        return next(errorCreator(`Row ${seatRequest.row} not found`, 404));
      }

      const seat = rowItem.seats.find(s => s.col === Number(seatRequest.col));
      if (!seat) {
        return next(errorCreator(`Seat ${seatRequest.col} not found`, 404));
      }

      if (seat.status === 'blocked') {
        seat.status = 'booked';
      }
    }

    await showtime.save();

    res.status(200).json({
      success: true,
      message: 'Seats booked successfully',
    });
  } catch (error) {
    console.log('Error in confirmPayment', error);
    next(error);
  }
};
