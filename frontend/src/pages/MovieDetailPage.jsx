import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMovieStore } from '../stores/useMovieStore';
import CustomSkeleton from '../components/CustomSkeleton';

const MovieDetailPage = () => {
  const { movieId } = useParams();
  const { movies, selectedMovie, movieLoading, getMovieById } = useMovieStore();
  const navigate = useNavigate();
  useEffect(() => {
    getMovieById(movieId);
  }, [movieId, getMovieById]);

  const handleTicketBooking = () => {
    navigate(`/ticket-booking/${movieId}`);
  };

  const reviews = [
    {
      user: 'Alice',
      rating: '5/5',
      comment: 'A beautifully crafted story that touches the heart.',
    },
    {
      user: 'Bob',
      rating: '4/5',
      comment:
        'Great story with amazing visuals. Loved the character development.',
    },
  ];

  const similarMovies = movies.filter(movie => movie._id !== movieId);

  return (
    <>
      {movieLoading ? (
        <div className="flex justify-center items-center min-h-screen">
          <CustomSkeleton />
        </div>
      ) : (
        <div className="container mx-auto my-10 p-5 bg-white rounded-lg shadow-lg">
          <div className="flex flex-col md:flex-row mb-10">
            <div className="md:w-1/3 mb-5 md:mb-0 flex justify-center">
              <img
                src={selectedMovie?.poster}
                alt={selectedMovie?.title}
                className="w-80 h-fit object-contain rounded-lg shadow-md border border-gray-300 transition-transform duration-200 hover:scale-105"
              />
            </div>
            <div className="md:w-2/3 md:pl-8 flex flex-col justify-between">
              <div>
                <h1 className="text-4xl font-bold text-gray-800 mb-3">
                  {selectedMovie?.title}
                </h1>
                <p className="text-gray-600 text-lg mb-1">
                  Genre:{' '}
                  <span className="text-indigo-600">
                    {selectedMovie?.genre.join(', ')}
                  </span>
                </p>
                <p className="text-gray-600 text-lg mb-1">
                  Duration:{' '}
                  <span className="text-pink-600">
                    {selectedMovie?.duration} minutes
                  </span>
                </p>
                <p className="text-gray-600 text-lg mb-1">
                  Release Date:{' '}
                  <span className="text-pink-600">
                    {new Date(selectedMovie?.releaseDate).toLocaleDateString()}
                  </span>
                </p>
                <p className="text-gray-600 text-lg mb-1">
                  Director:{' '}
                  <span className="text-indigo-600">
                    {selectedMovie?.director}
                  </span>
                </p>
                <p className="text-gray-800 mb-6">
                  {selectedMovie?.description}
                </p>
                <p className="text-yellow-600 font-semibold text-2xl mb-6">
                  Rating: {selectedMovie?.rating}
                </p>
              </div>
              <div>
                <button
                  className="bg-red-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-700 transition shadow-md"
                  onClick={handleTicketBooking}
                >
                  Book Tickets
                </button>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mb-10">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">
              Reviews
            </h2>
            <div className="space-y-4">
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg p-5 shadow-md border-l-4 border-indigo-400 flex items-start space-x-4"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
                      {review.user[0]}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {review.user}
                    </h3>
                    <p className="text-yellow-600 font-medium">
                      {review.rating}
                    </p>
                    <p className="text-gray-600 mt-2">{review.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* You Might Also Like Section */}
          <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">
              You Might Also Like
            </h2>
            <div className="flex flex-wrap justify-around gap-6">
              {similarMovies.map((movie, index) => (
                <div
                  key={index}
                  className="w-32 bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-200 hover:scale-105"
                >
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-40 object-contain"
                  />
                  <div className="p-3 text-center">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {movie.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieDetailPage;
