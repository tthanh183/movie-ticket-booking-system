import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import AdminPanel from '../components/AdminPanel';

const AdminPage = () => {
  const [selectedTab, setSelectedTab] = useState('Dashboard');
  return (
    <div className="flex">
      <Sidebar setSelectedTab={setSelectedTab} />
      <AdminPanel selectedTab={selectedTab} />
    </div>
  );
};

export default AdminPage;
