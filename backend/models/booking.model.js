import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    showtime: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Showtime',
      required: true,
    },
    seats: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seat',
      },
    ],
    totalPrice: {
      type: Number,
      required: [true, 'Price is required'],
    },
    status: {
      type: String,
      enum: ['Pending', 'Completed', 'Cancelled'],
      default: 'Pending',
    },
    bookingTime: {
      type: Date,
      default: Date.now,
    },
    stripeSessionId: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);
