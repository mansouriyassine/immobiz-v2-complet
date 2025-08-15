import React from 'react';
import { Search, MapPin, TrendingUp, Shield } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import '../App.css';

const HeroSection = ({ onNavigateToMap }) => {
  return (
    <section className="bg-navy-blue text-white py-24 relative overflow-hidden">
      {/* Arrière-plan décoratif */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-blue to-blue-900 opacity-90"></div>
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-orange-accent opacity-10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-orange-accent opacity-5 rounded-full blur-2xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Titre principal */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Découvrez les meilleurs
            <span className="block text-orange-accent">lotissements immobiliers</span>
          </h1>

          {/* Sous-titre */}
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Plateforme professionnelle pour explorer, comparer et investir dans 
            les projets immobiliers les plus prometteurs du Maroc
          </p>

          {/* Barre de recherche */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="flex flex-col sm:flex-row gap-4 p-2 bg-white rounded-lg shadow-xl">
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Rechercher par ville ou région..."
                  className="pl-10 border-0 text-dark-gray text-lg h-12"
                />
              </div>
              <Button 
                onClick={onNavigateToMap}
                className="bg-orange-accent hover:bg-orange-600 text-white px-8 h-12 text-lg font-semibold transition-all duration-200 hover:scale-105"
              >
                <Search className="h-5 w-5 mr-2" />
                Rechercher
              </Button>
            </div>
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm">
                <TrendingUp className="h-12 w-12 text-orange-accent mx-auto mb-4" />
                <div className="text-3xl font-bold mb-2">150+</div>
                <div className="text-gray-300">Lotissements disponibles</div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm">
                <MapPin className="h-12 w-12 text-orange-accent mx-auto mb-4" />
                <div className="text-3xl font-bold mb-2">25+</div>
                <div className="text-gray-300">Villes couvertes</div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm">
                <Shield className="h-12 w-12 text-orange-accent mx-auto mb-4" />
                <div className="text-3xl font-bold mb-2">100%</div>
                <div className="text-gray-300">Projets vérifiés</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

