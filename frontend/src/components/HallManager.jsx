import { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Input,
  Typography,
  Select,
  Option,
  Dialog,
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

const HallManager = ({ cinemaId, openHallManagement, onCancel, onSuccess }) => {
  const [halls, setHalls] = useState([]);
  const [cinema, setCinema] = useState(null);
  const [newHall, setNewHall] = useState({
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
    editingHall
      ? setEditingHall({ ...editingHall, [name]: value })
      : setNewHall({ ...newHall, [name]: value });
  };

  const handleStatusChange = e => {
    editingHall
      ? setEditingHall({ ...editingHall, status: e })
      : setNewHall({ ...newHall, status: e });
  };

  const handleAddHall = async () => {
    setLoading(true);
    try {
      const response = await createHallApi(cinemaId, newHall);
      if (response.data.success) {
        setNewHall({ name: '', totalSeats: '', status: 'active' });
        setHalls([...halls, response.data.hall]);
      }
      setLoading(false);
      showToast(response.data.message, 'success');
      // onSuccess();
    } catch (error) {
      onCancel();
      showToast(error.response?.data?.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveEdit = async () => {
    setLoading(true);
    try {
      const response = await updateHallApi(
        cinemaId,
        editingHall._id,
        editingHall
      );
      if (response.data.success) {
        const updatedHalls = halls.map(hall =>
          hall._id === editingHall._id ? response.data.hall : hall
        );
        setHalls(updatedHalls);
        setEditingHall(null);
        // onSuccess();
        showToast(response.data.message, 'success');
      }
    } catch (error) {
      onCancel();
      showToast(error.response?.data?.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = hall => {
    setEditingHall(hall);
    setNewHall({ name: '', totalSeats: '', status: 'active' });
  };

  const handleCancelEdit = () => {
    setEditingHall(null);
    setNewHall({ name: '', totalSeats: '', status: 'active' });
  };

  const indexOfLastHall = currentPage * hallsPerPage;
  const indexOfFirstHall = indexOfLastHall - hallsPerPage;
  const currentHalls = halls.slice(indexOfFirstHall, indexOfLastHall);

  const totalPages = Math.ceil(halls.length / hallsPerPage);

  return (
    <Dialog
      open={openHallManagement}
      handler={onCancel}
      className="w-full max-w-6xl mx-auto px-6 py-4"
    >
      <Typography variant="h4" className="mb-5 text-center text-gray-800">
        {cinema?.name} Hall Management
      </Typography>

      <Card className="p-6 mb-6 shadow-md bg-white">
        <Typography variant="h5" className="mb-5 text-gray-700">
          {editingHall ? 'Edit Hall' : 'Add New Hall'}
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Hall Name"
            name="name"
            value={editingHall ? editingHall.name : newHall.name}
            onChange={handleInputChange}
            className="mb-4"
            required
          />
          <Input
            label="Total Seats"
            name="totalSeats"
            type="number"
            value={editingHall ? editingHall.totalSeats : newHall.totalSeats}
            onChange={handleInputChange}
            className="mb-4"
            required
          />
          <Select
            label="Status"
            value={editingHall ? editingHall.status : newHall.status}
            onChange={handleStatusChange}
          >
            <Option value="active">Active</Option>
            <Option value="inactive">Inactive</Option>
            <Option value="maintenance">Maintenance</Option>
          </Select>
        </div>

        <div className="flex justify-end mt-6">
          {editingHall ? (
            <>
              <Button
                color="yellow"
                onClick={handleSaveEdit}
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button color="red" onClick={handleCancelEdit} className="ml-3">
                Cancel
              </Button>
            </>
          ) : (
            <Button color="blue" onClick={handleAddHall} disabled={loading}>
              {loading ? 'Adding...' : 'Add Hall'}
            </Button>
          )}
        </div>
      </Card>

      <Typography variant="h5" className="mb-5 text-gray-700">
        Existing Halls
      </Typography>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {currentHalls.map(hall => (
          <Card key={hall._id} className="p-6 shadow-md bg-white">
            <Typography variant="h6" className="text-lg mb-4 text-gray-800">
              {hall.name}
            </Typography>
            <Typography className="mb-2">
              Total Seats: {hall.totalSeats}
            </Typography>
            <Typography>Status: {hall.status}</Typography>
            <div className="flex space-x-4 mt-4">
              <Button color="yellow" onClick={() => handleEdit(hall)}>
                Edit
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </Dialog>
  );
};

HallManager.propTypes = {
  cinemaId: PropTypes.string,
  openHallManagement: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default HallManager;
