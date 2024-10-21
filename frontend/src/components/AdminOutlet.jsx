import PropTypes from 'prop-types';

import CinemaManager from './CinemaManager';
import MovieManager from './MovieManager';

const AdminPanel = ({ selectedTab }) => {
  return (
    <div className="flex-1 p-6 bg-gray-100">
      {selectedTab === 'Dashboard' && (
        <h1 className="text-2xl font-bold">Dashboard</h1>
      )}
      {selectedTab === 'Analytics' && (
        <h1 className="text-2xl font-bold">Analytics</h1>
      )}
      {selectedTab === 'Cinemas' && <CinemaManager />}
      {selectedTab === 'Movies' && <MovieManager />}
    </div>
  );
};

AdminPanel.propTypes = {
  selectedTab: PropTypes.string.isRequired,
};
export default AdminPanel;
