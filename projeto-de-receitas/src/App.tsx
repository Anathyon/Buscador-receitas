import './index.css'
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { IntlProvider } from 'react-intl'
import Header from './components/Header'
import HomePage from './components/HomePage'
import FavoritesPage from './components/FavoritesPage'
import { useLanguageStore } from './store/useLanguageStore'

import ptMessages from './lang/pt.json'
import enMessages from './lang/en.json'
import esMessages from './lang/es.json'

const messages = {
  pt: ptMessages,
  en: enMessages,
  es: esMessages,
};

const App: React.FC = () => {
  const { locale } = useLanguageStore();

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="grow pt-15">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
        </main>
      </div>
    </IntlProvider>
  )
}

export default App

