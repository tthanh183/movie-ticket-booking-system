import jwt from 'jsonwebtoken';

import User from '../models/user.model.js';
import errorCreator from '../utils/errorCreator.js';
import { redis } from '../lib/redis.js';
import {
  generateTokens,
  storeRefreshToken,
  setCookies,
} from '../utils/auth.util.js';

export const signup = async (req, res, next) => {
  const { email, password, name } = req.body;

  try {
    const existedUser = await User.findOne({ email });

    if (existedUser) {
      return next(errorCreator('User already exists', 400));
    }

    const user = await User.create({ name, email, password });

    const { accessToken, refreshToken } = generateTokens(user._id);
    await storeRefreshToken(user._id, refreshToken);
    setCookies(res, accessToken, refreshToken);

    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: userResponse,
    });
  } catch (error) {
    console.log('Error in signup', error);
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await user.comparePassword(password))) {
      const { accessToken, refreshToken } = generateTokens(user._id);
      await storeRefreshToken(user._id, refreshToken);
      setCookies(res, accessToken, refreshToken);

      const userResponse = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      };
      res.status(200).json({
        success: true,
        message: 'Login successfully',
        user: userResponse,
      });
    } else {
      return next(errorCreator('Invalid credentials', 400));
    }
  } catch (error) {
    console.log('Error in login', error);
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken) {
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
      await redis.del(`refresh_token:${decoded.userId}`);
    }

    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.status(200).json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    console.log('Error in logout', error);
    next(error);
  }
};

export const refreshToken = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return next(
        errorCreator('Unauthorized - No refresh token provided', 401)
      );
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const token = await redis.get(`refresh_token:${decoded.userId}`);

    if (refreshToken !== token) {
      return next(errorCreator('Unauthorized - Invalid refresh token', 401));
    }

    const accessToken = jwt.sign(
      { userId: decoded.userId },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' }
    );

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000,
    });

    res
      .status(200)
      .json({ success: true, message: 'Token refreshed successfully' });
  } catch (error) {
    console.log('Error in refreshToken', error);
    next(error);
  }
};

export const getProfile = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, user: req.user });
  } catch (error) {
    console.log('Error in getProfile', error);
    next(error);
  }
};
