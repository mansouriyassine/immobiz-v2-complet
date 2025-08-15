import React, { useState } from 'react';
import { Building, MapPin, Phone, Mail, MoreVertical, Plus, Search, Filter, Eye, Edit, Trash2 } from 'lucide-react';
import CreatePromoteurModal from './CreatePromoteurModal';
import '../App.css';

const PromotersManager = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [promoters, setPromoters] = useState([
    {
      id: 1,
      name: 'Groupe Immobilier Atlas',
      email: 'contact@atlas-immobilier.ma',
      phone: '+212 522 123 456',
      city: 'Casablanca',
      lotissements: 8,
      parcelles: 156,
      chiffre_affaires: '15.2M MAD',
      status: 'actif',
      date_inscription: '2024-01-15',
      derniere_activite: '2024-08-14'
    },
    {
      id: 2,
      name: 'Marrakech Development',
      email: 'info@marrakech-dev.ma',
      phone: '+212 524 987 654',
      city: 'Marrakech',
      lotissements: 5,
      parcelles: 89,
      chiffre_affaires: '8.7M MAD',
      status: 'actif',
      date_inscription: '2024-02-20',
      derniere_activite: '2024-08-13'
    },
    {
      id: 3,
      name: 'Rabat Premium Properties',
      email: 'contact@rabat-premium.ma',
      phone: '+212 537 456 789',
      city: 'Rabat',
      lotissements: 3,
      parcelles: 45,
      chiffre_affaires: '5.1M MAD',
      status: 'actif',
      date_inscription: '2024-03-10',
      derniere_activite: '2024-08-12'
    },
    {
      id: 4,
      name: 'Tanger Coastal Developments',
      email: 'admin@tanger-coastal.ma',
      phone: '+212 539 321 654',
      city: 'Tanger',
      lotissements: 2,
      parcelles: 28,
      chiffre_affaires: '3.2M MAD',
      status: 'suspendu',
      date_inscription: '2024-04-05',
      derniere_activite: '2024-07-28'
    },
    {
      id: 5,
      name: 'Agadir Beach Resort',
      email: 'contact@agadir-beach.ma',
      phone: '+212 528 654 321',
      city: 'Agadir',
      lotissements: 1,
      parcelles: 12,
      chiffre_affaires: '1.8M MAD',
      status: 'en_attente',
      date_inscription: '2024-07-15',
      derniere_activite: '2024-08-10'
    }
  ]);

  const filteredPromoters = promoters.filter(promoter => {
    const matchesSearch = promoter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         promoter.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || promoter.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      actif: { color: 'bg-green-100 text-green-800', label: 'Actif' },
      suspendu: { color: 'bg-red-100 text-red-800', label: 'Suspendu' },
      en_attente: { color: 'bg-yellow-100 text-yellow-800', label: 'En attente' }
    };
    
    const config = statusConfig[status] || statusConfig.actif;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const handleCreatePromoter = (newPromoter) => {
    setPromoters(prev => [...prev, newPromoter]);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold navy-blue">Gestion des promoteurs</h1>
            <p className="text-gray-600 mt-2">Supervision et administration des comptes promoteurs</p>
          </div>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="bg-orange-accent text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-orange-600 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Nouveau promoteur</span>
          </button>
        </div>
      </div>

      {/* Filtres et recherche */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un promoteur..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Tous les statuts</option>
                <option value="actif">Actifs</option>
                <option value="suspendu">Suspendus</option>
                <option value="en_attente">En attente</option>
              </select>
            </div>
          </div>
          
          <div className="text-sm text-gray-600">
            {filteredPromoters.length} promoteur(s) trouvé(s)
          </div>
        </div>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total promoteurs</p>
              <p className="text-2xl font-bold navy-blue">{promoters.length}</p>
            </div>
            <Building className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Actifs</p>
              <p className="text-2xl font-bold text-green-600">
                {promoters.filter(p => p.status === 'actif').length}
              </p>
            </div>
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">En attente</p>
              <p className="text-2xl font-bold text-yellow-600">
                {promoters.filter(p => p.status === 'en_attente').length}
              </p>
            </div>
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Suspendus</p>
              <p className="text-2xl font-bold text-red-600">
                {promoters.filter(p => p.status === 'suspendu').length}
              </p>
            </div>
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Liste des promoteurs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Promoteur</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Contact</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Activité</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Performance</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Statut</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPromoters.map((promoter) => (
                <tr key={promoter.id} className="hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-navy-blue rounded-lg flex items-center justify-center">
                        <Building className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{promoter.name}</p>
                        <p className="text-sm text-gray-500 flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {promoter.city}
                        </p>
                      </div>
                    </div>
                  </td>
                  
                  <td className="py-4 px-6">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-900 flex items-center">
                        <Mail className="w-3 h-3 mr-2 text-gray-400" />
                        {promoter.email}
                      </p>
                      <p className="text-sm text-gray-500 flex items-center">
                        <Phone className="w-3 h-3 mr-2 text-gray-400" />
                        {promoter.phone}
                      </p>
                    </div>
                  </td>
                  
                  <td className="py-4 px-6">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-900">{promoter.lotissements} lotissements</p>
                      <p className="text-sm text-gray-500">{promoter.parcelles} parcelles</p>
                      <p className="text-xs text-gray-400">Dernière activité: {promoter.derniere_activite}</p>
                    </div>
                  </td>
                  
                  <td className="py-4 px-6">
                    <div className="space-y-1">
                      <p className="text-sm font-medium navy-blue">{promoter.chiffre_affaires}</p>
                      <p className="text-xs text-gray-500">Chiffre d'affaires</p>
                    </div>
                  </td>
                  
                  <td className="py-4 px-6">
                    {getStatusBadge(promoter.status)}
                  </td>
                  
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-green-600 transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                        <Trash2 className="w-4 h-4" />
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
        
        {filteredPromoters.length === 0 && (
          <div className="text-center py-12">
            <Building className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Aucun promoteur trouvé</p>
            <p className="text-sm text-gray-400 mt-1">Essayez de modifier vos critères de recherche</p>
          </div>
        )}
      </div>

      <CreatePromoteurModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreatePromoter}
      />
    </div>
  );
};

export default PromotersManager;

