import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ReactCountryFlag from 'react-country-flag';
import { FaBars, FaHome, FaTimes, FaGlobeAmericas } from 'react-icons/fa';
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
    <header className="bg-[#aa550f] shadow-md w-full flex justify-between items-center sm:px-8 fixed top-0 z-50" style={{ paddingInline: "1rem", paddingBlock: "0.75rem" }}>
      <Link to="/" className="flex items-center transform hover:scale-105 transition-transform duration-200" style={{ gap: "0.5rem" }}>
        <img src="/png-icon/cook-book.png" alt="RecipeApp Logo" className="h-9" />
        <span className="text-2xl font-bold text-white"><FormattedMessage id="header.appName" /></span>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center" style={{ gap: "2rem" }}>
        <nav className="flex items-center" style={{ gap: "0.5rem" }}>
          <Link
            to="/"
            className="flex items-center rounded-full font-semibold transition-colors duration-200 bg-[#ffedd5] text-[#d97706] hover:bg-[#d97706] hover:text-[#ffedd5] shadow-sm"
            style={{ paddingInline: "1.5rem", paddingBlock: "0.5rem" }}
          >
            <FaHome style={{ marginRight: '0.5rem' }} />
            <FormattedMessage id="header.home" />
          </Link>
        </nav>

        <div className="relative" style={{ marginLeft: "1rem", marginRight: "0.5rem" }}>
          <button
            onClick={toggleLanguageSelector}
            className="flex items-center justify-center space-x-2 w-24 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
            style={{ paddingInline: "1rem", paddingBlock: "0.5rem", gap: "0.75rem" }}
          >
            <FaGlobeAmericas className="text-gray-600" />
            <ReactCountryFlag countryCode={getCountryCode(locale)} svg style={{ width: '1.5em', height: '1.5em' }} />
          </button>
          {isLanguageSelectorOpen && (
            <div className="absolute top-14 right-0 w-40 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden" style={{ padding: "0.5rem" }}>
              {languageOptions.map(({ code, labelId }) => (
                <button
                  key={code}
                  onClick={() => handleLanguageChange(code)}
                  style={{ padding: "0.5rem" }}
                  className={`flex items-center w-full text-left rounded-md transition-colors duration-200 ${locale === code ? 'bg-orange-100 text-orange-600 font-bold' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  <ReactCountryFlag countryCode={getCountryCode(code)} svg style={{ width: '1.5em', height: '1em', marginRight: "0.5rem" }} />
                  <span><FormattedMessage id={labelId} /></span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Icon */}
      <button onClick={toggleSidebar} className="md:hidden text-white focus:outline-none" style={{padding: "0.5rem"}}>
        <FaBars size={24} />
      </button>

      {/* Mobile Sidebar */}
      <div className={`fixed top-0 left-0 w-64 h-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden z-40`}>
        <div className="flex justify-between items-center bg-gray-50 border-b" style={{ padding: "1rem" }}>
          <span className="text-xl font-bold text-orange-600"><FormattedMessage id="header.appName" /></span>
          <button onClick={toggleSidebar} className="text-gray-600 hover:text-orange-600">
            <FaTimes size={24} />
          </button>
        </div>
        <nav className="flex flex-col" style={{ padding: "1rem"}}>
          <Link
            to="/"
            onClick={toggleSidebar}
            className="flex items-center rounded-lg font-semibold text-gray-700 hover:bg-orange-100"
            style={{ padding: "0.75rem" }}
          >
            <FaHome className="text-gray-500" style={{ marginRight: "0.75rem" }} />
            <FormattedMessage id="header.home"/>
          </Link>
          <hr style={{ marginBlock: "0.5rem" }}/>
          <div style={{ padding: "0.75rem" }}>
            <h3 className="font-semibold text-gray-700" style={{ marginBottom: "0.5rem" }}><FormattedMessage id="header.language" /></h3>
            <div className="space-y-2" style={{ gap: "0.5rem" }}>
              {languageOptions.map(({ code, labelId }) => (
                <button
                  key={code}
                  onClick={() => handleLanguageChange(code)}
                  className={`flex items-center w-full text-left rounded-md transition-colors duration-200 ${locale === code ? 'bg-orange-100 text-orange-600 font-bold' : 'text-gray-700 hover:bg-gray-100'}`}
                  style={{ padding: "0.5rem" }}
                >
                  <ReactCountryFlag countryCode={getCountryCode(code)} svg style={{ width: '1.5em', height: '1em', marginRight: "0.5rem" }} />
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
