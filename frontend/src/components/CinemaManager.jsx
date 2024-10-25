import { useEffect, useState } from 'react';
import { Button, Typography } from '@material-tailwind/react';
import CinemaForm from './CinemaForm';
import CinemaList from './CinemaList';
import CustomSkeleton from './CustomSkeleton';
import { FaPlusCircle } from 'react-icons/fa';
import { useCinemaStore } from '../stores/useCinemaStore';

const CinemaManager = () => {
  const [openForm, setOpenForm] = useState(false);
  const [openHallManagement, setOpenHallManagement] = useState(false);
  const { getCinemas, cinemaLoading, clearSelectedCinema } = useCinemaStore();

  useEffect(() => {
    getCinemas();
  }, [getCinemas]);

  const handleOpenForm = () => {
    clearSelectedCinema();
    setOpenHallManagement(false); 
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    clearSelectedCinema();
    setOpenForm(false);
  };

  return (
    <>
      {cinemaLoading ? (
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

          {openForm && <CinemaForm onCancel={handleCloseForm} />}

          <CinemaList
            openForm={setOpenForm}
            openHallManagement={openHallManagement}
            setOpenHallManagement={setOpenHallManagement}
          />
        </div>
      )}
    </>
  );
};

export default CinemaManager;
