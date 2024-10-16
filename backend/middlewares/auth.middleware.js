import jwt from 'jsonwebtoken';

import User from '../models/user.model.js';
import errorCreator from '../utils/errorCreator.js';

export const protectRoute = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      return next(errorCreator('Unauthorized - No access token provided', 401));
    }

    try {
      const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      const user = await User.findById(decoded.userId).select('-password');

      if (!user) {
        return next(errorCreator('Unauthorized - User not found', 404));
      }

      req.user = user;
      next();
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return next(errorCreator('Unauthorized - Token expired', 401));
      }
    }
  } catch (error) {
    next(error);
  }
};

export const adminRoute = (req, res, next) => {
  if (req.user && req.user.role == 'admin') {
    next();
  } else {
    return next(errorCreator('Access denied - Admin only', 401));
  }
};
