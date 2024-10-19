import { Button, Typography } from '@material-tailwind/react';
import { useState } from 'react';
import CinemaHallForm from './CinemaHallForm';
import CinemaHallList from './CinemaHallList';

const CinemaHall = () => {
  const [view, setView] = useState('view'); 
  const [editHall, setEditHall] = useState(null); 

  const handleSwitchView = view => {
    setView(view);
    if (view !== 'edit') {
      setEditHall(null); // Reset if not in edit mode
    }
  };

  const handleEditHall = hall => {
    setEditHall(hall);
    setView('edit'); 
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="text-center mb-6">
        <Typography variant="h3" color="blue-gray" className="font-bold">
          Manage Cinema Halls
        </Typography>
      </div>

      {view === 'view' && (
        <div className="flex justify-center space-x-4 mb-8">
          <Button
            color="blue"
            size="lg"
            className="hover:bg-blue-700"
            onClick={() => handleSwitchView('create')}
          >
            + Create Cinema Hall
          </Button>
        </div>
      )}

      {view === 'view' && <CinemaHallList onEdit={handleEditHall} />}
      {view === 'create' && (
        <CinemaHallForm onCancel={() => handleSwitchView('view')} />
      )}
      {view === 'edit' && (
        <CinemaHallForm
          hall={editHall}
          onCancel={() => handleSwitchView('view')}
        />
      )}
    </div>
  );
};

export default CinemaHall;
