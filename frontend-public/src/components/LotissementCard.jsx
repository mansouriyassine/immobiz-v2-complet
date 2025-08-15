import React from 'react';
import { MapPin, Home, TrendingUp, Eye } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import '../App.css';

const LotissementCard = ({ lotissement, onViewDetails, onViewOnMap }) => {
  const {
    id,
    nom,
    ville,
    region,
    type_lotissement,
    surface_disponible,
    surface_totale,
    nombre_parcelles_disponibles,
    nombre_parcelles_total,
    prix_min,
    prix_max,
    prix_moyen_m2,
    promoteur
  } = lotissement;

  const getTypeLabel = (type) => {
    const types = {
      'residentiel': 'Résidentiel',
      'commercial': 'Commercial',
      'industriel': 'Industriel',
      'terrain_particulier': 'Terrain particulier'
    };
    return types[type] || type;
  };

  const getTypeColor = (type) => {
    const colors = {
      'residentiel': 'bg-green-100 text-green-800',
      'commercial': 'bg-blue-100 text-blue-800',
      'industriel': 'bg-purple-100 text-purple-800',
      'terrain_particulier': 'bg-orange-100 text-orange-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const formatPrice = (price) => {
    if (!price) return 'N/A';
    return new Intl.NumberFormat('fr-MA', {
      style: 'currency',
      currency: 'MAD',
      minimumFractionDigits: 0
    }).format(price);
  };

  const formatSurface = (surface) => {
    if (!surface) return 'N/A';
    return `${surface.toLocaleString('fr-MA')} m²`;
  };

  const availabilityPercentage = surface_totale > 0 
    ? Math.round((surface_disponible / surface_totale) * 100) 
    : 0;

  return (
    <div className="bg-white rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden">
      {/* Image placeholder avec overlay */}
      <div className="relative h-48 bg-gradient-to-br from-gray-200 to-gray-300">
        <div className="absolute inset-0 bg-navy-blue bg-opacity-20"></div>
        <div className="absolute top-4 left-4">
          <Badge className={`${getTypeColor(type_lotissement)} font-semibold`}>
            {getTypeLabel(type_lotissement)}
          </Badge>
        </div>
        <div className="absolute top-4 right-4">
          <Badge className="bg-white text-dark-gray font-semibold">
            {availabilityPercentage}% disponible
          </Badge>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-6xl text-gray-400">
            <Home />
          </div>
        </div>
      </div>

      {/* Contenu */}
      <div className="p-6">
        {/* Titre et localisation */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-dark-gray mb-2 line-clamp-1">
            {nom}
          </h3>
          <div className="flex items-center text-gray-600 mb-2">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">{ville}{region && `, ${region}`}</span>
          </div>
          {promoteur && (
            <p className="text-sm text-gray-500">
              Par {promoteur.nom}
            </p>
          )}
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center p-3 bg-light-gray-30 rounded-lg">
            <div className="text-lg font-bold text-dark-gray">
              {nombre_parcelles_disponibles}
            </div>
            <div className="text-xs text-gray-600">
              Parcelles disponibles
            </div>
          </div>
          <div className="text-center p-3 bg-light-gray-30 rounded-lg">
            <div className="text-lg font-bold text-dark-gray">
              {formatSurface(surface_disponible)}
            </div>
            <div className="text-xs text-gray-600">
              Surface disponible
            </div>
          </div>
        </div>

        {/* Prix */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Prix</span>
            <span className="text-sm font-semibold text-orange-accent">
              {prix_moyen_m2 ? `${formatPrice(prix_moyen_m2)}/m²` : 'Sur demande'}
            </span>
          </div>
          {prix_min && prix_max && (
            <div className="text-sm text-gray-600">
              De {formatPrice(prix_min)} à {formatPrice(prix_max)}
            </div>
          )}
        </div>

        {/* Barre de progression de disponibilité */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>Disponibilité</span>
            <span>{availabilityPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-orange-accent h-2 rounded-full transition-all duration-300"
              style={{ width: `${availabilityPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-2">
          <Button
            onClick={() => onViewDetails(lotissement)}
            variant="outline"
            className="flex-1 border-orange-accent text-orange-accent hover:bg-orange-accent hover:text-white transition-all duration-200"
          >
            <Eye className="h-4 w-4 mr-2" />
            Détails
          </Button>
          <Button
            onClick={() => onViewOnMap(lotissement)}
            className="flex-1 bg-orange-accent hover:bg-orange-600 text-white transition-all duration-200"
          >
            <MapPin className="h-4 w-4 mr-2" />
            Voir sur carte
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LotissementCard;

