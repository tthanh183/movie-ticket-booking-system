import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, Typography, Button } from '@material-tailwind/react';

import { useCinemaStore } from '../stores/useCinemaStore';
import { useLocationsStore } from '../stores/useLocationsStore';
import DeleteModal from './DeleteModal';
import HallManager from './HallManager';
import CustomSkeleton from './CustomSkeleton';
import { useHallStore } from '../stores/useHallStore';

const CinemaList = ({
  openForm,
  openHallManagement,
  setOpenHallManagement,
}) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [expandedLocation, setExpandedLocation] = useState(null);
  const { locations, locationLoading, getLocations } = useLocationsStore();
  const {
    selectedCinema,
    transformedCinemas,
    deleteCinema,
    setSelectedCinema,
    clearSelectedCinema,
  } = useCinemaStore();
  const { clearSelectedHall } = useHallStore();
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
    openForm(false);
    setSelectedCinema(cinema);
    clearSelectedHall();
    setOpenHallManagement(true);
  };

  const handleCloseHallManagement = () => {
    setOpenHallManagement(false);
    clearSelectedCinema();
  };

  const handleOpenForm = cinema => {
    setSelectedCinema(cinema);
    openForm(true);
    setOpenHallManagement(false);
  };

  const handleOpenDeleteModal = cinema => {
    setSelectedCinema(cinema);
    setOpenDeleteModal(true);
  };

  const handleDelete = async () => {
    deleteCinema(selectedCinema._id);
    clearSelectedCinema();
    setOpenDeleteModal(false);
  };

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
              {transformedCinemas[expandedLocation]?.map(cinema => (
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
                  <Typography color="blue-gray" className="mb-2 min-h-10">
                    {cinema.address}
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
              <HallManager onCancel={handleCloseHallManagement} />
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
  openForm: PropTypes.func.isRequired,
  openHallManagement: PropTypes.bool.isRequired,
  setOpenHallManagement: PropTypes.func.isRequired,
};

export default CinemaList;
