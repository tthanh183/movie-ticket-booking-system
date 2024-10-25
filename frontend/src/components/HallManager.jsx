import { useEffect, useState } from 'react';
import { Button, Card, Input, Typography } from '@material-tailwind/react';
import PropTypes from 'prop-types';

import Pagination from './Pagination';
import { useCinemaStore } from '../stores/useCinemaStore';
import { useHallStore } from '../stores/useHallStore';

const HallManager = ({ onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    totalSeats: '',
    status: 'active',
  });
  const { selectedCinema, cinemaLoading } = useCinemaStore();

  const {
    halls,
    hallLoading,
    selectedHall,
    getHallsByCinema,
    createHall,
    updateHall,
    deleteHall,
    setSelectedHall,
    clearSelectedHall,
  } = useHallStore();

  const [currentPage, setCurrentPage] = useState(1);
  const hallsPerPage = 4;

  useEffect(() => {
    if (selectedCinema) {
      getHallsByCinema(selectedCinema._id);
      setCurrentPage(1);
    }
  }, [selectedCinema, getHallsByCinema]);

  useEffect(() => {
    if (selectedHall) {
      setFormData({
        name: selectedHall.name,
        totalSeats: selectedHall.totalSeats,
        status: selectedHall.status,
      });
    } else {
      setFormData({
        name: '',
        totalSeats: '',
        status: 'active',
      });
    }
  }, [selectedHall]);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddOrUpdateHall = async () => {
    if (selectedHall) {
      await updateHall(selectedCinema._id, selectedHall._id, formData);
    } else {
      await createHall(selectedCinema._id, formData);
    }
    setFormData({
      name: '',
      totalSeats: '',
      status: 'active',
    });
    setSelectedHall(null);
  };

  const handleDeleteHall = () => {
    deleteHall(selectedCinema._id, selectedHall._id);
    clearSelectedHall();
  };

  const indexOfLastHall = currentPage * hallsPerPage;
  const indexOfFirstHall = indexOfLastHall - hallsPerPage;
  const currentHalls = halls.slice(indexOfFirstHall, indexOfLastHall);
  const totalPages = Math.ceil(halls.length / hallsPerPage);

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <Typography
        variant="h4"
        color="blue-gray"
        className="font-bold mb-6 text-center"
      >
        Manage Halls for {selectedCinema?.name}
      </Typography>

      <Card className="p-6 mb-6 shadow-md border border-gray-200 rounded-md ">
        <Typography
          variant="h5"
          color="blue-gray"
          className="font-semibold mb-6 text-center"
        >
          {selectedHall ? 'Edit Hall' : 'Add New Hall'}
        </Typography>

        <div className="mb-4">
          <Input
            label="Hall Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="border-gray-300"
            required
          />
        </div>

        <div className="mb-4">
          <Input
            label="Total Seats"
            name="totalSeats"
            type="number"
            value={formData.totalSeats}
            onChange={handleInputChange}
            className="border-gray-300"
            required
          />
        </div>

        <div className="mb-4">
          <select
            id="status"
            name="status"
            onChange={handleInputChange}
            value={formData.status}
            className="block w-full p-3 border border-gray-300 rounded-md text-gray-600 bg-white"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <Button
          color="green"
          onClick={handleAddOrUpdateHall}
          disabled={cinemaLoading || hallLoading}
          fullWidth
        >
          {cinemaLoading || hallLoading
            ? 'Loading...'
            : selectedHall
            ? 'Update Hall'
            : 'Add Hall'}
        </Button>
      </Card>

      <Card className="p-4 shadow-md border border-gray-200 rounded-md">
        <Typography
          variant="h5"
          color="blue-gray"
          className="font-semibold mb-4 text-center"
        >
          Halls List
        </Typography>
        {currentHalls.map(hall => (
          <div
            key={hall._id}
            className="flex justify-between items-center p-2 mb-2 border-b border-gray-200"
          >
            <div>
              <Typography className="font-bold text-lg">{hall.name}</Typography>
              <Typography className="text-gray-500">
                {hall.totalSeats} Seats
              </Typography>
              <Typography className="text-gray-500">
                Status: {hall.status}
              </Typography>
            </div>
            <div className="flex space-x-2">
              <Button
                onClick={() => setSelectedHall(hall)}
                color="yellow"
                size="sm"
                className="rounded-full"
              >
                Edit
              </Button>
              <Button
                onClick={handleDeleteHall}
                color="red"
                size="sm"
                className="rounded-full"
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </Card>

      <Button color="red" onClick={onCancel} className="mt-6" fullWidth>
        Cancel
      </Button>
    </div>
  );
};

HallManager.propTypes = {
  onCancel: PropTypes.func.isRequired,
};

export default HallManager;
