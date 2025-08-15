import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Eye, 
  MapPin, 
  Building2,
  Calendar,
  DollarSign,
  Users
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import LotissementDetail from './LotissementDetail';

const LotissementsManager = ({ onNavigate }) => {
  const [lotissements, setLotissements] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('tous');
  const [currentView, setCurrentView] = useState('list'); // 'list' ou 'detail'
  const [selectedLotissement, setSelectedLotissement] = useState(null);

  useEffect(() => {
    // Simulation de données
    setLotissements([
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
        date_creation: '2024-01-15',
        derniere_mise_a_jour: '2024-08-14',
        statut: 'actif',
        chiffre_affaires: 8500000
      },
      {
        id: 2,
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
        date_creation: '2024-02-20',
        derniere_mise_a_jour: '2024-08-13',
        statut: 'actif',
        chiffre_affaires: 4750000
      },
      {
        id: 3,
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
        date_creation: '2024-03-10',
        derniere_mise_a_jour: '2024-08-12',
        statut: 'actif',
        chiffre_affaires: 2500000
      }
    ]);
  }, []);

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

  const getStatutColor = (statut) => {
    const colors = {
      'actif': 'bg-green-100 text-green-800',
      'en_attente': 'bg-yellow-100 text-yellow-800',
      'suspendu': 'bg-red-100 text-red-800',
      'termine': 'bg-gray-100 text-gray-800'
    };
    return colors[statut] || 'bg-gray-100 text-gray-800';
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-MA', {
      style: 'currency',
      currency: 'MAD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const handleViewDetail = (lotissement) => {
    setSelectedLotissement(lotissement);
    setCurrentView('detail');
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedLotissement(null);
  };

  // Si on est en vue détail, afficher le composant LotissementDetail
  if (currentView === 'detail' && selectedLotissement) {
    return <LotissementDetail lotissement={selectedLotissement} onBack={handleBackToList} />;
  }

  const formatSurface = (surface) => {
    return `${surface.toLocaleString('fr-MA')} m²`;
  };

  const calculateAvailabilityPercentage = (disponible, total) => {
    return total > 0 ? Math.round((disponible / total) * 100) : 0;
  };

  const filteredLotissements = lotissements.filter(lotissement => {
    const matchesSearch = lotissement.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lotissement.ville.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'tous' || lotissement.type_lotissement === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6 space-y-6">
      {/* En-tête */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-dark-gray">Mes Lotissements</h1>
          <p className="text-gray-600 mt-1">
            Gérez vos projets immobiliers et leurs parcelles
          </p>
        </div>
        <Button className="bg-orange-accent hover:bg-orange-600 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Nouveau Lotissement
        </Button>
      </div>

      {/* Filtres et recherche */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Rechercher par nom ou ville..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-accent"
              >
                <option value="tous">Tous les types</option>
                <option value="residentiel">Résidentiel</option>
                <option value="commercial">Commercial</option>
                <option value="industriel">Industriel</option>
                <option value="terrain_particulier">Terrain particulier</option>
              </select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filtres
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Liste des lotissements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredLotissements.map((lotissement) => {
          const availabilityPercentage = calculateAvailabilityPercentage(
            lotissement.surface_disponible, 
            lotissement.surface_totale
          );

          return (
            <Card key={lotissement.id} className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg line-clamp-1">
                      {lotissement.nom}
                    </CardTitle>
                    <CardDescription className="flex items-center mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      {lotissement.ville}, {lotissement.region}
                    </CardDescription>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Badge className={getTypeColor(lotissement.type_lotissement)}>
                      {getTypeLabel(lotissement.type_lotissement)}
                    </Badge>
                    <Badge className={getStatutColor(lotissement.statut)}>
                      {lotissement.statut}
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Statistiques principales */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-lg font-bold text-green-600">
                      {lotissement.nombre_parcelles_disponibles}
                    </div>
                    <div className="text-xs text-green-700">Disponibles</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-lg font-bold text-blue-600">
                      {lotissement.nombre_parcelles_vendues}
                    </div>
                    <div className="text-xs text-blue-700">Vendues</div>
                  </div>
                </div>

                {/* Surface et prix */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Surface disponible:</span>
                    <span className="font-medium">{formatSurface(lotissement.surface_disponible)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Prix moyen:</span>
                    <span className="font-medium text-orange-accent">
                      {formatCurrency(lotissement.prix_moyen_m2)}/m²
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Chiffre d'affaires:</span>
                    <span className="font-medium text-green-600">
                      {formatCurrency(lotissement.chiffre_affaires)}
                    </span>
                  </div>
                </div>

                {/* Barre de progression */}
                <div>
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

                {/* Dernière mise à jour */}
                <div className="flex items-center text-xs text-gray-500">
                  <Calendar className="h-3 w-3 mr-1" />
                  MAJ: {new Date(lotissement.derniere_mise_a_jour).toLocaleDateString('fr-FR')}
                </div>

                {/* Actions */}
                <div className="flex space-x-2 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => onNavigate('parcelles', lotissement.id)}
                  >
                    <MapPin className="h-4 w-4 mr-1" />
                    Parcelles
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      // TODO: Implémenter l'édition
                      console.log('Éditer lotissement:', lotissement.id);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleViewDetail(lotissement)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredLotissements.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              Aucun lotissement trouvé
            </h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || filterType !== 'tous' 
                ? 'Essayez de modifier vos critères de recherche.'
                : 'Commencez par créer votre premier lotissement.'
              }
            </p>
            <Button className="bg-orange-accent hover:bg-orange-600 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Nouveau Lotissement
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LotissementsManager;

