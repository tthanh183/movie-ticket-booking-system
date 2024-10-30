import { useState } from 'react';
import { Dialog, Button } from '@material-tailwind/react';
import PropTypes from 'prop-types';
import { useCinemaStore } from '../stores/useCinemaStore';
import { useMovieStore } from '../stores/useMovieStore';
import { useHallStore } from '../stores/useHallStore';
import { useShowtimeStore } from '../stores/useShowtimeStore';

const AddShowtimeModal = ({ open, onClose }) => {
  const [selectedMovie, setSelectedMovie] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [price, setPrice] = useState('');
  const { selectedCinema, cinemaLoading } = useCinemaStore();
  const { selectedHall, hallLoading } = useHallStore();
  const { movies } = useMovieStore();
  const { showtimes, showtimeLoading, createShowtime } = useShowtimeStore();

  const handleAddShowtime = async e => {
    e.preventDefault();
    const showtime = {
      movie: selectedMovie,
      hall: selectedHall,
      startTime: Date(selectedTime),
      price: new Number(price),
    };
    createShowtime(showtime);
    onClose();
  };

  return (
    <Dialog
      open={open}
      handler={onClose}
      size="sm"
      className="bg-white rounded-lg shadow-xl"
    >
      <form onSubmit={handleAddShowtime}>
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Add Showtime</h3>

          {cinemaLoading || hallLoading || showtimeLoading ? (
            <p className="text-gray-500">Loading...</p>
          ) : (
            <div className="mb-4">
              <p className="text-gray-700">
                <strong>Cinema:</strong> {selectedCinema?.name || 'N/A'}
              </p>
              <p className="text-gray-700">
                <strong>Hall:</strong> {selectedHall?.name || 'N/A'}
              </p>
            </div>
          )}

          <label
            htmlFor="movie"
            className="block text-gray-700 font-semibold mb-2"
          >
            Select Movie:
          </label>
          <select
            id="movie"
            value={selectedMovie}
            onChange={e => setSelectedMovie(e.target.value)}
            className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-400 mb-4"
          >
            <option value="">Choose a movie</option>
            {movies?.map(movie => (
              <option key={movie._id} value={movie._id}>
                {movie.title}
              </option>
            ))}
          </select>

          <label
            htmlFor="time"
            className="block text-gray-700 font-semibold mb-2"
          >
            Start Time:
          </label>
          <input
            type="time"
            id="time"
            value={selectedTime}
            onChange={e => setSelectedTime(e.target.value)}
            className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-400 mb-4"
          />

          <label
            htmlFor="price"
            className="block text-gray-700 font-semibold mb-2"
          >
            Price:
          </label>
          <input
            type="price"
            id="price"
            value={price}
            onChange={e => setPrice(e.target.value)}
            className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-400 mb-4"
          />

          <div className="mb-4">
            <h4 className="text-gray-700 font-semibold">Existing Showtimes:</h4>
            {showtimes.length === 0 ? (
              <p className="text-gray-500">
                No showtimes available for this hall.
              </p>
            ) : (
              <ul className="list-disc pl-5">
                {showtimes.map((showtime, index) => (
                  <li key={index} className="text-sm text-gray-600">
                    {showtime.startTime} -{' '}
                    {
                      movies.find(movie => movie._id === showtime.movieId)
                        ?.title
                    }
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex justify-between items-center mt-4 gap-4">
            <Button
              color="blue"
              onClick={handleAddShowtime}
              disabled={!selectedMovie || !selectedTime}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
            >
              Add Showtime
            </Button>

            <Button
              color="red"
              onClick={onClose}
              className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </Dialog>
  );
};

AddShowtimeModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default AddShowtimeModal;
