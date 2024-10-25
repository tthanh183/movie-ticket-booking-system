import { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Input,
  Typography,
  Select,
  Option,
} from '@material-tailwind/react';
import PropTypes from 'prop-types';

import Pagination from './Pagination';
import { useCinemaStore } from '../stores/useCinemaStore';
import { useHallStore } from '../stores/useHallStore';

const HallManager = ({ onCancel, onSuccess }) => {
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
    }
  }, [selectedCinema, getHallsByCinema, selectedHall]);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleStatusChange = e => {
    setFormData({ ...formData, status: e.target.value });
  };

  const handleAddOrUpdateHall = async () => {
    if (selectedHall) {
      console.log('formData', formData);

      await updateHall(selectedCinema._id, selectedHall._id, formData);
    } else {
      await createHall(selectedCinema._id, formData);
    }
    setFormData({
      name: '',
      totalSeats: '',
      status: 'active',
    });
    onSuccess();
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
    <div>
      <Typography variant="h5" color="blue-gray" className="font-bold mb-4">
        Manage Halls for {selectedCinema?.name}
      </Typography>

      <Card className="p-4 mb-4 shadow-lg border border-gray-300 ">
        <Typography variant="h6" color="blue-gray" className="font-bold mb-2">
          {selectedHall ? 'Edit Hall' : 'Add New Hall'}
        </Typography>
        <Input
          label="Hall Name"
          name="name"
          value={selectedHall.name}
          onChange={handleInputChange}
          className="mb-4"
          required
        />
        <Input
          label="Total Seats"
          name="totalSeats"
          type="number"
          value={selectedHall?.totalSeats}
          onChange={handleInputChange}
          className="mb-4"
          required
        />
        <Select
          label="Status"
          onChange={handleStatusChange}
          value={selectedHall?.status}
          className="mb-4"
        >
          <Option value="active">Active</Option>
          <Option value="inactive">Inactive</Option>
        </Select>
        <Button
          color="green"
          onClick={handleAddOrUpdateHall}
          disabled={cinemaLoading || hallLoading}
        >
          {cinemaLoading || hallLoading
            ? 'Loading...'
            : selectedHall
            ? 'Update Hall'
            : 'Add Hall'}
        </Button>
      </Card>

      <Card className="p-4 shadow-lg border border-gray-300">
        <Typography variant="h6" color="blue-gray" className="font-bold mb-2">
          Halls List
        </Typography>
        {currentHalls.map(hall => (
          <div
            key={hall._id}
            className="flex justify-between items-center mb-2 border-b border-gray-200 pb-2"
          >
            <div>
              <Typography className="font-bold">{hall.name}</Typography>
              <Typography>{hall.totalSeats} Seats</Typography>
              <Typography>Status: {hall.status}</Typography>
            </div>
            <div className="flex space-x-2">
              <Button
                onClick={() => setSelectedHall(hall)}
                color="yellow"
                size="sm"
              >
                Edit
              </Button>
              <Button onClick={handleDeleteHall} color="red" size="sm">
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

      <Button color="red" onClick={onCancel} className="mt-4">
        Cancel
      </Button>
    </div>
  );
};

HallManager.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default HallManager;
