import { useState } from 'react';
import { Dialog, Button } from '@material-tailwind/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useMovieStore } from '../stores/useMovieStore';
import { useShowtimeStore } from '../stores/useShowtimeStore';
import { useHallStore } from '../stores/useHallStore';
import { useLocationsStore } from '../stores/useLocationsStore';

const AddShowtimeModal = ({ open, onClose, selectedDate }) => {
  const [selectedMovie, setSelectedMovie] = useState('');
  const [price, setPrice] = useState('');
  const [startTime, setStartTime] = useState(selectedDate || new Date());
  const { clearSelectedLocation } = useLocationsStore();
  const { movies, clearSelectedMovie } = useMovieStore();
  const { selectedHall, clearSelectedHall } = useHallStore();
  const { createShowtime } = useShowtimeStore();

  const handleAddShowtime = async e => {
    e.preventDefault();
    const showtime = {
      movie: selectedMovie,
      hall: selectedHall,
      startTime: selectedDate,
      price: parseFloat(price),
    };
    createShowtime(selectedHall._id, showtime);
    clearSelectedLocation();
    clearSelectedMovie();
    clearSelectedHall();
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
            dateFormat="MMMM d, yyyy h:mm aa" // định dạng hiển thị
            timeFormat="HH:mm"
            timeIntervals={10} // Chọn khoảng thời gian mỗi 10 phút
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
              color="blue"
              onClick={handleAddShowtime}
              disabled={!selectedMovie}
              className="w-full"
            >
              Add Showtime
            </Button>
            <Button color="red" onClick={onClose} className="w-full">
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </Dialog>
  );
};

export default AddShowtimeModal;
