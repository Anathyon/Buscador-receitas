import React, { useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { useIntl, FormattedMessage } from 'react-intl';
import RecipeModal from './RecipeModal';
import { useLanguage } from '../context/useLanguage';
import { translateText } from '../utils/translator';

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
  const intl = useIntl();
  const { locale } = useLanguage();

  const openModal = async (mealId: string) => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
      const data = await response.json();
      
      if (data.meals && data.meals.length > 0) {
        let meal: Recipe = data.meals[0];

        if (locale !== 'en') {
          const translatedMeal = { ...meal };

          // 1. Traduzir campos simples (exceto o nome da receita)
          const [translatedCategory, translatedArea] = await Promise.all([
            translateText(meal.strCategory, locale),
            translateText(meal.strArea, locale),
          ]);
          translatedMeal.strCategory = translatedCategory;
          translatedMeal.strArea = translatedArea;

          // 2. Traduzir ingredientes e medidas
          const ingredientPromises = [];
          for (let i = 1; i <= 20; i++) {
            ingredientPromises.push(translateText(meal[`strIngredient${i}`], locale));
            ingredientPromises.push(translateText(meal[`strMeasure${i}`], locale));
          }
          const translatedIngredients = await Promise.all(ingredientPromises);
          let ingIndex = 0;
          for (let i = 1; i <= 20; i++) {
            translatedMeal[`strIngredient${i}`] = translatedIngredients[ingIndex++];
            translatedMeal[`strMeasure${i}`] = translatedIngredients[ingIndex++];
          }

          // 3. Traduzir instruções parágrafo por parágrafo (COM CORREÇÃO)
          if (meal.strInstructions) {
            // Divide as instruções em parágrafos, usando uma expressão regular para \n ou \r\n
            const paragraphs = meal.strInstructions.split(/\r?\n/).filter(p => p.trim() !== '');
            
            const instructionPromises = paragraphs.map(p => {
              // Remove a numeração (ex: "1. ") antes de traduzir para evitar bugs
              const textOnly = p.replace(/^\d+\.\s*/, '');
              return translateText(textOnly, locale);
            });

            const translatedParagraphs = await Promise.all(instructionPromises);

            // Remonta as instruções, adicionando a numeração de volta
            translatedMeal.strInstructions = translatedParagraphs.map((p, index) => {
              return `${index + 1}. ${p}`;
            }).join('\n\n');
          }
          
          meal = translatedMeal;
        }
        setSelectedRecipe(meal);
      }
    } catch (error) {
      console.error(intl.formatMessage({ id: 'recipeList.fetchError' }), error);
    }
  };

  const closeModal = () => {
    setSelectedRecipe(null);
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800">
          <FormattedMessage id="recipeList.loading" />
        </h2>
      </div>
    );
  }

  if (recipes.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800">
          <FormattedMessage id="recipeList.noResults" />
        </h2>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">
          <FormattedMessage id="recipeList.title" />
        </h2>
        <p className="text-gray-600 mt-2">
          <FormattedMessage id="recipeList.subtitle" />
        </p>
      </div>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {recipes.map(recipe => (
          <div
            key={recipe.idMeal}
            className="bg-white rounded-xl overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-200 shadow-md"
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
                    className="bg-amber-100 text-amber-700 text-xs font-semibold px-3 py-1 rounded-full"
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