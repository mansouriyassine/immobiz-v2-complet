import React, { useState } from 'react';
import { X, MapPin, Square, DollarSign, Save, Plus, Trash2 } from 'lucide-react';
import '../App.css';

const CreateParcelleModal = ({ isOpen, onClose, onSubmit, lotissements = [] }) => {
  const [formData, setFormData] = useState({
    nom: '',
    reference: '',
    surface: '',
    prix: '',
    statut: 'disponible',
    lotissement_id: '',
    coordonnees: []
  });

  const [currentCoordinate, setCurrentCoordinate] = useState({ lat: '', lng: '' });

  const statutOptions = [
    { value: 'disponible', label: 'Disponible', color: 'text-green-600', bgColor: 'bg-green-100' },
    { value: 'vendu', label: 'Vendu', color: 'text-red-600', bgColor: 'bg-red-100' },
    { value: 'réservé', label: 'Réservé', color: 'text-orange-600', bgColor: 'bg-orange-100' }
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
        coordonnees: [...prev.coordonnees, { ...currentCoordinate }]
      }));
      setCurrentCoordinate({ lat: '', lng: '' });
    }
  };

  const removeCoordinate = (index) => {
    setFormData(prev => ({
      ...prev,
      coordonnees: prev.coordonnees.filter((_, i) => i !== index)
    }));
  };

  const generateReference = () => {
    const lotissement = lotissements.find(l => l.id == formData.lotissement_id);
    if (lotissement) {
      const prefix = lotissement.nom.substring(0, 3).toUpperCase();
      const timestamp = Date.now().toString().slice(-4);
      setFormData(prev => ({
        ...prev,
        reference: `${prefix}-${timestamp}`
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation basique
    if (!formData.nom || !formData.surface || !formData.prix || !formData.lotissement_id) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    if (formData.coordonnees.length < 3) {
      alert('Une parcelle doit avoir au moins 3 coordonnées pour former un contour fermé');
      return;
    }

    onSubmit(formData);
    onClose();
    
    // Reset form
    setFormData({
      nom: '',
      reference: '',
      surface: '',
      prix: '',
      statut: 'disponible',
      lotissement_id: '',
      coordonnees: []
    });
  };

  if (!isOpen) return null;

  const selectedStatut = statutOptions.find(s => s.value === formData.statut);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold navy-blue">Créer une nouvelle parcelle</h2>
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
                Nom de la parcelle *
              </label>
              <input
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleInputChange}
                placeholder="ex: Parcelle A1"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lotissement *
              </label>
              <select
                name="lotissement_id"
                value={formData.lotissement_id}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Sélectionner un lotissement</option>
                {lotissements.map(lotissement => (
                  <option key={lotissement.id} value={lotissement.id}>
                    {lotissement.nom} - {lotissement.ville}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Référence
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  name="reference"
                  value={formData.reference}
                  onChange={handleInputChange}
                  placeholder="Référence unique"
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={generateReference}
                  className="bg-gray-500 text-white px-3 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                  disabled={!formData.lotissement_id}
                >
                  Générer
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Statut *
              </label>
              <select
                name="statut"
                value={formData.statut}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {statutOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {selectedStatut && (
                <div className={`mt-2 inline-flex items-center px-3 py-1 rounded-full text-sm ${selectedStatut.bgColor} ${selectedStatut.color}`}>
                  <div className={`w-2 h-2 rounded-full mr-2 ${selectedStatut.value === 'disponible' ? 'bg-green-500' : selectedStatut.value === 'vendu' ? 'bg-red-500' : 'bg-orange-500'}`}></div>
                  {selectedStatut.label}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Surface (m²) *
              </label>
              <input
                type="number"
                name="surface"
                value={formData.surface}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prix (MAD) *
              </label>
              <input
                type="number"
                name="prix"
                value={formData.prix}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Coordonnées de la parcelle */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold navy-blue mb-4 flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              Contour de la parcelle (Coordonnées GPS)
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

            {formData.coordonnees.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium mb-2">Coordonnées ajoutées ({formData.coordonnees.length}):</h4>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {formData.coordonnees.map((coord, index) => (
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

          {/* Aperçu du statut */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium mb-2">Aperçu de la couleur sur la carte :</h4>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-500 rounded border-2 border-green-600"></div>
                <span className="text-sm">Disponible</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-500 rounded border-2 border-red-600"></div>
                <span className="text-sm">Vendu</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-orange-500 rounded border-2 border-orange-600"></div>
                <span className="text-sm">Réservé</span>
              </div>
            </div>
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
              <span>Créer la parcelle</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateParcelleModal;

