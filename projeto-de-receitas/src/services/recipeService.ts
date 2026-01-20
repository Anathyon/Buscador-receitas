import type { Recipe, RecipeResponse, CategoryResponse, SearchType } from '../types/recipe';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

/**
 * Serviço centralizado para chamadas de API do TheMealDB.
 * Isolando a lógica de fetch dos componentes para facilitar manutenção e testes.
 */
export const recipeService = {
    /**
     * Busca receitas com base no tipo e valor fornecidos.
     */
    async fetchRecipes(type: SearchType, query?: string): Promise<Recipe[]> {
        if (type === 'random') {
            // Busca 10 receitas aleatórias em paralelo
            const randomPromises = Array.from({ length: 10 }, () =>
                fetch(`${BASE_URL}/random.php`).then(res => res.json())
            );

            try {
                const results: RecipeResponse[] = await Promise.all(randomPromises);
                return results.map(result => result.meals ? result.meals[0] : null).filter((m): m is Recipe => m !== null);
            } catch (error) {
                console.error("Erro ao buscar receitas aleatórias:", error);
                return [];
            }
        }

        let url = '';
        switch (type) {
            case 'search':
                url = `${BASE_URL}/search.php?s=${query || ''}`;
                break;
            case 'category':
                url = `${BASE_URL}/filter.php?c=${query || ''}`;
                break;
            case 'ingredient':
                url = `${BASE_URL}/filter.php?i=${query || ''}`;
                break;
            default:
                return [];
        }

        try {
            const response = await fetch(url);
            const data: RecipeResponse = await response.json();
            return data.meals || [];
        } catch (error) {
            console.error(`Erro ao buscar receitas (${type}):`, error);
            return [];
        }
    },

    /**
     * Busca detalhes de uma receita específica pelo ID.
     */
    async fetchRecipeDetail(mealId: string): Promise<Recipe | null> {
        try {
            const response = await fetch(`${BASE_URL}/lookup.php?i=${mealId}`);
            const data: RecipeResponse = await response.json();
            return data.meals ? data.meals[0] : null;
        } catch (error) {
            console.error("Erro ao buscar detalhes da receita:", error);
            return null;
        }
    },

    /**
     * Busca todas as categorias disponíveis.
     */
    async fetchCategories(): Promise<any[]> {
        try {
            const response = await fetch(`${BASE_URL}/categories.php`);
            const data: CategoryResponse = await response.json();
            return data.categories;
        } catch (error) {
            console.error("Erro ao buscar categorias:", error);
            return [];
        }
    }
};
