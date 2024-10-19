import { Button, Card, Typography } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import {
  getAllCinemaHallsApi,
  deleteCinemaHallApi,
} from '../api/cinemaHallApi';
import showToast from '../lib/showToast';

const CinemaHallList = ({ onEdit }) => {
  const [halls, setHalls] = useState([]);

  useEffect(() => {
    const fetchHalls = async () => {
      try {
        const response = await getAllCinemaHallsApi();
        if (response.data.success) {
          setHalls(response.data.halls);
        }
      } catch (error) {
        console.error('Failed to fetch halls', error);
      }
    };
    fetchHalls();
  }, []);

  const handleDelete = async id => {
    try {
      const response = await deleteCinemaHallApi(id);
      if (response.data.success) {
        showToast('Hall deleted successfully', 'success');
        setHalls(halls.filter(hall => hall._id !== id));
      }
    } catch (error) {
      showToast('Failed to delete hall', 'error');
    }
  };

  return (
    <div>
      {halls.map(hall => (
        <Card key={hall._id} shadow={true} className="p-4 mb-4">
          <Typography variant="h6" color="blue-gray" className="font-bold">
            {hall.name}
          </Typography>
          <Typography color="blue-gray" className="mb-2">
            Total Seats: {hall.totalSeats} | Status: {hall.status}
          </Typography>
          <div className="flex space-x-4">
            <Button size="sm" color="blue" onClick={() => onEdit(hall)}>
              Edit
            </Button>
            <Button
              size="sm"
              color="red"
              onClick={() => handleDelete(hall._id)}
            >
              Delete
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default CinemaHallList;
