import React, { useState, useEffect } from 'react';
import { FaTimes, FaDownload } from 'react-icons/fa';
import { FormattedMessage } from 'react-intl';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const PWAInstallNotification: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      const hasDeclined = localStorage.getItem('pwa-install-declined');
      if (!hasDeclined) {
        setShowNotification(true);
        
        setTimeout(() => {
          setShowNotification(false);
        }, 3000);
      }
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'dismissed') {
      localStorage.setItem('pwa-install-declined', 'true');
    }

    setDeferredPrompt(null);
    setShowNotification(false);
  };

  const handleClose = () => {
    setShowNotification(false);
    localStorage.setItem('pwa-install-declined', 'true');
  };

  if (!showNotification || !deferredPrompt) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[9999] animate-slide-up">
      <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm border-2 border-orange-500 animate-bounce-in">
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <FaTimes size={18} />
        </button>

        <div className="flex items-start gap-4">
          <div className="bg-orange-100 p-3 rounded-xl">
            <FaDownload className="text-orange-600 text-2xl" />
          </div>
          
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 mb-1">
              <FormattedMessage id="pwa.install.title" />
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              <FormattedMessage id="pwa.install.description" />
            </p>
            
            <button
              onClick={handleInstall}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2.5 px-4 rounded-xl transition-all shadow-lg hover:shadow-orange-200 active:scale-95"
            >
              <FormattedMessage id="pwa.install.button" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PWAInstallNotification;
