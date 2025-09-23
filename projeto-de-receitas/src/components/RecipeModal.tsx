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
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50" onClick={onClose} style={{ padding: '1rem' }}>
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
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent text-white" style={{padding:"1.5rem"}}>
            <h2 className="text-3xl font-bold">{recipe.strMeal}</h2>
            <div className="flex items-center text-sm space-x-4" style={{marginTop:"0.5rem"}}>
              <span>{recipe.strArea}</span>
              <span style={{marginRight:"0.25rem"}}>•</span>
              <span>{recipe.strCategory}</span>
              <span style={{marginRight:"0.25rem"}}>•</span>
              <span>
                <FormattedMessage id="modal.ingredientsCount" values={{ count: ingredients.length }} />
              </span>
            </div>
            <div className="flex flex-wrap" style={{gap:"0.5rem", marginTop:"1rem"}}>
              {recipe.strTags?.split(',').map((tag, index) => (
                <span
                  key={index}
                  className="bg-amber-100 text-amber-700 text-xs font-semibold rounded-full"
                  style={{paddingInline:"0.75rem", paddingBlock:"0.25rem"}}
                >
                  {tag.trim()}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div style={{padding:"1.5rem"}}>
          <a
            href={recipe.strYoutube}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-colors duration-200"
            style={{paddingInline:"1.5rem", paddingBlock:"0.75rem", marginBottom:"1.5rem"}}
          >
            <FaYoutube style={{marginRight:"0.5rem"}} />
            <FormattedMessage id="modal.watchVideo" />
          </a>

          {/* Seção de Ingredientes */}
          <h3 className="text-2xl font-bold text-gray-800 flex items-center" style={{marginBottom:"1rem"}}>
            <FaUtensils className="text-orange-600" style={{marginRight:"0.75rem"}} />
            <FormattedMessage id="modal.ingredientsTitle" />
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2" style={{marginBottom:"2rem", rowGap:"0.5rem", columnGap:"1rem"}}>
            {ingredients.map((item, index) => (
              <div key={index} className="flex justify-between items-center border-b border-gray-200" style={{paddingBlock:"0.5rem"}}>
                <span className="font-medium text-gray-700">{item.ingredient}</span>
                <span className="text-gray-500">{item.measure}</span>
              </div>
            ))}
          </div>

          {/* Seção de Instruções */}
          <h3 className="text-2xl font-bold text-gray-800 flex items-center" style={{marginBottom:"1rem"}}>
            <FaHourglassHalf className="text-orange-600" style={{marginRight:"0.75rem"}} />
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