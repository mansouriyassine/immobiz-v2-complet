import React, { useState } from 'react';
import { X, MapPin, Building, Users, DollarSign, Save, Plus, Trash2 } from 'lucide-react';
import '../App.css';

const CreateLotissementModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    nom: '',
    description: '',
    ville: '',
    adresse: '',
    type: 'résidentiel',
    surface_totale: '',
    prix_moyen: '',
    promoteur_id: '',
    coordonnees_lotissement: [],
    parcelles: []
  });

  const [currentCoordinate, setCurrentCoordinate] = useState({ lat: '', lng: '' });
  const [currentParcelle, setCurrentParcelle] = useState({
    nom: '',
    surface: '',
    prix: '',
    statut: 'disponible',
    coordonnees: []
  });

  const promoteurs = [
    { id: 1, nom: 'Groupe Immobilier Atlas' },
    { id: 2, nom: 'Marrakech Development' },
    { id: 3, nom: 'Rabat Premium Properties' },
    { id: 4, nom: 'Tanger Coastal Developments' },
    { id: 5, nom: 'Fès Heritage Properties' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addCoordinate = () => {
    if (currentCoordinate.lat && currentCoordinate.lng) {
      setFormData(prev => ({
        ...prev,
        coordonnees_lotissement: [...prev.coordonnees_lotissement, { ...currentCoordinate }]
      }));
      setCurrentCoordinate({ lat: '', lng: '' });
    }
  };

  const removeCoordinate = (index) => {
    setFormData(prev => ({
      ...prev,
      coordonnees_lotissement: prev.coordonnees_lotissement.filter((_, i) => i !== index)
    }));
  };

  const addParcelleCoordinate = () => {
    if (currentCoordinate.lat && currentCoordinate.lng) {
      setCurrentParcelle(prev => ({
        ...prev,
        coordonnees: [...prev.coordonnees, { ...currentCoordinate }]
      }));
      setCurrentCoordinate({ lat: '', lng: '' });
    }
  };

  const addParcelle = () => {
    if (currentParcelle.nom && currentParcelle.surface && currentParcelle.prix) {
      setFormData(prev => ({
        ...prev,
        parcelles: [...prev.parcelles, { ...currentParcelle, id: Date.now() }]
      }));
      setCurrentParcelle({
        nom: '',
        surface: '',
        prix: '',
        statut: 'disponible',
        coordonnees: []
      });
    }
  };

  const removeParcelle = (id) => {
    setFormData(prev => ({
      ...prev,
      parcelles: prev.parcelles.filter(p => p.id !== id)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation basique
    if (!formData.nom || !formData.ville || !formData.promoteur_id) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    if (formData.coordonnees_lotissement.length < 3) {
      alert('Un lotissement doit avoir au moins 3 coordonnées pour former un contour fermé');
      return;
    }

    onSubmit(formData);
    onClose();
    
    // Reset form
    setFormData({
      nom: '',
      description: '',
      ville: '',
      adresse: '',
      type: 'résidentiel',
      surface_totale: '',
      prix_moyen: '',
      promoteur_id: '',
      coordonnees_lotissement: [],
      parcelles: []
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold navy-blue">Créer un nouveau lotissement</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Informations générales */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom du lotissement *
              </label>
              <input
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Promoteur *
              </label>
              <select
                name="promoteur_id"
                value={formData.promoteur_id}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Sélectionner un promoteur</option>
                {promoteurs.map(promoteur => (
                  <option key={promoteur.id} value={promoteur.id}>
                    {promoteur.nom}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ville *
              </label>
              <input
                type="text"
                name="ville"
                value={formData.ville}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="résidentiel">Résidentiel</option>
                <option value="commercial">Commercial</option>
                <option value="industriel">Industriel</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Surface totale (m²)
              </label>
              <input
                type="number"
                name="surface_totale"
                value={formData.surface_totale}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prix moyen (MAD)
              </label>
              <input
                type="number"
                name="prix_moyen"
                value={formData.prix_moyen}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Adresse complète
            </label>
            <textarea
              name="adresse"
              value={formData.adresse}
              onChange={handleInputChange}
              rows={2}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Coordonnées du lotissement */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold navy-blue mb-4 flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              Contour du lotissement (Coordonnées GPS)
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <input
                type="number"
                step="any"
                placeholder="Latitude"
                value={currentCoordinate.lat}
                onChange={(e) => setCurrentCoordinate(prev => ({ ...prev, lat: e.target.value }))}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="number"
                step="any"
                placeholder="Longitude"
                value={currentCoordinate.lng}
                onChange={(e) => setCurrentCoordinate(prev => ({ ...prev, lng: e.target.value }))}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={addCoordinate}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-blue-600 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Ajouter</span>
              </button>
            </div>

            {formData.coordonnees_lotissement.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium mb-2">Coordonnées ajoutées ({formData.coordonnees_lotissement.length}):</h4>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {formData.coordonnees_lotissement.map((coord, index) => (
                    <div key={index} className="flex items-center justify-between bg-white p-2 rounded">
                      <span className="text-sm">
                        Point {index + 1}: {coord.lat}, {coord.lng}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeCoordinate(index)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-4 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="bg-orange-accent text-white px-6 py-2 rounded-lg flex items-center space-x-2 hover:bg-orange-600 transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>Créer le lotissement</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateLotissementModal;

