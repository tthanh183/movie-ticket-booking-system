import { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash, FaPlusCircle } from 'react-icons/fa';
import MovieForm from './MovieForm';
import { getAllMoviesApi, toggleShowingMovieApi } from '../api/movieApi';
import MovieFilter from './MovieFilter';
import MovieSearch from './MovieSearch';
import { Button, Spinner } from '@material-tailwind/react';
import Pagination from './Pagination';

const MovieManager = () => {
  const [movies, setMovies] = useState([]);
  const [editMovie, setEditMovie] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loadingToggles, setLoadingToggles] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(2);
  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await getAllMoviesApi();
      if (response.data.success) {
        setMovies(response.data.movies);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditMovie = movie => {
    setEditMovie(movie);
    setOpenForm(true);
  };

  const handleToggleShowing = async movieId => {
    setLoadingToggles(prevState => ({ ...prevState, [movieId]: true }));
    try {
      await toggleShowingMovieApi(movieId);
      fetchMovies();
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingToggles(prev => ({ ...prev, [movieId]: false }));
    }
  };

  const handleOpenForm = () => {
    setOpenForm(true);
    setEditMovie(null);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setEditMovie(null);
  };

  const handleFormSubmit = () => {
    handleCloseForm();
    fetchMovies();
  };

  const filteredAndSearchedMovies = movies
    .filter(movie => {
      if (filter === 'showing') return movie.isShowing;
      return true;
    })
    .filter(movie =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const totalPages = Math.ceil(
    filteredAndSearchedMovies.length / moviesPerPage
  );

  const displayedMovies = filteredAndSearchedMovies.slice(
    (currentPage - 1) * moviesPerPage,
    currentPage * moviesPerPage
  );

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <div className="flex w-full justify-between items-center mb-4">
        <MovieFilter selectedFilter={filter} onFilterChange={setFilter} />
        <MovieSearch searchTerm={searchTerm} onSearch={setSearchTerm} />
        <Button
          color="blue"
          onClick={handleOpenForm}
          className="ml-4 flex justify-center items-center gap-2"
        >
          <FaPlusCircle />
          Add Movie
        </Button>
      </div>

      <div className="overflow-x-auto w-full shadow-lg rounded-lg">
        <table className="min-w-full bg-white rounded-lg">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="py-3 px-4 text-left">Title</th>
              <th className="py-3 px-4 text-left">Description</th>
              <th className="py-3 px-4 text-left">Release Date</th>
              <th className="py-3 px-4 text-left">Director</th>
              <th className="py-3 px-4 text-left">Cast</th>
              <th className="py-3 px-4 text-left">Rating</th>
              <th className="py-3 px-4 text-left">Genre</th>
              <th className="py-3 px-4 text-left">Duration</th>
              <th className="py-3 px-4 text-left">Poster</th>
              <th className="py-3 px-4 text-left">Trailer</th>
              <th className="py-3 px-4 text-center">Showing</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedMovies.map(movie => (
              <tr key={movie._id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">{movie.title}</td>
                <td className="py-3 px-4">
                  {movie.description.substring(0, 100)}...
                </td>
                <td className="py-3 px-4">
                  {new Date(movie.releaseDate).toLocaleDateString()}
                </td>
                <td className="py-3 px-4">{movie.director}</td>
                <td className="py-3 px-4">{movie.cast.join(', ')}</td>
                <td className="py-3 px-4">{movie.rating}</td>
                <td className="py-3 px-4">{movie.genre.join(', ')}</td>
                <td className="py-3 px-4">{movie.duration} mins</td>
                <td className="py-3 px-4">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-12 h-12 object-cover rounded-md"
                  />
                </td>
                <td className="py-3 px-4">
                  <a
                    href={movie.trailer}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Watch Trailer
                  </a>
                </td>

                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => handleToggleShowing(movie._id)}
                    className={`text-lg ${
                      movie.isShowing ? 'text-green-500' : 'text-gray-400'
                    }`}
                    disabled={loadingToggles[movie._id]}
                  >
                    {loadingToggles[movie._id] ? (
                      <Spinner className="w-5 h-5" />
                    ) : movie.isShowing ? (
                      <FaEye />
                    ) : (
                      <FaEyeSlash />
                    )}
                  </button>
                </td>
                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => handleEditMovie(movie)}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <MovieForm
        movie={editMovie}
        open={openForm}
        onCancel={handleCloseForm}
        onSuccess={handleFormSubmit}
      />
    </div>
  );
};

export default MovieManager;
