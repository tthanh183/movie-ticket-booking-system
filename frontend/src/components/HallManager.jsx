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

import {
  createHallApi,
  getHallsByCinemaIdApi,
  updateHallApi,
  getCinemaByIdApi,
} from '../api/cinemaApi';
import showToast from '../lib/showToast';
import Pagination from './Pagination';

const HallManager = ({ cinemaId, onCancel }) => {
  const [halls, setHalls] = useState([]);
  const [cinema, setCinema] = useState(null);
  const [currentHall, setCurrentHall] = useState({
    name: '',
    totalSeats: '',
    status: 'active',
  });
  const [editingHall, setEditingHall] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const hallsPerPage = 4;

  useEffect(() => {
    if (cinemaId) {
      fetchHalls(cinemaId);
      fetchCinema(cinemaId);
    }
  }, [cinemaId]);

  const fetchHalls = async cinemaId => {
    try {
      const response = await getHallsByCinemaIdApi(cinemaId);
      if (response.data.success) {
        setHalls(response.data.halls);
      }
    } catch (error) {
      console.error(error.response?.data?.message, error);
    }
  };

  const fetchCinema = async id => {
    try {
      const response = await getCinemaByIdApi(id);
      if (response.data.success) {
        setCinema(response.data.cinema);
      }
    } catch (error) {
      console.error(error.response?.data?.message, error);
    }
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setCurrentHall({ ...currentHall, [name]: value });
  };

  const handleStatusChange = e => {
    setCurrentHall({ ...currentHall, status: e });
  };

  const handleAddOrUpdateHall = async () => {
    setLoading(true);
    try {
      let response;
      if (editingHall) {
        response = await updateHallApi(cinemaId, editingHall._id, currentHall);
        if (response.data.success) {
          const updatedHalls = halls.map(hall =>
            hall._id === editingHall._id ? response.data.hall : hall
          );
          setHalls(updatedHalls);
          showToast(response.data.message, 'success');
        }
      } else {
        response = await createHallApi(cinemaId, currentHall);
        if (response.data.success) {
          setHalls([...halls, response.data.hall]);
          showToast(response.data.message, 'success');
        }
      }
      setCurrentHall({ name: '', totalSeats: '', status: 'active' });
      setEditingHall(null);
    } catch (error) {
      onCancel();
      showToast(error.response?.data?.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = hall => {
    setEditingHall(hall);
    setCurrentHall({
      name: hall.name,
      totalSeats: hall.totalSeats,
      status: hall.status,
    });
  };

  const handleDeleteHall = hallId => {
    const updatedHalls = halls.filter(hall => hall._id !== hallId);
    setHalls(updatedHalls);
    showToast('Hall deleted successfully', 'success');
  };

  const indexOfLastHall = currentPage * hallsPerPage;
  const indexOfFirstHall = indexOfLastHall - hallsPerPage;
  const currentHalls = halls.slice(indexOfFirstHall, indexOfLastHall);
  const totalPages = Math.ceil(halls.length / hallsPerPage);

  return (
    <div>
      <Typography variant="h5" color="blue-gray" className="font-bold mb-4">
        Manage Halls for {cinema?.name}
      </Typography>

      <Card className="p-4 mb-4 shadow-lg border border-gray-300 ">
        <Typography variant="h6" color="blue-gray" className="font-bold mb-2">
          {editingHall ? 'Edit Hall' : 'Add New Hall'}
        </Typography>
        <Input
          label="Hall Name"
          name="name"
          value={currentHall.name}
          onChange={handleInputChange}
          className="mb-4"
          required
        />
        <Input
          label="Total Seats"
          name="totalSeats"
          type="number"
          value={currentHall.totalSeats}
          onChange={handleInputChange}
          className="mb-4"
          required
        />
        <Select
          label="Status"
          onChange={handleStatusChange}
          value={currentHall.status}
          className="mb-4"
        >
          <Option value="active">Active</Option>
          <Option value="inactive">Inactive</Option>
        </Select>
        <Button
          color="green"
          onClick={handleAddOrUpdateHall}
          disabled={loading}
        >
          {loading
            ? editingHall
              ? 'Saving...'
              : 'Adding...'
            : editingHall
            ? 'Save Changes'
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
              <Button onClick={() => handleEdit(hall)} color="yellow" size="sm">
                Edit
              </Button>
              <Button
                onClick={() => handleDeleteHall(hall._id)}
                color="red"
                size="sm"
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

      <Button color="red" onClick={onCancel} className="mt-4">
        Cancel
      </Button>
    </div>
  );
};

HallManager.propTypes = {
  cinemaId: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default HallManager;
