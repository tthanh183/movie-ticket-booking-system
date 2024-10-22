import { useEffect, useState } from 'react';
import {
  Dialog,
  Button,
  Input,
  Textarea,
  ProgressBar,
} from '@material-tailwind/react';
import PropTypes from 'prop-types';

import { createMovieApi, updateMovieApi } from '../api/movieApi';
import { uploadToCloudinary } from '../lib/uploadToCloudinary';
import showToast from '../lib/showToast';

const MovieForm = ({ movie, open, onCancel, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    releaseDate: '',
    director: '',
    cast: [],
    rating: '',
    genre: [],
    duration: '',
    poster: null,
    trailer: null,
    isShowing: false,
  });
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({
    poster: 0,
    trailer: 0,
  });

  useEffect(() => {
    if (movie) {
      setFormData(movie);
    } else {
      resetForm();
    }
  }, [movie]);

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      releaseDate: '',
      director: '',
      cast: [],
      rating: '',
      genre: [],
      duration: '',
      poster: null,
      trailer: null,
      isShowing: false,
    });
    setUploadProgress({ poster: 0, trailer: 0 });
  };

  const handleChange = e => {
    const { name, value, type, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  const handleUploadAndSubmit = async () => {
    setLoading(true);
    const uploadPromises = [];

    if (formData.poster) {
      uploadPromises.push(
        uploadToCloudinary(formData.poster, 'image', progress => {
          setUploadProgress(prev => ({ ...prev, poster: progress }));
        })
      );
    }

    if (formData.trailer) {
      uploadPromises.push(
        uploadToCloudinary(formData.trailer, 'video', progress => {
          setUploadProgress(prev => ({ ...prev, trailer: progress }));
        })
      );
    }

    try {
      const [posterUrl, trailerUrl] = await Promise.all(uploadPromises);

      const dataToSend = {
        ...formData,
        poster: posterUrl || formData.poster,
        trailer: trailerUrl || formData.trailer,
      };

      let response;
      if (movie) {
        response = await updateMovieApi(movie._id, dataToSend);
      } else {
        response = await createMovieApi(dataToSend);
      }

      showToast(response.data.message, 'success');
      resetForm();
      onSuccess();
    } catch (error) {
      showToast(
        error.response?.data?.message || 'Failed to submit movie form',
        'error'
      );
      onCancel();
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    handleUploadAndSubmit();
  };

  return (
    <Dialog open={open} handler={onCancel} size="lg" className="max-w-full">
      <form onSubmit={handleSubmit} className="p-6 space-y-6 md:space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <Input
            label="Release Date"
            type="date"
            name="releaseDate"
            value={formData.releaseDate.split('T')[0]}
            onChange={handleChange}
            required
          />
        </div>
        <Textarea
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="h-24"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Director"
            name="director"
            value={formData.director}
            onChange={handleChange}
            required
          />
          <Input
            label="Cast"
            name="cast"
            value={formData.cast.join(', ')}
            onChange={e =>
              handleChange({
                target: { name: 'cast', value: e.target.value.split(', ') },
              })
            }
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Input
            label="Rating"
            type="double"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            required
            min="0"
            max="10"
          />
          <Input
            label="Genre"
            name="genre"
            value={formData.genre.join(', ')}
            onChange={e =>
              handleChange({
                target: { name: 'genre', value: e.target.value.split(', ') },
              })
            }
            required
          />
          <Input
            label="Duration (min)"
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Input
            type="file"
            label="Upload Poster"
            accept="image/*"
            name="poster"
            onChange={handleChange}
            required={!movie}
          />
          {uploadProgress.poster > 0 && (
            <ProgressBar value={uploadProgress.poster} color="blue" />
          )}
        </div>

        <div>
          <Input
            type="file"
            label="Upload Trailer"
            accept="video/*"
            name="trailer"
            onChange={handleChange}
            required={!movie}
          />
          {uploadProgress.trailer > 0 && (
            <ProgressBar value={uploadProgress.trailer} color="blue" />
          )}
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <Button color="red" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" color="blue" disabled={loading}>
            {loading
              ? 'Submitting...'
              : movie
              ? 'Update Movie'
              : 'Create Movie'}
          </Button>
        </div>
      </form>
    </Dialog>
  );
};

MovieForm.propTypes = {
  movie: PropTypes.object,
  open: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default MovieForm;
