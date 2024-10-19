// src/components/HallManagement.js
import React, { useState } from 'react';
import {
  Button,
  Card,
  Input,
  Typography,
  Switch,
} from '@material-tailwind/react';

const HallManagement = () => {
  const [halls, setHalls] = useState([
    { id: 1, name: 'Hall 1', seats: 120, status: true },
    { id: 2, name: 'Hall 2', seats: 100, status: false },
  ]);

  const [newHall, setNewHall] = useState({ name: '', seats: '', status: true });
  const [editingHall, setEditingHall] = useState(null);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setNewHall({ ...newHall, [name]: value });
  };

  const handleToggleStatus = () => {
    setNewHall({ ...newHall, status: !newHall.status });
  };

  const handleAddHall = () => {
    const updatedHalls = [...halls, { ...newHall, id: halls.length + 1 }];
    setHalls(updatedHalls);
    setNewHall({ name: '', seats: '', status: true });
  };

  const handleEditHall = hall => {
    setEditingHall(hall);
    setNewHall(hall);
  };

  const handleSaveEdit = () => {
    const updatedHalls = halls.map(hall =>
      hall.id === editingHall.id ? newHall : hall
    );
    setHalls(updatedHalls);
    setEditingHall(null);
    setNewHall({ name: '', seats: '', status: true });
  };

  const handleDeleteHall = id => {
    setHalls(halls.filter(hall => hall.id !== id));
  };

  return (
    <div className="p-5">
      <Typography variant="h4" className="mb-5 text-center">
        Hall Management
      </Typography>

      {/* Form for Adding/Editing */}
      <Card className="p-5 mb-5 shadow-md">
        <Typography variant="h5" className="mb-3">
          {editingHall ? 'Edit Hall' : 'Add New Hall'}
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Hall Name"
            name="name"
            value={newHall.name}
            onChange={handleInputChange}
            className="mb-3"
          />
          <Input
            label="Seats"
            name="seats"
            type="number"
            value={newHall.seats}
            onChange={handleInputChange}
            className="mb-3"
          />
          <div className="flex items-center">
            <Switch
              label="Status"
              checked={newHall.status}
              onChange={handleToggleStatus}
              color={newHall.status ? 'green' : 'red'}
            />
            <Typography className="ml-2">
              {newHall.status ? 'Active' : 'Inactive'}
            </Typography>
          </div>
        </div>

        <div className="flex justify-end mt-5">
          {editingHall ? (
            <Button color="green" onClick={handleSaveEdit}>
              Save Changes
            </Button>
          ) : (
            <Button color="blue" onClick={handleAddHall}>
              Add Hall
            </Button>
          )}
        </div>
      </Card>

      {/* List of Halls */}
      <Typography variant="h5" className="mb-5">
        Existing Halls
      </Typography>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {halls.map(hall => (
          <Card key={hall.id} className="p-5 shadow-md">
            <Typography variant="h6" className="text-lg">
              {hall.name}
            </Typography>
            <Typography>Seats: {hall.seats}</Typography>
            <Typography>
              Status: {hall.status ? 'Active' : 'Inactive'}
            </Typography>
            <div className="flex space-x-2 mt-4">
              <Button color="amber" onClick={() => handleEditHall(hall)}>
                Edit
              </Button>
              <Button color="red" onClick={() => handleDeleteHall(hall.id)}>
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HallManagement;
