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
    <div className="relative left-[2.6rem]" style={{paddingBlock:"3rem"}}>
      <div className="text-center" style={{marginBottom:"2rem"}}>
        <h2 className="text-3xl font-bold text-gray-800">
          <FormattedMessage id="recipeList.title" />
        </h2>
        <p className="text-gray-600" style={{marginTop:"0.5rem"}}>
          <FormattedMessage id="recipeList.subtitle" />
        </p>
      </div>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        style={{gap:"1.5rem", paddingInline:"1rem"}}
      >
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
              <div className="absolute top-2 left-2 bg-orange-100 text-orange-600 rounded-full text-xs font-semibold"
                style={{paddingInline:"0.75rem", paddingBlock:"0.25rem"}}
              >
                {recipe.strCategory}
              </div>
            </div>
            <div style={{padding:"1rem"}}>
              <h3 className="text-lg font-bold text-gray-800" style={{marginBottom:"0.5rem"}}>{recipe.strMeal}</h3>
              <div className="flex items-center text-gray-500 text-sm" style={{marginBottom:"0.5rem"}}>
                <FaMapMarkerAlt className="text-gray-400" style={{marginRight:"0.5rem"}} />
                <span>{recipe.strArea}</span>
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
        ))}
      </div>

      {selectedRecipe && <RecipeModal recipe={selectedRecipe} onClose={closeModal} />}
    </div>
  );
};

export default RecipeList;