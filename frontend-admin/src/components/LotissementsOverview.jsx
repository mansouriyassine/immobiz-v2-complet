import React, { useState } from 'react';
import { MapPin, Building, TrendingUp, Filter, Search, Eye, MoreVertical, Plus } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import CreateLotissementModal from './CreateLotissementModal';
import CreateParcelleModal from './CreateParcelleModal';
import '../App.css';

const LotissementsOverview = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showCreateLotissementModal, setShowCreateLotissementModal] = useState(false);
  const [showCreateParcelleModal, setShowCreateParcelleModal] = useState(false);
  const [lotissements, setLotissements] = useState([
    {
      id: 1,
      nom: 'Résidence Al Manar',
      promoteur: 'Groupe Immobilier Atlas',
      ville: 'Casablanca',
      type: 'résidentiel',
      parcelles_total: 45,
      parcelles_disponibles: 28,
      parcelles_vendues: 12,
      parcelles_reservees: 5,
      prix_moyen: '950000',
      chiffre_affaires: '8500000',
      date_creation: '2024-01-15',
      statut: 'actif'
    },
    {
      id: 2,
      nom: 'Villa Prestige Marrakech',
      promoteur: 'Marrakech Development',
      ville: 'Marrakech',
      type: 'résidentiel',
      parcelles_total: 30,
      parcelles_disponibles: 22,
      parcelles_vendues: 6,
      parcelles_reservees: 2,
      prix_moyen: '1200000',
      chiffre_affaires: '4750000',
      date_creation: '2024-02-20',
      statut: 'actif'
    },
    {
      id: 3,
      nom: 'Zone Industrielle Tanger',
      promoteur: 'Tanger Coastal Developments',
      ville: 'Tanger',
      type: 'industriel',
      parcelles_total: 25,
      parcelles_disponibles: 18,
      parcelles_vendues: 5,
      parcelles_reservees: 2,
      prix_moyen: '800000',
      chiffre_affaires: '3200000',
      date_creation: '2024-03-10',
      statut: 'suspendu'
    },
    {
      id: 4,
      nom: 'Centre Commercial Agadir',
      promoteur: 'Agadir Beach Resort',
      ville: 'Agadir',
      type: 'commercial',
      parcelles_total: 15,
      parcelles_disponibles: 6,
      parcelles_vendues: 8,
      parcelles_reservees: 1,
      prix_moyen: '1500000',
      chiffre_affaires: '1800000',
      date_creation: '2024-04-05',
      statut: 'actif'
    },
    {
      id: 5,
      nom: 'Lotissement Les Jardins',
      promoteur: 'Rabat Premium Properties',
      ville: 'Rabat',
      type: 'résidentiel',
      parcelles_total: 35,
      parcelles_disponibles: 21,
      parcelles_vendues: 10,
      parcelles_reservees: 4,
      prix_moyen: '750000',
      chiffre_affaires: '2500000',
      date_creation: '2024-05-12',
      statut: 'actif'
    }
  ]);

  // Données pour le graphique
  const chartData = [
    { ville: 'Casablanca', lotissements: 3, parcelles: 85 },
    { ville: 'Marrakech', lotissements: 2, parcelles: 45 },
    { ville: 'Rabat', lotissements: 2, parcelles: 50 },
    { ville: 'Tanger', lotissements: 1, parcelles: 25 },
    { ville: 'Agadir', lotissements: 1, parcelles: 15 }
  ];

  const filteredLotissements = lotissements.filter(lot => {
    const matchesSearch = lot.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lot.ville.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lot.promoteur.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || lot.type === filterType;
    const matchesStatus = filterStatus === 'all' || lot.statut === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusBadge = (statut) => {
    const statusConfig = {
      actif: { color: 'bg-green-100 text-green-800', label: 'Actif' },
      suspendu: { color: 'bg-red-100 text-red-800', label: 'Suspendu' },
      en_attente: { color: 'bg-yellow-100 text-yellow-800', label: 'En attente' }
    };
    
    const config = statusConfig[statut] || statusConfig.actif;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const getTypeBadge = (type) => {
    const typeConfig = {
      résidentiel: { color: 'bg-blue-100 text-blue-800', label: 'Résidentiel' },
      commercial: { color: 'bg-purple-100 text-purple-800', label: 'Commercial' },
      industriel: { color: 'bg-gray-100 text-gray-800', label: 'Industriel' }
    };
    
    const config = typeConfig[type] || typeConfig.résidentiel;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const calculateDisponibilite = (lot) => {
    return Math.round((lot.parcelles_disponibles / lot.parcelles_total) * 100);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-MA', {
      style: 'currency',
      currency: 'MAD',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleCreateLotissement = (newLotissement) => {
    const lotissementWithId = {
      ...newLotissement,
      id: Date.now(),
      parcelles_total: 0,
      parcelles_disponibles: 0,
      parcelles_vendues: 0,
      parcelles_reservees: 0,
      chiffre_affaires: '0',
      date_creation: new Date().toISOString().split('T')[0],
      statut: 'actif'
    };
    setLotissements(prev => [...prev, lotissementWithId]);
  };

  const handleCreateParcelle = (newParcelle) => {
    // Ici on pourrait ajouter la parcelle à un état séparé ou l'envoyer au backend
    console.log('Nouvelle parcelle créée:', newParcelle);
    // Pour la démo, on peut mettre à jour les statistiques du lotissement correspondant
    setLotissements(prev => prev.map(lot => {
      if (lot.id == newParcelle.lotissement_id) {
        return {
          ...lot,
          parcelles_total: lot.parcelles_total + 1,
          parcelles_disponibles: newParcelle.statut === 'disponible' ? lot.parcelles_disponibles + 1 : lot.parcelles_disponibles,
          parcelles_vendues: newParcelle.statut === 'vendu' ? lot.parcelles_vendues + 1 : lot.parcelles_vendues,
          parcelles_reservees: newParcelle.statut === 'réservé' ? lot.parcelles_reservees + 1 : lot.parcelles_reservees
        };
      }
      return lot;
    }));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold navy-blue">Supervision des lotissements</h1>
            <p className="text-gray-600 mt-2">Vue d'ensemble de tous les lotissements de la plateforme</p>
          </div>
          <div className="flex space-x-3">
            <button 
              onClick={() => setShowCreateParcelleModal(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-600 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Nouvelle parcelle</span>
            </button>
            <button 
              onClick={() => setShowCreateLotissementModal(true)}
              className="bg-orange-accent text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-orange-600 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Nouveau lotissement</span>
            </button>
          </div>
        </div>
      </div>

      {/* Statistiques globales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total lotissements</p>
              <p className="text-2xl font-bold navy-blue">{lotissements.length}</p>
            </div>
            <Building className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Parcelles totales</p>
              <p className="text-2xl font-bold navy-blue">
                {lotissements.reduce((sum, lot) => sum + lot.parcelles_total, 0)}
              </p>
            </div>
            <MapPin className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Parcelles vendues</p>
              <p className="text-2xl font-bold text-green-600">
                {lotissements.reduce((sum, lot) => sum + lot.parcelles_vendues, 0)}
              </p>
            </div>
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">CA Total</p>
              <p className="text-2xl font-bold orange-accent">
                {(lotissements.reduce((sum, lot) => sum + parseInt(lot.chiffre_affaires), 0) / 1000000).toFixed(1)}M MAD
              </p>
            </div>
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
              <TrendingUp className="w-4 h-4 orange-accent" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Graphique de répartition */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold navy-blue mb-4">Répartition par ville</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="ville" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="lotissements" fill="#003366" name="Lotissements" />
              <Bar dataKey="parcelles" fill="#FF6B00" name="Parcelles" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Filtres */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold navy-blue mb-4">Filtres</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Recherche</label>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Nom, ville, promoteur..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Tous les types</option>
                <option value="résidentiel">Résidentiel</option>
                <option value="commercial">Commercial</option>
                <option value="industriel">Industriel</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Statut</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Tous les statuts</option>
                <option value="actif">Actifs</option>
                <option value="suspendu">Suspendus</option>
                <option value="en_attente">En attente</option>
              </select>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              {filteredLotissements.length} lotissement(s) trouvé(s)
            </p>
          </div>
        </div>
      </div>

      {/* Liste des lotissements */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold navy-blue">Liste des lotissements</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Lotissement</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Promoteur</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Parcelles</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Performance</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Statut</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredLotissements.map((lot) => (
                <tr key={lot.id} className="hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-medium text-gray-900">{lot.nom}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <MapPin className="w-3 h-3 text-gray-400" />
                        <span className="text-sm text-gray-500">{lot.ville}</span>
                        {getTypeBadge(lot.type)}
                      </div>
                    </div>
                  </td>
                  
                  <td className="py-4 px-6">
                    <p className="text-sm text-gray-900">{lot.promoteur}</p>
                    <p className="text-xs text-gray-500">Créé le {lot.date_creation}</p>
                  </td>
                  
                  <td className="py-4 px-6">
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Total: {lot.parcelles_total}</span>
                        <span className="text-green-600">Vendues: {lot.parcelles_vendues}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-blue-600">Disponibles: {lot.parcelles_disponibles}</span>
                        <span className="text-yellow-600">Réservées: {lot.parcelles_reservees}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{width: `${(lot.parcelles_vendues / lot.parcelles_total) * 100}%`}}
                        ></div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="py-4 px-6">
                    <div className="space-y-1">
                      <p className="text-sm font-medium navy-blue">
                        {formatPrice(lot.chiffre_affaires)}
                      </p>
                      <p className="text-xs text-gray-500">
                        Prix moyen: {formatPrice(lot.prix_moyen)}
                      </p>
                      <p className="text-xs text-gray-500">
                        Disponibilité: {calculateDisponibilite(lot)}%
                      </p>
                    </div>
                  </td>
                  
                  <td className="py-4 px-6">
                    {getStatusBadge(lot.statut)}
                  </td>
                  
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredLotissements.length === 0 && (
          <div className="text-center py-12">
            <Building className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Aucun lotissement trouvé</p>
            <p className="text-sm text-gray-400 mt-1">Essayez de modifier vos critères de recherche</p>
          </div>
        )}
      </div>

      <CreateLotissementModal
        isOpen={showCreateLotissementModal}
        onClose={() => setShowCreateLotissementModal(false)}
        onSubmit={handleCreateLotissement}
      />

      <CreateParcelleModal
        isOpen={showCreateParcelleModal}
        onClose={() => setShowCreateParcelleModal(false)}
        onSubmit={handleCreateParcelle}
        lotissements={lotissements}
      />
    </div>
  );
};

export default LotissementsOverview;

