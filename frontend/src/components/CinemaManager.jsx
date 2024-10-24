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
      const location = cinema.location;
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
        const groupedCinemas = transformCinemas(response.data.cinemas);
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
    setEditCinema(null);
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setEditCinema(null);
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <CustomSkeleton />
        </div>
      ) : (
        <div className="p-6 min-h-screen">
          <div className="text-center mb-4">
            <Typography variant="h3" color="blue-gray" className="font-bold">
              Cinema Manager
            </Typography>
          </div>

          <div className="flex justify-center mb-4">
            <Button
              color="blue"
              size="lg"
              className="hover:bg-blue-700 flex items-center gap-2"
              onClick={handleOpenForm}
            >
              <FaPlusCircle /> Create Cinema
            </Button>
          </div>

          {openForm && (
            <CinemaForm
              cinema={editCinema}
              onCancel={handleCloseForm}
              setCinemas={setCinemas}
            />
          )}

          <CinemaList
            onEdit={handleEditCinema}
            cinemas={cinemas}
            setCinemas={setCinemas}
          />
        </div>
      )}
    </>
  );
};

export default CinemaManager;
