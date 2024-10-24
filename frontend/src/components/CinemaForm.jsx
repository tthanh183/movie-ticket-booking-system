import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Typography, Input } from '@material-tailwind/react';
import { createCinemaApi, updateCinemaApi } from '../api/cinemaApi';
import { getAllLocationsApi } from '../api/locationApi';
import showToast from '../lib/showToast';

const CinemaForm = ({ cinema, onSuccess, onCancel }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [locations, setLocations] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await getAllLocationsApi();
        if (response.data.success) {
          setLocations(response.data.locations);
        }
      } catch (error) {
        showToast(error.response?.data?.message, 'error');
      }
    };

    fetchLocations();
  }, []);

  useEffect(() => {
    if (cinema) {
      setName(cinema.name);
      setAddress(cinema.address);
      const locationId = locations.find(
        location => location.name === cinema.location
      )?._id;
      setSelectedLocation(locationId || '');
    } else {
      resetForm();
    }
  }, [cinema, locations]);

  const resetForm = () => {
    setName('');
    setAddress('');
    setSelectedLocation('');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const cinemaData = { name, address, location: selectedLocation };
      const response = cinema
        ? await updateCinemaApi(cinema._id, cinemaData)
        : await createCinemaApi(cinemaData);

      if (response.data.success) {
        showToast(response.data.message, 'success');
        onSuccess();
      }
    } catch (error) {
      showToast(error.response?.data?.message, 'error');
    } finally {
      setIsSubmitting(false);
      if (!cinema) resetForm();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md mb-6"
    >
      <Typography variant="h5" className="mb-4">
        {cinema ? 'Edit Cinema' : 'Create Cinema'}
      </Typography>
      <div className="grid grid-cols-1 gap-4">
        <select
          id="location"
          name="location"
          value={selectedLocation}
          onChange={e => setSelectedLocation(e.target.value)}
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
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <Input
          label="Address"
          value={address}
          onChange={e => setAddress(e.target.value)}
          required
        />
        <div className="flex justify-end mt-4">
          <Button
            type="submit"
            color="green"
            className="mr-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Save Cinema'}
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
  cinema: PropTypes.object,
  onSuccess: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default CinemaForm;
