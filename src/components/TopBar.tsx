import { ClemoraLogo } from './common/ClemoraLogo.tsx';

interface TopBarProps {
  onRequestQuote: () => void;
}

export function TopBar({ onRequestQuote }: TopBarProps) {
  return (
    <header className="sticky top-0 z-40 bg-[#24162B]/95 backdrop-blur-md border-b border-purple-900/30 px-6 lg:px-12 py-3.5 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
        {/* Zone 1: Brand Logo + Wordmark */}
        <a
          href="#"
          className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-white whitespace-nowrap shrink-0 group"
        >
          <ClemoraLogo variant="full" theme="dark" size="sm" />
        </a>

        {/* Zone 2: Clean single-line nav links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-purple-100/80">
          <a
            href="#capabilities"
            className="hover:text-[#E07A5F] transition-colors whitespace-nowrap shrink-0"
          >
            Capabilities
          </a>
          <a
            href="#estimator"
            className="hover:text-[#E07A5F] transition-colors whitespace-nowrap shrink-0"
          >
            Quotation Estimator
          </a>
          <a
            href="#buffer-engine"
            className="hover:text-[#E07A5F] transition-colors whitespace-nowrap shrink-0"
          >
            Turnaround Engine
          </a>
          <a
            href="#showcase"
            className="hover:text-[#E07A5F] transition-colors whitespace-nowrap shrink-0"
          >
            Past Events
          </a>
          <a
            href="#palette"
            className="hover:text-[#E07A5F] transition-colors whitespace-nowrap shrink-0"
          >
            Design System
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onRequestQuote}
            className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#E07A5F] hover:bg-[#CB674D] rounded-lg shadow-sm hover:shadow-md transition-all whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E07A5F] active:scale-95 cursor-pointer"
          >
            Request Quotation
          </button>
        </div>
      </div>
    </header>
  );
}
