import React, { useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { useIntl, FormattedMessage } from 'react-intl';
import RecipeModal from './RecipeModal';
import { translateText } from '../utils/translator';
import type { Recipe } from '../types/recipe';
import { recipeService } from '../services/recipeService';
import { useLanguageStore } from '../store/useLanguageStore';
import { RecipeCardSkeleton } from './RecipeCardSkeleton';
import { RecipeModalSkeleton } from './RecipeModalSkeleton';

interface RecipeListProps {
  recipes: Recipe[];
  loading: boolean;
}

/**
 * Componente que exibe a grade de receitas.
 */
const RecipeList: React.FC<RecipeListProps> = ({ recipes, loading }) => {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isModalLoading, setIsModalLoading] = useState(false);
  const intl = useIntl();
  const { locale } = useLanguageStore();

  /**
   * Filtra chaves duplicadas da API.
   */
  const uniqueRecipes = Array.from(new Map(recipes.map(r => [r.idMeal, r])).values());

  /**
   * Abre o modal com detalhes da receita, traduzindo se necessário.
   */
  const openModal = async (mealId: string) => {
    setIsModalLoading(true);
    try {
      const meal = await recipeService.fetchRecipeDetail(mealId);

      if (meal) {
        let finalMeal = { ...meal };

        if (locale !== 'en') {
          // Tradução paralela de campos básicos
          const [translatedCategory, translatedArea] = await Promise.all([
            translateText(meal.strCategory, locale),
            translateText(meal.strArea, locale),
          ]);
          finalMeal.strCategory = translatedCategory || meal.strCategory;
          finalMeal.strArea = translatedArea || meal.strArea;

          // Tradução de ingredientes e medidas (paralelizada)
          const translationPairs: Promise<string>[] = [];
          for (let i = 1; i <= 20; i++) {
            translationPairs.push(translateText(meal[`strIngredient${i}` as keyof Recipe] as string || '', locale));
            translationPairs.push(translateText(meal[`strMeasure${i}` as keyof Recipe] as string || '', locale));
          }
          
          const translatedValues = await Promise.all(translationPairs);
          
          for (let i = 1; i <= 20; i++) {
            finalMeal[`strIngredient${i}` as keyof Recipe] = translatedValues[(i - 1) * 2] || null;
            finalMeal[`strMeasure${i}` as keyof Recipe] = translatedValues[(i - 1) * 2 + 1] || null;
          }

          // Tradução das instruções
          if (meal.strInstructions) {
            const paragraphs = meal.strInstructions.split(/\r?\n/).filter(p => p.trim() !== '');
            const translatedParagraphs = await Promise.all(
              paragraphs.map(p => translateText(p.replace(/^\d+\.\s*/, ''), locale))
            );
            finalMeal.strInstructions = translatedParagraphs.map((p, idx) => `${idx + 1}. ${p}`).join('\n\n');
          }
        }
        setSelectedRecipe(finalMeal);
      }
    } catch (error) {
      console.error(intl.formatMessage({ id: 'recipeList.fetchError' }), error);
    } finally {
      setIsModalLoading(false);
    }
  };

  const closeModal = () => setSelectedRecipe(null);

  if (loading) {
    return (
      <div className="space-y-12">
        <div className="text-center space-y-2">
            <h2 className="text-4xl font-bold text-gray-800">
             <FormattedMessage id="recipeList.title" />
            </h2>
             <p className="text-lg text-gray-500 max-w-lg mx-auto">
            <FormattedMessage id="recipeList.subtitle" />
            </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, index) => (
            <RecipeCardSkeleton key={index} />
            ))}
        </div>
      </div>
    );
  }

  if (uniqueRecipes.length === 0) {
    return (
      <div className="text-center py-20 opacity-60">
        <h2 className="text-2xl font-bold">
          <FormattedMessage id="recipeList.noResults" />
        </h2>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <div className="text-center space-y-2">
        <h2 className="text-4xl font-bold text-gray-800">
          <FormattedMessage id="recipeList.title" />
        </h2>
        <p className="text-lg text-gray-500 max-w-lg mx-auto">
          <FormattedMessage id="recipeList.subtitle" />
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {uniqueRecipes.map(recipe => (
          <article
            key={recipe.idMeal}
            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col h-full border border-gray-100"
            onClick={() => openModal(recipe.idMeal)}
          >
            <div className="relative overflow-hidden aspect-video">
              <img
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-orange-600 px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                {recipe.strCategory}
              </span>
            </div>
            
            <div className="p-6 flex flex-col grow">
              <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
                {recipe.strMeal}
              </h3>
              
              <div className="flex items-center text-gray-400 text-sm mb-4">
                <FaMapMarkerAlt className="mr-2" />
                <span>{recipe.strArea}</span>
              </div>

              <div className="mt-auto pt-4 flex flex-wrap gap-2">
                {recipe.strTags?.split(',').slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-50 text-gray-500 text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded"
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      {isModalLoading && <RecipeModalSkeleton onClose={() => setIsModalLoading(false)} />}
      {!isModalLoading && selectedRecipe && <RecipeModal recipe={selectedRecipe} onClose={closeModal} />}
    </div>
  );
};

export default RecipeList;
