/**
 * Representa uma receita da API TheMealDB.
 * A interface usa um index signature para lidar com os campos dinâmicos de ingredientes e medidas.
 */
export interface Recipe {
  idMeal: string;
  strMeal: string;
  strDrinkAlternative: string | null;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string | null;
  strYoutube: string;
  [key: string]: string | null;
}

/**
 * Representa uma categoria de receita.
 */
export interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

/**
 * Representa a resposta da API para buscas de receitas.
 */
export interface RecipeResponse {
  meals: Recipe[] | null;
}

/**
 * Representa a resposta da API para categorias.
 */
export interface CategoryResponse {
  categories: Category[];
}

/**
 * Tipos de busca suportados pela API.
 */
export type SearchType = 'search' | 'category' | 'ingredient' | 'random';
