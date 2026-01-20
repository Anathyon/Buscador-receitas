import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { FaHeart, FaChevronLeft } from 'react-icons/fa';
import { useFavoriteStore } from '../store/useFavoriteStore';
import RecipeList from './RecipeList';

/**
 * Página de Favoritos.
 * Exibe a lista de receitas salvas pelo usuário no localStorage.
 */
const FavoritesPage: React.FC = () => {
  const { favorites } = useFavoriteStore();

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Cabeçalho da Página */}
      <div className="bg-white shadow-sm pt-32 pb-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <Link 
              to="/" 
              className="inline-flex items-center text-orange-600 font-semibold mb-4 hover:translate-x-[-4px] transition-transform"
            >
              <FaChevronLeft className="mr-2" />
              <FormattedMessage id="favorites.back" />
            </Link>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight flex items-center">
              <FaHeart className="text-red-500 mr-4 drop-shadow-sm" />
              <FormattedMessage id="favorites.title" />
            </h1>
            <p className="text-gray-500 mt-2 text-lg font-medium">
              <FormattedMessage id="favorites.subtitle" />
            </p>
          </div>
          <div className="bg-orange-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-orange-200 self-start md:self-center">
            {favorites.length} <FormattedMessage id="modal.ingredientsCount" values={{ count: favorites.length }} />
          </div>
        </div>
      </div>

      {/* Grid de Receitas */}
      <div className="max-w-7xl mx-auto px-6 mt-12">
        {favorites.length > 0 ? (
          <RecipeList recipes={favorites} loading={false} />
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200 px-6 text-center">
            <div className="bg-gray-50 p-6 rounded-full mb-6">
              <FaHeart className="text-gray-200" size={64} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              <FormattedMessage id="favorites.empty" />
            </h2>
            <Link 
              to="/" 
              className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-8 rounded-2xl transition-all shadow-lg hover:shadow-orange-200"
            >
              <FormattedMessage id="favorites.back" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
