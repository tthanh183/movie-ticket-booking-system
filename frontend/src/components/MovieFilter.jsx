import { Button } from '@material-tailwind/react';

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

export default MovieFilter;
