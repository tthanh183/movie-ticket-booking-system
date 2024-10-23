import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, Typography, Button } from '@material-tailwind/react';

import { deleteCinemaApi } from '../api/cinemaApi'; // API để xóa rạp
import showToast from '../lib/showToast';
import DeleteModal from './DeleteModal';
import HallManager from './HallManager';
import { getAllLocationsApi } from '../api/locationApi';

const CinemaList = ({ onEdit, cinemas, onSuccess }) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedCinemaId, setSelectedCinemaId] = useState(null);
  const [expandedLocation, setExpandedLocation] = useState(null);
  const [openHallManagement, setOpenHallManagement] = useState(false);
  const [locations, setLocations] = useState([]);

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

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
    setSelectedCinemaId(null);
  };

  const handleOpenDeleteModal = cinemaId => {
    setSelectedCinemaId(cinemaId);
    setOpenDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!selectedCinemaId) return;

    try {
      const response = await deleteCinemaApi(selectedCinemaId);
      if (response.data.success) {
        showToast(response.data.message, 'success');
        onSuccess();
        handleCloseDeleteModal();
      }
    } catch (error) {
      showToast(error.response?.data?.message, 'error');
    }
  };

  const toggleLocation = location => {
    setExpandedLocation(expandedLocation === location ? null : location);
  };

  const handleOpenHallManagement = cinemaId => {
    setSelectedCinemaId(cinemaId);
    setOpenHallManagement(true);
  };

  const handleCloseHallManagement = () => {
    setSelectedCinemaId(null);
    setOpenHallManagement(false);
  };

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        {locations.map(location => (
          <Card
            key={location.id}
            onClick={() => toggleLocation(location.name)}
            className={`p-4 cursor-pointer ${
              expandedLocation === location.name ? 'bg-gray-200' : 'bg-white'
            }`}
          >
            <Typography variant="h6" className="font-semibold text-blue-700">
              {location.name}
            </Typography>
          </Card>
        ))}
      </div>

      {expandedLocation && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cinemas[expandedLocation]?.map(cinema => (
            <Card key={cinema._id} shadow={true} className="p-4">
              <Typography variant="h6" color="blue-gray" className="font-bold">
                {cinema.name}
              </Typography>
              <Typography color="blue-gray" className="mb-2 min-h-20">
                {cinema.address}
              </Typography>
              <Typography color="blue-gray" className="mb-2 min-h-2">
                {cinema.totalHalls} Halls Available
              </Typography>
              <div className="flex space-x-4">
                <Button size="sm" color="yellow" onClick={() => onEdit(cinema)}>
                  Edit
                </Button>
                <Button
                  size="sm"
                  color="blue"
                  onClick={() => handleOpenHallManagement(cinema._id)}
                >
                  Manage Halls
                </Button>
                <Button
                  size="sm"
                  color="red"
                  onClick={() => handleOpenDeleteModal(cinema._id)}
                >
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <HallManager
        cinemaId={selectedCinemaId}
        openHallManagement={openHallManagement}
        onCancel={handleCloseHallManagement}
        onSuccess={onSuccess}
      />

      <DeleteModal
        name="cinema"
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        onDelete={handleDelete}
      />
    </div>
  );
};

CinemaList.propTypes = {
  onEdit: PropTypes.func.isRequired,
  cinemas: PropTypes.objectOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
        totalHalls: PropTypes.number.isRequired,
      })
    ).isRequired
  ).isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default CinemaList;
