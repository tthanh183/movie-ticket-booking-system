import { useState } from 'react';
import { Dialog, Button } from '@material-tailwind/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PropTypes from 'prop-types';

import { useMovieStore } from '../stores/useMovieStore';
import { useShowtimeStore } from '../stores/useShowtimeStore';
import { useHallStore } from '../stores/useHallStore';
import { useLocationsStore } from '../stores/useLocationsStore';
import { useCinemaStore } from '../stores/useCinemaStore';

const AddShowtimeModal = ({ open, onClose }) => {
  const [showtimes, setShowtimes] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState('');
  const [price, setPrice] = useState('');
  const [startTime, setStartTime] = useState(new Date());
  const { clearSelectedLocation } = useLocationsStore();
  const { movies, clearSelectedMovie } = useMovieStore();
  const { selectedHall, clearSelectedHall } = useHallStore();
  const { createShowtime } = useShowtimeStore();
  const { clearSelectedCinema } = useCinemaStore();

  const addShowtimeToList = () => {
    const newShowtime = {
      movie: selectedMovie,
      hall: selectedHall,
      startTime,
      price: parseFloat(price),
    };
    setShowtimes([...showtimes, newShowtime]);
    setPrice('');
  };

  const handleCancel = () => {
    clearSelectedLocation();
    clearSelectedMovie();
    clearSelectedHall();
    setShowtimes([]);
    onClose();
  };

  const handleSaveAllShowtimes = async e => {
    e.preventDefault();
    for (const showtime of showtimes) {
      await createShowtime(selectedHall._id, showtime);
    }
    clearSelectedLocation();
    clearSelectedMovie();
    clearSelectedCinema();
    clearSelectedHall();
    setShowtimes([]);
    onClose();
  };

  return (
    <Dialog
      open={open}
      handler={onClose}
      size="lg"
      className="bg-white rounded-lg shadow-xl max-w-3xl h-fit-screen"
    >
      <form onSubmit={handleSaveAllShowtimes}>
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Add Multiple Showtimes
          </h3>

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
            className="block w-full px-4 py-2 border border-gray-300 rounded-lg mb-4"
          >
            <option value="">Choose a movie</option>
            {movies.map(movie => (
              <option key={movie._id} value={movie._id}>
                {movie.title}
              </option>
            ))}
          </select>

          <label
            htmlFor="date"
            className="block text-gray-700 font-semibold mb-2"
          >
            Select Showtime:
          </label>
          <DatePicker
            selected={startTime}
            onChange={date => setStartTime(date)}
            showTimeSelect
            dateFormat="MMMM d, yyyy h:mm aa"
            timeIntervals={10}
            className="block w-full px-4 py-2 border border-gray-300 rounded-lg mb-4"
          />

          <label
            htmlFor="price"
            className="block text-gray-700 font-semibold mb-2"
          >
            Price:
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={e => setPrice(e.target.value)}
            className="block w-full px-4 py-2 border border-gray-300 rounded-lg mb-4"
          />

          <div className="flex justify-between items-center mt-4 gap-4">
            <Button
              color="green"
              onClick={addShowtimeToList}
              disabled={!selectedMovie || !price}
              className="w-full"
            >
              Add to List
            </Button>
            <Button
              color="blue"
              type="submit"
              disabled={showtimes.length === 0}
              className="w-full"
            >
              Save All Showtimes
            </Button>
            <Button color="red" onClick={handleCancel} className="w-full">
              Cancel
            </Button>
          </div>

          <div className="mt-4 max-h-40 overflow-y-auto space-y-2">
            {showtimes.map((showtime, index) => (
              <li key={index} className="p-2 bg-gray-200 rounded-md">
                {movies.find(movie => movie._id === showtime.movie)?.title} -{' '}
                {showtime.startTime.toLocaleString()} - ${showtime.price}
              </li>
            ))}
          </div>
        </div>
      </form>
    </Dialog>
  );
};

AddShowtimeModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
export default AddShowtimeModal;
