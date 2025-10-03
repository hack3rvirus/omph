import React, { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { useNavigate } from 'react-router-dom';
import ManageNews from './ManageNews';
import ManageEvents from './ManageEvents';
import ManageIntentions from './ManageIntentions';
import ManageAnnouncements from './ManageAnnouncements';
import ManageMarketplace from './ManageMarketplace';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('news');

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-64 bg-navyBlue text-white min-h-screen p-4">
        <h2 className="font-heading text-2xl text-warmGold">Admin Panel</h2>
        <nav className="mt-8">
          <button onClick={() => setActiveTab('news')} className="block py-2">Manage News</button>
          <button onClick={() => setActiveTab('events')} className="block py-2">Manage Events</button>
          <button onClick={() => setActiveTab('intentions')} className="block py-2">Manage Intentions</button>
          <button onClick={() => setActiveTab('announcements')} className="block py-2">Manage Announcements</button>
          <button onClick={() => setActiveTab('marketplace')} className="block py-2">Manage Marketplace</button>
        </nav>
        <button onClick={handleLogout} className="mt-auto bg-liturgicalRed p-2 rounded">Logout</button>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8">
        {activeTab === 'news' && <ManageNews />}
        {activeTab === 'events' && <ManageEvents />}
        {activeTab === 'intentions' && <ManageIntentions />}
        {activeTab === 'announcements' && <ManageAnnouncements />}
        {activeTab === 'marketplace' && <ManageMarketplace />}
      </main>
    </div>
  );
};

export default Dashboard;
