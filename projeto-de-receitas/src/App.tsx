import './index.css'
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import HomePage from './components/HomePage'
import { LanguageProvider } from './context/LanguageProvider'

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-20" style={{ paddingTop: "2rem" }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </main>
      </div>
    </LanguageProvider>
  )
}

export default App

