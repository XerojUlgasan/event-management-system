import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { TopBar } from './components/TopBar';
import { HeroSection } from './components/HeroSection';
import { CapabilitiesSection } from './components/CapabilitiesSection';
import { InteractiveEstimator } from './components/InteractiveEstimator';
import { TurnaroundBufferDemo } from './components/TurnaroundBufferDemo';
import { EventShowcase } from './components/EventShowcase';
import { DesignSystemPalette } from './components/DesignSystemPalette';
import { Footer } from './components/Footer';
import { QuotationModal, QuoteDetails } from './components/QuotationModal';
import { AuthView } from './components/auth/AuthView';
import { AdminDashboard } from './components/dashboard/AdminDashboard';
import { ManagerDashboard } from './components/dashboard/ManagerDashboard';
import { StaffDashboard } from './components/dashboard/StaffDashboard';
import { CustomerDashboard } from './components/dashboard/CustomerDashboard';
import { ArrowLeft, LayoutDashboard } from 'lucide-react';

function MainAppContent() {
  const { currentUser, isLoading } = useAuth();

  // App navigation state: 'public' | 'auth' | 'dashboard'
  const [currentView, setCurrentView] = useState<'public' | 'auth' | 'dashboard'>('public');
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [activeQuoteDetails, setActiveQuoteDetails] = useState<QuoteDetails | null>(null);

  // Automatic redirection upon login
  useEffect(() => {
    if (currentUser) {
      // Whenever a user authenticates, redirect automatically to their dashboard
      setCurrentView('dashboard');
    }
  }, [currentUser?.id]);

  const handleOpenGeneralQuote = () => {
    setActiveQuoteDetails(null);
    setIsQuoteModalOpen(true);
  };

  const handleProceedWithEstimate = (details: QuoteDetails) => {
    setActiveQuoteDetails(details);
    setIsQuoteModalOpen(true);
  };

  const handleScrollToEstimator = () => {
    if (currentView !== 'public') {
      setCurrentView('public');
      setTimeout(() => {
        const el = document.getElementById('estimator');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('estimator');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToBuffer = () => {
    if (currentView !== 'public') {
      setCurrentView('public');
      setTimeout(() => {
        const el = document.getElementById('buffer-engine');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('buffer-engine');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenAuth = (mode: 'login' | 'register' = 'login') => {
    setAuthMode(mode);
    setCurrentView('auth');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center">
        <div className="text-xs font-mono text-stone-500">Loading Clemora Engine...</div>
      </div>
    );
  }

  // 1. AUTHENTICATION VIEW (Centralized Login & Customer Registration)
  if (currentView === 'auth') {
    return (
      <AuthView
        defaultMode={authMode}
        onBackToPublic={() => setCurrentView('public')}
      />
    );
  }

  // 2. ROLE-BASED DASHBOARD VIEWS
  if (currentView === 'dashboard' && currentUser) {
    switch (currentUser.role) {
      case 'ADMIN':
        return <AdminDashboard onViewPublicSite={() => setCurrentView('public')} />;
      case 'MANAGER':
        return (
          <ManagerDashboard
            onViewPublicSite={() => setCurrentView('public')}
            onRequestQuote={handleOpenGeneralQuote}
          />
        );
      case 'STAFF':
        return <StaffDashboard onViewPublicSite={() => setCurrentView('public')} />;
      case 'CUSTOMER':
        return (
          <CustomerDashboard
            onViewPublicSite={() => setCurrentView('public')}
            onRequestQuote={handleOpenGeneralQuote}
          />
        );
      default:
        return <AdminDashboard onViewPublicSite={() => setCurrentView('public')} />;
    }
  }

  // 3. PUBLIC WEBSITE VIEW
  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#1C1917] selection:bg-[#0F172A] selection:text-white flex flex-col">
      {/* Return to Dashboard persistent indicator if user is currently logged in */}
      {currentUser && (
        <div className="bg-[#0F172A] text-white py-2 px-6 text-xs flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>
              Signed in as <strong>{currentUser.fullName}</strong> ({currentUser.role})
            </span>
          </div>
          <button
            onClick={() => setCurrentView('dashboard')}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-600 hover:bg-amber-500 text-white rounded text-[11px] font-semibold transition-colors"
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Return to {currentUser.role} Dashboard</span>
          </button>
        </div>
      )}

      <TopBar
        onRequestQuote={handleOpenGeneralQuote}
        onOpenAuth={handleOpenAuth}
        onGoToDashboard={() => setCurrentView('dashboard')}
        isDashboardActive={currentView === 'dashboard'}
      />

      <main className="flex-grow">
        <HeroSection
          onExploreEstimator={handleScrollToEstimator}
          onExploreBuffer={handleScrollToBuffer}
        />
        <CapabilitiesSection />
        <InteractiveEstimator onProceedToQuote={handleProceedWithEstimate} />
        <TurnaroundBufferDemo />
        <EventShowcase />
        <DesignSystemPalette />
      </main>

      <Footer />

      <QuotationModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        initialDetails={activeQuoteDetails}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainAppContent />
    </AuthProvider>
  );
}
