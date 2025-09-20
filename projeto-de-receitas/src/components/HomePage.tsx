import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilter } from 'react-icons/fa';
import RecipeFilters from './RecipeFilters';
import RecipeList from './RecipeList';
import type { Recipe } from './RecipeList'; 

const HomePage: React.FC = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchRecipes = async (type: 'search' | 'category' | 'ingredient', query: string) => {
    setLoading(true);
    let url = '';

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
      setRecipes(data.meals || []);
    } catch (error) {
      console.error("Erro ao buscar receitas:", error);
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  // Busca inicial de sugestões ao carregar a página
  useEffect(() => {
    fetchRecipes('search', 'a');
  }, []);

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
        <h1 className="text-4xl md:text-5xl font-extrabold" style={{marginBottom: "1rem"}}>Receitas Deliciosas</h1>
        <p className="text-lg md:text-xl" style={{marginBottom: "3rem"}}>Descubra receitas incríveis de todo o mundo</p>

        <div className="relative z-20 flex justify-center" style={{marginTop: "4rem", marginBottom: "2rem"}}>
          <div 
            className="flex items-center rounded-full bg-white shadow-xl max-w-xl mx-auto w-full px-2"
            style={{
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            }}
          >
            <FaSearch className="text-gray-400 ml-6 mr-2" />
            <input
              type="text"
              placeholder="Busque por receitas..."
              className="flex-1 py-4 text-gray-800 rounded-full focus:outline-none placeholder-gray-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
            />
            <button
              onClick={handleSearch}
              className="bg-orange-600 text-white px-8 py-3 rounded-full font-bold hover:bg-orange-700 transition-colors duration-200 m-2"
            >
              Buscar
            </button>
          </div>
        </div>
        
        <div className="flex justify-center z-10" style={{marginBottom:"2rem"}}>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="rounded-full font-bold text-gray-700 bg-white shadow-md hover:bg-gray-300 transition-colors duration-200 flex items-center"
            style={{
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              padding: '0.75rem 1.5rem',
            }}
          >
            <FaFilter className="text-gray-500" style={{marginRight: "0.5rem"}} />
            Filtrar
          </button>
        </div>
      </div>
      
      {showFilters && <RecipeFilters onFilter={handleFilter} />}
      
      <RecipeList recipes={recipes} loading={loading} />
    </>
  );
};

export default HomePage;