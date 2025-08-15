import React, { useState, useEffect } from 'react';
import { TrendingUp } from 'lucide-react';
import LotissementCard from './LotissementCard';
import '../App.css';

const LotissementsPopulaires = ({ onViewDetails, onViewOnMap }) => {
  const [lotissements, setLotissements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLotissements();
  }, []);

  const fetchLotissements = async () => {
    try {
      // Simulation de données en attendant l'API
      const mockData = [
        {
          id: 1,
          nom: "Résidence Al Manar",
          ville: "Casablanca",
          region: "Grand Casablanca",
          type_lotissement: "residentiel",
          surface_totale: 15000,
          surface_disponible: 8500,
          nombre_parcelles_total: 45,
          nombre_parcelles_disponibles: 28,
          nombre_parcelles_vendues: 12,
          nombre_parcelles_reservees: 5,
          prix_min: 850000,
          prix_max: 1200000,
          prix_moyen_m2: 4500,
          promoteur: {
            nom: "Groupe Immobilier Atlas"
          }
        },
        {
          id: 2,
          nom: "Lotissement Les Jardins",
          ville: "Rabat",
          region: "Rabat-Salé-Kénitra",
          type_lotissement: "residentiel",
          surface_totale: 12000,
          surface_disponible: 7200,
          nombre_parcelles_total: 35,
          nombre_parcelles_disponibles: 21,
          nombre_parcelles_vendues: 10,
          nombre_parcelles_reservees: 4,
          prix_min: 750000,
          prix_max: 950000,
          prix_moyen_m2: 3800,
          promoteur: {
            nom: "Promoteur Moderne"
          }
        },
        {
          id: 3,
          nom: "Zone Industrielle Tanger",
          ville: "Tanger",
          region: "Tanger-Tétouan-Al Hoceïma",
          type_lotissement: "industriel",
          surface_totale: 25000,
          surface_disponible: 18000,
          nombre_parcelles_total: 20,
          nombre_parcelles_disponibles: 14,
          nombre_parcelles_vendues: 4,
          nombre_parcelles_reservees: 2,
          prix_min: 2500000,
          prix_max: 4000000,
          prix_moyen_m2: 1200,
          promoteur: {
            nom: "Développement Industriel Nord"
          }
        },
        {
          id: 4,
          nom: "Centre Commercial Agadir",
          ville: "Agadir",
          region: "Souss-Massa",
          type_lotissement: "commercial",
          surface_totale: 8000,
          surface_disponible: 3200,
          nombre_parcelles_total: 16,
          nombre_parcelles_disponibles: 6,
          nombre_parcelles_vendues: 8,
          nombre_parcelles_reservees: 2,
          prix_min: 1800000,
          prix_max: 2500000,
          prix_moyen_m2: 8500,
          promoteur: {
            nom: "Commercial Sud Invest"
          }
        },
        {
          id: 5,
          nom: "Villa Prestige Marrakech",
          ville: "Marrakech",
          region: "Marrakech-Safi",
          type_lotissement: "residentiel",
          surface_totale: 20000,
          surface_disponible: 15000,
          nombre_parcelles_total: 30,
          nombre_parcelles_disponibles: 22,
          nombre_parcelles_vendues: 6,
          nombre_parcelles_reservees: 2,
          prix_min: 1500000,
          prix_max: 3000000,
          prix_moyen_m2: 6200,
          promoteur: {
            nom: "Luxe Immobilier Marrakech"
          }
        },
        {
          id: 6,
          nom: "Terrain Particulier Fès",
          ville: "Fès",
          region: "Fès-Meknès",
          type_lotissement: "terrain_particulier",
          surface_totale: 2500,
          surface_disponible: 2500,
          nombre_parcelles_total: 1,
          nombre_parcelles_disponibles: 1,
          nombre_parcelles_vendues: 0,
          nombre_parcelles_reservees: 0,
          prix_min: 650000,
          prix_max: 650000,
          prix_moyen_m2: 2600,
          promoteur: {
            nom: "Particulier"
          }
        }
      ];

      // Tri par surface disponible (critère des lotissements populaires)
      const sortedData = mockData.sort((a, b) => b.surface_disponible - a.surface_disponible);
      
      setLotissements(sortedData);
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors du chargement des lotissements:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dark-gray mb-4">
              Lotissements populaires
            </h2>
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-200 h-48 rounded-t-lg"></div>
                <div className="bg-white p-6 rounded-b-lg shadow-lg">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-4 w-3/4"></div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="h-16 bg-gray-100 rounded"></div>
                    <div className="h-16 bg-gray-100 rounded"></div>
                  </div>
                  <div className="h-8 bg-gray-200 rounded mb-4"></div>
                  <div className="flex space-x-2">
                    <div className="h-10 bg-gray-200 rounded flex-1"></div>
                    <div className="h-10 bg-gray-200 rounded flex-1"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête de section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <TrendingUp className="h-8 w-8 text-orange-accent mr-3" />
            <h2 className="text-3xl md:text-4xl font-bold text-dark-gray">
              Lotissements populaires
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez les projets immobiliers les plus demandés, classés par surface disponible. 
            Plus de terrain disponible signifie plus d'opportunités d'investissement.
          </p>
        </div>

        {/* Grille des lotissements */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {lotissements.map((lotissement) => (
            <LotissementCard
              key={lotissement.id}
              lotissement={lotissement}
              onViewDetails={onViewDetails}
              onViewOnMap={onViewOnMap}
            />
          ))}
        </div>

        {/* Note explicative */}
        <div className="mt-12 text-center">
          <div className="bg-light-gray-30 rounded-lg p-6 max-w-4xl mx-auto">
            <h3 className="text-lg font-semibold text-dark-gray mb-2">
              Pourquoi ces lotissements sont-ils populaires ?
            </h3>
            <p className="text-gray-600">
              Notre classement privilégie les lotissements avec la plus grande surface disponible. 
              Un lotissement de 20 000 m² avec seulement 200 m² disponible sera classé après 
              un lotissement de 5 000 m² avec 3 000 m² disponibles, vous offrant ainsi plus 
              d'opportunités d'investissement.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LotissementsPopulaires;

