import React, { useState } from 'react';
import AdminSidebar from './components/AdminSidebar';
import AdminDashboard from './components/AdminDashboard';
import PromotersManager from './components/PromotersManager';
import LotissementsOverview from './components/LotissementsOverview';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'promoteurs':
        return <PromotersManager />;
      case 'lotissements':
        return <LotissementsOverview />;
      case 'utilisateurs':
        return (
          <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold navy-blue mb-4">Gestion des utilisateurs</h1>
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <p className="text-gray-600">Module de gestion des utilisateurs en cours de développement</p>
            </div>
          </div>
        );
      case 'rapports':
        return (
          <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold navy-blue mb-4">Rapports et analyses</h1>
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <p className="text-gray-600">Module de rapports en cours de développement</p>
            </div>
          </div>
        );
      case 'notifications':
        return (
          <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold navy-blue mb-4">Centre de notifications</h1>
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <p className="text-gray-600">Module de notifications en cours de développement</p>
            </div>
          </div>
        );
      case 'securite':
        return (
          <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold navy-blue mb-4">Sécurité et audit</h1>
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <p className="text-gray-600">Module de sécurité en cours de développement</p>
            </div>
          </div>
        );
      case 'parametres':
        return (
          <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold navy-blue mb-4">Paramètres système</h1>
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <p className="text-gray-600">Module de paramètres en cours de développement</p>
            </div>
          </div>
        );
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <div className="flex-1 ml-64 overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
}

export default App;
