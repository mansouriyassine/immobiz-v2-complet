import React from 'react';
import { 
  LayoutDashboard, 
  Building2, 
  MapPin, 
  Users, 
  BarChart3, 
  Settings, 
  LogOut,
  Home
} from 'lucide-react';
import { Button } from './ui/button';

const Sidebar = ({ currentPage, onNavigate, promoteurName = "Groupe Immobilier Atlas" }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
    { id: 'lotissements', label: 'Mes Lotissements', icon: Building2 },
    { id: 'parcelles', label: 'Gestion Parcelles', icon: MapPin },
    { id: 'leads', label: 'Leads & Contacts', icon: Users },
    { id: 'statistiques', label: 'Statistiques', icon: BarChart3 },
    { id: 'parametres', label: 'Paramètres', icon: Settings }
  ];

  return (
    <div className="w-64 bg-sidebar text-sidebar-foreground h-screen flex flex-col">
      {/* Logo et nom du promoteur */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-sidebar-primary rounded-lg flex items-center justify-center">
            <Home className="h-6 w-6 text-sidebar-primary-foreground" />
          </div>
          <div>
            <h2 className="text-lg font-bold">ImmoBiz</h2>
            <p className="text-xs text-sidebar-foreground/70">Promoteur</p>
          </div>
        </div>
        <div className="bg-sidebar-accent rounded-lg p-3">
          <p className="text-sm font-medium text-sidebar-accent-foreground">
            {promoteurName}
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <li key={item.id}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={`w-full justify-start text-left transition-all duration-200 ${
                    isActive 
                      ? 'bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90' 
                      : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                  }`}
                  onClick={() => onNavigate(item.id)}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.label}
                </Button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Actions du bas */}
      <div className="p-4 border-t border-sidebar-border">
        <Button
          variant="ghost"
          className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          onClick={() => {
            // TODO: Implémenter la déconnexion
            console.log('Déconnexion');
          }}
        >
          <LogOut className="h-5 w-5 mr-3" />
          Déconnexion
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;

