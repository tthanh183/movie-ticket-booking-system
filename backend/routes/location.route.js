import express from 'express';

import { protectRoute, adminRoute } from '../middlewares/auth.middleware.js';
import {
  getAllLocations,
  createLocation,
} from '../controllers/location.controller.js';

const router = express.Router();

router.get('/', getAllLocations);
router.post('/',protectRoute,adminRoute, createLocation);

export default router;
