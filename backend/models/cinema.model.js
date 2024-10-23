import mongoose from 'mongoose';

const cinemaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Location',
      required: [true, 'Location is required'],
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
      trim: true,
    }
  },
  { timestamps: true }
);

const Cinema = mongoose.model('Cinema', cinemaSchema);

export default Cinema;
