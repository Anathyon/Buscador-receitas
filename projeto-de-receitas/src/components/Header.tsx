import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ReactCountryFlag from 'react-country-flag';
import { FaBars, FaTimes, FaGlobeAmericas } from 'react-icons/fa';
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
    setIsSidebarOpen(false);
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
    <header className="bg-orange-600/80 backdrop-blur-lg shadow-lg w-full flex justify-between items-center fixed top-0 z-50 transition-all duration-300 px-6 py-4 border-b border-white/10">
      <Link to="/" className="flex items-center transform hover:scale-105 transition-transform duration-200 gap-3">
        <img src="/icon/cook-book.png" alt="RecipeApp Logo" className="h-10 filter brightness-0 invert" />
        <span className="text-2xl font-black text-white tracking-tight uppercase"><FormattedMessage id="header.appName" /></span>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-8">
        <div className="relative">
          <button
            onClick={toggleLanguageSelector}
            className="flex items-center justify-center space-x-2 w-28 rounded-2xl bg-white/10 hover:bg-white/20 text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/30 border border-white/10 px-4 py-2"
          >
            <FaGlobeAmericas className="text-white/80" />
            <ReactCountryFlag countryCode={getCountryCode(locale)} svg className="rounded shadow-sm" style={{ width: '1.2em', height: '1.2em' }} />
          </button>
          
          {isLanguageSelectorOpen && (
            <div className="absolute top-14 right-0 w-48 bg-white/95 backdrop-blur-xl border border-gray-100 rounded-2xl shadow-2xl overflow-hidden p-2 animate-in fade-in zoom-in-95 duration-200">
              {languageOptions.map(({ code, labelId }) => (
                <button
                  key={code}
                  onClick={() => handleLanguageChange(code)}
                  className={`flex items-center w-full text-left rounded-xl px-4 py-3 transition-all duration-200 gap-3 ${locale === code ? 'bg-orange-50 text-orange-600 font-bold' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  <ReactCountryFlag countryCode={getCountryCode(code)} svg className="rounded" style={{ width: '1.2em', height: '1.2em' }} />
                  <span className="text-sm font-semibold"><FormattedMessage id={labelId} /></span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Icon */}
      <button onClick={toggleSidebar} className="md:hidden text-white bg-white/10 p-2 rounded-xl border border-white/20 transition-all hover:bg-white/20">
        <FaBars size={24} />
      </button>

      {/* Mobile Sidebar */}
      <div className={`fixed top-0 left-0 w-72 h-full bg-white shadow-2xl transform transition-transform duration-500 ease-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden z-[60]`}>
        <div className="flex justify-between items-center bg-orange-600 p-6">
          <span className="text-2xl font-black text-white uppercase tracking-tight"><FormattedMessage id="header.appName" /></span>
          <button onClick={toggleSidebar} className="text-white bg-white/10 p-2 rounded-lg transition-all hover:rotate-90">
            <FaTimes size={24} />
          </button>
        </div>
        
        <nav className="flex flex-col p-6 space-y-6">
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4"><FormattedMessage id="header.language" /></h3>
            <div className="space-y-2">
              {languageOptions.map(({ code, labelId }) => (
                <button
                  key={code}
                  onClick={() => handleLanguageChange(code)}
                  className={`flex items-center w-full text-left rounded-2xl px-4 py-4 transition-all duration-200 gap-4 ${locale === code ? 'bg-orange-600 text-white font-bold shadow-lg shadow-orange-200' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <ReactCountryFlag countryCode={getCountryCode(code)} svg className="rounded" style={{ width: '1.5em', height: '1.5em' }} />
                  <span className="font-semibold"><FormattedMessage id={labelId} /></span>
                </button>
              ))}
            </div>
          </div>
        </nav>
      </div>
      {isSidebarOpen && <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 md:hidden" onClick={toggleSidebar} />}
    </header>
  );
};

export default Header;
