import express from 'express';

import { protectRoute, adminRoute } from '../middlewares/auth.middleware.js';
import {
  toggleShowingMovie,
  getAllShowingMovies,
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
} from '../controllers/movie.controller.js';
const router = express.Router();

router.put('/:movieId/showing', protectRoute, adminRoute, toggleShowingMovie);
router.get('/', getAllShowingMovies);
router.get('/all', protectRoute, adminRoute, getAllMovies);
router.get('/:movieId', getMovieById);
router.post('/', protectRoute, adminRoute, createMovie);
router.put('/:movieId', protectRoute, adminRoute, updateMovie);
router.delete('/:movieId', protectRoute, adminRoute, deleteMovie);

export default router;
