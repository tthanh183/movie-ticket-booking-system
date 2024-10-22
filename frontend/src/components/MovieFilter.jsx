import { Button } from '@material-tailwind/react';
import PropTypes from 'prop-types';

const MovieFilter = ({ selectedFilter, onFilterChange }) => {
  return (
    <div className="flex space-x-4 mb-4">
      <Button
        color={selectedFilter === 'all' ? 'blue' : 'gray'}
        onClick={() => onFilterChange('all')}
      >
        All
      </Button>
      <Button
        color={selectedFilter === 'showing' ? 'blue' : 'gray'}
        onClick={() => onFilterChange('showing')}
      >
        Now Showing
      </Button>
    </div>
  );
};

MovieFilter.propTypes = {
  selectedFilter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default MovieFilter;
