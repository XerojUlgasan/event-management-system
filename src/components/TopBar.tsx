import { Sparkles } from 'lucide-react';

interface TopBarProps {
  onRequestQuote: () => void;
}

export function TopBar({ onRequestQuote }: TopBarProps) {
  return (
    <header className="sticky top-0 z-40 bg-[#0B1120]/90 backdrop-blur-md border-b border-white/10 px-6 lg:px-12 py-4 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
        {/* Zone 1: Brand Logo + Wordmark */}
        <a
          href="#"
          className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-white whitespace-nowrap shrink-0 group"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
            <Sparkles className="w-4 h-4" />
          </div>
          <span>Clemora</span>
        </a>

        {/* Zone 2: Clean single-line nav links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-300">
          <a
            href="#capabilities"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Capabilities
          </a>
          <a
            href="#estimator"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Quotation Estimator
          </a>
          <a
            href="#buffer-engine"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Turnaround Engine
          </a>
          <a
            href="#showcase"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Past Events
          </a>
          <a
            href="#palette"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Design System
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onRequestQuote}
            className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 rounded-lg shadow-sm hover:shadow-md transition-all whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 active:scale-95 cursor-pointer"
          >
            Request Quotation
          </button>
        </div>
      </div>
    </header>
  );
}
