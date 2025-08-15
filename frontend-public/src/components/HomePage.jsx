import React from 'react';
import HeroSection from './HeroSection';
import LotissementsPopulaires from './LotissementsPopulaires';
import '../App.css';

const HomePage = ({ onNavigateToMap, onViewLotissementDetails }) => {
  const handleViewDetails = (lotissement) => {
    onViewLotissementDetails(lotissement);
  };

  const handleViewOnMap = (lotissement) => {
    // Naviguer vers la carte avec le lotissement sélectionné
    onNavigateToMap(lotissement);
  };

  return (
    <div className="min-h-screen">
      {/* Section Hero */}
      <HeroSection onNavigateToMap={() => onNavigateToMap()} />
      
      {/* Section Lotissements Populaires */}
      <LotissementsPopulaires 
        onViewDetails={handleViewDetails}
        onViewOnMap={handleViewOnMap}
      />
      
      {/* Section Avantages */}
      <section className="py-16 bg-light-gray-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-dark-gray mb-4">
              Pourquoi choisir ImmoBiz ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Notre plateforme vous offre tous les outils nécessaires pour prendre 
              les meilleures décisions d'investissement immobilier.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Avantage 1 */}
            <div className="bg-white rounded-lg shadow-xl p-8 text-center hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-orange-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-dark-gray mb-4">
                Carte Interactive
              </h3>
              <p className="text-gray-600">
                Explorez tous les lotissements sur une carte interactive avec 
                des informations détaillées sur chaque parcelle.
              </p>
            </div>

            {/* Avantage 2 */}
            <div className="bg-white rounded-lg shadow-xl p-8 text-center hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-orange-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-dark-gray mb-4">
                Projets Vérifiés
              </h3>
              <p className="text-gray-600">
                Tous nos lotissements sont vérifiés et validés par notre équipe 
                pour garantir la fiabilité des informations.
              </p>
            </div>

            {/* Avantage 3 */}
            <div className="bg-white rounded-lg shadow-xl p-8 text-center hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-orange-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-dark-gray mb-4">
                Mise à Jour Temps Réel
              </h3>
              <p className="text-gray-600">
                Les statuts des parcelles sont mis à jour en temps réel par 
                les promoteurs pour vous offrir les informations les plus récentes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Call-to-Action */}
      <section className="py-16 bg-navy-blue text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à découvrir votre prochain investissement ?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Explorez notre carte interactive et trouvez le lotissement parfait 
            pour votre projet immobilier.
          </p>
          <button
            onClick={() => onNavigateToMap()}
            className="bg-orange-accent hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 hover:scale-105 shadow-lg"
          >
            Explorer la carte interactive
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

