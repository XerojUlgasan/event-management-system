import { useState } from 'react';
import { RoleSwitcher } from './components/common/RoleSwitcher.tsx';
import { Navbar } from './components/navigation/Navbar.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { CapabilitiesSection } from './components/CapabilitiesSection.tsx';
import { PackageCatalog } from './components/customer/PackageCatalog.tsx';
import { InteractiveEstimator } from './components/InteractiveEstimator.tsx';
import { TurnaroundBufferDemo } from './components/TurnaroundBufferDemo.tsx';
import { EventShowcase } from './components/EventShowcase.tsx';
import { PastEventsGallery } from './components/gallery/PastEventsGallery.tsx';
import { CustomerReviewsSection } from './components/customer/CustomerReviewsSection.tsx';
import { FaqSection } from './components/common/FaqSection.tsx';
import { DesignSystemPalette } from './components/DesignSystemPalette.tsx';
import { Footer } from './components/Footer.tsx';
import { QuotationModal, QuoteDetails } from './components/QuotationModal.tsx';
import { AuthModal } from './components/auth/AuthModal.tsx';
import { CustomerDashboard } from './components/customer/CustomerDashboard.tsx';
import { ManagerDashboard } from './components/manager/ManagerDashboard.tsx';
import { QuotationManagement } from './components/manager/QuotationManagement.tsx';
import { BookingCalendar } from './components/manager/BookingCalendar.tsx';
import { StaffRosterView } from './components/manager/StaffRosterView.tsx';
import { InventoryManagement } from './components/inventory/InventoryManagement.tsx';
import { EventOperationsBoard } from './components/operations/EventOperationsBoard.tsx';
import { StaffPortal } from './components/staff/StaffPortal.tsx';
import { AdminDashboard } from './components/admin/AdminDashboard.tsx';
import { PackageAdmin } from './components/admin/PackageAdmin.tsx';
import { KnowledgeBaseAdmin } from './components/admin/KnowledgeBaseAdmin.tsx';
import { SystemSettingsAdmin } from './components/admin/SystemSettingsAdmin.tsx';
import { AIChatbot } from './components/ai/AIChatbot.tsx';
import { ClemoraStore, useClemoraStore } from './services/store.ts';
import { UserRole } from './types/clemora.ts';
import { Bot } from 'lucide-react';

export default function App() {
  const store = useClemoraStore();
  const [currentTab, setCurrentTab] = useState<string>('public');
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [activeQuoteDetails, setActiveQuoteDetails] = useState<QuoteDetails | null>(null);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);

  // Authentication Modal State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signin');

  const handleOpenSignIn = () => {
    setAuthModalMode('signin');
    setIsAuthModalOpen(true);
  };

  const handleOpenSignUp = () => {
    setAuthModalMode('signup');
    setIsAuthModalOpen(true);
  };

  const handleAuthSuccess = (role: UserRole) => {
    if (role === 'customer') {
      setCurrentTab('customer-portal');
    } else if (role === 'coordinator') {
      setCurrentTab('manager-portal');
    } else if (role === 'staff') {
      setCurrentTab('staff-portal');
    } else if (role === 'administrator') {
      setCurrentTab('admin-portal');
    }
  };

  const handleOpenGeneralQuote = () => {
    setActiveQuoteDetails(null);
    setIsQuoteModalOpen(true);
  };

  const handleProceedWithEstimate = (details: QuoteDetails) => {
    setActiveQuoteDetails(details);
    setIsQuoteModalOpen(true);
  };

  const handleResetDemo = () => {
    if (confirm('Reset system state and preloaded records to initial demo defaults?')) {
      ClemoraStore.resetToDemoData();
      alert('System reset to pristine demo records.');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F5] text-[#24162B] selection:bg-[#35233D] selection:text-white flex flex-col font-sans">
      
      {/* 1. Global Multi-Role Testing Switcher Banner */}
      <RoleSwitcher
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        onResetDemo={handleResetDemo}
      />

      {/* 2. Top Navigation Bar (1-row, 3-zone contract with Sign In / Sign Up) */}
      <Navbar
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        onOpenAIChat={() => setIsAIChatOpen(true)}
        onRequestQuote={handleOpenGeneralQuote}
        onOpenSignIn={handleOpenSignIn}
        onOpenSignUp={handleOpenSignUp}
      />

      {/* 3. Main View Area Router */}
      <main className="flex-grow">
        
        {/* PUBLIC LANDING PAGE VIEWS */}
        {currentTab === 'public' && (
          <div>
            <HeroSection
              onExploreEstimator={() => setCurrentTab('estimator')}
              onExploreBuffer={() => setCurrentTab('buffer')}
              onOpenSignIn={handleOpenSignIn}
              onOpenSignUp={handleOpenSignUp}
            />
            <CapabilitiesSection />
            <PackageCatalog
              onSelectPackageForQuote={() => setIsQuoteModalOpen(true)}
              onRequestGeneralQuote={handleOpenGeneralQuote}
            />
            <InteractiveEstimator onProceedToQuote={handleProceedWithEstimate} />
            <TurnaroundBufferDemo />
            <EventShowcase />
            <PastEventsGallery />
            <CustomerReviewsSection onOpenQuote={handleOpenGeneralQuote} />
            <FaqSection
              onOpenAIChat={() => setIsAIChatOpen(true)}
              onRequestQuote={handleOpenGeneralQuote}
            />
            <DesignSystemPalette />
          </div>
        )}

        {currentTab === 'packages' && (
          <PackageCatalog
            onSelectPackageForQuote={() => setIsQuoteModalOpen(true)}
            onRequestGeneralQuote={handleOpenGeneralQuote}
          />
        )}

        {currentTab === 'estimator' && (
          <div className="py-8">
            <InteractiveEstimator onProceedToQuote={handleProceedWithEstimate} />
          </div>
        )}

        {currentTab === 'buffer' && (
          <div className="py-8">
            <TurnaroundBufferDemo />
          </div>
        )}

        {currentTab === 'gallery' && (
          <PastEventsGallery />
        )}

        {/* CUSTOMER PORTAL */}
        {currentTab === 'customer-portal' && (
          <CustomerDashboard
            onOpenEstimator={() => setCurrentTab('packages')}
            onOpenAIChat={() => setIsAIChatOpen(true)}
          />
        )}

        {/* COORDINATOR / MANAGER PORTAL */}
        {currentTab === 'manager-portal' && (
          <ManagerDashboard onNavigateTab={setCurrentTab} />
        )}

        {currentTab === 'manager-quotes' && (
          <QuotationManagement />
        )}

        {currentTab === 'manager-calendar' && (
          <BookingCalendar />
        )}

        {currentTab === 'manager-roster' && (
          <StaffRosterView />
        )}

        {currentTab === 'manager-inventory' && (
          <InventoryManagement />
        )}

        {currentTab === 'manager-ops' && (
          <EventOperationsBoard />
        )}

        {/* STAFF PORTAL */}
        {currentTab === 'staff-portal' && (
          <StaffPortal />
        )}

        {/* ADMINISTRATOR PORTAL */}
        {currentTab === 'admin-portal' && (
          <AdminDashboard />
        )}

        {currentTab === 'admin-packages' && (
          <PackageAdmin />
        )}

        {currentTab === 'admin-kb' && (
          <KnowledgeBaseAdmin />
        )}

        {currentTab === 'admin-settings' && (
          <SystemSettingsAdmin />
        )}

      </main>

      {/* 4. Global Footer */}
      <Footer />

      {/* 5. Floating AI Concierge Action Trigger */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsAIChatOpen(true)}
          className="flex items-center gap-2.5 px-4 py-3 bg-[#35233D] hover:bg-[#E07A5F] text-white rounded-full shadow-xl border border-purple-300/30 transition-all hover:scale-105 active:scale-95 cursor-pointer group"
          title="Open AI Concierge grounded in Clemora's Knowledge Base"
        >
          <div className="w-6 h-6 rounded-full bg-[#E07A5F]/30 group-hover:bg-white/20 flex items-center justify-center text-[#E07A5F] group-hover:text-white transition-colors">
            <Bot className="w-4 h-4" />
          </div>
          <span className="text-xs font-semibold pr-1">AI Concierge</span>
        </button>
      </div>

      {/* 6. AI Grounded Chatbot Modal & Handover */}
      <AIChatbot
        isOpen={isAIChatOpen}
        onClose={() => setIsAIChatOpen(false)}
        onSelectPackage={() => setCurrentTab('packages')}
      />

      {/* 7. Quick Quotation Request Modal */}
      <QuotationModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        initialDetails={activeQuoteDetails}
      />

      {/* 8. Sign In & Sign Up Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authModalMode}
        onAuthSuccess={handleAuthSuccess}
      />

    </div>
  );
}
