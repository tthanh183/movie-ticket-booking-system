import express from 'express';
import { protectRoute, adminRoute } from '../middlewares/auth.middleware.js';

import {
  createShowTimes,
  getShowtimesByHallId,
  getShowtimesByMovieId,
  getShowtimesByMovieAndLocation,
  getShowtimeById,
  bookSeats,
  confirmPayment,
} from '../controllers/showtime.controller.js';
const router = express.Router();

router.get('/:showtimeId', getShowtimeById);
router.get('/halls/:hallId', getShowtimesByHallId);
router.get('/movies/:movieId', getShowtimesByMovieId);
router.post(
  '/movies/:movieId/locations/:locationId',
  getShowtimesByMovieAndLocation
);
router.post('/halls/:hallId', protectRoute, adminRoute, createShowTimes);
router.patch('/:showtimeId/seats/book', protectRoute, bookSeats);
router.get('/payment/confirm', protectRoute, confirmPayment);
export default router;
