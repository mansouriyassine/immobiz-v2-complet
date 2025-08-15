import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import LotissementsManager from './components/LotissementsManager';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedLotissementId, setSelectedLotissementId] = useState(null);

  const handleNavigation = (pageId, lotissementId = null) => {
    setCurrentPage(pageId);
    setSelectedLotissementId(lotissementId);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigation} />;
      case 'lotissements':
        return <LotissementsManager onNavigate={handleNavigation} />;
      case 'parcelles':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-dark-gray mb-4">
              Gestion des Parcelles
            </h1>
            {selectedLotissementId && (
              <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                <h2 className="text-xl font-semibold text-dark-gray mb-2">
                  Lotissement sélectionné: ID {selectedLotissementId}
                </h2>
                <p className="text-gray-600">
                  Interface de gestion des parcelles en développement
                </p>
              </div>
            )}
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <h2 className="text-2xl font-semibold text-dark-gray mb-4">
                Gestion des Parcelles (En développement)
              </h2>
              <p className="text-gray-600 mb-6">
                Interface pour gérer les parcelles individuelles, leurs statuts 
                et leurs contours géographiques.
              </p>
              <div className="bg-light-gray-30 rounded-lg p-12">
                <div className="text-6xl text-gray-400 mb-4">🗺️</div>
                <p className="text-gray-500">
                  Fonctionnalités à venir :
                </p>
                <ul className="text-left text-gray-600 mt-4 max-w-md mx-auto">
                  <li>• Carte interactive avec parcelles</li>
                  <li>• Modification des statuts (disponible/vendu/réservé)</li>
                  <li>• Gestion des contours géographiques</li>
                  <li>• Historique des modifications</li>
                  <li>• Export des données</li>
                </ul>
              </div>
            </div>
          </div>
        );
      case 'leads':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-dark-gray mb-4">
              Leads & Contacts
            </h1>
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <h2 className="text-2xl font-semibold text-dark-gray mb-4">
                Gestion des Leads (En développement)
              </h2>
              <p className="text-gray-600 mb-6">
                Interface pour gérer les contacts intéressés par vos lotissements.
              </p>
              <div className="bg-light-gray-30 rounded-lg p-12">
                <div className="text-6xl text-gray-400 mb-4">👥</div>
                <p className="text-gray-500">
                  Fonctionnalités à venir :
                </p>
                <ul className="text-left text-gray-600 mt-4 max-w-md mx-auto">
                  <li>• Liste des leads avec filtres</li>
                  <li>• Suivi des interactions</li>
                  <li>• Statuts des leads (nouveau/contacté/qualifié)</li>
                  <li>• Historique des communications</li>
                  <li>• Export et rapports</li>
                </ul>
              </div>
            </div>
          </div>
        );
      case 'statistiques':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-dark-gray mb-4">
              Statistiques
            </h1>
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <h2 className="text-2xl font-semibold text-dark-gray mb-4">
                Rapports et Analyses (En développement)
              </h2>
              <p className="text-gray-600 mb-6">
                Tableaux de bord détaillés et rapports de performance.
              </p>
              <div className="bg-light-gray-30 rounded-lg p-12">
                <div className="text-6xl text-gray-400 mb-4">📊</div>
                <p className="text-gray-500">
                  Fonctionnalités à venir :
                </p>
                <ul className="text-left text-gray-600 mt-4 max-w-md mx-auto">
                  <li>• Graphiques de ventes par période</li>
                  <li>• Analyse de performance par lotissement</li>
                  <li>• Rapports de conversion des leads</li>
                  <li>• Prévisions et tendances</li>
                  <li>• Export PDF des rapports</li>
                </ul>
              </div>
            </div>
          </div>
        );
      case 'parametres':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-dark-gray mb-4">
              Paramètres
            </h1>
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <h2 className="text-2xl font-semibold text-dark-gray mb-4">
                Configuration (En développement)
              </h2>
              <p className="text-gray-600 mb-6">
                Paramètres du compte promoteur et préférences.
              </p>
              <div className="bg-light-gray-30 rounded-lg p-12">
                <div className="text-6xl text-gray-400 mb-4">⚙️</div>
                <p className="text-gray-500">
                  Fonctionnalités à venir :
                </p>
                <ul className="text-left text-gray-600 mt-4 max-w-md mx-auto">
                  <li>• Informations du promoteur</li>
                  <li>• Gestion des utilisateurs</li>
                  <li>• Préférences de notification</li>
                  <li>• Configuration des prix</li>
                  <li>• Paramètres d'export</li>
                </ul>
              </div>
            </div>
          </div>
        );
      default:
        return <Dashboard onNavigate={handleNavigation} />;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar currentPage={currentPage} onNavigate={handleNavigation} />
      <main className="flex-1 overflow-auto">
        {renderCurrentPage()}
      </main>
    </div>
  );
}

export default App;
