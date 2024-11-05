import PropTypes from 'prop-types';

const FilterBar = ({ filters, onFilterChange }) => {
  const handleDateChange = value => {
    onFilterChange({ ...filters, date: value });
  };

  const handlePriceChange = value => {
    onFilterChange({ ...filters, priceRange: value });
  };

  return (
    <div className="flex space-x-4 mb-6">
      <div className="flex space-x-2">
        <input
          type="date"
          value={filters.date || ''}
          onChange={e => handleDateChange(e.target.value)}
          className="p-2 border rounded"
          placeholder="Select Date"
        />
      </div>

      <div className="flex space-x-2">
        <select
          value={filters.priceRange || ''}
          onChange={e => handlePriceChange(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Select Price Range</option>
          <option value="0-50">$0 - $50</option>
          <option value="51-100">$51 - $100</option>
          <option value="101-150">$101 - $150</option>
          <option value="151-200">$151 - $200</option>
          <option value="200+">$200+</option>
        </select>
      </div>
    </div>
  );
};

FilterBar.propTypes = {
  filters: PropTypes.object.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default FilterBar;
