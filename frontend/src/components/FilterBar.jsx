const FilterBar = ({ filters, onFilterChange }) => {
  const handleDateChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const handlePriceChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="flex space-x-4 mb-6">
      <div className="flex space-x-2">
        <input
          type="date"
          value={filters.startDate || ''}
          onChange={e => handleDateChange('startDate', e.target.value)}
          className="p-2 border rounded"
          placeholder="Start Date"
        />
        <input
          type="date"
          value={filters.endDate || ''}
          onChange={e => handleDateChange('endDate', e.target.value)}
          className="p-2 border rounded"
          placeholder="End Date"
        />
      </div>

      <div className="flex space-x-2">
        <input
          type="number"
          min="0"
          placeholder="Min Price"
          value={filters.minPrice || ''}
          onChange={e => handlePriceChange('minPrice', e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="number"
          min="0"
          placeholder="Max Price"
          value={filters.maxPrice || ''}
          onChange={e => handlePriceChange('maxPrice', e.target.value)}
          className="p-2 border rounded"
        />
      </div>
    </div>
  );
};

export default FilterBar;
