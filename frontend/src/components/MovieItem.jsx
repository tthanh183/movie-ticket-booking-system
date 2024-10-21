import { Button } from '@material-tailwind/react';

const MovieItem = ({ movie, onEdit, onDelete }) => {
  return (
    <div className="flex justify-between items-center p-4 border-b">
      <div>
        <h4 className="font-bold">{movie.title}</h4>
        <p>{movie.description}</p>
        <p>
          <strong>Đạo Diễn:</strong> {movie.director}
        </p>
        <p>
          <strong>Đánh Giá:</strong> {movie.rating}
        </p>
      </div>
      <div className="flex space-x-2">
        <Button color="blue" onClick={() => onEdit(movie)}>
          Sửa
        </Button>
        <Button color="red" onClick={() => onDelete(movie._id)}>
          Xóa
        </Button>
      </div>
    </div>
  );
};

export default MovieItem;
