import React, { useState, useEffect } from 'react';
import { FaUtensils, FaSeedling, FaFilter } from 'react-icons/fa';
import { useIntl, FormattedMessage } from 'react-intl';

// Definimos o tipo para os dados da API
interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

interface RecipeFiltersProps {
  onFilter: (type: 'category' | 'ingredient', value: string) => void;
}

const RecipeFilters: React.FC<RecipeFiltersProps> = ({ onFilter }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [ingredient, setIngredient] = useState('');
  const intl = useIntl();

  // 1. Fetch das categorias da API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
        const data = await response.json();
        setCategories(data.categories);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    };
    fetchCategories();
  }, []);

  // 2. Lógica de seleção e filtragem
  const handleCategoryClick = (category: string) => {
    const newCategory = category === selectedCategory ? null : category;
    setSelectedCategory(newCategory);
    // Chama a função de filtro do componente pai
    if (newCategory) {
      onFilter('category', newCategory);
    } else {
      // Opcional: Se a categoria for deselecionada, você pode limpar os resultados ou mostrar as sugestões iniciais
      onFilter('category', '');
    }
  };

  const handleIngredientFilter = () => {
    if (ingredient.trim() !== '') {
      onFilter('ingredient', ingredient.trim());
    }
  };

  return (
    <div className="bg-white rounded-xl max-w-4xl flex flex-col justify-center p-6 mx-auto my-8 shadow-xl">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 flex justify-center items-center mb-4">
          <FaUtensils className="text-orange-600 mr-2" />
          <FormattedMessage id="filters.byCategory" />
        </h2>
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat.idCategory}
              onClick={() => handleCategoryClick(cat.strCategory)}
              className={`px-5 py-2 rounded-full font-medium transition-colors duration-200 shadow-sm
                ${selectedCategory === cat.strCategory 
                  ? 'bg-orange-100 text-orange-600' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              {cat.strCategory}
            </button>
          ))}
        </div>
      </div>

      <hr className="border-t border-gray-200 my-6"/>

      <div>
        <h2 className="text-xl font-bold text-gray-800 flex justify-center items-center mb-4">
          <FaSeedling className="text-green-600 mr-2" />
          <FormattedMessage id="filters.byIngredient" />
        </h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder={intl.formatMessage({ id: 'filters.ingredientPlaceholder' })}
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value)}
            className="flex-1 px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200"
          />
          <button
            onClick={handleIngredientFilter}
            className="px-6 py-3 rounded-full font-bold text-white bg-green-600 hover:bg-green-700 transition-colors duration-200 flex items-center justify-center"
          >
            <FaFilter className="sm:hidden" />
            <span className="hidden sm:inline"><FormattedMessage id="filters.filterButton" /></span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeFilters;