import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ProfileSettings } from './ProfileSettings';
import {
  FileText,
  Calendar,
  Sparkles,
  ArrowUpRight,
  LogOut,
  UserCog,
  Plus,
  CheckCircle2,
  Clock,
  ShieldCheck,
} from 'lucide-react';

interface CustomerDashboardProps {
  onViewPublicSite: () => void;
  onRequestQuote: () => void;
}

export function CustomerDashboard({ onViewPublicSite, onRequestQuote }: CustomerDashboardProps) {
  const { currentUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'quotes' | 'profile'>('quotes');

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#1C1917] flex flex-col selection:bg-[#0F172A] selection:text-white">
      {/* Top Bar */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#E7E5E4] px-6 lg:px-12 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold tracking-tight text-[#0F172A]">Clemora</span>
            <span className="text-stone-300">/</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-950 text-amber-200">
              Client Portal
            </span>
            <span className="hidden sm:inline-block text-xs text-stone-500 font-mono">
              {currentUser?.email}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onViewPublicSite}
              className="px-3 py-1.5 text-xs font-medium text-stone-600 hover:text-[#0F172A] border border-stone-200 rounded-lg hover:bg-stone-50 transition-colors flex items-center gap-1.5"
            >
              <span>Explore Public Showcase</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={logout}
              className="px-3 py-1.5 text-xs font-medium text-rose-600 hover:text-rose-700 hover:bg-rose-50 border border-rose-200 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow space-y-6">
        {/* Welcome Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E7E5E4] pb-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#B45309] mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Client Event Planning &amp; Quotations</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-[#0F172A]">
              Welcome, {currentUser?.fullName}
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              {currentUser?.organization || 'Private Event Host'} · {currentUser?.email}
            </p>
          </div>

          <button
            onClick={onRequestQuote}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#0F172A] hover:bg-[#1E293B] rounded-lg transition-colors shadow-sm flex items-center gap-2 self-start md:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Request New Event Quotation</span>
          </button>
        </div>

        {/* Tab Headers */}
        <div className="flex items-center gap-2 border-b border-[#E7E5E4]">
          <button
            onClick={() => setActiveTab('quotes')}
            className={`pb-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'quotes'
                ? 'border-[#0F172A] text-[#0F172A]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>My Bookings &amp; Estimates</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'profile'
                ? 'border-[#0F172A] text-[#0F172A]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <UserCog className="w-4 h-4" />
            <span>Profile &amp; Contact Details</span>
          </button>
        </div>

        {/* TAB 1: QUOTATIONS & BOOKINGS */}
        {activeTab === 'quotes' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Card 1: Confirmed / Under Review Quote */}
              <div className="bg-white border border-[#E7E5E4] rounded-xl p-5 hover:border-stone-300 transition-colors shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#0F172A]">
                      Annual Corporate Gala &amp; Awards
                    </span>
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold">
                    Turnaround Protected
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-stone-600 mb-4">
                  <div className="flex justify-between">
                    <span className="text-stone-400">Package Tier:</span>
                    <span className="font-semibold text-stone-800">Grand Gala Curation (5 Courses)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">Headcount:</span>
                    <span className="font-mono tabular-nums font-semibold text-stone-800">
                      120 Guests
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">Add-Ons:</span>
                    <span>Craft Cocktail Bar &amp; Sommelier</span>
                  </div>
                  <div className="flex justify-between border-t border-stone-100 pt-2 font-mono">
                    <span className="font-semibold text-stone-900">Total Estimate:</span>
                    <span className="font-bold text-[#0F172A] text-sm tabular-nums">
                      ₱14,470.00
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-stone-50 border border-stone-200 rounded-lg text-[11px] text-stone-600 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    Operations manager Clara Vance is reviewing your venue buffer timetable.
                  </span>
                </div>
              </div>

              {/* Card 2: Quick action promo */}
              <div className="bg-white border border-dashed border-stone-300 rounded-xl p-6 flex flex-col justify-between text-center items-center">
                <div>
                  <h4 className="font-bold text-sm text-[#0F172A] mb-1">
                    Planning Another Celebration?
                  </h4>
                  <p className="text-xs text-stone-500 max-w-sm mb-4">
                    Use our instant estimation tool with buffer calculation to customize courses,
                    equipment, and guest counts.
                  </p>
                </div>
                <button
                  onClick={onRequestQuote}
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#0F172A] rounded-lg hover:bg-slate-800 transition-colors"
                >
                  Configure New Proposal
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PROFILE */}
        {activeTab === 'profile' && <ProfileSettings />}
      </main>
    </div>
  );
}
