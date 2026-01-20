import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Recipe } from '../types/recipe';

interface FavoriteState {
    favorites: Recipe[];
    addFavorite: (recipe: Recipe) => void;
    removeFavorite: (mealId: string) => void;
    isFavorite: (mealId: string) => boolean;
}

/**
 * Store Zustand para gerenciar os favoritos.
 * Utiliza o middleware 'persist' para salvar automaticamente no localStorage.
 */
export const useFavoriteStore = create<FavoriteState>()(
    persist(
        (set, get) => ({
            favorites: [],

            addFavorite: (recipe) => set((state) => ({
                favorites: state.favorites.find(r => r.idMeal === recipe.idMeal)
                    ? state.favorites
                    : [...state.favorites, recipe]
            })),

            removeFavorite: (mealId) => set((state) => ({
                favorites: state.favorites.filter(r => r.idMeal !== mealId)
            })),

            isFavorite: (mealId) => {
                return get().favorites.some(r => r.idMeal === mealId);
            },
        }),
        {
            name: 'recipe-favorites-storage', // Nome da chave no localStorage
        }
    )
);
