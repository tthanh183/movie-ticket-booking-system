import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, Typography, Button } from '@material-tailwind/react';

import { useCinemaStore } from '../stores/useCinemaStore';
import { useLocationsStore } from '../stores/useLocationsStore';
import DeleteModal from './DeleteModal';
import HallManager from './HallManager';
import CustomSkeleton from './CustomSkeleton';

const CinemaList = ({ cinemas, onOpen }) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [expandedLocation, setExpandedLocation] = useState(null);
  const [openHallManagement, setOpenHallManagement] = useState(false);
  const { locations, locationLoading, getLocations } = useLocationsStore();
  const { getCinemas, deleteCinema, setSelectedCinema, clearSelectedCinema } =
    useCinemaStore();

  useEffect(() => {
    getLocations();
  }, [getLocations]);

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
    clearSelectedCinema();
  };

  const toggleLocation = location => {
    setExpandedLocation(expandedLocation === location ? null : location);
  };

  const handleOpenHallManagement = cinema => {
    setSelectedCinema(cinema);
    setOpenHallManagement(true);
  };

  const handleCloseHallManagement = () => {
    setOpenHallManagement(false);
    clearSelectedCinema();
  };

  const handleOpenForm = cinema => {
    setSelectedCinema(cinema);
    onOpen();
  };

  const handleOpenDeleteModal = cinema => {
    setSelectedCinema(cinema);
    setOpenDeleteModal(true);
  };

  const handleDelete = async () => {
    deleteCinema();
    clearSelectedCinema();
    setOpenDeleteModal(false);
  };

  const handleSubmit = () => {
    getCinemas();
  }
  return (
    <div>
      {locationLoading ? (
        <div className="flex justify-center items-center min-h-screen">
          <CustomSkeleton />
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
            {locations.map(location => (
              <Card
                key={location.id}
                onClick={() => toggleLocation(location.name)}
                className={`p-4 cursor-pointer hover:shadow-lg transition-shadow duration-200 ${
                  expandedLocation === location.name
                    ? 'bg-gray-200'
                    : 'bg-white'
                }`}
              >
                <Typography
                  variant="h6"
                  className="font-semibold text-blue-700"
                >
                  {location.name}
                </Typography>
              </Card>
            ))}
          </div>

          {expandedLocation && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cinemas[expandedLocation]?.map(cinema => (
                <Card
                  key={cinema._id}
                  shadow={true}
                  className="p-4 hover:shadow-lg transition-shadow duration-200"
                >
                  <Typography
                    variant="h6"
                    color="blue-gray"
                    className="font-bold"
                  >
                    {cinema.name}
                  </Typography>
                  <Typography color="blue-gray" className="mb-2 min-h-20">
                    {cinema.address}
                  </Typography>
                  <Typography color="blue-gray" className="mb-2 min-h-2">
                    {cinema.totalHalls} Halls Available
                  </Typography>
                  <div className="flex space-x-4">
                    <Button
                      size="sm"
                      color="yellow"
                      onClick={() => handleOpenForm(cinema)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      color="blue"
                      onClick={() => handleOpenHallManagement(cinema)}
                    >
                      Manage Halls
                    </Button>
                    <Button
                      size="sm"
                      color="red"
                      onClick={() => handleOpenDeleteModal(cinema)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {openHallManagement && (
            <div className="mt-8">
              <HallManager onCancel={handleCloseHallManagement} onSuccess={handleSubmit}/>
            </div>
          )}

          {openDeleteModal && (
            <DeleteModal
              open={openDeleteModal}
              onCancel={handleCloseDeleteModal}
              onDelete={handleDelete}
            />
          )}
        </div>
      )}
    </div>
  );
};

CinemaList.propTypes = {
  cinemas: PropTypes.object.isRequired,
  onOpen: PropTypes.func.isRequired,
};

export default CinemaList;
