import Cinema from './Cinema';

// eslint-disable-next-line react/prop-types
const AdminPanel = ({ selected }) => {
  return (
    <div className="flex-1 p-6 bg-gray-100">
      {selected === 'Dashboard' && (
        <h1 className="text-2xl font-bold">Dashboard</h1>
      )}
      {selected === 'Analytics' && (
        <h1 className="text-2xl font-bold">Analytics</h1>
      )}
      {selected === 'Cinemas' && <Cinema />}
    </div>
  );
};

export default AdminPanel;
