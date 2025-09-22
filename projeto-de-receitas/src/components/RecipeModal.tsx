import React from 'react';
import { FaTimes, FaYoutube, FaUtensils, FaHourglassHalf } from 'react-icons/fa';
import { FormattedMessage } from 'react-intl';

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strArea: string;
  strCategory: string;
  strTags: string;
  strYoutube: string;
  strInstructions: string;
  [key: string]: string | null; 
}

interface RecipeModalProps {
  recipe: Meal;
  onClose: () => void;
}

const RecipeModal: React.FC<RecipeModalProps> = ({ recipe, onClose }) => {
  const getIngredients = () => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredientKey = `strIngredient${i}` as keyof Meal;
      const measureKey = `strMeasure${i}` as keyof Meal;
      
      const ingredient = recipe[ingredientKey];
      const measure = recipe[measureKey];

      if (ingredient && ingredient.trim() !== '') {
        ingredients.push({
          ingredient: ingredient,
          measure: measure,
        });
      }
    }
    return ingredients;
  };

  const ingredients = getIngredients();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4" onClick={onClose}>
      <div 
        className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors duration-200"
        >
          <FaTimes size={24} />
        </button>

        {/* Imagem e Título */}
        <div className="relative">
          <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-full h-64 object-cover rounded-t-xl" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent p-6 text-white">
            <h2 className="text-3xl font-bold">{recipe.strMeal}</h2>
            <div className="flex items-center text-sm space-x-4 mt-2">
              <span>{recipe.strArea}</span>
              <span>•</span>
              <span>{recipe.strCategory}</span>
              <span>•</span>
              <span>
                <FormattedMessage id="modal.ingredientsCount" values={{ count: ingredients.length }} />
              </span>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {recipe.strTags?.split(',').map((tag, index) => (
                <span
                  key={index}
                  className="bg-amber-100 text-amber-700 text-xs font-semibold px-3 py-1 rounded-full"
                >
                  {tag.trim()}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <a
            href={recipe.strYoutube}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center bg-red-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-red-700 transition-colors duration-200 mb-6"
          >
            <FaYoutube className="mr-2" />
            <FormattedMessage id="modal.watchVideo" />
          </a>

          {/* Seção de Ingredientes */}
          <h3 className="text-2xl font-bold text-gray-800 flex items-center mb-4">
            <FaUtensils className="text-orange-600 mr-3" />
            <FormattedMessage id="modal.ingredientsTitle" />
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 mb-8">
            {ingredients.map((item, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="font-medium text-gray-700">{item.ingredient}</span>
                <span className="text-gray-500">{item.measure}</span>
              </div>
            ))}
          </div>

          {/* Seção de Instruções */}
          <h3 className="text-2xl font-bold text-gray-800 flex items-center mb-4">
            <FaHourglassHalf className="text-orange-600 mr-3" />
            <FormattedMessage id="modal.instructionsTitle" />
          </h3>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {recipe.strInstructions}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;