import { useAuth } from '../context/AuthContext';
import { User, LogOut, ArrowRight, ShieldCheck } from 'lucide-react';

interface TopBarProps {
  onRequestQuote: () => void;
  onOpenAuth: (mode?: 'login' | 'register') => void;
  onGoToDashboard: () => void;
  isDashboardActive?: boolean;
}

export function TopBar({
  onRequestQuote,
  onOpenAuth,
  onGoToDashboard,
  isDashboardActive = false,
}: TopBarProps) {
  const { currentUser, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 bg-[#FAFAF8]/95 backdrop-blur-sm border-b border-[#E7E5E4] px-6 lg:px-12 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="text-xl font-bold tracking-tight text-[#0F172A] whitespace-nowrap shrink-0"
        >
          Clemora
        </a>

        {/* Zone 2: 4-5 clean single-line nav links */}
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
          {currentUser ? (
            <button
              onClick={onGoToDashboard}
              className="hover:text-[#0F172A] transition-colors whitespace-nowrap shrink-0 font-semibold text-[#0F172A]"
            >
              My Dashboard
            </button>
          ) : (
            <button
              onClick={() => onOpenAuth('register')}
              className="hover:text-[#0F172A] transition-colors whitespace-nowrap shrink-0"
            >
              Client Registration
            </button>
          )}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          {currentUser ? (
            <div className="flex items-center gap-2">
              <button
                onClick={onGoToDashboard}
                className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#0F172A] hover:bg-[#1E293B] rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 shadow-sm"
              >
                <span>{currentUser.role} Portal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={logout}
                title="Sign Out"
                className="p-1.5 text-stone-500 hover:text-rose-600 hover:bg-stone-100 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenAuth('login')}
                className="px-3.5 py-1.5 text-xs font-semibold text-[#0F172A] hover:bg-stone-100 border border-stone-300 rounded-lg transition-colors whitespace-nowrap shrink-0"
              >
                Sign In
              </button>

              <button
                onClick={onRequestQuote}
                className="hidden sm:inline-flex px-3.5 py-1.5 text-xs font-semibold text-white bg-[#0F172A] hover:bg-[#1E293B] rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm"
              >
                Request Quote
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
