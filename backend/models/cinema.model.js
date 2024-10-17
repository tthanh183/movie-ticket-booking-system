import mongoose from 'mongoose';

const cinemaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
      trim: true,
    },
    totalHalls: {
      type: Number,
      required: [true, 'Total halls is required'],
    },
  },
  { timestamps: true }
);

const Cinema = mongoose.model('Cinema', cinemaSchema);

export default Cinema;
