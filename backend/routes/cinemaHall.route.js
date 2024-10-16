import express from 'express';

import { adminRoute, protectRoute } from '../middlewares/auth.middleware.js';
import {
  createCinemaHall,
  getAllCinemaHalls,
  getCinemaHallById,
  updateCinemaHall,
  deleteCinemaHall,
} from '../controllers/cinemaHall.controller.js';

const router = express.Router();

router.get('/', protectRoute, adminRoute, getAllCinemaHalls);
router.get('/:cinemaHallId', protectRoute, adminRoute, getCinemaHallById);
router.post('/', protectRoute, adminRoute, createCinemaHall);
router.put('/:cinemaHallId', protectRoute, adminRoute, updateCinemaHall);
router.delete('/:cinemaHallId', protectRoute, adminRoute, deleteCinemaHall);

export default router;
