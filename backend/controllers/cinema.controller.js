import mongoose from 'mongoose';
import Cinema from '../models/cinema.model.js';
import Hall from '../models/hall.model.js';
import Location from '../models/location.model.js';
import errorCreator from '../utils/errorCreator.js';

const countHalls = async cinemaId => {
  return await Hall.countDocuments({ cinema: cinemaId });
};

export const getAllCinemas = async (req, res, next) => {
  try {
    const cinemas = await Cinema.find().populate({
      path: 'location',
      select: 'name',
    });
    const modifiedCinemas = await Promise.all(
      cinemas.map(async cinema => {
        const totalHalls = await countHalls(cinema._id);
        return {
          ...cinema._doc,
          location: cinema.location.name,
          totalHalls,
        };
      })
    );

    res.status(200).json({
      success: true,
      cinemas: modifiedCinemas,
    });
  } catch (error) {
    console.log('Error in getAllCinemas', error);
    next(error);
  }
};

export const getAllCinemasByLocation = async (req, res, next) => {
  const { locationId } = req.query;
  try {
    const cinemas = await Cinema.find({ location: locationId });
    const modifiedCinemas = await Promise.all(
      cinemas.map(async cinema => {
        const totalHalls = await countHalls(cinema._id);
        return {
          ...cinema._doc,
          totalHalls,
        };
      })
    );

    res.status(200).json({
      success: true,
      cinemas: modifiedCinemas,
    });
  } catch (error) {
    console.log('Error in getAllCinemasByLocation', error);
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

    const totalHalls = await countHalls(cinemaId);

    res.status(200).json({
      success: true,
      cinema: {
        ...cinema._doc,
        totalHalls,
      },
    });
  } catch (error) {
    console.log('Error in getCinemaById', error);
    next(error);
  }
};

export const createCinema = async (req, res, next) => {
  const { name, location, address } = req.body;
  try {
    const cinema = await Cinema.create({
      name,
      location,
      address,
      totalHalls: 0,
    });
    const locationExists = await Location.findById(location);

    if (!locationExists) {
      return next(errorCreator('Location not found', 404));
    }

    res.status(201).json({
      success: true,
      message: 'Cinema created successfully',
      cinema: {
        ...cinema._doc,
        location: locationExists.name,
        totalHalls: 0,
      },
    });
  } catch (error) {
    console.log('Error in createCinema', error);
    next(error);
  }
};

export const updateCinema = async (req, res, next) => {
  const { cinemaId } = req.params;
  const { name, address, location } = req.body;

  try {
    const cinema = await Cinema.findById(cinemaId);
    if (!cinema) {
      return next(errorCreator('Cinema not found', 404));
    }

    cinema.name = name;
    cinema.address = address;

    const totalHalls = await countHalls(cinemaId);
    await cinema.save();

    res.status(200).json({
      success: true,
      message: 'Cinema updated successfully',
      cinema: {
        ...cinema._doc,
        location: location,
        totalHalls,
      },
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

    await Hall.deleteMany({ cinema: cinemaId });
    await Cinema.findByIdAndDelete(cinemaId);

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

export const getHallById = async (req, res, next) => {
  const { cinemaId, hallId } = req.params;
  try {
    const cinema = await Cinema.findById(cinemaId);
    if (!cinema) {
      return next(errorCreator('Cinema not found', 404));
    }
    const hall = await Hall.findById(hallId);
    if (!hall) {
      return next(errorCreator('Hall not found', 404));
    }
    res.status(200).json({
      success: true,
      hall: hall,
    });
  } catch (error) {
    console.log('Error in getHallById', error);
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

    const seatsPerRow = 10;
    const numberOfRows = Math.ceil(totalSeats / seatsPerRow);

    const seatLayout = [];

    for (let row = 0; row < numberOfRows; row++) {
      const seatsInRow = [];
      for (let col = 0; col < seatsPerRow; col++) {
        const seatNumber = row * seatsPerRow + col + 1;
        if (seatNumber > totalSeats) break;
        seatsInRow.push({
          col,
          status: 'available',
        });
      }
      seatLayout.push({
        row,
        seats: seatsInRow,
      });
    }

    const hall = await Hall.create({
      name,
      totalSeats,
      status,
      cinema: cinemaId,
      seatLayout,
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
