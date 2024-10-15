import express from 'express';

import {
  login,
  signup,
  logout,
  refreshToken,
  getProfile,
} from '../controllers/auth.controller.js';
import { protectRoute, adminRoute } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.post('/logout', logout);
router.post('/refresh-token', refreshToken);
router.get('/profile', protectRoute, getProfile);

export default router;
