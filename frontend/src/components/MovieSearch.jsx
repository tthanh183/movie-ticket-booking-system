import PropTypes from 'prop-types';

const MovieSearch = ({ searchTerm, onSearch }) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search movies..."
        value={searchTerm}
        onChange={e => onSearch(e.target.value)}
        className="border p-2 rounded w-full"
      />
    </div>
  );
};

MovieSearch.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default MovieSearch;
