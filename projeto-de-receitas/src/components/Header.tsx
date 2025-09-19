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
      <nav className="flex items-center space-x-6 w-36 relative right-28" style={{gap:"6%"}}>
          <Link
            to="/"
            className="flex items-center rounded-full font-semibold transition-colors duration-200 bg-[#ffedd5] text-[#d97706] hover:bg-[#d97706] hover:text-[#ffedd5]"
            style={{ 
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
              padding: "0.5rem 1.5rem",
            }}
          >
            <FaHome style={{marginRight: "0.5rem"}} />
            Início
          </Link>
          <Link 
            style={{padding: "0.5rem 1rem", border: "2px solid white"}}
            to="/buscar" 
            className="flex items-center rounded-full font-semibold text-white hover:bg-amber-900 transition-colors duration-200"
          > 
            <FaSearch className="text-white"/>
              <span style={{marginLeft: "0.5rem"}}>Buscar</span>
          </Link>
        </nav>
        
        <div className="relative" style={{}}>
          <button
            onClick={toggleLanguageSelector}
            className="flex w-20 items-center justify-center space-x-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
            style={{padding: '0.5rem 1rem'}}
          >
            <FaGlobeAmericas className="text-gray-600" style={{ width: '1.5em', height: '1.5em', marginRight: '0.5rem' }} />
            <ReactCountryFlag countryCode={currentLanguage} svg style={{ width: '1.5em', height: '1.5em' }} />
          </button>

          {isLanguageSelectorOpen && (
            <div 
              className="absolute top-12 right-0 w-40 bg-white border border-gray-200 rounded-lg overflow-hidden" 
              style={{
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
                padding:"8%"
              }}
            >
              <button
                onClick={() => handleLanguageChange('BR')}
                className={`flex items-center w-full text-left transition-colors duration-200`}
                style={{
                  backgroundColor: currentLanguage === 'BR' ? '#ffedd5' : 'white',
                  color: currentLanguage === 'BR' ? '#d97706' : '#4b5563',
                  fontWeight: currentLanguage === 'BR' ? 'bold' : 'normal',
                  padding: "0.5rem"
                }}
              >
                <ReactCountryFlag countryCode="BR" svg style={{ width: '1.5em', height: '1em', marginRight:"0.5rem" }} />
                <span>Português</span>
              </button>
              <button
                onClick={() => handleLanguageChange('US')}
                className={`flex items-center w-full text-left transition-colors duration-200`}
                style={{
                  backgroundColor: currentLanguage === 'US' ? '#ffedd5' : 'white',
                  color: currentLanguage === 'US' ? '#d97706' : '#4b5563',
                  fontWeight: currentLanguage === 'US' ? 'bold' : 'normal',
                  padding: "0.5rem"
                }}
              >
                <ReactCountryFlag countryCode="US" svg style={{ width: '1.5em', height: '1em', marginRight:"0.5rem" }} />
                <span>English</span>
              </button>
              <button
                onClick={() => handleLanguageChange('ES')}
                className={`flex items-center w-full text-left transition-colors duration-200`}
                style={{
                  backgroundColor: currentLanguage === 'ES' ? '#ffedd5' : 'white',
                  color: currentLanguage === 'ES' ? '#d97706' : '#4b5563',
                  fontWeight: currentLanguage === 'ES' ? 'bold' : 'normal',
                  padding: "0.5rem"
                }}
              >
                <ReactCountryFlag countryCode="ES" svg style={{ width: '1.5em', height: '1em', marginRight:"0.5rem" }} />
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
        <div className="flex justify-between items-center bg-gray-50 border-b border-gray-100" style={{padding:"1.5rem"}}>
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
            className="flex items-center rounded-lg font-semibold text-gray-700 hover:bg-orange-100 transition-colors duration-200"
            style={{paddingInline:"1rem", paddingBlock:"0.75rem"}}
          >
            <FaHome className="text-gray-500" style={{marginRight: "0.75rem"}} />
            <span>Início</span>
          </Link>
          <Link to="/buscar" onClick={toggleSidebar} 
            className="flex items-center rounded-lg font-semibold text-gray-700 hover:bg-orange-100 transition-colors duration-200"
            style={{paddingInline:"1rem", paddingBlock:"0.75rem"}}
          >
            <FaSearch className="text-gray-500" style={{marginRight: "0.75rem"}} />
            <span>Buscar</span>
          </Link>
          
          <hr className="border-gray-200" style={{marginBlock:"0.5rem"}}/>

          {/* Seletor de Idioma dentro da Sidebar */}
          <div className="relative" style={{marginTop:"1rem"}}>
            <button
              onClick={toggleLanguageSelector}
              className="flex items-center justify-between w-full rounded-lg font-semibold text-gray-700 hover:bg-gray-100 transition-colors duration-200"
              style={{paddingInline:"1rem", paddingBlock:"0.75rem"}}
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
                  <ReactCountryFlag countryCode="BR" svg style={{ width: '1.5em', height: '1em', marginRight: "0.5rem" }} />
                  <span>Português</span>
                </button>
                <button
                  onClick={() => handleLanguageChange('US')}
                  className={`flex items-center w-full text-left p-3 ${currentLanguage === 'US' ? 'bg-orange-100 text-orange-600 font-semibold' : 'hover:bg-gray-50 text-gray-800' } transition-colors duration-200`}
                >
                  <ReactCountryFlag countryCode="US" svg style={{ width: '1.5em', height: '1em', marginRight: "0.5rem" }} />
                  <span>English</span>
                </button>
                <button
                  onClick={() => handleLanguageChange('ES')}
                  className={`flex items-center w-full text-left p-3 ${currentLanguage === 'ES' ? 'bg-orange-100 text-orange-600 font-semibold' : 'hover:bg-gray-50 text-gray-800' } transition-colors duration-200`}
                >
                  <ReactCountryFlag countryCode="ES" svg style={{ width: '1.5em', height: '1em', marginRight: "0.5rem" }} />
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