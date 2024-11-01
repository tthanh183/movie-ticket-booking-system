import express from 'express';
import { protectRoute, adminRoute } from '../middlewares/auth.middleware.js';

import { createShowTimes, getShowtimesByHallId, getShowtimesByMovieId } from '../controllers/showtime.controller.js';
const router = express.Router();

router.get('/halls/:hallId', getShowtimesByHallId);
router.get('/movies/:movieId', getShowtimesByMovieId);
router.post('/halls/:hallId', protectRoute, adminRoute, createShowTimes);
router.get('/:id', );

export default router;
