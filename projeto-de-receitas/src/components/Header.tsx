import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ReactCountryFlag from 'react-country-flag';
import { FaBars, FaHome, FaSearch, FaTimes, FaGlobeAmericas } from 'react-icons/fa';

const Header: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLanguageSelectorOpen, setIsLanguageSelectorOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('BR');

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleLanguageSelector = () => setIsLanguageSelectorOpen(!isLanguageSelectorOpen);
  
  const handleLanguageChange = (lang: string) => {
    setCurrentLanguage(lang);
    setIsLanguageSelectorOpen(false);
    console.log(`Idioma alterado para: ${lang}`);
  };

  return (
    <header className="bg-[#aa550f] shadow-sm w-auto flex justify-between items-center relative z-50 fixed" style={{padding:"1.25rem 2rem", width: "100%"}}>
      <Link 
        to="/" 
        className="flex items-center space-x-2 transform hover:scale-105 transition-transform duration-200"
      >
        <img 
          src="/png-icon/cook-book.png" 
          alt="RecipeApp Logo" 
          className="h-9" 
        />
        <span className="text-2xl font-bold text-white">RecipeApp</span>
      </Link>

      <div className="hidden md:flex items-center space-x-12 w-28 relative right-44">
      <nav className="flex items-center space-x-6 w-36 relative" style={{gap:"6%", marginRight:"50%"}}>
          <Link
            to="/"
            className="flex items-center px-6 py-2 rounded-full font-semibold transition-colors duration-200"
            style={{
              backgroundColor: '#ffedd5',
              color: '#d97706', 
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
              padding: "8%"
            }}
          >
            <FaHome className="mr-2" />
            Início
          </Link>
          <Link 
            style={{padding: "8%"}}
            to="/buscar" 
            className="flex items-center px-6 py-2 rounded-full font-semibold text-gray-700 hover:bg-gray-100 transition-colors duration-200"
          >
            <FaSearch className="mr-2" />
            Buscar
          </Link>
        </nav>
        
        <div className="relative" style={{}}>
          <button
            onClick={toggleLanguageSelector}
            className="flex w-24 items-center justify-around space-x-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
            style={{padding: '8%'}}
          >
            <FaGlobeAmericas className="text-gray-600" style={{ width: '1.5em', height: '1.5em' }} />
            <ReactCountryFlag countryCode={currentLanguage} svg style={{ width: '2em', height: '2em' }} />
          </button>

          {isLanguageSelectorOpen && (
            <div 
              className="absolute top-12 right-0 w-40 bg-white border border-gray-200 rounded-lg overflow-hidden" 
              style={{
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
              }}
            >
              <button
                onClick={() => handleLanguageChange('BR')}
                className={`flex items-center w-full text-left p-3 transition-colors duration-200`}
                style={{
                  backgroundColor: currentLanguage === 'BR' ? '#ffedd5' : 'white',
                  color: currentLanguage === 'BR' ? '#d97706' : '#4b5563',
                  fontWeight: currentLanguage === 'BR' ? 'bold' : 'normal',
                }}
              >
                <ReactCountryFlag countryCode="BR" svg style={{ width: '1.5em', height: '1em' }} className="mr-2" />
                <span>Português</span>
              </button>
              <button
                onClick={() => handleLanguageChange('US')}
                className={`flex items-center w-full text-left p-3 transition-colors duration-200`}
                style={{
                  backgroundColor: currentLanguage === 'US' ? '#ffedd5' : 'white',
                  color: currentLanguage === 'US' ? '#d97706' : '#4b5563',
                  fontWeight: currentLanguage === 'US' ? 'bold' : 'normal',
                }}
              >
                <ReactCountryFlag countryCode="US" svg style={{ width: '1.5em', height: '1em' }} className="mr-2" />
                <span>English</span>
              </button>
              <button
                onClick={() => handleLanguageChange('ES')}
                className={`flex items-center w-full text-left p-3 transition-colors duration-200`}
                style={{
                  backgroundColor: currentLanguage === 'ES' ? '#ffedd5' : 'white',
                  color: currentLanguage === 'ES' ? '#d97706' : '#4b5563',
                  fontWeight: currentLanguage === 'ES' ? 'bold' : 'normal',
                }}
              >
                <ReactCountryFlag countryCode="ES" svg style={{ width: '1.5em', height: '1em' }} className="mr-2" />
                <span>Español</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Ícone de Menu Mobile */}
      <button onClick={toggleSidebar} className="md:hidden p-2 text-gray-600 focus:outline-none">
        <FaBars size={24} />
      </button>

      {/* Sidebar Mobile */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:hidden z-40`}
      >
        <div className="flex justify-between items-center p-6 bg-gray-50 border-b border-gray-100">
          <Link to="/" onClick={toggleSidebar} className="flex items-center space-x-2">
            <img src="/path/to/your/chef-hat-logo.svg" alt="RecipeApp" className="h-8" />
            <span className="text-xl font-bold text-orange-600">RecipeApp</span>
          </Link>
          <button onClick={toggleSidebar} className="text-gray-600 hover:text-orange-600 transition-colors duration-200">
            <FaTimes size={24} />
          </button>
        </div>
        <nav className="flex flex-col p-4 space-y-2">
          <Link to="/" onClick={toggleSidebar} 
            className="flex items-center px-4 py-3 rounded-lg font-semibold text-gray-700 hover:bg-orange-100 transition-colors duration-200"
          >
            <FaHome className="mr-3 text-gray-500" />
            <span>Início</span>
          </Link>
          <Link to="/buscar" onClick={toggleSidebar} 
            className="flex items-center px-4 py-3 rounded-lg font-semibold text-gray-700 hover:bg-orange-100 transition-colors duration-200"
          >
            <FaSearch className="mr-3 text-gray-500" />
            <span>Buscar</span>
          </Link>
          
          <hr className="my-2 border-gray-200" />

          {/* Seletor de Idioma dentro da Sidebar */}
          <div className="relative mt-4">
            <button
              onClick={toggleLanguageSelector}
              className="flex items-center justify-between w-full px-4 py-3 rounded-lg font-semibold text-gray-700 hover:bg-gray-100 transition-colors duration-200"
            >
              <div className="flex items-center">
                <FaGlobeAmericas className="mr-3 text-gray-500" />
                <span>Idioma</span>
              </div>
              <ReactCountryFlag countryCode={currentLanguage} svg style={{ width: '2em', height: '1.5em' }} />
            </button>
            {isLanguageSelectorOpen && (
              <div className="mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                <button
                  onClick={() => handleLanguageChange('BR')}
                  className={`flex items-center w-full text-left p-3 ${currentLanguage === 'BR' ? 'bg-orange-100 text-orange-600 font-semibold' : 'hover:bg-gray-50 text-gray-800' } transition-colors duration-200`}
                >
                  <ReactCountryFlag countryCode="BR" svg className="mr-2" style={{ width: '1.5em', height: '1em' }} />
                  <span>Português</span>
                </button>
                <button
                  onClick={() => handleLanguageChange('US')}
                  className={`flex items-center w-full text-left p-3 ${currentLanguage === 'US' ? 'bg-orange-100 text-orange-600 font-semibold' : 'hover:bg-gray-50 text-gray-800' } transition-colors duration-200`}
                >
                  <ReactCountryFlag countryCode="US" svg className="mr-2" style={{ width: '1.5em', height: '1em' }} />
                  <span>English</span>
                </button>
                <button
                  onClick={() => handleLanguageChange('ES')}
                  className={`flex items-center w-full text-left p-3 ${currentLanguage === 'ES' ? 'bg-orange-100 text-orange-600 font-semibold' : 'hover:bg-gray-50 text-gray-800' } transition-colors duration-200`}
                >
                  <ReactCountryFlag countryCode="ES" svg className="mr-2" style={{ width: '1.5em', height: '1em' }} />
                  <span>Español</span>
                </button>
              </div>
            )}
          </div>
        </nav>
      </div>
      {/* Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" onClick={toggleSidebar} />
      )}
    </header>
  );
};

export default Header;