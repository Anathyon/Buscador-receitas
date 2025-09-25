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
      return;
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
      setRecipes(meals);
    } catch (error) {
      console.error("Erro ao buscar receitas:", error);
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  }, []);

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
        className="bg-gradient-to-r from-orange-500 to-red-600 text-white md:px-16 relative"
        style={{
          backgroundImage: `url('/svg/Wave.svg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          padding: "10rem 1rem",
          minHeight: '400px', // Adicionei uma altura mínima para visualização
        }}
      >
        <div className="text-center md:px-16 mx-auto" style={{maxWidth: '1800px'}}>
          <h1 className="text-5xl md:text-5xl font-extrabold" style={{ marginBottom: "1rem" }}>
            <FormattedMessage id="home.title" />
          </h1>
          <p className="text-lg md:text-xl" style={{ marginBottom: "3rem" }}>
            <FormattedMessage id="home.subtitle" />
          </p>

          {/* Container de Busca */}
          <div className="relative z-20 flex justify-center px-4 md:px-0" style={{ marginTop: "4rem", marginBottom: "2rem" }}>
            <div
              className="flex items-center rounded-full bg-white shadow-xl w-full sm:w-[90%] md:w-[75%] lg:w-[60%] xl:w-[50%]"
              style={{
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
              }}
            >
              <FaSearch className="text-gray-400" style={{ marginLeft: "1.5rem", marginRight: "0.5rem" }} />
              <input
                type="text"
                style={{ paddingBlock: "1rem" }}
                placeholder={intl.formatMessage({ id: 'home.searchPlaceholder' })}
                className="flex-1 text-gray-800 rounded-full focus:outline-none placeholder-gray-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') { handleSearch() }
                }}
              />
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="text-gray-500 hover:text-orange-600 rounded-full transition-colors duration-200"
                title={intl.formatMessage({ id: 'home.toggleFilters' })}
                style={{ padding: "0.75rem" }}
              >
                <FaFilter />
              </button>
              <button
                onClick={handleSearch}
                className="bg-orange-600 text-white rounded-full font-bold hover:bg-orange-700 transition-colors duration-200 flex-shrink-0 md:w-auto"
                style={{ paddingInline: "2rem", paddingBlock: "0.75rem", margin: "0.5rem 0.5rem 0.5rem 0.2rem" }}
              >
                <FormattedMessage id="home.searchButton" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {showFilters && <RecipeFilters onFilter={handleFilter} />}

      <RecipeList recipes={recipes} loading={loading} />
    </>
  );
};

export default HomePage;
