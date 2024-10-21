import { useEffect, useState } from 'react';
import { Button, Typography } from '@material-tailwind/react';
import MovieForm from './MovieForm';
import MovieList from './MovieList';
// import { getAllMoviesApi, deleteMovieApi } from '../api/movieApi'; 

const MovieManager = () => {
  const [movies, setMovies] = useState([]);
  const [editMovie, setEditMovie] = useState(null);
  const [openForm, setOpenForm] = useState(false);

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

  const handleDeleteMovie = async movieId => {
    // await deleteMovieApi(movieId); // Gọi API để xóa phim
    // fetchMovies(); // Cập nhật lại danh sách phim
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
    // fetchMovies(); // Cập nhật lại danh sách phim sau khi thêm hoặc chỉnh sửa
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <Typography variant="h3" className="mb-4 font-bold">
        Quản Lý Phim
      </Typography>
      <Button color="blue" onClick={handleOpenForm}>
        + Thêm Phim
      </Button>

      <MovieList
        movies={movies}
        onEdit={handleEditMovie}
        onDelete={handleDeleteMovie}
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
