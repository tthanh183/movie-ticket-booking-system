import mongoose from 'mongoose';

const seatSchema = new mongoose.Schema(
  {
    number: {
      type: Number,
      required: [true, 'Number is required'],
    },
    hall: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CinemaHall',
      required: true,
    },
  },
  { timestamps: true }
);

const Seat = mongoose.model('Seat', seatSchema);

export default Seat;
