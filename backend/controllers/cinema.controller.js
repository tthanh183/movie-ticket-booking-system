import Cinema from '../models/cinema.model.js';
import CinemaHall from '../models/cinemaHall.model.js';
import errorCreator from '../utils/errorCreator.js';

export const getAllCinemas = async (req, res, next) => {
  try {
    const cinemas = await Cinema.find();
    res.status(200).json({
      success: true,
      cinemas,
    });
  } catch (error) {
    console.log('Error in getAllCinemas', error);
    next(error);
  }
};

export const getCinemaById = async (req, res, next) => {
  const { cinemaId } = req.params;

  try {
    const cinema = await Cinema.findById(cinemaId);
    if (!cinema) {
      return next(errorCreator('Cinema not found', 404));
    }
    res.status(200).json({
      success: true,
      cinema,
    });
  } catch (error) {
    console.log('Error in getCinemaById', error);
    next(error);
  }
};

export const createCinema = async (req, res, next) => {
  const { name, location, address, totalHalls } = req.body;
  try {
    const cinema = await Cinema.create({ name, location, address, totalHalls });
    res.status(201).json({
      success: true,
      message: 'Cinema created successfully',
      cinema,
    });
  } catch (error) {
    console.log('Error in createCinema', error);
    next(error);
  }
};

export const updateCinema = async (req, res, next) => {
  const { cinemaId } = req.params;
  const { name, address, totalHalls } = req.body;

  try {
    const cinema = await Cinema.findById(cinemaId);
    if (!cinema) {
      return next(errorCreator('Cinema not found', 404));
    }

    cinema.name = name;
    cinema.address = address;
    cinema.totalHalls = totalHalls;

    await cinema.save();

    res.status(200).json({
      success: true,
      message: 'Cinema updated successfully',
      cinema,
    });
  } catch (error) {
    console.log('Error in updateCinema', error);
    next(error);
  }
};

export const deleteCinema = async (req, res, next) => {
  const { cinemaId } = req.params;
  try {
    const cinema = await Cinema.findById(cinemaId);
    if (!cinema) {
      return next(errorCreator('Cinema not found', 404));
    }

    const cinemaHall = await Cinema.findByIdAndDelete(cinemaId);

    res.status(200).json({
      success: true,
      message: 'Cinema deleted successfully',
    });
  } catch (error) {
    console.log('Error in deleteCinema', error);
    next(error);
  }
};

export const getCinemaHallsByCinemaId = async (req, res, next) => {
  const { cinemaId } = req.params;
  try {
    const cinema = await Cinema.findById(cinemaId);
    if (!cinema) {
      return next(errorCreator('Cinema not found', 404));
    }
    const cinemaHalls = await CinemaHall.find({ cinema: cinemaId });
    res.status(200).json({
      success: true,
      cinemaHalls: cinemaHalls,
    });
  } catch (error) {
    console.log('Error in getCinemaHallsByCinemaId', error);
    next(error);
  }
};

export const createCinemaHall = async (req, res, next) => {
  const { cinemaId } = req.params;
  const { name, totalSeats, status } = req.body;
  try {
    const cinema = await Cinema.findById(cinemaId);
    if (!cinema) {
      return next(errorCreator('Cinema not found', 404));
    }

    const cinemaHall = await CinemaHall.create({
      name,
      totalSeats,
      status,
      cinema: cinemaId,
    });

    res.status(201).json({
      success: true,
      message: 'Hall created successfully',
      cinemaHall: cinemaHall,
    });
  } catch (error) {
    console.log('Error in createCinemaHall', error);
    next(error);
  }
};

export const updateCinemaHall = async (req, res, next) => {
  const { cinemaId, cinemaHallId } = req.params;
  const { name, totalSeats, status } = req.body;

  try {
    const cinema = await Cinema.findById(cinemaId);
    if (!cinema) {
      return next(errorCreator('Cinema not found', 404));
    }

    const cinemaHall = await CinemaHall.findById(cinemaHallId);
    if (!cinemaHall) {
      return next(errorCreator('Cinema Hall not found', 404));
    }

    cinemaHall.name = name;
    cinemaHall.totalSeats = totalSeats;
    cinemaHall.status = status;

    await cinemaHall.save();

    res.status(200).json({
      success: true,
      message: 'Hall updated successfully',
      cinemaHall: cinemaHall,
    });
  } catch (error) {
    console.log('Error in updateCinemaHall', error);
    next(error);
  }
};

export const deleteCinemaHall = async (req, res, next) => {
  const { cinemaId, cinemaHallId } = req.params;
  try {
    const cinema = await Cinema.findById(cinemaId);
    if (!cinema) {
      return next(errorCreator('Cinema not found', 404));
    }

    const cinemaHall = await CinemaHall.findByIdAndDelete(cinemaHallId);

    res.status(200).json({
      success: true,
      message: 'Hall deleted successfully',
    });
  } catch (error) {
    console.log('Error in deleteCinemaHall', error);
    next(error);
  }
};
