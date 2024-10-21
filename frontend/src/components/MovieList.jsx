import MovieItem from './MovieItem';

const MovieList = ({ movies, onEdit, onDelete }) => {
  return (
    <div className="mt-6 w-full">
      {movies.length === 0 ? (
        <p className="text-center">Chưa có phim nào!</p>
      ) : (
        movies.map(movie => (
          <MovieItem
            key={movie._id}
            movie={movie}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
};

export default MovieList;
