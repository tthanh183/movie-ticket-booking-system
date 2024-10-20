import Cinema from '../models/cinema.model.js';
import Hall from '../models/hall.model.js';
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

export const getHallsByCinemaId = async (req, res, next) => {
  const { cinemaId } = req.params;
  try {
    const cinema = await Cinema.findById(cinemaId);
    if (!cinema) {
      return next(errorCreator('Cinema not found', 404));
    }
    const halls = await Hall.find({ cinema: cinemaId });
    res.status(200).json({
      success: true,
      halls: halls,
    });
  } catch (error) {
    console.log('Error in getHallsByCinemaId', error);
    next(error);
  }
};

export const createHall = async (req, res, next) => {
  const { cinemaId } = req.params;
  const { name, totalSeats, status } = req.body;
  try {
    const cinema = await Cinema.findById(cinemaId);
    if (!cinema) {
      return next(errorCreator('Cinema not found', 404));
    }

    const hall = await Hall.create({
      name,
      totalSeats,
      status,
      cinema: cinemaId,
    });

    res.status(201).json({
      success: true,
      message: 'Hall created successfully',
      hall: hall,
    });
  } catch (error) {
    console.log('Error in createHall', error);
    next(error);
  }
};

export const updateHall = async (req, res, next) => {
  const { cinemaId, hallId } = req.params;
  const { name, totalSeats, status } = req.body;

  try {
    const cinema = await Cinema.findById(cinemaId);
    if (!cinema) {
      return next(errorCreator('Cinema not found', 404));
    }

    const hall = await Hall.findById(hallId);
    if (!hall) {
      return next(errorCreator('Hall not found', 404));
    }

    hall.name = name;
    hall.totalSeats = totalSeats;
    hall.status = status;

    await hall.save();

    res.status(200).json({
      success: true,
      message: 'Hall updated successfully',
      hall: hall,
    });
  } catch (error) {
    console.log('Error in updateHall', error);
    next(error);
  }
};

export const deleteHall = async (req, res, next) => {
  const { cinemaId, hallId } = req.params;
  try {
    const cinema = await Cinema.findById(cinemaId);
    if (!cinema) {
      return next(errorCreator('Cinema not found', 404));
    }

    const hall = await Hall.findByIdAndDelete(hallId);

    res.status(200).json({
      success: true,
      message: 'Hall deleted successfully',
    });
  } catch (error) {
    console.log('Error in deleteHall', error);
    next(error);
  }
};
