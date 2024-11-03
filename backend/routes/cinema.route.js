import express from 'express';

import { protectRoute, adminRoute } from '../middlewares/auth.middleware.js';
import {
  createCinema,
  deleteCinema,
  getAllCinemas,
  getCinemaById,
  getAllCinemasByLocation,
  updateCinema,
  getHallsByCinemaId,
  getHallById,
  createHall,
  updateHall,
  deleteHall,
} from '../controllers/cinema.controller.js';

const router = express.Router();

router.get('/', protectRoute, adminRoute, getAllCinemas);
router.get('/location', getAllCinemasByLocation);
router.get('/:cinemaId', protectRoute, adminRoute, getCinemaById);
router.post('/', protectRoute, adminRoute, createCinema);
router.put('/:cinemaId', protectRoute, adminRoute, updateCinema);
router.delete('/:cinemaId', protectRoute, adminRoute, deleteCinema);
router.get('/:cinemaId/halls', protectRoute, adminRoute, getHallsByCinemaId);
router.get('/:cinemaId/halls/:hallId', protectRoute, adminRoute, getHallById);
router.post('/:cinemaId/halls', protectRoute, adminRoute, createHall);
router.put('/:cinemaId/halls/:hallId', protectRoute, adminRoute, updateHall);
router.delete('/:cinemaId/halls/:hallId', protectRoute, adminRoute, deleteHall);

export default router;
