import Cinema from './Cinema';

// eslint-disable-next-line react/prop-types
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
    </div>
  );
};

export default AdminPanel;
