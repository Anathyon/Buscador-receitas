import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Locale = 'pt' | 'en' | 'es';

interface LanguageState {
    locale: Locale;
    setLocale: (locale: Locale) => void;
}

/**
 * Store Zustand para gerenciar o idioma da aplicação.
 * Persiste a escolha do usuário.
 */
export const useLanguageStore = create<LanguageState>()(
    persist(
        (set) => ({
            locale: 'pt',
            setLocale: (locale) => set({ locale }),
        }),
        {
            name: 'recipe-language-storage',
        }
    )
);
