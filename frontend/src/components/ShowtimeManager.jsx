import { useEffect, useState } from 'react';
import { Button } from '@material-tailwind/react';
import ShowtimeCalendar from './ShowtimeCalendar';
import AddShowtimeModal from './AddShowtimeModal';
import { useLocationsStore } from '../stores/useLocationsStore';
import { useMovieStore } from '../stores/useMovieStore';
import { useCinemaStore } from '../stores/useCinemaStore';
import { useHallStore } from '../stores/useHallStore';

const ShowtimeManager = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const { locations, selectedLocation, getLocations, setSelectedLocation } =
    useLocationsStore();
  const { getShowingMovies } = useMovieStore();
  const { cinemas, selectedCinema, getCinemasByLocation, setSelectedCinema } =
    useCinemaStore();
  const { halls, selectedHall, getHallsByCinema, setSelectedHall } =
    useHallStore();

  useEffect(() => {
    getLocations();
    getShowingMovies();
  }, [getLocations, getShowingMovies]);

  useEffect(() => {
    if (selectedLocation) getCinemasByLocation(selectedLocation._id);
    if (selectedCinema) getHallsByCinema(selectedCinema._id);
  }, [
    selectedLocation,
    selectedCinema,
    getCinemasByLocation,
    getHallsByCinema,
  ]);

  const handleCloseForm = () => {
    setModalOpen(false);
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
              Add Showtimes
            </Button>
          </div>
        </div>

        <div className="w-3/4 p-4 bg-white shadow-lg">
          <ShowtimeCalendar />
        </div>
      </div>

      <AddShowtimeModal open={modalOpen} onClose={handleCloseForm} />
    </div>
  );
};

export default ShowtimeManager;
