import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ReactCountryFlag from 'react-country-flag';
import { FaBars, FaTimes, FaGlobeAmericas, FaHeart } from 'react-icons/fa';
import { FormattedMessage } from 'react-intl';
import { useLanguageStore } from '../store/useLanguageStore';
import { useFavoriteStore } from '../store/useFavoriteStore';

const Header: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLanguageSelectorOpen, setIsLanguageSelectorOpen] = useState(false);
  const { locale, setLocale } = useLanguageStore();
  const { favorites } = useFavoriteStore();

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
    <header className="bg-white/95 backdrop-blur-md shadow-xl w-full flex justify-between items-center fixed top-0 z-50 transition-all duration-300 px-6 py-4 border-b border-gray-100">
      <Link to="/" className="flex items-center transform hover:scale-105 transition-transform duration-200 gap-3 group">
        <div className="bg-orange-50 p-2 rounded-xl group-hover:bg-orange-100 transition-colors shadow-sm border border-orange-100">
          <img src="/icon/cook-book.png" alt="RecipeApp Logo" className="h-8 drop-shadow-sm" />
        </div>
        <span className="text-xl md:text-2xl font-black text-gray-900 tracking-tighter uppercase drop-shadow-sm"><FormattedMessage id="header.appName" /></span>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6">
        <Link 
          to="/favorites" 
          className="flex items-center gap-2 text-gray-700 hover:text-orange-600 font-bold transition-all px-4 py-2.5 rounded-2xl hover:bg-orange-50 relative group"
        >
          <FaHeart className="text-red-500 group-hover:scale-110 transition-transform" />
          <span><FormattedMessage id="header.favorites" /></span>
          {favorites.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full shadow-lg border-2 border-white animate-in zoom-in duration-300">
              {favorites.length}
            </span>
          )}
        </Link>
        <div className="relative">
          <button
            onClick={toggleLanguageSelector}
            className="flex items-center justify-center space-x-3 w-32 rounded-2xl bg-gray-50 hover:bg-orange-50 text-gray-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 border border-gray-200 px-4 py-2.5 shadow-sm"
          >
            <FaGlobeAmericas className="text-orange-600" />
            <ReactCountryFlag countryCode={getCountryCode(locale)} svg className="rounded shadow-sm" style={{ width: '1.4em', height: '1.4em' }} />
          </button>
          
          {isLanguageSelectorOpen && (
            <div className="absolute top-16 right-0 w-52 bg-white border border-gray-100 rounded-2xl shadow-2xl overflow-hidden p-2 animate-in fade-in zoom-in-95 duration-200 z-70">
              {languageOptions.map(({ code, labelId }) => (
                <button
                  key={code}
                  onClick={() => handleLanguageChange(code)}
                  className={`flex items-center w-full text-left rounded-xl px-4 py-3.5 transition-all duration-200 gap-3 ${locale === code ? 'bg-orange-600 text-white font-bold' : 'text-gray-700 hover:bg-orange-50 hover:text-orange-600'}`}
                >
                  <ReactCountryFlag countryCode={getCountryCode(code)} svg className="rounded" style={{ width: '1.4em', height: '1.4em' }} />
                  <span className="text-sm font-semibold"><FormattedMessage id={labelId} /></span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Icon */}
      <button 
        onClick={toggleSidebar} 
        className="md:hidden text-gray-700 bg-gray-50 hover:bg-orange-50 p-3 rounded-xl border border-gray-200 transition-all shadow-sm active:scale-95 text-orange-600"
        aria-label="Menu"
      >
        <FaBars size={22} className="drop-shadow-sm" />
      </button>

      {/* Mobile Sidebar */}
      <div className={`fixed top-0 left-0 w-72 h-full bg-white shadow-2xl transform transition-transform duration-500 ease-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden z-100`}>
        <div className="flex justify-between items-center bg-gray-50 p-6 border-b border-gray-100">
          <span className="text-2xl font-black text-orange-600 uppercase tracking-tight"><FormattedMessage id="header.appName" /></span>
          <button onClick={toggleSidebar} className="text-gray-700 bg-white p-2 rounded-lg border border-gray-200 transition-all hover:rotate-90">
            <FaTimes size={24} />
          </button>
        </div>
        
        <nav className="flex flex-col p-6 space-y-8 bg-gray-100 h-screen pb-16">
          <Link 
            to="/favorites" 
            onClick={toggleSidebar}
            className="flex items-center justify-between bg-orange-50 p-5 rounded-3xl border border-orange-500 group"
          >
            <div className="flex items-center gap-4">
              <div className="bg-white p-3 rounded-2xl shadow-sm">
                <FaHeart className="text-red-500 text-xl" />
              </div>
              <span className="text-lg font-black text-gray-900 leading-none"><FormattedMessage id="header.favorites" /></span>
            </div>
            <span className="bg-orange-600 text-white font-bold px-3 py-1 rounded-full text-sm">
              {favorites.length}
            </span>
          </Link>

          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4"><FormattedMessage id="header.language" /></h3>
            <div className="space-y-3">
              {languageOptions.map(({ code, labelId }) => (
                <button
                  key={code}
                  onClick={() => handleLanguageChange(code)}
                  className={`flex items-center w-full text-left rounded-2xl px-5 py-4 transition-all duration-200 gap-4 border ${locale === code ? 'bg-orange-600 text-white font-bold shadow-lg border-orange-600' : 'text-gray-600 bg-gray-50 hover:bg-white border-orange-500'}`}
                >
                  <ReactCountryFlag countryCode={getCountryCode(code)} svg className="rounded" style={{ width: '1.8em', height: '1.8em' }} />
                  <span className="font-semibold"><FormattedMessage id={labelId} /></span>
                </button>
              ))}
            </div>
          </div>
        </nav>
      </div>
      {isSidebarOpen && <div className="fixed h-screen inset-0 bg-black/60 backdrop-blur-sm z-90 md:hidden" onClick={toggleSidebar} />}
    </header>
  );
};

export default Header;
