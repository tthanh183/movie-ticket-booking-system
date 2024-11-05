import express from 'express';
import { protectRoute, adminRoute } from '../middlewares/auth.middleware.js';

import {
  createShowTimes,
  getShowtimesByHallId,
  getShowtimesByMovieId,
  getShowtimesByMovieAndLocation,
  getShowtimeById,
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

export default router;
