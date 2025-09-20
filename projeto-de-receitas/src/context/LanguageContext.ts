import { createContext } from 'react';

export type Locale = 'pt' | 'en' | 'es';

export interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);