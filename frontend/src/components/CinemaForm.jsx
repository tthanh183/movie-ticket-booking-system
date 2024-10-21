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
  Select,
  Option,
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
            <Select
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            >
              <Option value="" disabled>
                Select a location
              </Option>
              {locations.map(loc => (
                <Option key={loc} value={loc}>
                  {loc}
                </Option>
              ))}
            </Select>
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
