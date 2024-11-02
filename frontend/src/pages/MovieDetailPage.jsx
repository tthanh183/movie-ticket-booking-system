import React from 'react';
import { useParams } from 'react-router-dom';

const MovieDetailPage = () => {
  const { id } = useParams();

  // Mock movie data
  const movie = {
    title: 'The Wild Robot',
    description:
      'A heartwarming tale of a robot who learns to adapt to life on a wild island.',
    posterUrl: 'https://example.com/path/to/poster.jpg', // Replace with actual image URL
    rating: '4.5/5',
    genre: 'Adventure, Sci-Fi',
    duration: '1h 40m',
    showtimes: ['10:00 AM', '1:00 PM', '4:00 PM', '7:00 PM'],
  };

  // Mock reviews data
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

  // Mock similar movies data
  const similarMovies = [
    {
      title: 'The Iron Giant',
      posterUrl: 'https://example.com/path/to/iron_giant.jpg',
    },
    {
      title: 'Wall-E',
      posterUrl: 'https://example.com/path/to/wall_e.jpg',
    },
  ];

  return (
    <div className="container mx-auto my-10 p-5 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-lg shadow-2xl">
      {/* Movie Details Section */}
      <div className="flex flex-col md:flex-row mb-10">
        <div className="md:w-1/3 mb-5 md:mb-0">
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="w-full rounded-lg shadow-lg border-4 border-blue-300"
          />
        </div>
        <div className="md:w-2/3 md:pl-8 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold text-purple-800 mb-3">
              {movie.title}
            </h1>
            <p className="text-indigo-600 text-lg mb-2">{movie.genre}</p>
            <p className="text-pink-600 text-lg mb-4">{movie.duration}</p>
            <p className="text-gray-700 mb-6">{movie.description}</p>
            <p className="text-yellow-500 font-semibold text-2xl mb-6">
              Rating: {movie.rating}
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-purple-700 mb-4">
              Showtimes
            </h2>
            <div className="flex flex-wrap gap-3 mb-6">
              {movie.showtimes.map((time, index) => (
                <button
                  key={index}
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-full shadow-md hover:from-indigo-600 hover:to-purple-700 transition"
                >
                  {time}
                </button>
              ))}
            </div>
            <button className="bg-gradient-to-r from-green-400 to-green-600 text-white px-6 py-3 rounded-full font-semibold hover:from-green-500 hover:to-green-700 transition shadow-lg">
              Book Tickets
            </button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mb-10">
        <h2 className="text-3xl font-semibold text-purple-800 mb-6">Reviews</h2>
        <div className="space-y-4">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-5 shadow-lg border-l-4 border-purple-400 flex items-start space-x-4"
            >
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">
                  {review.user[0]}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-purple-700">
                  {review.user}
                </h3>
                <p className="text-yellow-500 font-medium">{review.rating}</p>
                <p className="text-gray-600 mt-2">{review.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* You Might Also Like Section */}
      <div>
        <h2 className="text-3xl font-semibold text-purple-800 mb-6">
          You Might Also Like
        </h2>
        <div className="flex flex-wrap gap-6">
          {similarMovies.map((movie, index) => (
            <div
              key={index}
              className="w-40 bg-gradient-to-b from-white to-purple-100 rounded-lg shadow-lg overflow-hidden transform transition hover:scale-105"
            >
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-full h-60 object-cover"
              />
              <div className="p-3 text-center">
                <h3 className="text-lg font-semibold text-purple-700">
                  {movie.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
