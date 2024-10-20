import mongoose from 'mongoose';

const hallSchema = new mongoose.Schema(
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

const Hall = mongoose.model('Hall', hallSchema);

export default Hall;
