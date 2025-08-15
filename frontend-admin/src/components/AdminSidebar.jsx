import React from 'react';
import { Building, Users, BarChart3, Settings, Shield, FileText, MapPin, Bell } from 'lucide-react';
import '../App.css';

const AdminSidebar = ({ activeSection, setActiveSection }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Tableau de bord', icon: BarChart3 },
    { id: 'promoteurs', label: 'Promoteurs', icon: Building },
    { id: 'lotissements', label: 'Lotissements', icon: MapPin },
    { id: 'utilisateurs', label: 'Utilisateurs', icon: Users },
    { id: 'rapports', label: 'Rapports', icon: FileText },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'securite', label: 'Sécurité', icon: Shield },
    { id: 'parametres', label: 'Paramètres', icon: Settings },
  ];

  return (
    <div className="w-64 bg-navy-blue text-white h-screen fixed left-0 top-0 overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 bg-orange-accent rounded-lg flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold">ImmoBiz</h1>
            <p className="text-sm text-gray-300">Administration</p>
          </div>
        </div>
        
        <div className="mb-6">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-3">Super Administrateur</p>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-medium">Admin Principal</p>
              <p className="text-xs text-gray-400">admin@immobiz.ma</p>
            </div>
          </div>
        </div>
      </div>
      
      <nav className="px-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition-all duration-200 ${
                activeSection === item.id
                  ? 'bg-orange-accent text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
              {item.id === 'notifications' && (
                <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-1">3</span>
              )}
            </button>
          );
        })}
      </nav>
      
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="bg-gray-800 rounded-lg p-3">
          <p className="text-xs text-gray-400 mb-1">Version</p>
          <p className="text-sm font-medium">ImmoBiz V2.0</p>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;

