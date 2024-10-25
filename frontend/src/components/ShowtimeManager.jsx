import { useEffect, useState } from 'react';
import { Button } from '@material-tailwind/react';
import ShowtimeCalendar from './ShowtimeCalendar';
import { getAllCinemasByLocationApi } from '../api/cinemaApi';
import { getHallsByCinemaIdApi } from '../api/hallApi';
import { getAllMoviesApi } from '../api/movieApi';
import { getAllLocationsApi } from '../api/locationApi';
import AddShowtimeModal from './AddShowtimeModal';

const ShowtimeManager = () => {
  const [showtimes, setShowtimes] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedCinema, setSelectedCinema] = useState(null);
  const [selectedHall, setSelectedHall] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const [locations, setLocations] = useState([]);
  const [cinemas, setCinemas] = useState([]);
  const [halls, setHalls] = useState([]);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchLocations();
    fetchMovies(); // Fetch all movies
  }, []);

  useEffect(() => {
    if (selectedLocation) {
      fetchCinemas(selectedLocation);
    }
  }, [selectedLocation]);

  useEffect(() => {
    if (selectedCinema) {
      fetchHallsByCinemaId(selectedCinema);
    }
  }, [selectedCinema]);

  const fetchLocations = async () => {
    setLoading(true);
    try {
      const response = await getAllLocationsApi();
      if (response.data.success) {
        setLocations(response.data.locations);
      }
    } catch (error) {
      console.error(error.response?.data?.message, error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCinemas = async locationId => {
    setLoading(true);
    try {
      const response = await getAllCinemasByLocationApi(locationId);
      if (response.data.success) {
        setCinemas(response.data.cinemas);
      }
    } catch (error) {
      console.error(error.response?.data?.message, error);
    } finally {
      setLoading(false);
    }
  };

  const fetchHallsByCinemaId = async cinemaId => {
    setLoading(true);
    try {
      const response = await getHallsByCinemaIdApi(cinemaId);
      if (response.data.success) {
        setHalls(response.data.halls);
      }
    } catch (error) {
      console.error(error.response?.data?.message, error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const response = await getAllMoviesApi();
      if (response.data.success) {
        setMovies(response.data.movies);
      }
    } catch (error) {
      console.error(error.response?.data?.message, error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddShowtime = newShowtime => {
    console.log('Adding showtime:', newShowtime);

    const updatedShowtimes = [...showtimes, newShowtime];
    setShowtimes(updatedShowtimes);
    setModalOpen(false);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">
        Showtime Manager
      </h1>
      <div className="shadow-lg mb-6 bg-white p-4">
        <div className="mb-4 space-y-4">
          <div>
            <label htmlFor="location">Location:</label>
            <select
              id="location"
              name="location"
              value={selectedLocation}
              onChange={e => setSelectedLocation(e.target.value)}
              className="block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select a location</option>
              {locations.map(location => (
                <option key={location._id} value={location._id}>
                  {location.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="cinema">Cinema:</label>
            <select
              id="cinema"
              name="cinema"
              value={selectedCinema}
              onChange={e => setSelectedCinema(e.target.value)}
              className="block w-full p-2 border border-gray-300 rounded-md"
              disabled={!selectedLocation}
            >
              <option value="">Select a cinema</option>
              {cinemas.map(cinema => (
                <option key={cinema._id} value={cinema._id}>
                  {cinema.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="hall">Hall:</label>
            <select
              id="hall"
              name="hall"
              value={selectedHall}
              onChange={e => setSelectedHall(e.target.value)}
              className="block w-full p-2 border border-gray-300 rounded-md"
              disabled={!selectedCinema}
            >
              <option value="">Select a hall</option>
              {halls.map(hall => (
                <option key={hall._id} value={hall._id}>
                  {hall.name}
                </option>
              ))}
            </select>
          </div>

          <Button
            color="blue"
            onClick={() => setModalOpen(true)}
            disabled={!selectedHall}
            className="mt-4"
          >
            Add Showtime
          </Button>
        </div>

        <ShowtimeCalendar
          showtimesData={showtimes} // Pass the showtimes to the calendar
        />
      </div>

      <AddShowtimeModal
        cinema={selectedCinema}
        hall={selectedHall}
        movies={movies}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        showtimes={showtimes}
        addShowtime={handleAddShowtime}
      />
    </div>
  );
};

export default ShowtimeManager;
