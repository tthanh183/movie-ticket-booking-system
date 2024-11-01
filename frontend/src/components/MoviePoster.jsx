import PropTypes from 'prop-types';

const MoviePoster = ({ movie }) => {
  return (
    <div className="relative max-w-xs mx-auto p-4 hover:shadow-2xl transition-shadow duration-300 rounded-lg overflow-hidden">
      <div className="relative w-full h-96">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
        />
      </div>

      <h3 className="mt-4 text-xl font-bold text-center text-gray-800 transition-colors duration-300 hover:text-red-500">
        {movie.title}
      </h3>

      <p className="mt-1 text-sm text-center text-gray-600">
        {movie.genre.join(', ')}
      </p>
    </div>
  );
};

MoviePoster.propTypes = {
  movie: PropTypes.shape({
    poster: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    genre: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default MoviePoster;
