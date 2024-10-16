import express from 'express';

import { protectRoute, adminRoute } from '../middlewares/auth.middleware.js';
import {
  createCinema,
  deleteCinema,
  getAllCinemas,
  getCinemaById,
  updateCinema,
} from '../controllers/cinema.controller.js';

const router = express.Router();

router.get('/', protectRoute, adminRoute, getAllCinemas);
router.get('/:cinemaId', protectRoute, adminRoute, getCinemaById);
router.post('/', protectRoute, adminRoute, createCinema);
router.put('/:cinemaId', protectRoute, adminRoute, updateCinema);
router.delete('/:cinemaId', protectRoute, adminRoute, deleteCinema);

export default router;
