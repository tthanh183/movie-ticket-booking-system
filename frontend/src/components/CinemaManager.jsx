import { useEffect, useState } from 'react';
import { Button, Typography } from '@material-tailwind/react';

import { getAllCinemasApi } from '../api/cinemaApi';
import CinemaForm from './CinemaForm';
import CinemaList from './CinemaList';
import CustomSkeleton from './CustomSkeleton';
import { FaPlusCircle } from 'react-icons/fa';

const CinemaManager = () => {
  const [cinemas, setCinemas] = useState({});
  const [editCinema, setEditCinema] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCinemas();
  }, []);

  const transformCinemas = cinemas => {
    return cinemas.reduce((acc, cinema) => {
      const location = cinema.location; // Assuming location is a string
      if (!acc[location]) {
        acc[location] = [];
      }
      acc[location].push(cinema);
      return acc;
    }, {});
  };

  const fetchCinemas = async () => {
    setLoading(true);
    try {
      const response = await getAllCinemasApi();
      if (response.data.success) {
        const groupedCinemas = transformCinemas(response.data.modifiedCinemas);
        setCinemas(groupedCinemas);
      }
    } catch (error) {
      console.error(error.response?.data?.message, error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditCinema = cinema => {
    setEditCinema(cinema);
    setOpenForm(true);
  };

  const handleOpenForm = () => {
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setEditCinema(null);
  };

  const handleSubmitForm = () => {
    handleCloseForm();
    fetchCinemas();
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <CustomSkeleton />
        </div>
      ) : (
        <div className="p-6 bg-gray-100 min-h-screen">
          <div className="text-center mb-6">
            <Typography variant="h3" color="blue-gray" className="font-bold">
              Add Movie
            </Typography>
          </div>

          <div className="flex justify-center space-x-4 mb-8">
            <Button
              color="blue"
              size="lg"
              className="hover:bg-blue-700"
              onClick={handleOpenForm}
            >
              <div className="flex justify-center items-center gap-2">
                <FaPlusCircle />
                Create Cinema
              </div>
            </Button>
          </div>

          <CinemaList
            onEdit={handleEditCinema}
            cinemas={cinemas}
            onSuccess={handleSubmitForm}
          />
          
          <CinemaForm
            cinema={editCinema}
            onCancel={handleCloseForm}
            open={openForm}
            onSuccess={handleSubmitForm}
          />
        </div>
      )}
    </>
  );
};

export default CinemaManager;
