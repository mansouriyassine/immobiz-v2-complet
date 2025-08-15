# ImmoBiz V2 - Plateforme Immobilière Complète

## 🏗️ Vue d'ensemble

ImmoBiz V2 est une plateforme immobilière professionnelle complète qui permet la gestion, la visualisation et la commercialisation de lotissements immobiliers au Maroc. La plateforme comprend trois interfaces distinctes avec des fonctionnalités avancées de cartographie interactive.

## 🎯 Fonctionnalités principales

### ✨ **Nouvelles fonctionnalités de création et visualisation**

#### 🔧 Interface d'Administration
- **Création complète de lotissements** avec formulaires détaillés
- **Gestion des coordonnées géographiques** pour définir les contours fermés
- **Création de parcelles** avec statuts visuels (disponible/vendu/réservé)
- **Sélection des couleurs par statut** (vert/rouge/orange)
- **Affectation des lotissements aux promoteurs**
- **Interface cartographique** pour visualiser les contours

#### 🏢 Interface Promoteur
- **Visualisation des lotissements** avec carte interactive Leaflet
- **Gestion détaillée des parcelles** avec statuts en temps réel
- **Carte interactive** affichant les contours des lotissements et parcelles
- **Différenciation par couleur** selon les statuts des parcelles
- **Statistiques avancées** par lotissement
- **Navigation intuitive** entre vue liste et vue détaillée

#### 🌐 Interface Publique
- **Carte interactive globale** de tous les lotissements du Maroc
- **Visualisation des contours** des lotissements et parcelles
- **Popups informatifs** avec détails complets
- **Légende interactive** avec codes couleur
- **Vue spécifique par lotissement** depuis les cartes
- **Navigation fluide** entre vue globale et vue détaillée

## 🗺️ Système de cartographie

### Technologie utilisée
- **Leaflet** : Bibliothèque de cartographie interactive
- **OpenStreetMap** : Données cartographiques
- **Contours géographiques** : Coordonnées GPS fermées
- **Différenciation visuelle** : Couleurs selon les statuts

### Codes couleur
- 🟦 **Bleu Navy (#003366)** : Contours des lotissements
- 🟢 **Vert (#22c55e)** : Parcelles disponibles
- 🔴 **Rouge (#ef4444)** : Parcelles vendues
- 🟠 **Orange (#f97316)** : Parcelles réservées

## 🏗️ Architecture technique

### Backend (Flask)
```
immobilier-v2-backend/
├── src/
│   ├── main.py                 # Point d'entrée de l'API
│   ├── models/
│   │   ├── promoteur.py        # Modèle des promoteurs
│   │   ├── hotel.py            # Modèles des lotissements
│   │   └── user.py             # Modèle des utilisateurs
│   ├── routes/
│   │   ├── promoteur.py        # Routes API promoteurs
│   │   ├── hotel.py            # Routes API lotissements
│   │   ├── profile.py          # Routes API profils
│   │   └── user.py             # Routes API utilisateurs
│   └── utils/
│       └── seed_data.py        # Données de test
└── requirements.txt
```

### Frontend Public
```
immobilier-v2-frontend/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Navigation principale
│   │   ├── Footer.jsx          # Pied de page
│   │   ├── HomePage.jsx        # Page d'accueil
│   │   ├── HeroSection.jsx     # Section hero
│   │   ├── LotissementCard.jsx # Cartes de lotissements
│   │   ├── LotissementsPopulaires.jsx # Section lotissements
│   │   └── InteractiveMap.jsx  # 🆕 Carte interactive
│   ├── App.jsx                 # Composant principal
│   └── App.css                 # Styles globaux
└── package.json
```

### Frontend Promoteur
```
immobilier-promoteur-frontend/
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx         # Navigation latérale
│   │   ├── Dashboard.jsx       # Tableau de bord
│   │   ├── LotissementsManager.jsx # Gestion des lotissements
│   │   ├── LotissementDetail.jsx   # 🆕 Vue détaillée avec carte
│   │   └── LotissementMap.jsx      # 🆕 Composant carte
│   ├── App.jsx                 # Composant principal
│   └── App.css                 # Styles globaux
└── package.json
```

### Frontend Administration
```
immobilier-admin-frontend/
├── src/
│   ├── components/
│   │   ├── AdminSidebar.jsx    # Navigation admin
│   │   ├── AdminDashboard.jsx  # Tableau de bord admin
│   │   ├── PromotersManager.jsx # Gestion des promoteurs
│   │   ├── LotissementsOverview.jsx # Supervision des lotissements
│   │   ├── CreatePromoteurModal.jsx # 🆕 Création de promoteur
│   │   ├── CreateLotissementModal.jsx # 🆕 Création de lotissement
│   │   └── CreateParcelleModal.jsx    # 🆕 Création de parcelle
│   ├── App.jsx                 # Composant principal
│   └── App.css                 # Styles globaux
└── package.json
```

## 🚀 Déploiement

### Liens de déploiement actifs
- **Interface Publique** : https://nnyzlsfb.manus.space
- **Interface Promoteur** : https://ikgqimqc.manus.space  
- **Interface Administration** : https://hknrzeoe.manus.space

### Ports de développement local
- **Backend** : http://localhost:5000
- **Interface Publique** : http://localhost:5172
- **Interface Promoteur** : http://localhost:5174
- **Interface Administration** : http://localhost:5173

## 📋 Installation et utilisation

Voir le fichier `INSTALLATION.md` pour les instructions détaillées d'installation et de configuration.

## 🎨 Design et UX

### Palette de couleurs
- **Navy Blue (#003366)** : Couleur principale, headers, navigation
- **Orange Accent (#FF6B00)** : Couleur d'accent, boutons, highlights
- **Gris foncé (#2D3748)** : Texte principal
- **Gris clair (#F7FAFC)** : Arrière-plans, sections

### Typographie
- **Font principale** : System fonts (Inter, Segoe UI, Roboto)
- **Tailles** : 
  - Titres principaux : 36px-48px
  - Sous-titres : 24px-32px
  - Corps de texte : 16px-20px

## 🔄 Workflow de démonstration

### 1. Administration → Création
1. **Connexion à l'interface admin** (https://hknrzeoe.manus.space)
2. **Création d'un promoteur** via le bouton "Nouveau promoteur"
3. **Création d'un lotissement** avec coordonnées géographiques
4. **Création de parcelles** avec statuts et contours

### 2. Promoteur → Gestion
1. **Connexion à l'interface promoteur** (https://ikgqimqc.manus.space)
2. **Visualisation des lotissements** dans le tableau de bord
3. **Accès à la vue détaillée** avec carte interactive
4. **Gestion des parcelles** avec statuts visuels

### 3. Public → Découverte
1. **Accès à l'interface publique** (https://nnyzlsfb.manus.space)
2. **Exploration de la carte globale** via "Carte interactive"
3. **Visualisation spécifique** via "Voir sur carte" sur les lotissements
4. **Consultation des détails** des parcelles et lotissements

## 📊 Données et API

### Endpoints principaux
- `GET /api/promoteurs` - Liste des promoteurs
- `POST /api/promoteurs` - Création d'un promoteur
- `GET /api/lotissements` - Liste des lotissements
- `POST /api/lotissements` - Création d'un lotissement
- `GET /api/parcelles` - Liste des parcelles
- `POST /api/parcelles` - Création d'une parcelle
- `POST /api/contours` - Gestion des contours géographiques

### Format des coordonnées
```json
{
  "coordonnees_lotissement": [
    {"lat": 33.5730, "lng": -7.5900},
    {"lat": 33.5745, "lng": -7.5900},
    {"lat": 33.5745, "lng": -7.5885},
    {"lat": 33.5730, "lng": -7.5885}
  ]
}
```

## 🔧 Technologies utilisées

### Frontend
- **React 19** : Framework JavaScript
- **Vite** : Build tool et serveur de développement
- **Tailwind CSS** : Framework CSS utilitaire
- **Leaflet** : Cartographie interactive
- **Lucide React** : Icônes

### Backend
- **Flask** : Framework web Python
- **SQLite** : Base de données
- **Flask-CORS** : Gestion des CORS
- **Python 3.11** : Langage de programmation

## 📈 Évolutions futures

### Fonctionnalités prévues
- **Système de réservation** en ligne
- **Paiements intégrés** via API bancaires
- **Notifications temps réel** pour les promoteurs
- **Analytics avancés** avec tableaux de bord
- **API mobile** pour applications natives
- **Intégration CRM** pour la gestion des leads

### Améliorations techniques
- **Base de données PostgreSQL** pour la production
- **Cache Redis** pour les performances
- **CDN** pour les assets statiques
- **Monitoring** avec logs centralisés
- **Tests automatisés** (unit, integration, e2e)

## 👥 Équipe et support

**Développé par l'équipe Manus**
- Architecture et développement full-stack
- Design UX/UI professionnel
- Intégration cartographique avancée
- Déploiement et maintenance

Pour toute question ou support technique, consultez la documentation ou contactez l'équipe de développement.

---

**Version** : 2.0  
**Dernière mise à jour** : Août 2025  
**Statut** : Production Ready ✅

