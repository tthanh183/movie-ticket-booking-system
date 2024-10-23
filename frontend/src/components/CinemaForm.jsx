import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Input,
} from '@material-tailwind/react';
import { createCinemaApi, updateCinemaApi } from '../api/cinemaApi';
import showToast from '../lib/showToast';
import { getAllLocationsApi } from '../api/locationApi';

const CinemaForm = ({ cinema = null, onCancel, open, onSuccess }) => {
  const [locations, setLocations] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    totalHalls: 0,
    location: '',
  });
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setFormData({ name: '', address: '', totalHalls: 0, location: '' });
  };

  useEffect(() => {
    if (cinema) {
      const locationId = locations.find(
        location => location.name === cinema.location
      )?._id;
      setFormData({
        name: cinema.name,
        address: cinema.address,
        totalHalls: cinema.totalHalls,
        location: locationId,
      });
    } else {
      resetForm();
    }
  }, [cinema, locations]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await getAllLocationsApi();
        if (response.data.success) {
          setLocations(response.data.locations);
        }
      } catch (error) {
        showToast(error.response?.data?.message, 'error');
      }
    };

    fetchLocations();
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      let response;
      if (cinema) {
        response = await updateCinemaApi(cinema._id, formData);
        showToast(response.data.message, 'success');
      } else {
        response = await createCinemaApi(formData);
        showToast(response.data.message, 'success');
      }
      if (response.data.success) {
        onSuccess();
        resetForm();
      }
    } catch (error) {
      onCancel();
      showToast(
        error.response?.data?.message || 'Failed to submit cinema form',
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} handler={onCancel}>
      <DialogHeader>
        <Typography variant="h5" color="blue-gray" className="text-center">
          {cinema ? 'Edit Cinema' : 'Create New Cinema'}
        </Typography>
      </DialogHeader>
      <DialogBody divider>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Input
              label="Cinema Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700"
            >
              Location
            </label>
            <select
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="block w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="" disabled>
                Select a location
              </option>
              {locations.map(location => (
                <option key={location._id} value={location._id}>
                  {location.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <Input
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <Input
              label="Total Halls"
              type="number"
              name="totalHalls"
              value={formData.totalHalls}
              onChange={handleChange}
              readOnly
            />
          </div>
          <DialogFooter>
            <Button
              color="blue"
              size="lg"
              fullWidth
              type="submit"
              disabled={loading}
            >
              {loading
                ? cinema
                  ? 'Updating...'
                  : 'Creating...'
                : cinema
                ? 'Update Cinema'
                : 'Create Cinema'}
            </Button>
          </DialogFooter>
        </form>
      </DialogBody>
    </Dialog>
  );
};

CinemaForm.propTypes = {
  cinema: PropTypes.object,
  onCancel: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default CinemaForm;
