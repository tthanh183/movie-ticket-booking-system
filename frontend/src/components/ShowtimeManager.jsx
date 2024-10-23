import { useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Select,
  Option,
  Dialog,
} from '@material-tailwind/react';
import ShowtimeCalendar from './ShowtimeCalendar';
import {
  getAllCinemasByLocationApi,
  getHallsByCinemaIdApi,
} from '../api/cinemaApi';
import { getShowingMoviesApi } from '../api/movieApi';
import { getAllLocationsApi } from '../api/locationApi';

const ShowtimeManager = () => {
  const [showtimes, setShowtimes] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedCinema, setSelectedCinema] = useState(null);
  const [selectedHall, setSelectedHall] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedShowtimeIndex, setSelectedShowtimeIndex] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  const [locations, setLocations] = useState([]);
  const [cinemas, setCinemas] = useState([]);
  const [halls, setHalls] = useState([]);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await fetchLocations();
      if (selectedLocation) {
        await fetchCinemas(selectedLocation);
      }
      if (selectedCinema) {
        await fetchHallsByCinemaId(selectedCinema);
      }
      await fetchMovies();
    };
    fetchData();
  }, [selectedLocation, selectedCinema]);

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

  const fetchCinemas = async location => {
    setLoading(true);
    try {
      const response = await getAllCinemasByLocationApi(location);
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
      const response = await getShowingMoviesApi();
      if (response.data.success) {
        setMovies(response.data.movies);
      }
    } catch (error) {
      console.error(error.response?.data?.message, error);
    } finally {
      setLoading(false);
    }
  };

  const handleLocationChange = value => {
    if (value) {
      setSelectedLocation(value);
      console.log(value);

      setSelectedCinema(null); // Reset cinema
      setSelectedHall(null); // Reset hall
      setSelectedMovie(null); // Reset movie
    }
  };

  const handleCinemaChange = e => {
    const cinemaId = e.target.value;
    setSelectedCinema(cinemaId);
    setSelectedHall(null); // Reset hall
    setSelectedMovie(null); // Reset movie
  };

  const handleCellClick = time => {
    const existingShowtime = showtimes.find(
      showtime =>
        showtime.screen === selectedHall &&
        showtime.time === time &&
        showtime.date === selectedDate
    );
    if (existingShowtime) {
      setSelectedTime(existingShowtime.time);
      setSelectedShowtimeIndex(showtimes.indexOf(existingShowtime));
    } else {
      setSelectedTime(time);
      setSelectedShowtimeIndex(null);
    }
    setModalOpen(true);
  };

  const handleAddUpdateShowtime = () => {
    const newShowtime = {
      screen: selectedHall,
      time: selectedTime,
      date: selectedDate,
    };
    if (selectedShowtimeIndex !== null) {
      const updatedShowtimes = showtimes.map((showtime, index) =>
        index === selectedShowtimeIndex ? newShowtime : showtime
      );
      setShowtimes(updatedShowtimes);
    } else {
      setShowtimes([...showtimes, newShowtime]);
    }
    resetForm();
  };

  const resetForm = () => {
    setSelectedLocation('');
    setSelectedCinema(null);
    setSelectedHall(null);
    setSelectedTime('');
    setSelectedShowtimeIndex(null);
    setSelectedDate('');
    setModalOpen(false);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">
        Showtime Manager
      </h1>
      <Card className="shadow-lg mb-6">
        <CardHeader className="text-xl font-bold bg-blue-500 text-white">
          Showtime Schedule
        </CardHeader>
        <CardBody>
          <div className="mb-4">
            <Select
              label="Select location"
              name="location"
              value={selectedLocation}
              onChange={val => handleLocationChange(val)} 
            >
              <Option value="" disabled>
                Select a location
              </Option>
              {locations.map(location => (
                <Option key={location._id} value={location.id}>
                  {location.name} 
                </Option>
              ))}
            </Select>

            <Select
              label="Select cinema"
              name="cinema"
              value={selectedCinema || ''}
              onChange={handleCinemaChange}
            >
              <Option value="" disabled>
                Select a cinema
              </Option>
              {cinemas.map(cinema => (
                <Option key={cinema._id} value={cinema._id}>
                  {cinema.name}
                </Option>
              ))}
            </Select>
            <Select
              label="Select hall"
              name="hall"
              value={selectedHall || ''}
              onChange={e => setSelectedHall(e.target.value)}
            >
              <Option value="">Select a hall</Option>
              {halls.map(hall => (
                <Option key={hall._id} value={hall._id}>
                  {hall.name}
                </Option>
              ))}
            </Select>

            <Select
              label="Select movie"
              name="movie"
              value={selectedMovie || ''}
              onChange={e => setSelectedMovie(e.target.value)}
            >
              <Option value="">Select a movie</Option>
              {movies.map(movie => (
                <Option key={movie._id} value={movie.title}>
                  {movie.title}
                </Option>
              ))}
            </Select>

            <Button
              color="blue"
              onClick={() => handleCellClick('10:00 AM')}
              disabled={!selectedHall || !selectedMovie}
            >
              Set Showtime
            </Button>
          </div>

          <ShowtimeCalendar
            showtimes={showtimes}
            onCellClick={handleCellClick}
          />
        </CardBody>
      </Card>

      {/* Modal for Adding/Editing Showtime */}
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
        <div className="p-4">
          <h3 className="text-lg font-bold">Set Showtime</h3>
          <p>{`Selected Time: ${selectedTime}`}</p>
          <Button color="green" onClick={handleAddUpdateShowtime}>
            {selectedShowtimeIndex !== null ? 'Update' : 'Add'}
          </Button>
        </div>
      </Dialog>
    </div>
  );
};

export default ShowtimeManager;
