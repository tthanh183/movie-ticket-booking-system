import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from '@material-tailwind/react';

import { createCinemaApi, updateCinemaApi } from '../api/cinemaApi';
import showToast from '../lib/showToast';

const locations = [
  'Hồ Chí Minh',
  'Hà Nội',
  'Đà Nẵng',
  'Cần Thơ',
  'Hải Phòng',
  'Quảng Ninh',
];

const CinemaForm = ({ cinema = null, onCancel, open, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    address: '',
    totalHalls: 0,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (cinema) {
      setFormData({ ...cinema });
    } else {
      resetForm();
    }
  }, [cinema]);

  const resetForm = () => {
    setFormData({ name: '', location: '', address: '', totalHalls: 0 });
  };

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
        onCancel();
      }
    } catch (error) {
      showToast(error.response?.data?.message || 'Failed to submit', 'error');
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
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Cinema Name
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter cinema name"
              name="name"
              onChange={handleChange}
              value={formData.name}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Location
            </label>
            <select
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
              value={formData.location}
              name="location"
              required
            >
              <option value="" disabled>
                Select a location
              </option>
              {locations.map(loc => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Address
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter cinema address"
              name="address"
              onChange={handleChange}
              value={formData.address}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Total Halls
            </label>
            <input
              type="number"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter total halls"
              name="totalHalls"
              onChange={handleChange}
              value={formData.totalHalls}
              required
            />
          </div>
        </form>
      </DialogBody>
      <DialogFooter>
        <Button
          color="blue"
          size="lg"
          fullWidth
          onClick={handleSubmit}
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
