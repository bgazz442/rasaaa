import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import NavbarWrapper from './components/NavbarWrapper';
import Footer from './components/Footer';
import EntryGate from './components/EntryGate';
import './index.css';

// Lazy load all pages for better performance
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Profil = lazy(() => import('./pages/Profil'));
const Member = lazy(() => import('./pages/Member'));
const Pameran = lazy(() => import('./pages/Pameran'));
const Program = lazy(() => import('./pages/Program'));
const Contact = lazy(() => import('./pages/Contact'));
const Forum = lazy(() => import('./pages/Forum'));
const Login = lazy(() => import('./pages/Login'));
const Admin = lazy(() => import('./pages/Admin'));

// Page loading fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-earth-cream">
    <div className="flex flex-col items-center gap-3">
      <div className="w-8 h-8 border-3 border-earth-sand/30 border-t-earth-green rounded-full animate-spin"></div>
      <p className="text-earth-dark/50 text-sm">Memuat halaman...</p>
    </div>
  </div>
);

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname === '/admin';
  const isLoginRoute = location.pathname === '/login';
  const hideLayout = isAdminRoute || isLoginRoute;
  
  const [showEntryGate, setShowEntryGate] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    try {
      const hasSubmitted = localStorage.getItem('gudskul_entry_answer');
      if (!hasSubmitted && !hideLayout) {
        setShowEntryGate(true);
      }
    } catch (error) {
      // Continue without entry gate if localStorage fails
    }
    setIsChecking(false);
  }, [location.pathname, hideLayout]);

  const handleEntryComplete = () => {
    setShowEntryGate(false);
  };

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-earth-dark">
        <div className="w-10 h-10 border-4 border-earth-sand/30 border-t-earth-sand rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      {showEntryGate && <EntryGate onComplete={handleEntryComplete} />}
      
      <div className={`${hideLayout ? '' : 'flex flex-col min-h-screen'}`}>
        {!hideLayout && <NavbarWrapper />}
        <main className={`${hideLayout ? '' : 'flex-grow'}`}>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profil" element={<Profil />} />
              <Route path="/member" element={<Member />} />
              <Route path="/pameran" element={<Pameran />} />
              <Route path="/program" element={<Program />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/forum" element={<Forum />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </Suspense>
        </main>
        {!hideLayout && <Footer />}
              </div>
    </>
  );
}

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
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

export default App;
