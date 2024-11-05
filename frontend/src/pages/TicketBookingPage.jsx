import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useMovieStore } from '../stores/useMovieStore';
import CustomSkeleton from '../components/CustomSkeleton';
import ShowtimeList from '../components/ShowtimeList';
import FilterBar from '../components/FilterBar';
import { useLocationsStore } from '../stores/useLocationsStore';
import { useShowtimeStore } from '../stores/useShowtimeStore';

const TicketBookingPage = () => {
  const { movieId } = useParams();

  const [filters, setFilters] = useState({
    date: new Date(),
    priceRange: '',
  });

  const { locations, selectedLocation, getLocations, setSelectedLocation } =
    useLocationsStore();
  const { showtimes, showtimeLoading, getShowtimesByMovieAndLocation } =
    useShowtimeStore();
  const { selectedMovie, getMovieById } = useMovieStore();

  useEffect(() => {
    getMovieById(movieId);
  }, [movieId, getMovieById]);

  useEffect(() => {
    getLocations();
    if (selectedLocation) {
      getShowtimesByMovieAndLocation(movieId, selectedLocation._id, filters);
    }
  }, [
    getLocations,
    getShowtimesByMovieAndLocation,
    movieId,
    selectedLocation,
    filters,
  ]);

  
  const handleFilterChange = newFilters => {
    setFilters(newFilters);
    if (selectedLocation) {
      getShowtimesByMovieAndLocation(movieId, selectedLocation._id, newFilters);
    }
  };

  return (
    <>
      {showtimeLoading ? (
        <div className="flex justify-center items-center min-h-screen">
          <CustomSkeleton />
        </div>
      ) : (
        <div className="container mx-auto my-10 p-5 bg-white rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold mb-6">
            {selectedMovie?.title} - Book Tickets
          </h1>
          <FilterBar filters={filters} onFilterChange={handleFilterChange} />
          <div className="flex space-x-4 my-6">
            <select
              id="location"
              value={JSON.stringify(selectedLocation)}
              onChange={e => setSelectedLocation(JSON.parse(e.target.value))}
              className="p-2 border rounded"
            >
              <option value="">Select a location</option>
              {locations.map(location => (
                <option key={location._id} value={JSON.stringify(location)}>
                  {location.name}
                </option>
              ))}
            </select>
          </div>
          <ShowtimeList showtimesByCinema={showtimes} />
        </div>
      )}
    </>
  );
};

export default TicketBookingPage;
