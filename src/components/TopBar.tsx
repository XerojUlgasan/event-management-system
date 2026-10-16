interface TopBarProps {
  onRequestQuote: () => void;
}

export function TopBar({ onRequestQuote }: TopBarProps) {
  return (
    <header className="sticky top-0 z-40 bg-[#FAFAF8]/95 backdrop-blur-sm border-b border-[#E7E5E4] px-6 lg:px-12 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="text-xl font-bold tracking-tight text-[#0F172A] whitespace-nowrap shrink-0"
        >
          Clemora
        </a>

        {/* Zone 2: 4 clean single-line nav links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
          <a
            href="#capabilities"
            className="hover:text-[#0F172A] transition-colors whitespace-nowrap shrink-0"
          >
            Capabilities
          </a>
          <a
            href="#estimator"
            className="hover:text-[#0F172A] transition-colors whitespace-nowrap shrink-0"
          >
            Quotation Estimator
          </a>
          <a
            href="#buffer-engine"
            className="hover:text-[#0F172A] transition-colors whitespace-nowrap shrink-0"
          >
            Turnaround Engine
          </a>
          <a
            href="#showcase"
            className="hover:text-[#0F172A] transition-colors whitespace-nowrap shrink-0"
          >
            Past Events
          </a>
          <a
            href="#palette"
            className="hover:text-[#0F172A] transition-colors whitespace-nowrap shrink-0"
          >
            Design System
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onRequestQuote}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#0F172A] hover:bg-[#1E293B] rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F172A]"
          >
            Request Quotation
          </button>
        </div>
      </div>
    </header>
  );
}
