# Guide d'Installation - ImmoBiz V2

## 🚀 Installation Rapide

### Prérequis
- **Node.js** 20.x ou supérieur
- **Python** 3.11 ou supérieur
- **npm** ou **pnpm** (recommandé)
- **Git** pour le clonage du projet

### 1. Clonage et extraction
```bash
# Extraire l'archive
tar -xzf immobiz-v2-complet.tar.gz
cd immobiz-v2-complet
```

## 🔧 Configuration du Backend

### Installation des dépendances
```bash
cd backend
pip install -r requirements.txt
```

### Démarrage du serveur
```bash
python src/main.py
```

Le backend sera accessible sur : `http://localhost:5000`

### Endpoints API disponibles
- `GET /api/promoteurs` - Liste des promoteurs
- `POST /api/promoteurs` - Création d'un promoteur
- `GET /api/lotissements` - Liste des lotissements
- `POST /api/lotissements` - Création d'un lotissement
- `GET /api/parcelles` - Liste des parcelles
- `POST /api/parcelles` - Création d'une parcelle

## 🌐 Configuration de l'Interface Publique

### Installation et démarrage
```bash
cd frontend-public
npm install
# ou avec pnpm (recommandé)
pnpm install

# Démarrage du serveur de développement
npm run dev
# ou
pnpm dev
```

L'interface publique sera accessible sur : `http://localhost:5172`

### Fonctionnalités disponibles
- ✅ Catalogue des lotissements
- ✅ Carte interactive globale avec Leaflet
- ✅ Visualisation des contours des lotissements et parcelles
- ✅ Différenciation par couleur selon les statuts
- ✅ Popups informatifs détaillés
- ✅ Navigation responsive

## 🏢 Configuration de l'Interface Promoteur

### Installation et démarrage
```bash
cd frontend-promoteur
npm install
# ou avec pnpm
pnpm install

# Démarrage du serveur de développement
npm run dev
# ou
pnpm dev
```

L'interface promoteur sera accessible sur : `http://localhost:5174`

### Fonctionnalités disponibles
- ✅ Tableau de bord avec statistiques
- ✅ Gestion des lotissements
- ✅ Vue détaillée avec carte interactive
- ✅ Gestion des parcelles avec statuts visuels
- ✅ Navigation entre vue liste et vue carte

## 🔧 Configuration de l'Interface Administration

### Installation et démarrage
```bash
cd frontend-admin
npm install
# ou avec pnpm
pnpm install

# Démarrage du serveur de développement
npm run dev
# ou
pnpm dev
```

L'interface administration sera accessible sur : `http://localhost:5173`

### Fonctionnalités disponibles
- ✅ Supervision globale de la plateforme
- ✅ Création de promoteurs avec formulaire complet
- ✅ Création de lotissements avec coordonnées géographiques
- ✅ Création de parcelles avec statuts et contours
- ✅ Gestion des utilisateurs et modération

## 🗺️ Configuration de la Cartographie

### Dépendances cartographiques
Les interfaces utilisent **Leaflet** pour la cartographie interactive :

```bash
# Déjà inclus dans les package.json
npm install leaflet react-leaflet
```

### Fonctionnalités cartographiques
- **Contours des lotissements** : Polygones bleu navy
- **Parcelles disponibles** : Polygones verts
- **Parcelles vendues** : Polygones rouges  
- **Parcelles réservées** : Polygones orange
- **Popups informatifs** : Détails au clic
- **Légende interactive** : Codes couleur
- **Zoom et navigation** : Contrôles standard

## 🚀 Déploiement en Production

### Build des applications
```bash
# Interface publique
cd frontend-public
npm run build

# Interface promoteur
cd frontend-promoteur
npm run build

# Interface administration
cd frontend-admin
npm run build
```

### Déploiement automatique
Les interfaces sont déjà déployées et accessibles :
- **Interface Publique** : https://nnyzlsfb.manus.space
- **Interface Promoteur** : https://ikgqimqc.manus.space
- **Interface Administration** : https://hknrzeoe.manus.space

## 🔄 Workflow de Démonstration

### Scénario complet de démonstration

#### 1. Administration - Création de contenu
1. Accéder à l'interface admin : https://hknrzeoe.manus.space
2. Cliquer sur "Promoteurs" dans la sidebar
3. Cliquer sur "Nouveau promoteur" et remplir le formulaire
4. Cliquer sur "Lotissements" dans la sidebar
5. Cliquer sur "Nouveau lotissement" et définir les coordonnées
6. Cliquer sur "Nouvelle parcelle" et créer des parcelles avec différents statuts

#### 2. Promoteur - Gestion et visualisation
1. Accéder à l'interface promoteur : https://ikgqimqc.manus.space
2. Consulter le tableau de bord avec les statistiques
3. Cliquer sur "Mes Lotissements"
4. Cliquer sur "Vue détaillée" d'un lotissement
5. Explorer la carte interactive avec les contours et parcelles

#### 3. Public - Découverte et exploration
1. Accéder à l'interface publique : https://nnyzlsfb.manus.space
2. Cliquer sur "Carte interactive" dans le header pour la vue globale
3. Scroller vers les lotissements et cliquer sur "Voir sur carte"
4. Explorer les popups informatifs et la légende

## 🛠️ Dépannage

### Problèmes courants

#### Port déjà utilisé
```bash
# Vérifier les ports utilisés
netstat -tulpn | grep :5000
netstat -tulpn | grep :5172
netstat -tulpn | grep :5173
netstat -tulpn | grep :5174

# Tuer un processus si nécessaire
kill -9 <PID>
```

#### Erreurs de dépendances
```bash
# Nettoyer le cache npm
npm cache clean --force

# Réinstaller les dépendances
rm -rf node_modules package-lock.json
npm install
```

#### Problèmes de CORS
Le backend est configuré pour accepter les requêtes depuis tous les domaines en développement. En production, ajustez la configuration CORS dans `src/main.py`.

### Logs et débogage
- **Backend** : Les logs s'affichent dans le terminal
- **Frontend** : Utiliser les outils de développement du navigateur (F12)
- **Carte** : Vérifier la console pour les erreurs Leaflet

## 📊 Base de Données

### Structure SQLite
La base de données SQLite est automatiquement créée au premier démarrage du backend avec des données de test.

### Modèles principaux
- **Promoteur** : Entreprises promotrices
- **Lotissement** : Projets immobiliers avec coordonnées
- **Parcelle** : Unités de vente avec statuts et contours
- **Utilisateur** : Comptes et profils

### Données de test
Le fichier `src/utils/seed_data.py` contient des données de démonstration avec :
- 6 lotissements dans différentes villes du Maroc
- Parcelles avec statuts variés (disponible/vendu/réservé)
- Coordonnées géographiques réalistes
- Promoteurs avec informations complètes

## 🔒 Sécurité

### Configuration recommandée
- Utiliser HTTPS en production
- Configurer les CORS pour les domaines autorisés uniquement
- Implémenter l'authentification pour les interfaces privées
- Valider toutes les données d'entrée côté backend

### Variables d'environnement
Créer un fichier `.env` pour chaque frontend si nécessaire :
```bash
VITE_API_BASE_URL=http://localhost:5000
VITE_MAP_API_KEY=your_map_api_key
```

## 📞 Support

Pour toute question ou problème :
1. Vérifier ce guide d'installation
2. Consulter les logs d'erreur
3. Vérifier la configuration des ports
4. Contacter l'équipe de développement

---

**Version** : 2.0  
**Dernière mise à jour** : Août 2025  
**Testé sur** : Ubuntu 22.04, macOS, Windows 11

