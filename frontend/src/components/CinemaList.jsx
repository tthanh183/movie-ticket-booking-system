import {
  Card,
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { getAllCinemasApi, deleteCinemaApi } from '../api/cinemaApi';
import showToast from '../lib/showToast';

// eslint-disable-next-line react/prop-types
const CinemaList = ({ onEdit }) => {
  const [cinemas, setCinemas] = useState({});
  const [open, setOpen] = useState(false); 
  const [selectedCinemaId, setSelectedCinemaId] = useState(null); 

  useEffect(() => {
    const fetchCinemas = async () => {
      try {
        const response = await getAllCinemasApi();
        if (response.data.success) {
          const groupedByLocation = response.data.cinemas.reduce(
            (acc, cinema) => {
              if (!acc[cinema.location]) acc[cinema.location] = [];
              acc[cinema.location].push(cinema);
              return acc;
            },
            {}
          );
          setCinemas(groupedByLocation);
        }
      } catch (error) {
        console.error('Failed to fetch cinemas', error);
      }
    };
    fetchCinemas();
  }, []);

  const openDeleteModal = id => {
    setSelectedCinemaId(id); 
    setOpen(true); 
  };

  const closeDeleteModal = () => {
    setOpen(false); 
    setSelectedCinemaId(null); 
  };

  const handleDelete = async () => {
    if (!selectedCinemaId) return; 

    try {
      const response = await deleteCinemaApi(selectedCinemaId);
      if (response.data.success) {
        showToast('Cinema deleted successfully', 'success');
        setCinemas(prevCinemas =>
          Object.fromEntries(
            Object.entries(prevCinemas).map(([location, cinemas]) => [
              location,
              cinemas.filter(cinema => cinema._id !== selectedCinemaId),
            ])
          )
        );
        closeDeleteModal(); 
      }
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      showToast('Failed to delete cinema', 'error');
    }
  };

  return (
    <div>
      {Object.keys(cinemas).map(location => (
        <div key={location} className="mb-6">
          <Typography variant="h6" className="font-semibold text-blue-700 mb-2">
            {location}
          </Typography>
          {cinemas[location].map(cinema => (
            <Card key={cinema._id} shadow={true} className="p-4 mb-4">
              <Typography variant="h6" color="blue-gray" className="font-bold">
                {cinema.name}
              </Typography>
              <Typography color="blue-gray" className="mb-2">
                {cinema.address}
              </Typography>
              <div className="flex space-x-4">
                <Button size="sm" color="blue" onClick={() => onEdit(cinema)}>
                  Edit
                </Button>
                <Button
                  size="sm"
                  color="red"
                  onClick={() => openDeleteModal(cinema._id)} 
                >
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ))}

      <Dialog open={open} handler={closeDeleteModal}>
        <DialogHeader>Confirm Delete</DialogHeader>
        <DialogBody>
          Are you sure you want to delete this cinema? This action cannot be
          undone.
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={closeDeleteModal}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleDelete}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default CinemaList;
