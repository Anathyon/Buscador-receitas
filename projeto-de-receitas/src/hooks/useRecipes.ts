import { useState, useEffect, useCallback } from 'react';
import type { Recipe, SearchType } from '../types/recipe';
import { recipeService } from '../services/recipeService';

/**
 * Hook customizado para gerenciar o estado e a busca de receitas.
 * Centraliza a lógica que antes estava no HomePage.
 */
export const useRecipes = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(false);

    /**
     * Função para carregar receitas.
     */
    const loadRecipes = useCallback(async (type: SearchType, query?: string) => {
        setLoading(true);
        try {
            const fetchedRecipes = await recipeService.fetchRecipes(type, query);
            setRecipes(fetchedRecipes);
        } catch (error) {
            console.error("Erro no useRecipes:", error);
            setRecipes([]);
        } finally {
            setLoading(false);
        }
    }, []);

    // Carrega receitas aleatórias ao montar o componente
    useEffect(() => {
        loadRecipes('random');
    }, [loadRecipes]);

    return {
        recipes,
        loading,
        loadRecipes
    };
};
