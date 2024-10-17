import { Button, Typography } from '@material-tailwind/react';
import { useState } from 'react';
import CinemaForm from './CinemaForm';
import CinemaList from './CinemaList';

const Cinema = () => {
  const [view, setView] = useState('view'); 
  const [editCinema, setEditCinema] = useState(null); 

  const handleSwitchView = view => {
    setView(view);
    if (view !== 'edit') {
      setEditCinema(null); 
    }
  };

  const handleEditCinema = cinema => {
    setEditCinema(cinema);
    setView('edit'); 
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="text-center mb-6">
        <Typography variant="h3" color="blue-gray" className="font-bold">
          Manage Cinemas
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
            + Create Cinema
          </Button>
        </div>
      )}

      {view === 'view' && <CinemaList onEdit={handleEditCinema} />}
      {view === 'create' && (
        <CinemaForm onCancel={() => handleSwitchView('view')} />
      )}
      {view === 'edit' && (
        <CinemaForm
          cinema={editCinema}
          onCancel={() => handleSwitchView('view')}
        />
      )}
    </div>
  );
};

export default Cinema;
