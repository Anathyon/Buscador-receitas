import React, { useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import RecipeModal from './RecipeModal';

// Defina a mesma interface de receita
export interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strArea: string;
  strCategory: string;
  strTags: string;
  strYoutube: string;
  strInstructions: string;
  // Campos de ingrediente e medida
  [key: string]: string | null;
}

interface RecipeListProps {
  recipes: Recipe[];
  loading: boolean;
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes, loading }) => {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const openModal = async (mealId: string) => {
    // Busca os detalhes completos da receita
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
      const data = await response.json();
      if (data.meals && data.meals.length > 0) {
        setSelectedRecipe(data.meals[0]);
      }
    } catch (error) {
      console.error("Erro ao buscar detalhes da receita:", error);
    }
  };

  const closeModal = () => {
    setSelectedRecipe(null);
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800">Carregando Receitas...</h2>
      </div>
    );
  }

  if (recipes.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800">Nenhuma receita encontrada. 😔</h2>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Receitas Encontradas</h2>
        <p className="text-gray-600 mt-2">Veja os resultados da sua busca e filtros</p>
      </div>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{gap: "1.5rem", paddingInline: "1rem"}}>
        {recipes.map(recipe => (
          <div
            key={recipe.idMeal}
            className="bg-white rounded-xl overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-200"
            style={{ boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
            onClick={() => openModal(recipe.idMeal)}
          >
            <div className="relative">
              <img
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 left-2 bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-semibold">
                {recipe.strCategory}
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800 mb-2">{recipe.strMeal}</h3>
              <div className="flex items-center text-gray-500 text-sm mb-2">
                <FaMapMarkerAlt className="mr-2 text-gray-400" />
                <span>{recipe.strArea}</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {recipe.strTags?.split(',').map((tag, index) => (
                  <span
                    key={index}
                    className="bg-yellow-100 text-yellow-600 text-xs font-semibold px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: '#fef3c7',
                      color: '#d97706',
                    }}
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedRecipe && <RecipeModal recipe={selectedRecipe} onClose={closeModal} />}
    </div>
  );
};

export default RecipeList;