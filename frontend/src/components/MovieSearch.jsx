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

export default MovieSearch;
