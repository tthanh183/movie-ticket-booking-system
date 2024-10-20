import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    releaseDate: {
      type: Date,
      required: [true, 'Release date is required'],
    },
    director: {
      type: String,
      required: [true, 'Director is required'],
      trim: true,
    },
    cast: {
      type: Array,
      required: [true, 'Cast is required'],
      default: [],
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
    },
    genre: {
      type: Array,
      required: [true, 'Genre is required'],
      default: [],
    },
    duration: {
      type: Number,
      required: [true, 'Duration is required'],
    },
    poster: {
      type: String,
      required: [true, 'Poster is required'],
      trim: true,
    },
    trailer: {
      type: String,
      required: [true, 'Trailer is required'],
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isShowing: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;
