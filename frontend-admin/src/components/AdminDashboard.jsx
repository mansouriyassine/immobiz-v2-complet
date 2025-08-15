import React from 'react';
import { Building, Users, MapPin, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import '../App.css';

const AdminDashboard = () => {
  // Données de test pour les graphiques
  const monthlyData = [
    { month: 'Jan', promoteurs: 8, lotissements: 15, utilisateurs: 450 },
    { month: 'Fév', promoteurs: 12, lotissements: 22, utilisateurs: 680 },
    { month: 'Mar', promoteurs: 18, lotissements: 35, utilisateurs: 920 },
    { month: 'Avr', promoteurs: 25, lotissements: 48, utilisateurs: 1200 },
    { month: 'Mai', promoteurs: 32, lotissements: 65, utilisateurs: 1580 },
    { month: 'Juin', promoteurs: 38, lotissements: 78, utilisateurs: 1850 },
  ];

  const regionData = [
    { name: 'Casablanca', value: 35, color: '#003366' },
    { name: 'Rabat', value: 25, color: '#FF6B00' },
    { name: 'Marrakech', value: 20, color: '#4A90E2' },
    { name: 'Tanger', value: 12, color: '#7ED321' },
    { name: 'Autres', value: 8, color: '#9013FE' },
  ];

  const stats = [
    {
      title: 'Promoteurs actifs',
      value: '38',
      change: '+12%',
      icon: Building,
      color: 'bg-blue-500',
      trend: 'up'
    },
    {
      title: 'Lotissements totaux',
      value: '156',
      change: '+8%',
      icon: MapPin,
      color: 'bg-green-500',
      trend: 'up'
    },
    {
      title: 'Utilisateurs inscrits',
      value: '2,847',
      change: '+15%',
      icon: Users,
      color: 'bg-purple-500',
      trend: 'up'
    },
    {
      title: 'Chiffre d\'affaires',
      value: '45.2M MAD',
      change: '+22%',
      icon: TrendingUp,
      color: 'bg-orange-500',
      trend: 'up'
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'promoteur',
      message: 'Nouveau promoteur inscrit: Atlas Immobilier',
      time: '2 min',
      status: 'success'
    },
    {
      id: 2,
      type: 'lotissement',
      message: 'Lotissement "Villa Prestige" mis à jour',
      time: '15 min',
      status: 'info'
    },
    {
      id: 3,
      type: 'alert',
      message: 'Tentative de connexion suspecte détectée',
      time: '1h',
      status: 'warning'
    },
    {
      id: 4,
      type: 'system',
      message: 'Sauvegarde automatique effectuée',
      time: '2h',
      status: 'success'
    },
    {
      id: 5,
      type: 'user',
      message: '25 nouveaux utilisateurs aujourd\'hui',
      time: '3h',
      status: 'info'
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold navy-blue">Tableau de bord administrateur</h1>
        <p className="text-gray-600 mt-2">Vue d'ensemble de la plateforme ImmoBiz</p>
      </div>

      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold navy-blue mt-2">{stat.value}</p>
                  <p className={`text-sm mt-2 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change} ce mois
                  </p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Graphique de croissance */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold navy-blue mb-4">Croissance mensuelle</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="promoteurs" stroke="#003366" strokeWidth={2} name="Promoteurs" />
              <Line type="monotone" dataKey="lotissements" stroke="#FF6B00" strokeWidth={2} name="Lotissements" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Répartition par région */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold navy-blue mb-4">Répartition par région</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={regionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {regionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Activité récente */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold navy-blue mb-4">Activité récente</h3>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.status === 'success' ? 'bg-green-500' :
                  activity.status === 'warning' ? 'bg-yellow-500' :
                  'bg-blue-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500 mt-1">Il y a {activity.time}</p>
                </div>
                {activity.status === 'success' && <CheckCircle className="w-4 h-4 text-green-500" />}
                {activity.status === 'warning' && <AlertTriangle className="w-4 h-4 text-yellow-500" />}
              </div>
            ))}
          </div>
        </div>

        {/* Alertes système */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold navy-blue mb-4">Alertes système</h3>
          <div className="space-y-4">
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                <p className="text-sm font-medium text-red-800">Sécurité</p>
              </div>
              <p className="text-xs text-red-600 mt-1">3 tentatives de connexion échouées</p>
            </div>
            
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-yellow-500" />
                <p className="text-sm font-medium text-yellow-800">Performance</p>
              </div>
              <p className="text-xs text-yellow-600 mt-1">Temps de réponse élevé détecté</p>
            </div>
            
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <p className="text-sm font-medium text-green-800">Système</p>
              </div>
              <p className="text-xs text-green-600 mt-1">Tous les services fonctionnent</p>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium navy-blue mb-2">Statistiques serveur</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>CPU</span>
                <span>45%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1">
                <div className="bg-blue-500 h-1 rounded-full" style={{width: '45%'}}></div>
              </div>
              
              <div className="flex justify-between text-xs">
                <span>Mémoire</span>
                <span>62%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1">
                <div className="bg-orange-500 h-1 rounded-full" style={{width: '62%'}}></div>
              </div>
              
              <div className="flex justify-between text-xs">
                <span>Stockage</span>
                <span>38%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1">
                <div className="bg-green-500 h-1 rounded-full" style={{width: '38%'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

