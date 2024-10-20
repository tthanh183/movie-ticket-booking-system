import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const cinemaHallSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    cinema: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cinema',
      required: true,
    },
    totalSeats: {
      type: Number,
      required: [true, 'Total seats is required'],
      default: 100,
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'maintenance'],
      default: 'active',
    },
  },
  { timestamps: true }
);

const CinemaHall = mongoose.model('CinemaHall', cinemaHallSchema);

export default CinemaHall;
