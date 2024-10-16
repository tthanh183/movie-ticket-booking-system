import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import AdminPanel from '../components/AdminPanel';

const AdminPage = () => {
  const [selected, setSelected] = useState('Dashboard');
  return (
    <div className="flex">
      <Sidebar setSelected={setSelected} />
      <AdminPanel selected={selected} />
    </div>
  );
};

export default AdminPage;
