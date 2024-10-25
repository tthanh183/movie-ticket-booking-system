import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Typography, Input } from '@material-tailwind/react';
import { useLocationsStore } from '../stores/useLocationsStore';
import { useCinemaStore } from '../stores/useCinemaStore';

const CinemaForm = ({ onCancel, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    location: '',
  });

  const { locations, getLocations } = useLocationsStore();
  const { selectedCinema, updateCinema, createCinema, cinemaLoading } =
    useCinemaStore();

  useEffect(() => {
    getLocations();
  }, [getLocations]);

  useEffect(() => {
    if (selectedCinema) {
      const locationId = locations.find(
        location => location.name === selectedCinema.location
      )?._id;
      setFormData({
        name: selectedCinema.name,
        address: selectedCinema.address,
        location: locationId || '',
      });
    } else {
      setFormData({ name: '', address: '', location: '' });
    }
  }, [selectedCinema, locations]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (selectedCinema) {
      await updateCinema(selectedCinema._id, formData);
    } else {
      await createCinema(formData);
    }
    onSuccess();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md mb-6"
    >
      <Typography variant="h5" className="mb-4">
        {selectedCinema ? 'Edit Cinema' : 'Create Cinema'}
      </Typography>
      <div className="grid grid-cols-1 gap-4">
        <select
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="block w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="" disabled>
            Select a location
          </option>
          {locations.map(location => (
            <option key={location._id} value={location._id}>
              {location.name}
            </option>
          ))}
        </select>
        <Input
          label="Cinema Name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <Input
          label="Address"
          name="address"
          type="text"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <div className="flex justify-end mt-4">
          <Button
            type="submit"
            color="green"
            className="mr-2"
            disabled={cinemaLoading}
          >
            {cinemaLoading ? 'Saving...' : 'Save Cinema'}
          </Button>
          <Button type="button" color="red" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
};

CinemaForm.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default CinemaForm;
