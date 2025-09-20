import React, { useState } from 'react';
import type { ReactNode } from 'react';
import { IntlProvider } from 'react-intl';

import ptMessages from '../lang/pt.json';
import enMessages from '../lang/en.json';
import esMessages from '../lang/es.json';
import { LanguageContext, type Locale } from './LanguageContext';

type Messages = typeof ptMessages;

const messages: Record<Locale, Messages> = {
  pt: ptMessages,
  en: enMessages,
  es: esMessages,
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState<Locale>('pt');

  return (
    <LanguageContext.Provider value={{ locale, setLocale }}>
      <IntlProvider locale={locale} messages={messages[locale]}>
        {children}
      </IntlProvider>
    </LanguageContext.Provider>
  );
};