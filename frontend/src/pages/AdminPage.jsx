import { useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import AdminOutlet from '../components/AdminOutlet';

const AdminPage = () => {
  const [selectedTab, setSelectedTab] = useState('Dashboard');
  return (
    <div className="flex">
      <AdminSidebar setSelectedTab={setSelectedTab} />
      <AdminOutlet selectedTab={selectedTab} />
    </div>
  );
};

export default AdminPage;
