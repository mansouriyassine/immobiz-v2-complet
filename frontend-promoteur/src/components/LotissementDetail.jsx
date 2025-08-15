import React, { useState } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Building2, 
  Calendar, 
  DollarSign, 
  Users,
  Square,
  TrendingUp,
  Edit,
  Plus
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import LotissementMap from './LotissementMap';

const LotissementDetail = ({ lotissement, onBack }) => {
  // Données simulées des parcelles pour ce lotissement
  const [parcelles] = useState([
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
  ]);

  // Ajouter des coordonnées simulées au lotissement pour la démonstration
  const lotissementWithCoords = {
    ...lotissement,
    coordonnees_lotissement: [
      { lat: 33.5730, lng: -7.5900 },
      { lat: 33.5745, lng: -7.5900 },
      { lat: 33.5745, lng: -7.5885 },
      { lat: 33.5730, lng: -7.5885 }
    ]
  };

  const getStatusBadge = (statut) => {
    const statusConfig = {
      disponible: { color: 'bg-green-100 text-green-800', label: 'Disponible' },
      vendu: { color: 'bg-red-100 text-red-800', label: 'Vendu' },
      réservé: { color: 'bg-orange-100 text-orange-800', label: 'Réservé' }
    };
    
    const config = statusConfig[statut] || statusConfig.disponible;
    return (
      <Badge className={config.color}>
        {config.label}
      </Badge>
    );
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-MA', {
      style: 'currency',
      currency: 'MAD',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={onBack} className="flex items-center space-x-2">
            <ArrowLeft className="w-4 h-4" />
            <span>Retour</span>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-navy-blue">{lotissement.nom}</h1>
            <p className="text-gray-600 flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>{lotissement.ville}, {lotissement.region}</span>
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="flex items-center space-x-2">
            <Edit className="w-4 h-4" />
            <span>Modifier</span>
          </Button>
          <Button className="bg-orange-accent hover:bg-orange-600 flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Nouvelle parcelle</span>
          </Button>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Parcelles totales</CardTitle>
            <Square className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lotissement.nombre_parcelles_total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Disponibles</CardTitle>
            <Square className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{lotissement.nombre_parcelles_disponibles}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vendues</CardTitle>
            <TrendingUp className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{lotissement.nombre_parcelles_vendues}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chiffre d'affaires</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPrice(lotissement.chiffre_affaires)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Carte et informations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Carte */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="w-5 h-5" />
              <span>Visualisation du lotissement</span>
            </CardTitle>
            <CardDescription>
              Contours du lotissement et parcelles avec statuts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LotissementMap lotissement={lotissementWithCoords} parcelles={parcelles} />
            <div className="mt-4 flex items-center justify-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span>Disponible</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <span>Vendu</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-orange-500 rounded"></div>
                <span>Réservé</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Informations détaillées */}
        <Card>
          <CardHeader>
            <CardTitle>Informations détaillées</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Type</p>
                <p className="font-medium capitalize">{lotissement.type_lotissement}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Statut</p>
                <Badge className="bg-green-100 text-green-800 capitalize">{lotissement.statut}</Badge>
              </div>
              <div>
                <p className="text-sm text-gray-600">Surface totale</p>
                <p className="font-medium">{lotissement.surface_totale.toLocaleString()} m²</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Surface disponible</p>
                <p className="font-medium">{lotissement.surface_disponible.toLocaleString()} m²</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Prix min</p>
                <p className="font-medium">{formatPrice(lotissement.prix_min)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Prix max</p>
                <p className="font-medium">{formatPrice(lotissement.prix_max)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Prix moyen/m²</p>
                <p className="font-medium">{formatPrice(lotissement.prix_moyen_m2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Date de création</p>
                <p className="font-medium">{new Date(lotissement.date_creation).toLocaleDateString('fr-FR')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Liste des parcelles */}
      <Card>
        <CardHeader>
          <CardTitle>Gestion des parcelles</CardTitle>
          <CardDescription>
            Liste détaillée de toutes les parcelles du lotissement
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Parcelle</th>
                  <th className="text-left py-2">Référence</th>
                  <th className="text-left py-2">Surface</th>
                  <th className="text-left py-2">Prix</th>
                  <th className="text-left py-2">Statut</th>
                  <th className="text-left py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {parcelles.map((parcelle) => (
                  <tr key={parcelle.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 font-medium">{parcelle.nom}</td>
                    <td className="py-3 text-gray-600">{parcelle.reference}</td>
                    <td className="py-3">{parcelle.surface} m²</td>
                    <td className="py-3">{formatPrice(parcelle.prix)}</td>
                    <td className="py-3">{getStatusBadge(parcelle.statut)}</td>
                    <td className="py-3">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-3 h-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LotissementDetail;

