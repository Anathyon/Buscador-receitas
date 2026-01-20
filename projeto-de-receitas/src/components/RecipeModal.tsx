import React from 'react';
import { FaTimes, FaYoutube, FaUtensils, FaHourglassHalf, FaGlobeAmericas } from 'react-icons/fa';
import { FormattedMessage } from 'react-intl';
import type { Recipe } from '../types/recipe';

interface RecipeModalProps {
  recipe: Recipe;
  onClose: () => void;
}

/**
 * Modal de detalhes da receita.
 * Exibe imagem, ingredientes, instruções e link para o YouTube.
 */
const RecipeModal: React.FC<RecipeModalProps> = ({ recipe, onClose }) => {
  /**
   * Extrai ingredientes e medidas do objeto da receita.
   */
  const getIngredients = () => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}` as keyof Recipe];
      const measure = recipe[`strMeasure${i}` as keyof Recipe];

      if (ingredient && typeof ingredient === 'string' && ingredient.trim() !== '') {
        ingredients.push({
          ingredient: ingredient,
          measure: measure || '',
        });
      }
    }
    return ingredients;
  };

  const ingredients = getIngredients();

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-[100] p-4 animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-hidden relative shadow-2xl flex flex-col md:flex-row animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botão Fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-colors md:top-6 md:right-6"
        >
          <FaTimes size={20} />
        </button>

        {/* Lado Esquerdo: Imagem e Infos contextuais */}
        <div className="w-full md:w-2/5 h-64 md:h-auto relative">
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-8">
            <span className="bg-orange-600/90 backdrop-blur-sm text-white text-[10px] uppercase font-bold px-3 py-1 rounded-full w-fit mb-3">
              {recipe.strCategory}
            </span>
            <h2 className="text-3xl font-extrabold text-white mb-3 drop-shadow-md">{recipe.strMeal}</h2>
            <div className="flex items-center text-white/90 text-sm font-medium">
              <FaGlobeAmericas className="mr-2" />
              <span>{recipe.strArea}</span>
            </div>
          </div>
        </div>

        {/* Lado Direito: Conteúdo Scrollable */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
          {/* Vídeo Youtube (se disponível) */}
          {recipe.strYoutube && (
            <a
              href={recipe.strYoutube}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center bg-red-600 hover:bg-red-700 text-white rounded-2xl font-bold py-4 px-6 transition-all shadow-lg hover:shadow-red-200"
            >
              <FaYoutube size={24} className="mr-3" />
              <FormattedMessage id="modal.watchVideo" />
            </a>
          )}

          {/* Seção de Ingredientes */}
          <section>
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <FaUtensils className="text-orange-500 mr-3" />
              <FormattedMessage id="modal.ingredientsTitle" />
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ingredients.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-3.5 bg-gray-50 rounded-2xl border border-gray-100/50 hover:bg-orange-50/50 hover:border-orange-100 transition-colors">
                  <span className="font-semibold text-gray-700 text-sm">{item.ingredient}</span>
                  <span className="text-orange-600 font-bold text-xs">{item.measure}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Seção de Instruções */}
          <section>
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <FaHourglassHalf className="text-orange-500 mr-3" />
              <FormattedMessage id="modal.instructionsTitle" />
            </h3>
            <div className="text-gray-600 leading-relaxed space-y-4 whitespace-pre-wrap text-justify">
              {recipe.strInstructions}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;
