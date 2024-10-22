import express from 'express';

import { protectRoute, adminRoute } from '../middlewares/auth.middleware.js';
import {
  getShowingMovies,
  toggleShowingMovie,
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
} from '../controllers/movie.controller.js';
const router = express.Router();

router.get('/showing', getShowingMovies);
router.put('/showing/:movieId', protectRoute, adminRoute, toggleShowingMovie);
router.get('/', protectRoute, adminRoute, getAllMovies);
router.get('/:movieId', getMovieById);
router.post('/', protectRoute, adminRoute, createMovie);
router.put('/:movieId', protectRoute, adminRoute, updateMovie);
router.delete('/:movieId', protectRoute, adminRoute, deleteMovie);

export default router;
