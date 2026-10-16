import { useState } from 'react';
import { TopBar } from './components/TopBar.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { CapabilitiesSection } from './components/CapabilitiesSection.tsx';
import { InteractiveEstimator } from './components/InteractiveEstimator.tsx';
import { TurnaroundBufferDemo } from './components/TurnaroundBufferDemo.tsx';
import { EventShowcase } from './components/EventShowcase.tsx';
import { DesignSystemPalette } from './components/DesignSystemPalette.tsx';
import { Footer } from './components/Footer.tsx';
import { QuotationModal, QuoteDetails } from './components/QuotationModal.tsx';

export default function App() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [activeQuoteDetails, setActiveQuoteDetails] = useState<QuoteDetails | null>(null);

  const handleOpenGeneralQuote = () => {
    setActiveQuoteDetails(null);
    setIsQuoteModalOpen(true);
  };

  const handleProceedWithEstimate = (details: QuoteDetails) => {
    setActiveQuoteDetails(details);
    setIsQuoteModalOpen(true);
  };

  const handleScrollToEstimator = () => {
    const el = document.getElementById('estimator');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToBuffer = () => {
    const el = document.getElementById('buffer-engine');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#1C1917] selection:bg-[#0F172A] selection:text-white flex flex-col">
      <TopBar onRequestQuote={handleOpenGeneralQuote} />

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
