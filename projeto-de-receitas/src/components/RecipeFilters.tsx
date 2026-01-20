import React, { useState, useEffect } from 'react';
import { FaUtensils, FaLeaf, FaSearch } from 'react-icons/fa';
import { useIntl, FormattedMessage } from 'react-intl';
import { recipeService } from '../services/recipeService';
import type { Category } from '../types/recipe';

interface RecipeFiltersProps {
  onFilter: (type: 'category' | 'ingredient', value: string) => void;
}

/**
 * Componente de filtros.
 * Permite filtrar por categorias pré-carregadas ou pesquisar por ingrediente.
 */
const RecipeFilters: React.FC<RecipeFiltersProps> = ({ onFilter }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [ingredient, setIngredient] = useState('');
  const intl = useIntl();

  useEffect(() => {
    const loadCategories = async () => {
      const data = await recipeService.fetchCategories();
      setCategories(data);
    };
    loadCategories();
  }, []);

  const handleCategoryClick = (category: string) => {
    const newCategory = category === selectedCategory ? null : category;
    setSelectedCategory(newCategory);
    onFilter('category', newCategory || '');
  };

  const handleIngredientFilter = () => {
    if (ingredient.trim() !== '') {
      onFilter('ingredient', ingredient.trim());
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20 space-y-8">
      {/* Categorias */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
          <FaUtensils className="text-orange-500" />
          <FormattedMessage id="filters.byCategory" />
        </h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.idCategory}
              onClick={() => handleCategoryClick(cat.strCategory)}
              className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 shadow-sm
                ${selectedCategory === cat.strCategory
                  ? 'bg-orange-600 text-white shadow-orange-200'
                  : 'bg-white text-gray-600 hover:bg-orange-50 border border-gray-100'}`}
            >
              {cat.strCategory}
            </button>
          ))}
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      {/* Ingredientes */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
          <FaLeaf className="text-green-500" />
          <FormattedMessage id="filters.byIngredient" />
        </h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder={intl.formatMessage({ id: 'filters.ingredientPlaceholder' })}
              value={ingredient}
              onChange={(e) => setIngredient(e.target.value)}
              className="w-full bg-gray-50 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-green-500/30 transition-all border border-transparent focus:border-green-500/50"
            />
          </div>
          <button
            onClick={handleIngredientFilter}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-2xl transition-all shadow-lg hover:shadow-green-100 flex items-center justify-center gap-2"
          >
            <FaSearch size={18} />
            <FormattedMessage id="filters.filterButton" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeFilters;
