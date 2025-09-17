import React, { useState } from 'react';
import { FaSearch, FaFilter } from 'react-icons/fa';
import RecipeFilters from './RecipeFilters';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      navigate(`/recipes?q=${searchQuery}`);
    }
  };

  const handleFilter = (type: 'category' | 'ingredient', value: string) => {
    console.log(`Filtrando por ${type}: ${value}`);
    // Exemplo: navigate(`/recipes?${type}=${value}`);
  };

  return (
    <>
      {/* Seção Principal (Banner) */}
      <div 
        className="bg-gradient-to-r from-orange-500 to-red-600 text-white py-20 px-4 md:px-16 text-center relative"
        style={{
          backgroundImage: `url('/svg/Wave.svg')`, // Substitua pelo caminho do seu padrão de fundo, se houver
        }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Receitas Deliciosas</h1>
        <p className="text-lg md:text-xl mb-12">Descubra receitas incríveis de todo o mundo</p>
      </div>

      {/* Container para a Barra de Busca e Botão de Filtro */}
      <div className="relative -mt-16 md:-mt-10 mb-8 z-20">
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
      
      {/* Botão para mostrar/ocultar filtros */}
      <div className="flex justify-center mb-8 z-10">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="px-6 py-3 rounded-full font-bold text-gray-700 bg-white shadow-md hover:bg-gray-50 transition-colors duration-200 flex items-center"
          style={{
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          }}
        >
          <FaFilter className="mr-2 text-gray-500" />
          Filtrar
        </button>
      </div>


      {/* Renderiza o componente de filtros se showFilters for true */}
      {showFilters && <RecipeFilters onFilter={handleFilter} />}
    </>
  );
};

export default HomePage;