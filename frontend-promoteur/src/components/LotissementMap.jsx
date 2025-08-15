import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix pour les icônes Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const LotissementMap = ({ lotissement, parcelles = [] }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialiser la carte
    const map = L.map(mapRef.current).setView([33.5731, -7.5898], 10); // Casablanca par défaut

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
    if (!mapInstanceRef.current || !lotissement) return;

    const map = mapInstanceRef.current;

    // Effacer les couches existantes
    map.eachLayer((layer) => {
      if (layer instanceof L.Polygon || layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });

    // Afficher le contour du lotissement si disponible
    if (lotissement.coordonnees_lotissement && lotissement.coordonnees_lotissement.length > 0) {
      const lotissementCoords = lotissement.coordonnees_lotissement.map(coord => [coord.lat, coord.lng]);
      
      const lotissementPolygon = L.polygon(lotissementCoords, {
        color: '#003366', // Navy blue
        fillColor: '#003366',
        fillOpacity: 0.2,
        weight: 3
      }).addTo(map);

      // Popup pour le lotissement
      lotissementPolygon.bindPopup(`
        <div class="p-2">
          <h3 class="font-bold text-navy-blue">${lotissement.nom}</h3>
          <p class="text-sm text-gray-600">${lotissement.ville}</p>
          <p class="text-sm">Surface: ${lotissement.surface_totale} m²</p>
          <p class="text-sm">Parcelles: ${lotissement.nombre_parcelles_total}</p>
        </div>
      `);

      // Centrer la carte sur le lotissement
      map.fitBounds(lotissementPolygon.getBounds());
    }

    // Afficher les parcelles
    parcelles.forEach((parcelle, index) => {
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
          fillOpacity: 0.6,
          weight: 2
        }).addTo(map);

        // Popup pour la parcelle
        parcellePolygon.bindPopup(`
          <div class="p-2">
            <h4 class="font-bold">${parcelle.nom}</h4>
            <p class="text-sm">Référence: ${parcelle.reference || 'N/A'}</p>
            <p class="text-sm">Surface: ${parcelle.surface} m²</p>
            <p class="text-sm">Prix: ${new Intl.NumberFormat('fr-MA', {
              style: 'currency',
              currency: 'MAD',
              minimumFractionDigits: 0
            }).format(parcelle.prix)}</p>
            <p class="text-sm">
              <span class="inline-block w-3 h-3 rounded-full mr-1" style="background-color: ${fillColor}"></span>
              ${parcelle.statut.charAt(0).toUpperCase() + parcelle.statut.slice(1)}
            </p>
          </div>
        `);
      }
    });

  }, [lotissement, parcelles]);

  return (
    <div className="w-full h-96 rounded-lg overflow-hidden border border-gray-200">
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
};

export default LotissementMap;

