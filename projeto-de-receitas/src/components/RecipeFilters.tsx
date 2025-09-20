import React, { useState, useEffect } from 'react';
import { FaUtensils, FaSeedling, FaFilter } from 'react-icons/fa';

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
    <div className="bg-white rounded-xl max-w-4xl flex flex-col justify-center" style={{padding: "1.5rem", marginInline:"auto", marginBlock:"2rem", boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.308), 0 4px 6px -2px rgba(0, 0, 0, 0.432)'}}>
      <div style={{marginBottom: "2rem"}}>
        <h2 className="text-xl font-bold text-gray-800 flex justify-center" style={{marginBottom: "1rem"}}>
          <FaUtensils className="text-orange-600" style={{marginRight:"0.5rem", marginTop:"0.3rem"}} />
          Por Categoria
        </h2>
        <div className="flex flex-wrap" style={{gap:"0.75rem"}}>
          {categories.map((cat) => (
            <button
              key={cat.idCategory}
              onClick={() => handleCategoryClick(cat.strCategory)}
              className={`rounded-full font-medium transition-colors duration-200
                ${selectedCategory === cat.strCategory 
                  ? 'bg-orange-100 text-orange-600 shadow-sm' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              style={{
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                padding:"0.5rem 1.25rem",
                paddingInline: "1.25rem", 
                paddingBlock: "0.5rem", 
              }}
            >
              {cat.strCategory}
            </button>
          ))}
        </div>
      </div>

      <hr className="border-t border-gray-200" style={{marginBlock:"1.5rem"}}/>

      <div>
        <h2 className="text-xl font-bold text-gray-800 flex justify-center items-center" style={{marginBottom:"1rem"}}>
          <FaSeedling className="text-green-600" style={{marginRight:"0.5rem"}} />
          Por Ingrediente
        </h2>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <input
            type="text"
            placeholder="Digite um ingrediente..."
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value)}
            className="flex-1 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200"
            style={{paddingInline:"1.25rem", paddingBlock:"0.75rem"}}
          />
          <button
            onClick={handleIngredientFilter}
            className="rounded-full font-bold text-white bg-green-600 hover:bg-green-700 transition-colors duration-200"
            style={{padding: "0.75rem 1.5rem", 
                    marginLeft:"0.5rem"
                  }}
          >
            <FaFilter className="sm:hidden" />
            <span className="hidden sm:inline">Filtrar</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeFilters;