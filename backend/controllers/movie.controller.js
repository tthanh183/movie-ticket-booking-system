import Movie from '../models/movie.model.js';
import errorCreator from '../utils/errorCreator.js';

export const getShowingMovies = async (req, res) => {
  try {
    const movies = await Movie.find({ isShowing: true });
    res.status(200).json({ success: true, movies });
  } catch (error) {
    console.log('Error in getShowingMovies', error);
    next(error);
  }
};

export const toggleShowingMovie = async (req, res) => {
  const { movieId } = req.params;
  try {
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return next(errorCreator('Movie not found', 404));
    }

    movie.isShowing = !movie.isShowing;
    await movie.save();
    res.status(200).json({
      success: true,
      message: 'Movie showing status updated successfully',
      movie,
    });
  } catch (error) {
    console.log('Error in toggleShowingMovie', error);
    next(error);
  }
};

export const getFeaturedMovies = async (req, res) => {
  try {
    const movies = await Movie.find({ isFeatured: true });
    res.status(200).json({ success: true, movies });
  } catch (error) {
    console.log('Error in getFeaturedMovies', error);
    next(error);
  }
};

export const toggleFeaturedMovie = async (req, res) => {
  const { movieId } = req.params;
  try {
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return next(errorCreator('Movie not found', 404));
    }
    movie.isFeatured = !movie.isFeatured;
    await movie.save();
    res.status(200).json({
      success: true,
      message: 'Movie featured status updated successfully',
      movie,
    });
  } catch (error) {
    console.log('Error in toggleFeaturedMovie', error);
    next(error);
  }
};

export const getMovieById = async (req, res) => {
  const { movieId } = req.params;
  try {
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return next(errorCreator('Movie not found', 404));
    }
    res.status(200).json({ success: true, movie });
  } catch (error) {
    console.log('Error in getMovieById', error);
    next(error);
  }
};

export const createMovie = async (req, res) => {
  const { title, description, duration, isShowing, isFeatured } = req.body;
  try {
    const movie = await Movie.create({
      title,
      description,
      releaseDate,
      director,
      cast,
      rating,
      genre,
      duration,
      poster,
      trailer,
      isShowing,
      isFeatured,
    });
    res.status(201).json({
      success: true,
      message: 'Movie created successfully',
      movie,
    });
  } catch (error) {
    console.log('Error in createMovie', error);
    next(error);
  }
};

export const updateMovie = async (req, res) => {
  const { movieId } = req.params;
  const {
    title,
    description,
    releaseDate,
    director,
    cast,
    rating,
    genre,
    duration,
    poster,
    trailer,
    isShowing,
    isFeatured,
  } = req.body;

  try {
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return next(errorCreator('Movie not found', 404));
    }

    movie.title = title;
    movie.description = description;
    movie.releaseDate = releaseDate;
    movie.director = director;
    movie.cast = cast;
    movie.rating = rating;
    movie.genre = genre;
    movie.duration = duration;
    movie.poster = poster;
    movie.trailer = trailer;
    movie.isShowing = isShowing;
    movie.isFeatured = isFeatured;

    await movie.save();
    res.status(200).json({
      success: true,
      message: 'Movie updated successfully',
      movie,
    });
  } catch (error) {
    console.log('Error in updateMovie', error);
    next(error);
  }
};

export const deleteMovie = async (req, res) => {
  const { movieId } = req.params;
  try {
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return next(errorCreator('Movie not found', 404));
    }

    await movie.findByIdAndDelete(movieId);

    res.status(200).json({
      success: true,
      message: 'Movie deleted successfully',
    });
  } catch (error) {
    console.log('Error in deleteMovie', error);
    next(error);
  }
};
