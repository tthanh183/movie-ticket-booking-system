import { Button, Card, Typography } from '@material-tailwind/react';
import { useState, useEffect } from 'react';
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

const CinemaForm = ({ cinema = null, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    address: '',
    totalHalls: 0,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (cinema) {
      setFormData({
        name: cinema.name,
        location: cinema.location,
        address: cinema.address,
        totalHalls: cinema.totalHalls,
      });
    }
  }, [cinema]);

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
      if (cinema) {
        const response = await updateCinemaApi(cinema._id, formData);
        if (response.data.success) {
          showToast('Cinema updated successfully', 'success');
          onCancel();
        }
      } else {
        const response = await createCinemaApi(formData);
        if (response.data.success) {
          showToast('Cinema created successfully', 'success');
          onCancel();
        }
      }
    } catch (error) {
      showToast(error.response?.data?.message || 'Failed to submit', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card shadow={true} className="p-6 max-w-lg mx-auto bg-white">
      <Typography variant="h5" color="blue-gray" className="mb-4">
        {cinema ? 'Edit Cinema' : 'Create New Cinema'}
      </Typography>
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
          />
        </div>

        <div className="flex space-x-4">
          <Button
            color="blue"
            size="lg"
            fullWidth
            className="hover:bg-blue-700"
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
          <Button
            color="gray"
            size="lg"
            fullWidth
            className="hover:bg-gray-500"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default CinemaForm;
