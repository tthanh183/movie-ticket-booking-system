import express from 'express';

import { protectRoute, adminRoute } from '../middlewares/auth.middleware.js';
import {
  createCinema,
  deleteCinema,
  getAllCinemas,
  getCinemaById,
  updateCinema,
  getCinemaHallsByCinemaId,
  createCinemaHall,
  updateCinemaHall,
  deleteCinemaHall,
} from '../controllers/cinema.controller.js';

const router = express.Router();

router.get('/', protectRoute, adminRoute, getAllCinemas);
router.get('/:cinemaId', protectRoute, adminRoute, getCinemaById);
router.post('/', protectRoute, adminRoute, createCinema);
router.put('/:cinemaId', protectRoute, adminRoute, updateCinema);
router.delete('/:cinemaId', protectRoute, adminRoute, deleteCinema);
router.get(
  '/:cinemaId/halls',
  protectRoute,
  adminRoute,
  getCinemaHallsByCinemaId
);
router.post('/:cinemaId/halls', protectRoute, adminRoute, createCinemaHall);
router.put(
  '/:cinemaId/halls/:cinemaHallId',
  protectRoute,
  adminRoute,
  updateCinemaHall
);
router.delete(
  '/:cinemaId/halls/:cinemaHallId',
  protectRoute,
  adminRoute,
  deleteCinemaHall
);

export default router;
