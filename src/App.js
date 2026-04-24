import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import NavbarWrapper from './components/NavbarWrapper';
import Footer from './components/Footer';
import EntryGate from './components/EntryGate';
import DesktopClickSpark from './components/DesktopClickSpark';
import Home from './pages/Home';
import About from './pages/About';
import Katalog from './pages/Katalog';
import Login from './pages/Login';
import Partisipasi from './pages/Partisipasi';
import Forum from './pages/Forum';
import PlaceholderPage from './pages/PlaceholderPage';
import Proyek from './pages/Proyek';
import Proses from './pages/Proses';
import Fokus from './pages/Fokus';
import Program from './pages/Program';
import Artikel from './pages/Artikel';
import ArtikelDetail from './pages/ArtikelDetail';
import Admin from './pages/Admin';
import './index.css';

// Mobile debugging log
console.log('[App] Starting app initialization');
console.log('[App] User Agent:', navigator.userAgent);
console.log('[App] Window location:', window.location.href);

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname === '/admin';
  const isLoginRoute = location.pathname === '/login';
  const hideLayout = isAdminRoute || isLoginRoute;
  
  const [showEntryGate, setShowEntryGate] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [initError, setInitError] = useState(null);

  useEffect(() => {
    console.log('[App] useEffect running - checking localStorage');
    try {
      // Check if user has already submitted an answer
      const hasSubmitted = localStorage.getItem('gudskul_entry_answer');
      const isForumPage = location.pathname === '/forum';
      
      console.log('[App] hasSubmitted:', hasSubmitted);
      console.log('[App] isForumPage:', isForumPage);
      console.log('[App] hideLayout:', hideLayout);
      
      // Don't show entry gate on admin, login, or forum pages
      if (!hasSubmitted && !hideLayout && !isForumPage) {
        setShowEntryGate(true);
      }
    } catch (error) {
      console.error('[App] Error checking localStorage:', error);
      setInitError(error.message);
      // Continue without entry gate if localStorage fails
    }
    setIsChecking(false);
    console.log('[App] Initialization complete');
  }, [location.pathname, hideLayout]);

  const handleEntryComplete = () => {
    setShowEntryGate(false);
  };

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-earth-dark">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-earth-sand/30 border-t-earth-sand rounded-full animate-spin"></div>
          <p className="text-earth-sand text-sm">Memuat...</p>
        </div>
      </div>
    );
  }

  // Show error if initialization failed (for debugging mobile)
  if (initError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-earth-dark p-4">
        <div className="bg-white rounded-xl p-6 max-w-md text-center">
          <p className="text-red-600 font-semibold mb-2">Error Saat Memuat</p>
          <p className="text-gray-600 text-sm mb-4">{initError}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-earth-dark text-white rounded-lg text-sm"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Entry Gate Overlay */}
      {showEntryGate && <EntryGate onComplete={handleEntryComplete} />}
      
      <div className={`${hideLayout ? '' : 'flex flex-col min-h-screen'}`}>
        {!hideLayout && <NavbarWrapper />}
        <main className={`${hideLayout ? '' : 'flex-grow'}`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/program" element={<Program />} />
            <Route path="/proyek" element={<Proyek />} />
            <Route path="/fokus" element={<Fokus />} />
            <Route path="/proses" element={<Proses />} />
            <Route path="/artikel" element={<Artikel />} />
            <Route path="/artikel/:slug" element={<ArtikelDetail />} />
            <Route path="/katalog" element={<Katalog />} />
            <Route path="/partisipasi" element={<Partisipasi />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/jaringan" element={<PlaceholderPage title="Jaringan Komunitas" />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
        {!hideLayout && <Footer />}
      </div>
    </>
  );
}

// ScrollToTop component - reset scroll position saat route berubah
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  
  return null;
}

function App() {
  return (
    <Router>
      <DesktopClickSpark
        sparkColor="rgba(255,255,255,0.8)"
        sparkSize={10}
        sparkRadius={20}
        sparkCount={8}
        duration={400}
        easing="ease-out"
      >
        <ScrollToTop />
        <AppContent />
      </DesktopClickSpark>
    </Router>
  );
}

export default App;
