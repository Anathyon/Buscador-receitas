import { recipeService } from '../services/recipeService';

// Mock do global fetch
global.fetch = jest.fn();

describe('recipeService', () => {
    beforeEach(() => {
        (fetch as jest.Mock).mockClear();
    });

    it('deve buscar receitas por nome corretamente', async () => {
        const mockRecipes = { meals: [{ idMeal: '123', strMeal: 'Pizza' }] };
        (fetch as jest.Mock).mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockRecipes),
        });

        const result = await recipeService.fetchRecipes('search', 'Pizza');

        expect(fetch).toHaveBeenCalledWith(expect.stringContaining('search.php?s=Pizza'));
        expect(result).toHaveLength(1);
        expect(result[0].strMeal).toBe('Pizza');
    });

    it('deve retornar array vazio se a API falhar', async () => {
        (fetch as jest.Mock).mockRejectedValue(new Error('API Error'));

        const result = await recipeService.fetchRecipes('search', 'Pizza');

        expect(result).toEqual([]);
    });

    it('deve buscar detalhes da receita por ID', async () => {
        const mockMeal = { meals: [{ idMeal: '123', strMeal: 'Pizza' }] };
        (fetch as jest.Mock).mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockMeal),
        });

        const result = await recipeService.fetchRecipeDetail('123');

        expect(fetch).toHaveBeenCalledWith(expect.stringContaining('lookup.php?i=123'));
        expect(result?.strMeal).toBe('Pizza');
    });
});
