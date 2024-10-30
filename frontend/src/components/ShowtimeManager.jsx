import { useEffect, useState } from 'react';
import { Button } from '@material-tailwind/react';
import ShowtimeCalendar from './ShowtimeCalendar';
import AddShowtimeModal from './AddShowtimeModal';
import { useLocationsStore } from '../stores/useLocationsStore';
import { useMovieStore } from '../stores/useMovieStore';
import { useCinemaStore } from '../stores/useCinemaStore';
import { useHallStore } from '../stores/useHallStore';
import { useShowtimeStore } from '../stores/useShowtimeStore';

const ShowtimeManager = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedShowtime, setSelectedShowtime] = useState(null);

  const { locations, selectedLocation, getLocations, setSelectedLocation } =
    useLocationsStore();
  const { getMovies } = useMovieStore();
  const { cinemas, selectedCinema, getCinemasByLocation, setSelectedCinema } =
    useCinemaStore();
  const { halls, selectedHall, getHallsByCinema, setSelectedHall } =
    useHallStore();
  const { showtimes, getShowtimesByHall } = useShowtimeStore();

  useEffect(() => {
    getLocations();
    getMovies();
  }, [getLocations, getMovies]);

  useEffect(() => {
    if (selectedLocation) getCinemasByLocation(selectedLocation._id);
    if (selectedCinema) getHallsByCinema(selectedCinema._id);
    if (selectedHall) getShowtimesByHall(selectedHall._id);
  }, [selectedLocation, selectedCinema, selectedHall, getCinemasByLocation, getHallsByCinema, getShowtimesByHall]);

  const handleCloseForm = () => {
    setModalOpen(false);
    setSelectedShowtime(null);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">
        Showtime Manager
      </h1>
      <div className="flex">
        <div className="w-1/4 p-4">
          <div className="mb-4 space-y-4 bg-white p-4 shadow-lg">
            <label htmlFor="location">Location:</label>
            <select
              id="location"
              value={JSON.stringify(selectedLocation)}
              onChange={e => setSelectedLocation(JSON.parse(e.target.value))}
              className="block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select a location</option>
              {locations.map(location => (
                <option key={location._id} value={JSON.stringify(location)}>
                  {location.name}
                </option>
              ))}
            </select>

            <label htmlFor="cinema">Cinema:</label>
            <select
              id="cinema"
              value={JSON.stringify(selectedCinema)}
              onChange={e => setSelectedCinema(JSON.parse(e.target.value))}
              className="block w-full p-2 border border-gray-300 rounded-md"
              disabled={!selectedLocation}
            >
              <option value="">Select a cinema</option>
              {cinemas.map(cinema => (
                <option key={cinema._id} value={JSON.stringify(cinema)}>
                  {cinema.name}
                </option>
              ))}
            </select>

            <label htmlFor="hall">Hall:</label>
            <select
              id="hall"
              value={JSON.stringify(selectedHall)}
              onChange={e => setSelectedHall(JSON.parse(e.target.value))}
              className="block w-full p-2 border border-gray-300 rounded-md"
              disabled={!selectedCinema}
            >
              <option value="">Select a hall</option>
              {halls.map(hall => (
                <option key={hall._id} value={JSON.stringify(hall)}>
                  {hall.name}
                </option>
              ))}
            </select>
            <Button
              color="blue"
              onClick={() => setModalOpen(true)}
              disabled={!selectedHall}
              className="mt-4"
            >
              Add Showtime
            </Button>
          </div>
        </div>

        <div className="w-3/4 p-4 bg-white shadow-lg">
          <ShowtimeCalendar
            showtimesData={showtimes}
            onEdit={setSelectedShowtime}
          />
        </div>
      </div>

      <AddShowtimeModal
        open={modalOpen}
        onClose={handleCloseForm}
        selectedShowtime={selectedShowtime}
      />
    </div>
  );
};

export default ShowtimeManager;
