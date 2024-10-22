import PropTypes from 'prop-types';
import { FaSearch } from 'react-icons/fa'; 

const MovieSearch = ({ searchTerm, onSearch }) => {
  return (
    <div className="mb-4 relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <FaSearch className="text-gray-400" />
      </div>
      <input
        type="text"
        placeholder="Search movies..."
        value={searchTerm}
        onChange={e => onSearch(e.target.value)}
        className="border rounded-md pl-10 p-2 w-full" 
      />
    </div>
  );
};

MovieSearch.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default MovieSearch;
