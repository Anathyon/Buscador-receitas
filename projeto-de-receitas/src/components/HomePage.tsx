import React, { useState, useEffect, useCallback } from 'react';
import { FaSearch, FaFilter } from 'react-icons/fa';
import { useIntl, FormattedMessage } from 'react-intl';
import RecipeFilters from './RecipeFilters';
import RecipeList, { type Recipe } from './RecipeList';

const HomePage: React.FC = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const intl = useIntl();

  const fetchRecipes = useCallback(async (type: 'search' | 'category' | 'ingredient' | 'random', query?: string) => {
    setLoading(true);
    let url = '';

    if (type === 'random') {
      // Para a busca aleatória, faremos 10 chamadas em paralelo para o endpoint de receita única aleatória
      const randomPromises = Array.from({ length: 10 }, () => fetch('https://www.themealdb.com/api/json/v1/1/random.php').then(res => res.json()));
      try {
        const results = await Promise.all(randomPromises);
        const meals = results.map(result => result.meals[0]);
        setRecipes(meals);
      } catch (error) {
        console.error("Erro ao buscar receitas aleatórias:", error);
        setRecipes([]);
      } finally {
        setLoading(false);
      }
      return; // Encerra a função aqui para a busca aleatória
    }

    if (type === 'search') {
      url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
    } else if (type === 'category') {
      url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${query}`;
    } else if (type === 'ingredient') {
      url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      const meals: Recipe[] = data.meals || [];
      // Não vamos mais traduzir o nome na lista principal
      setRecipes(meals);
    } catch (error) {
      console.error("Erro ao buscar receitas:", error);
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  }, []); // Removido 'locale' pois a tradução agora é só no modal

  // Efeito para busca inicial aleatória
  useEffect(() => {
    fetchRecipes('random');
  }, [fetchRecipes]);

  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      fetchRecipes('search', searchQuery.trim());
    }
  };

  const handleFilter = (type: 'category' | 'ingredient', value: string) => {
    fetchRecipes(type, value);
  };

  return (
    <>
      <div 
        className="bg-gradient-to-r from-orange-500 to-red-600 text-white md:px-16 text-center relative"
        style={{
          backgroundImage: `url('/svg/Wave.svg')`,
          padding: "5rem 1rem"
        }}
      >
        {/* 3. Use FormattedMessage para textos no JSX */}
        <h1 className="text-4xl md:text-5xl font-extrabold" style={{marginBottom: "1rem"}}>
          <FormattedMessage id="home.title" />
        </h1>
        <p className="text-lg md:text-xl" style={{marginBottom: "3rem"}}>
          <FormattedMessage id="home.subtitle" />
        </p>

        <div className="relative z-20 flex justify-center" style={{marginTop: "4rem", marginBottom: "2rem"}}>
          <div 
            className="flex items-center rounded-full bg-white shadow-xl max-w-2xl mx-auto w-full px-2"
            style={{
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            }}
          >
            <FaSearch className="text-gray-400 ml-6 mr-2" />
            <input
              type="text"
              // 4. Use intl.formatMessage para atributos
              placeholder={intl.formatMessage({ id: 'home.searchPlaceholder' })}
              className="flex-1 py-4 text-gray-800 rounded-full focus:outline-none placeholder-gray-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') { handleSearch() }
              }}
            />
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="text-gray-500 hover:text-orange-600 p-3 rounded-full transition-colors duration-200"
              title={intl.formatMessage({ id: 'home.toggleFilters' })}
            >
              <FaFilter />
            </button>
            <button
              onClick={handleSearch}
              className="bg-orange-600 text-white px-8 py-3 rounded-full font-bold hover:bg-orange-700 transition-colors duration-200 m-2"
            >
              <FormattedMessage id="home.searchButton" />
            </button>
          </div>
        </div>
      </div>
      
      {showFilters && <RecipeFilters onFilter={handleFilter} />}
      
      <RecipeList recipes={recipes} loading={loading} />
    </>
  );
};

export default HomePage;