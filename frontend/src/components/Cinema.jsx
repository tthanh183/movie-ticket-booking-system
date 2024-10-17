import { Button, Card, Typography } from '@material-tailwind/react';
import { useState } from 'react';
import axiosInstance from '../lib/axiosInstance';

const location = [
  'Hồ Chí Minh',
  'Hà Nội',
  'Đà Nẵng',
  'Cần Thơ',
  'Hải Phòng',
  'Quảng Ninh',
];
const Cinema = () => {
  const [cinemas, setCinemas] = useState({
    name: '',
    location: '',
    address: '',
  });

  const handleChange = e => {
    setCinemas({
      ...cinemas,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen ">
      <div className="text-center mb-6">
        <Typography variant="h3" color="blue-gray" className="font-bold">
          Manage Cinemas
        </Typography>
      </div>

      <div className="flex justify-center space-x-4 mb-8">
        <Button color="blue" size="lg" className="hover:bg-blue-700">
          + Create Cinema
        </Button>
        <Button color="gray" size="lg" className="hover:bg-gray-700">
          View Cinemas
        </Button>
      </div>

      <Card shadow={true} className="p-6 max-w-lg mx-auto bg-white">
        <Typography variant="h5" color="blue-gray" className="mb-4">
          Create New Cinema
        </Typography>
        <form>
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
              value={cinemas.name}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Category
            </label>
            <select
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
              value={cinemas.location}
              name="location"
            >
              <option value="" disabled>
                Select a location
              </option>
              {location.map(loc => (
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
              placeholder="Enter cinema location"
              name="address"
              onChange={handleChange}
              value={cinemas.address}
            />
          </div>

          <Button
            color="blue"
            size="lg"
            fullWidth
            className="hover:bg-blue-700"
            onClick={handleSubmit}
          >
            Create Cinema
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Cinema;
