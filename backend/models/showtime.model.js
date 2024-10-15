import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const showtimeSchema = new mongoose.Schema(
  {
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Movie',
      required: true,
      index: true,
    },
    cinemaHall: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CinemaHall',
      required: true,
    },
    startTime: {
      type: Date,
      required: [true, 'Start time is required'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
    },
    availableSeats: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seat',
      },
    ],
  },
  { timestamps: true }
);

const Showtime = mongoose.model('Showtime', showtimeSchema);

export default Showtime;
