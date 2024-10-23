import { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Input } from '@material-tailwind/react';
import { createShowtimeApi, updateShowtimeApi } from '../api/showtimeApi';

const ShowtimeForm = ({ showtime, onCancel, onSuccess }) => {
  const [formData, setFormData] = useState({
    movieTitle: showtime?.movieTitle || '',
    theaterName: showtime?.theaterName || '',
    room: showtime?.room || '',
    startTime: showtime?.startTime || '',
    price: showtime?.price || '',
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (showtime) {
        await updateShowtimeApi(showtime._id, formData);
      } else {
        await createShowtimeApi(formData);
      }
      onSuccess();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-lg">
      <h2 className="text-lg font-bold mb-4">
        {showtime ? 'Edit Showtime' : 'Add Showtime'}
      </h2>
      <form onSubmit={handleSubmit}>
        <Input
          label="Movie Title"
          name="movieTitle"
          value={formData.movieTitle}
          onChange={handleChange}
          required
        />
        <Input
          label="Theater Name"
          name="theaterName"
          value={formData.theaterName}
          onChange={handleChange}
          required
        />
        <Input
          label="Room"
          name="room"
          value={formData.room}
          onChange={handleChange}
          required
        />
        <Input
          label="Start Time"
          name="startTime"
          type="datetime-local"
          value={formData.startTime}
          onChange={handleChange}
          required
        />
        <Input
          label="Price"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <div className="flex justify-end gap-4 mt-6">
          <Button color="red" onClick={onCancel}>
            Cancel
          </Button>
          <Button color="green" type="submit">
            {showtime ? 'Update' : 'Add'} Showtime
          </Button>
        </div>
      </form>
    </div>
  );
};

ShowtimeForm.propTypes = {
  showtime: PropTypes.object,
  onCancel: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default ShowtimeForm;
