import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ReactCountryFlag from 'react-country-flag';
import { FaBars, FaHome, FaSearch, FaTimes, FaGlobeAmericas } from 'react-icons/fa';
import { FormattedMessage } from 'react-intl';
import { useLanguage } from '../context/useLanguage';

const Header: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLanguageSelectorOpen, setIsLanguageSelectorOpen] = useState(false);
  const { locale, setLocale } = useLanguage();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleLanguageSelector = () => setIsLanguageSelectorOpen(!isLanguageSelectorOpen);

  const handleLanguageChange = (lang: 'pt' | 'en' | 'es') => {
    setLocale(lang);
    setIsLanguageSelectorOpen(false);
    setIsSidebarOpen(false); // Fecha a sidebar ao trocar de idioma no mobile
  };

  const getCountryCode = (lang: 'pt' | 'en' | 'es') => {
    const map = { pt: 'BR', en: 'US', es: 'ES' };
    return map[lang];
  };

  const languageOptions: Array<{ code: 'pt' | 'en' | 'es'; labelId: string }> = [
    { code: 'pt', labelId: 'header.portuguese' },
    { code: 'en', labelId: 'header.english' },
    { code: 'es', labelId: 'header.spanish' },
  ];

  return (
    <header className="bg-[#aa550f] shadow-md w-full flex justify-between items-center px-4 sm:px-8 py-3 fixed top-0 z-50">
      <Link to="/" className="flex items-center space-x-2 transform hover:scale-105 transition-transform duration-200">
        <img src="/png-icon/cook-book.png" alt="RecipeApp Logo" className="h-9" />
        <span className="text-2xl font-bold text-white"><FormattedMessage id="header.appName" /></span>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-8">
        <nav className="flex items-center space-x-6">
          <Link to="/" className="flex items-center px-6 py-2 rounded-full font-semibold transition-colors duration-200 bg-[#ffedd5] text-[#d97706] hover:bg-[#d97706] hover:text-[#ffedd5] shadow-sm">
            <FaHome className="mr-2" />
            <FormattedMessage id="header.home" />
          </Link>
          <Link to="/buscar" className="flex items-center px-4 py-2 rounded-full font-semibold text-white border-2 border-white hover:bg-amber-900 transition-colors duration-200">
            <FaSearch className="mr-2" />
            <FormattedMessage id="header.search" />
          </Link>
        </nav>

        <div className="relative">
          <button onClick={toggleLanguageSelector} className="flex items-center justify-center space-x-2 w-24 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300">
            <FaGlobeAmericas className="text-gray-600" />
            <ReactCountryFlag countryCode={getCountryCode(locale)} svg style={{ width: '1.5em', height: '1.5em' }} />
          </button>
          {isLanguageSelectorOpen && (
            <div className="absolute top-14 right-0 w-40 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden p-2">
              {languageOptions.map(({ code, labelId }) => (
                <button key={code} onClick={() => handleLanguageChange(code)} className={`flex items-center w-full text-left p-2 rounded-md transition-colors duration-200 ${locale === code ? 'bg-orange-100 text-orange-600 font-bold' : 'text-gray-700 hover:bg-gray-100'}`}>
                  <ReactCountryFlag countryCode={getCountryCode(code)} svg className="mr-2" style={{ width: '1.5em', height: '1em' }} />
                  <span><FormattedMessage id={labelId} /></span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Icon */}
      <button onClick={toggleSidebar} className="md:hidden p-2 text-white focus:outline-none">
        <FaBars size={24} />
      </button>

      {/* Mobile Sidebar */}
      <div className={`fixed top-0 left-0 w-64 h-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden z-40`}>
        <div className="flex justify-between items-center p-4 bg-gray-50 border-b">
          <span className="text-xl font-bold text-orange-600"><FormattedMessage id="header.appName" /></span>
          <button onClick={toggleSidebar} className="text-gray-600 hover:text-orange-600">
            <FaTimes size={24} />
          </button>
        </div>
        <nav className="flex flex-col p-4 space-y-2">
          <Link to="/" onClick={toggleSidebar} className="flex items-center p-3 rounded-lg font-semibold text-gray-700 hover:bg-orange-100">
            <FaHome className="mr-3 text-gray-500" />
            <FormattedMessage id="header.home" />
          </Link>
          <Link to="/buscar" onClick={toggleSidebar} className="flex items-center p-3 rounded-lg font-semibold text-gray-700 hover:bg-orange-100">
            <FaSearch className="mr-3 text-gray-500" />
            <FormattedMessage id="header.search" />
          </Link>
          <hr className="my-2" />
          <div className="p-3">
            <h3 className="font-semibold text-gray-700 mb-2"><FormattedMessage id="header.language" /></h3>
            <div className="space-y-2">
              {languageOptions.map(({ code, labelId }) => (
                <button key={code} onClick={() => handleLanguageChange(code)} className={`flex items-center w-full text-left p-2 rounded-md transition-colors duration-200 ${locale === code ? 'bg-orange-100 text-orange-600 font-bold' : 'text-gray-700 hover:bg-gray-100'}`}>
                  <ReactCountryFlag countryCode={getCountryCode(code)} svg className="mr-2" style={{ width: '1.5em', height: '1em' }} />
                  <span><FormattedMessage id={labelId} /></span>
                </button>
              ))}
            </div>
          </div>
        </nav>
      </div>
      {isSidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" onClick={toggleSidebar} />}
    </header>
  );
};

export default Header;