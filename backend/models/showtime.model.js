import mongoose from 'mongoose';

const showtimeSchema = new mongoose.Schema(
  {
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Movie',
      required: true,
      index: true,
    },
    hall: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CinemaHall',
      required: true,
    },
    startTime: {
      type: Date,
      required: [true, 'Start time is required'],
    },
    endTime: {
      type: Date,
      required: [true, 'End time is required'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
    },
    seatsStatus: [
      {
        row: Number,
        col: Number,
        status: {
          type: String,
          enum: ['available', 'booked', 'blocked'],
          default: 'available',
        },
      },
    ],
  },
  { timestamps: true }
);

const Showtime = mongoose.model('Showtime', showtimeSchema);

export default Showtime;
