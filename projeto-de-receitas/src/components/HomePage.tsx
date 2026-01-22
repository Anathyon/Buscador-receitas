import React, { useState } from 'react';
import { FaSearch, FaFilter } from 'react-icons/fa';
import { useIntl, FormattedMessage } from 'react-intl';
import RecipeFilters from './RecipeFilters';
import RecipeList from './RecipeList';
import { useRecipes } from '../hooks/useRecipes';

/**
 * Componente da página inicial.
 * Gerencia a busca, filtros e exibição da lista de receitas.
 */
const HomePage: React.FC = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { recipes, loading, loadRecipes } = useRecipes();
  const intl = useIntl();

  /**
   * Executa a busca baseada no texto inserido pelo usuário.
   */
  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      loadRecipes('search', searchQuery.trim());
    }
  };

  /**
   * Aplica filtros de categoria ou ingrediente.
   */
  const handleFilter = (type: 'category' | 'ingredient', value: string) => {
    if (value) {
      loadRecipes(type, value);
    } else {
      // Se o valor for vazio (ex: desselecionar categoria), volta para aleatórias
      loadRecipes('random');
    }
  };

  return (
    <>
      <section className="hero-section text-white flex items-center">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
            <FormattedMessage id="home.title" />
          </h1>
          <p className="text-lg md:text-2xl mb-12 max-w-2xl mx-auto opacity-90">
            <FormattedMessage id="home.subtitle" />
          </p>

          {/* Container de Busca com Design Aprimorado */}
          <div className="search-container-v2 max-w-3xl mx-auto">
            <div className="search-bar-wrapper flex items-center bg-white rounded-full p-1 shadow-2xl transition-all duration-300 focus-within:ring-4 focus-within:ring-orange-300">
              <input
                id='buscar'
                type="text"
                placeholder={intl.formatMessage({ id: 'home.searchPlaceholder' })}
                className="flex-1 text-gray-800 bg-transparent py-3 px-4 md:py-4 md:px-6 rounded-full focus:outline-none placeholder-gray-400 text-base md:text-lg mobile-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') { handleSearch() }
                }}
              />
              
              <div className="flex items-center gap-1 md:gap-2 px-1 md:px-2">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`p-2 md:p-3 rounded-full transition-all duration-200 ${showFilters ? 'bg-orange-100 text-orange-600' : 'text-gray-400 hover:bg-gray-100 hover:text-orange-500'}`}
                  title={intl.formatMessage({ id: 'home.toggleFilters' })}
                >
                  <FaFilter className="text-lg md:text-xl" />
                </button>
                
                <button
                  onClick={handleSearch}
                  className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-3 md:p-4 rounded-full shadow-lg hover:shadow-orange-200 hover:scale-105 transition-all duration-200"
                  aria-label={intl.formatMessage({ id: 'home.searchButton' })}
                >
                  <FaSearch className="text-lg md:text-xl" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showFilters && (
        <div className="container mx-auto px-4 -mt-8 relative z-30">
          <RecipeFilters onFilter={handleFilter} />
        </div>
      )}

      <main className="container mx-auto px-4 py-16">
        <RecipeList recipes={recipes} loading={loading} />
      </main>
    </>
  );
};

export default HomePage;
