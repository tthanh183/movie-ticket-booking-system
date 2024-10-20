import PropTypes from 'prop-types';

import Cinema from './Cinema';
import Movie from './Movie';

const AdminPanel = ({ selectedTab }) => {
  return (
    <div className="flex-1 p-6 bg-gray-100">
      {selectedTab === 'Dashboard' && (
        <h1 className="text-2xl font-bold">Dashboard</h1>
      )}
      {selectedTab === 'Analytics' && (
        <h1 className="text-2xl font-bold">Analytics</h1>
      )}
      {selectedTab === 'Cinemas' && <Cinema />}
      {selectedTab === 'Movies' && <Movie/>}
    </div>
  );
};

AdminPanel.propTypes = {
  selectedTab: PropTypes.string.isRequired,
};
export default AdminPanel;
