import React, { useState } from 'react';
import './adminStyles.css';

import AdminLayout    from './AdminLayout';
import DashboardView  from './DashboardView';
import BookingsView   from './BookingsView';
import CustomersView  from './CustomersView';
import PlaceholderView from './PlaceholderView';
import { pageTitles } from './adminData';

const AdminDashboard = () => {
  const [activeNav, setActiveNav] = useState('dashboard');

  const renderContent = () => {
    switch (activeNav) {
      case 'dashboard': return <DashboardView />;
      case 'bookings':  return <BookingsView />;
      case 'customers': return <CustomersView />;
      default:          return <PlaceholderView title={pageTitles[activeNav] || activeNav} />;
    }
  };

  return (
    <AdminLayout activeNav={activeNav} setActiveNav={setActiveNav}>
      {renderContent()}
    </AdminLayout>
  );
};

export default AdminDashboard;
