import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { X, MapPin, Home, DollarSign, Square } from 'lucide-react';

// Fix pour les icônes Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const InteractiveMap = ({ onClose, selectedLotissement = null }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [lotissements] = useState([
    {
      id: 1,
      nom: "Résidence Al Manar",
      ville: "Casablanca",
      type_lotissement: "résidentiel",
      surface_totale: 15000,
      nombre_parcelles_total: 45,
      nombre_parcelles_disponibles: 28,
      nombre_parcelles_vendues: 12,
      nombre_parcelles_reservees: 5,
      prix_min: 850000,
      prix_max: 1200000,
      coordonnees_lotissement: [
        { lat: 33.5730, lng: -7.5900 },
        { lat: 33.5745, lng: -7.5900 },
        { lat: 33.5745, lng: -7.5885 },
        { lat: 33.5730, lng: -7.5885 }
      ],
      parcelles: [
        {
          id: 1,
          nom: 'Parcelle A1',
          reference: 'RES-001',
          surface: 350,
          prix: 950000,
          statut: 'disponible',
          coordonnees: [
            { lat: 33.5731, lng: -7.5898 },
            { lat: 33.5735, lng: -7.5898 },
            { lat: 33.5735, lng: -7.5890 },
            { lat: 33.5731, lng: -7.5890 }
          ]
        },
        {
          id: 2,
          nom: 'Parcelle A2',
          reference: 'RES-002',
          surface: 420,
          prix: 1100000,
          statut: 'vendu',
          coordonnees: [
            { lat: 33.5735, lng: -7.5898 },
            { lat: 33.5739, lng: -7.5898 },
            { lat: 33.5739, lng: -7.5890 },
            { lat: 33.5735, lng: -7.5890 }
          ]
        },
        {
          id: 3,
          nom: 'Parcelle A3',
          reference: 'RES-003',
          surface: 380,
          prix: 1050000,
          statut: 'réservé',
          coordonnees: [
            { lat: 33.5739, lng: -7.5898 },
            { lat: 33.5743, lng: -7.5898 },
            { lat: 33.5743, lng: -7.5890 },
            { lat: 33.5739, lng: -7.5890 }
          ]
        }
      ]
    },
    {
      id: 2,
      nom: "Villa Prestige Marrakech",
      ville: "Marrakech",
      type_lotissement: "résidentiel",
      surface_totale: 12000,
      nombre_parcelles_total: 30,
      nombre_parcelles_disponibles: 22,
      nombre_parcelles_vendues: 6,
      nombre_parcelles_reservees: 2,
      prix_min: 1200000,
      prix_max: 1800000,
      coordonnees_lotissement: [
        { lat: 31.6295, lng: -7.9811 },
        { lat: 31.6310, lng: -7.9811 },
        { lat: 31.6310, lng: -7.9796 },
        { lat: 31.6295, lng: -7.9796 }
      ],
      parcelles: [
        {
          id: 4,
          nom: 'Villa V1',
          reference: 'VIL-001',
          surface: 500,
          prix: 1450000,
          statut: 'disponible',
          coordonnees: [
            { lat: 31.6296, lng: -7.9810 },
            { lat: 31.6300, lng: -7.9810 },
            { lat: 31.6300, lng: -7.9805 },
            { lat: 31.6296, lng: -7.9805 }
          ]
        },
        {
          id: 5,
          nom: 'Villa V2',
          reference: 'VIL-002',
          surface: 480,
          prix: 1380000,
          statut: 'réservé',
          coordonnees: [
            { lat: 31.6300, lng: -7.9810 },
            { lat: 31.6304, lng: -7.9810 },
            { lat: 31.6304, lng: -7.9805 },
            { lat: 31.6300, lng: -7.9805 }
          ]
        }
      ]
    }
  ]);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialiser la carte
    const map = L.map(mapRef.current).setView([33.5731, -7.5898], 6); // Vue du Maroc

    // Ajouter les tuiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    mapInstanceRef.current = map;

    // Nettoyer au démontage
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current) return;

    const map = mapInstanceRef.current;

    // Effacer les couches existantes
    map.eachLayer((layer) => {
      if (layer instanceof L.Polygon || layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });

    const bounds = [];

    // Afficher les lotissements
    lotissements.forEach((lotissement) => {
      // Filtrer si un lotissement spécifique est sélectionné
      if (selectedLotissement && lotissement.id !== selectedLotissement.id) {
        return;
      }

      // Afficher le contour du lotissement
      if (lotissement.coordonnees_lotissement && lotissement.coordonnees_lotissement.length > 0) {
        const lotissementCoords = lotissement.coordonnees_lotissement.map(coord => [coord.lat, coord.lng]);
        
        const lotissementPolygon = L.polygon(lotissementCoords, {
          color: '#003366', // Navy blue
          fillColor: '#003366',
          fillOpacity: 0.2,
          weight: 3
        }).addTo(map);

        bounds.push(...lotissementCoords);

        // Popup pour le lotissement
        lotissementPolygon.bindPopup(`
          <div class="p-3 min-w-64">
            <h3 class="font-bold text-lg text-navy-blue mb-2">${lotissement.nom}</h3>
            <div class="space-y-1 text-sm">
              <p class="flex items-center"><span class="w-4 h-4 mr-2">📍</span>${lotissement.ville}</p>
              <p class="flex items-center"><span class="w-4 h-4 mr-2">🏠</span>${lotissement.type_lotissement.charAt(0).toUpperCase() + lotissement.type_lotissement.slice(1)}</p>
              <p class="flex items-center"><span class="w-4 h-4 mr-2">📐</span>${lotissement.surface_totale.toLocaleString()} m²</p>
              <p class="flex items-center"><span class="w-4 h-4 mr-2">🏘️</span>${lotissement.nombre_parcelles_total} parcelles</p>
              <div class="mt-2 pt-2 border-t">
                <p class="text-green-600">✅ ${lotissement.nombre_parcelles_disponibles} disponibles</p>
                <p class="text-red-600">❌ ${lotissement.nombre_parcelles_vendues} vendues</p>
                <p class="text-orange-600">⏳ ${lotissement.nombre_parcelles_reservees} réservées</p>
              </div>
              <div class="mt-2 pt-2 border-t">
                <p class="font-medium">Prix: ${new Intl.NumberFormat('fr-MA', {
                  style: 'currency',
                  currency: 'MAD',
                  minimumFractionDigits: 0
                }).format(lotissement.prix_min)} - ${new Intl.NumberFormat('fr-MA', {
                  style: 'currency',
                  currency: 'MAD',
                  minimumFractionDigits: 0
                }).format(lotissement.prix_max)}</p>
              </div>
            </div>
          </div>
        `);
      }

      // Afficher les parcelles
      if (lotissement.parcelles) {
        lotissement.parcelles.forEach((parcelle) => {
          if (parcelle.coordonnees && parcelle.coordonnees.length > 0) {
            const parcelleCoords = parcelle.coordonnees.map(coord => [coord.lat, coord.lng]);
            
            // Couleur selon le statut
            let color, fillColor;
            switch (parcelle.statut) {
              case 'disponible':
                color = '#22c55e'; // Vert
                fillColor = '#22c55e';
                break;
              case 'vendu':
                color = '#ef4444'; // Rouge
                fillColor = '#ef4444';
                break;
              case 'réservé':
                color = '#f97316'; // Orange
                fillColor = '#f97316';
                break;
              default:
                color = '#6b7280'; // Gris
                fillColor = '#6b7280';
            }

            const parcellePolygon = L.polygon(parcelleCoords, {
              color: color,
              fillColor: fillColor,
              fillOpacity: 0.7,
              weight: 2
            }).addTo(map);

            // Popup pour la parcelle
            parcellePolygon.bindPopup(`
              <div class="p-3 min-w-48">
                <h4 class="font-bold text-lg mb-2">${parcelle.nom}</h4>
                <div class="space-y-1 text-sm">
                  <p><strong>Référence:</strong> ${parcelle.reference || 'N/A'}</p>
                  <p><strong>Surface:</strong> ${parcelle.surface} m²</p>
                  <p><strong>Prix:</strong> ${new Intl.NumberFormat('fr-MA', {
                    style: 'currency',
                    currency: 'MAD',
                    minimumFractionDigits: 0
                  }).format(parcelle.prix)}</p>
                  <p class="flex items-center">
                    <span class="inline-block w-3 h-3 rounded-full mr-2" style="background-color: ${fillColor}"></span>
                    <strong>${parcelle.statut.charAt(0).toUpperCase() + parcelle.statut.slice(1)}</strong>
                  </p>
                  <div class="mt-3 pt-2 border-t">
                    <p class="text-xs text-gray-600">Lotissement: ${lotissement.nom}</p>
                  </div>
                </div>
              </div>
            `);
          }
        });
      }
    });

    // Ajuster la vue pour afficher tous les éléments
    if (bounds.length > 0) {
      map.fitBounds(bounds, { padding: [20, 20] });
    }

  }, [lotissements, selectedLotissement]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-MA', {
      style: 'currency',
      currency: 'MAD',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-7xl h-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-dark-gray">
              {selectedLotissement ? `Carte - ${selectedLotissement.nom}` : 'Carte Interactive des Lotissements'}
            </h2>
            <p className="text-gray-600">
              {selectedLotissement 
                ? `Visualisation détaillée du lotissement à ${selectedLotissement.ville}`
                : 'Explorez tous les lotissements disponibles au Maroc'
              }
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Carte */}
        <div className="flex-1 relative">
          <div ref={mapRef} className="w-full h-full" />
          
          {/* Légende */}
          <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4 z-10">
            <h4 className="font-bold text-sm mb-3">Légende</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-navy-blue border-2 border-navy-blue opacity-20 rounded"></div>
                <span>Contour lotissement</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span>Parcelle disponible</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span>Parcelle vendue</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-orange-500 rounded"></div>
                <span>Parcelle réservée</span>
              </div>
            </div>
          </div>

          {/* Statistiques rapides */}
          {selectedLotissement && (
            <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-4 z-10">
              <h4 className="font-bold text-sm mb-3">{selectedLotissement.nom}</h4>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span>Total parcelles:</span>
                  <span className="font-medium">{selectedLotissement.nombre_parcelles_total}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-green-600">Disponibles:</span>
                  <span className="font-medium text-green-600">{selectedLotissement.nombre_parcelles_disponibles}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-red-600">Vendues:</span>
                  <span className="font-medium text-red-600">{selectedLotissement.nombre_parcelles_vendues}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-orange-600">Réservées:</span>
                  <span className="font-medium text-orange-600">{selectedLotissement.nombre_parcelles_reservees}</span>
                </div>
                <div className="pt-2 border-t">
                  <div className="flex items-center justify-between">
                    <span>Prix:</span>
                    <span className="font-medium text-xs">
                      {formatPrice(selectedLotissement.prix_min)} - {formatPrice(selectedLotissement.prix_max)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;

