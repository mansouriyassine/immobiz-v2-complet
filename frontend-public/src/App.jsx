import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import InteractiveMap from './components/InteractiveMap';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedLotissement, setSelectedLotissement] = useState(null);
  const [showMap, setShowMap] = useState(false);

  const handleNavigation = (pageId) => {
    if (pageId === 'map') {
      // Ouvrir la carte interactive sans lotissement spécifique
      handleNavigateToMap();
    } else {
      setCurrentPage(pageId);
      setSelectedLotissement(null);
      setShowMap(false);
    }
  };

  const handleNavigateToMap = (lotissement = null) => {
    setSelectedLotissement(lotissement);
    setShowMap(true);
  };

  const handleCloseMap = () => {
    setShowMap(false);
    setSelectedLotissement(null);
  };

  const handleViewLotissementDetails = (lotissement) => {
    setSelectedLotissement(lotissement);
    // Pour l'instant, on peut afficher les détails dans la console
    console.log('Détails du lotissement:', lotissement);
    // TODO: Implémenter une modal ou une page de détails
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage 
            onNavigateToMap={handleNavigateToMap}
            onViewLotissementDetails={handleViewLotissementDetails}
          />
        );
      case 'about':
        return (
          <div className="pt-16 min-h-screen bg-gray-100">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <h1 className="text-4xl font-bold text-dark-gray mb-8 text-center">
                À propos d'ImmoBiz
              </h1>
              <div className="bg-white rounded-lg shadow-lg p-8">
                <p className="text-lg text-gray-600 mb-6">
                  ImmoBiz est une plateforme professionnelle de gestion immobilière 
                  qui révolutionne la façon dont les investisseurs découvrent et 
                  évaluent les opportunités immobilières au Maroc.
                </p>
                <p className="text-gray-600 mb-6">
                  Notre mission est de fournir une interface transparente et intuitive 
                  pour explorer les lotissements, visualiser les parcelles disponibles 
                  et faciliter la mise en relation entre investisseurs et promoteurs.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                  <div>
                    <h3 className="text-xl font-semibold text-dark-gray mb-4">
                      Notre Vision
                    </h3>
                    <p className="text-gray-600">
                      Démocratiser l'accès à l'information immobilière et créer 
                      un écosystème transparent pour tous les acteurs du marché.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-dark-gray mb-4">
                      Nos Valeurs
                    </h3>
                    <p className="text-gray-600">
                      Transparence, innovation, fiabilité et service client 
                      sont au cœur de notre approche.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'blog':
        return (
          <div className="pt-16 min-h-screen bg-gray-100">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <h1 className="text-4xl font-bold text-dark-gray mb-8 text-center">
                Blog ImmoBiz
              </h1>
              <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                <h2 className="text-2xl font-semibold text-dark-gray mb-4">
                  Articles à venir
                </h2>
                <p className="text-gray-600 mb-6">
                  Notre blog sera progressivement alimenté avec des articles SEO 
                  sur l'immobilier, les tendances du marché et les conseils d'investissement.
                </p>
                <div className="bg-light-gray-30 rounded-lg p-8">
                  <div className="text-4xl text-gray-400 mb-4">📝</div>
                  <p className="text-gray-500">
                    Sujets prévus : Guides d'investissement, Analyses de marché, 
                    Conseils juridiques, Tendances immobilières
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <HomePage 
            onNavigateToMap={handleNavigateToMap}
            onViewLotissementDetails={handleViewLotissementDetails}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header currentPage={currentPage} onNavigate={handleNavigation} />
      <main className="flex-grow">
        {renderCurrentPage()}
      </main>
      <Footer />
      
      {/* Carte Interactive Modal */}
      {showMap && (
        <InteractiveMap 
          selectedLotissement={selectedLotissement}
          onClose={handleCloseMap}
        />
      )}
    </div>
  );
}

export default App;
