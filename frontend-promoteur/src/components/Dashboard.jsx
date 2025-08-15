import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  MapPin, 
  Users, 
  TrendingUp, 
  Eye,
  Plus,
  Calendar,
  DollarSign
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

const Dashboard = ({ onNavigate }) => {
  const [stats, setStats] = useState({
    totalLotissements: 0,
    parcellesDisponibles: 0,
    parcellesVendues: 0,
    leadsEnAttente: 0,
    chiffreAffaires: 0
  });

  const [recentActivity, setRecentActivity] = useState([]);
  const [lotissements, setLotissements] = useState([]);

  useEffect(() => {
    // Simulation de données
    setStats({
      totalLotissements: 3,
      parcellesDisponibles: 45,
      parcellesVendues: 28,
      leadsEnAttente: 12,
      chiffreAffaires: 15750000
    });

    setRecentActivity([
      {
        id: 1,
        type: 'vente',
        message: 'Parcelle A-15 vendue dans Résidence Al Manar',
        date: '2024-08-14T10:30:00',
        montant: 950000
      },
      {
        id: 2,
        type: 'lead',
        message: 'Nouveau lead intéressé par Villa Prestige',
        date: '2024-08-14T09:15:00'
      },
      {
        id: 3,
        type: 'reservation',
        message: 'Parcelle B-08 réservée dans Lotissement Les Jardins',
        date: '2024-08-13T16:45:00'
      },
      {
        id: 4,
        type: 'lead',
        message: 'Demande d\'information pour Zone Industrielle',
        date: '2024-08-13T14:20:00'
      }
    ]);

    setLotissements([
      {
        id: 1,
        nom: "Résidence Al Manar",
        ville: "Casablanca",
        parcellesDisponibles: 28,
        parcellesTotal: 45,
        chiffreAffaires: 8500000,
        derniereMiseAJour: '2024-08-14'
      },
      {
        id: 2,
        nom: "Villa Prestige Marrakech",
        ville: "Marrakech",
        parcellesDisponibles: 22,
        parcellesTotal: 30,
        chiffreAffaires: 4750000,
        derniereMiseAJour: '2024-08-13'
      },
      {
        id: 3,
        nom: "Lotissement Les Jardins",
        ville: "Rabat",
        parcellesDisponibles: 21,
        parcellesTotal: 35,
        chiffreAffaires: 2500000,
        derniereMiseAJour: '2024-08-12'
      }
    ]);
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-MA', {
      style: 'currency',
      currency: 'MAD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'vente':
        return <DollarSign className="h-4 w-4 text-green-600" />;
      case 'lead':
        return <Users className="h-4 w-4 text-blue-600" />;
      case 'reservation':
        return <Calendar className="h-4 w-4 text-orange-600" />;
      default:
        return <TrendingUp className="h-4 w-4 text-gray-600" />;
    }
  };

  const getActivityBadgeColor = (type) => {
    switch (type) {
      case 'vente':
        return 'bg-green-100 text-green-800';
      case 'lead':
        return 'bg-blue-100 text-blue-800';
      case 'reservation':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* En-tête */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-dark-gray">Tableau de bord</h1>
          <p className="text-gray-600 mt-1">
            Vue d'ensemble de vos lotissements et activités
          </p>
        </div>
        <Button 
          onClick={() => onNavigate('lotissements')}
          className="bg-orange-accent hover:bg-orange-600 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nouveau Lotissement
        </Button>
      </div>

      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lotissements</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalLotissements}</div>
            <p className="text-xs text-muted-foreground">
              Projets actifs
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Disponibles</CardTitle>
            <MapPin className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.parcellesDisponibles}</div>
            <p className="text-xs text-muted-foreground">
              Parcelles à vendre
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vendues</CardTitle>
            <DollarSign className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.parcellesVendues}</div>
            <p className="text-xs text-muted-foreground">
              Parcelles vendues
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Leads</CardTitle>
            <Users className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.leadsEnAttente}</div>
            <p className="text-xs text-muted-foreground">
              En attente
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chiffre d'affaires</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {formatCurrency(stats.chiffreAffaires)}
            </div>
            <p className="text-xs text-muted-foreground">
              Total réalisé
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mes Lotissements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Mes Lotissements</span>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onNavigate('lotissements')}
              >
                Voir tout
              </Button>
            </CardTitle>
            <CardDescription>
              Aperçu de vos projets immobiliers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lotissements.map((lotissement) => (
                <div key={lotissement.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-1">
                    <h4 className="font-semibold text-dark-gray">{lotissement.nom}</h4>
                    <p className="text-sm text-gray-600">{lotissement.ville}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="text-xs text-green-600 font-medium">
                        {lotissement.parcellesDisponibles} disponibles
                      </span>
                      <span className="text-xs text-gray-500">
                        sur {lotissement.parcellesTotal} total
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-dark-gray">
                      {formatCurrency(lotissement.chiffreAffaires)}
                    </p>
                    <p className="text-xs text-gray-500">
                      MAJ: {new Date(lotissement.derniereMiseAJour).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm" className="ml-4">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Activité récente */}
        <Card>
          <CardHeader>
            <CardTitle>Activité récente</CardTitle>
            <CardDescription>
              Dernières actions sur vos lotissements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                  <div className="flex-shrink-0 mt-1">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-dark-gray">{activity.message}</p>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-xs text-gray-500">
                        {formatDate(activity.date)}
                      </p>
                      <div className="flex items-center space-x-2">
                        <Badge className={`text-xs ${getActivityBadgeColor(activity.type)}`}>
                          {activity.type}
                        </Badge>
                        {activity.montant && (
                          <span className="text-xs font-semibold text-green-600">
                            {formatCurrency(activity.montant)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

