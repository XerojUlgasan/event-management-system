import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ProfileSettings } from './ProfileSettings';
import {
  Calendar,
  Users,
  Clock,
  Sparkles,
  ArrowUpRight,
  LogOut,
  UserCog,
  CheckCircle,
  FileText,
  AlertTriangle,
} from 'lucide-react';

interface ManagerDashboardProps {
  onViewPublicSite: () => void;
  onRequestQuote: () => void;
}

export function ManagerDashboard({ onViewPublicSite, onRequestQuote }: ManagerDashboardProps) {
  const { currentUser, users, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'operations' | 'crew' | 'quotes' | 'profile'>('operations');

  const activeStaff = users.filter((u) => u.role === 'STAFF' && u.status === 'active');

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#1C1917] flex flex-col selection:bg-[#0F172A] selection:text-white">
      {/* Top Bar */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#E7E5E4] px-6 lg:px-12 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold tracking-tight text-[#0F172A]">Clemora</span>
            <span className="text-stone-300">/</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-sky-950 text-sky-200">
              Manager Portal
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
              <span>View Public Site</span>
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
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E7E5E4] pb-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#B45309] mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Operations &amp; Event Coordination Suite</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-[#0F172A]">
              Welcome back, {currentUser?.fullName}
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              {currentUser?.position} · {currentUser?.department}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onRequestQuote}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#0F172A] hover:bg-[#1E293B] rounded-lg transition-colors shadow-sm"
            >
              New Client Proposal
            </button>
          </div>
        </div>

        {/* Tab Headers */}
        <div className="flex items-center gap-2 border-b border-[#E7E5E4]">
          <button
            onClick={() => setActiveTab('operations')}
            className={`pb-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'operations'
                ? 'border-[#0F172A] text-[#0F172A]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Turnaround Buffer Schedule</span>
          </button>

          <button
            onClick={() => setActiveTab('crew')}
            className={`pb-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'crew'
                ? 'border-[#0F172A] text-[#0F172A]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Assigned Crew Roster ({activeStaff.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('quotes')}
            className={`pb-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'quotes'
                ? 'border-[#0F172A] text-[#0F172A]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Inquiries &amp; Quotations</span>
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
            <span>My Profile</span>
          </button>
        </div>

        {/* TAB 1: OPERATIONS & TURNAROUND BUFFER */}
        {activeTab === 'operations' && (
          <div className="space-y-6">
            <div className="bg-white border border-[#E7E5E4] rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-bold text-[#0F172A]">
                    Active Turnaround Operations for Today
                  </h3>
                  <p className="text-xs text-stone-500">
                    Guaranteed scheduling protection prevents equipment and crew collisions.
                  </p>
                </div>
                <span className="text-xs font-mono px-2 py-1 bg-emerald-50 text-emerald-700 rounded font-semibold">
                  Zero Collisions Detected
                </span>
              </div>

              {/* Event Timeline Cards */}
              <div className="space-y-4">
                <div className="border border-stone-200 rounded-xl p-4 bg-stone-50/50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-[#0F172A]">
                        Metrobank Executive Dinner
                      </span>
                      <span className="text-xs text-stone-400">·</span>
                      <span className="text-xs text-stone-600">80 Guests · Grand Gala Tier</span>
                    </div>
                    <span className="text-xs font-mono font-medium text-[#B45309]">
                      Buffer Protected (12 hrs total)
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 text-center text-xs mt-3">
                    <div className="bg-white p-2 rounded-lg border border-stone-200">
                      <div className="text-[10px] text-stone-400">1. Loading</div>
                      <div className="font-semibold text-stone-800 mt-0.5">08:00 - 09:30</div>
                      <div className="text-[10px] text-emerald-600">Complete</div>
                    </div>
                    <div className="bg-white p-2 rounded-lg border border-stone-200">
                      <div className="text-[10px] text-stone-400">2. Transit</div>
                      <div className="font-semibold text-stone-800 mt-0.5">09:30 - 10:15</div>
                      <div className="text-[10px] text-emerald-600">Arrived</div>
                    </div>
                    <div className="bg-white p-2 rounded-lg border border-stone-200">
                      <div className="text-[10px] text-stone-400">3. Staging</div>
                      <div className="font-semibold text-stone-800 mt-0.5">10:15 - 12:30</div>
                      <div className="text-[10px] text-amber-600 font-semibold">In Progress</div>
                    </div>
                    <div className="bg-white p-2 rounded-lg border border-stone-200">
                      <div className="text-[10px] text-stone-400">4. Live Dining</div>
                      <div className="font-semibold text-stone-800 mt-0.5">12:30 - 16:30</div>
                      <div className="text-[10px] text-stone-400">Scheduled</div>
                    </div>
                    <div className="bg-white p-2 rounded-lg border border-stone-200">
                      <div className="text-[10px] text-stone-400">5. Teardown</div>
                      <div className="font-semibold text-stone-800 mt-0.5">16:30 - 18:00</div>
                      <div className="text-[10px] text-stone-400">Scheduled</div>
                    </div>
                    <div className="bg-white p-2 rounded-lg border border-stone-200">
                      <div className="text-[10px] text-stone-400">6. Return</div>
                      <div className="font-semibold text-stone-800 mt-0.5">18:00 - 19:00</div>
                      <div className="text-[10px] text-stone-400">Scheduled</div>
                    </div>
                    <div className="bg-white p-2 rounded-lg border border-stone-200">
                      <div className="text-[10px] text-stone-400">7. Warewash</div>
                      <div className="font-semibold text-stone-800 mt-0.5">19:00 - 21:00</div>
                      <div className="text-[10px] text-stone-400">Locked</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CREW ROSTER */}
        {activeTab === 'crew' && (
          <div className="bg-white border border-[#E7E5E4] rounded-xl p-6">
            <h3 className="text-sm font-bold text-[#0F172A] mb-1">
              Active Crew Members for Event Assignment
            </h3>
            <p className="text-xs text-stone-500 mb-4">
              Direct contact phone numbers and verified skill sets for operations dispatch.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeStaff.map((staff) => (
                <div
                  key={staff.id}
                  className="border border-stone-200 rounded-xl p-4 bg-stone-50/50 hover:border-stone-300 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-xs text-[#0F172A]">{staff.fullName}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      Active
                    </span>
                  </div>
                  <div className="text-xs text-stone-600 mb-1">{staff.position}</div>
                  <div className="text-[11px] text-stone-500 font-mono mb-3">
                    Phone: {staff.phone}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {staff.skills?.map((sk) => (
                      <span
                        key={sk}
                        className="text-[10px] px-1.5 py-0.5 bg-white border border-stone-200 rounded text-stone-700"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: QUOTES */}
        {activeTab === 'quotes' && (
          <div className="bg-white border border-[#E7E5E4] rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-[#0F172A]">Recent Quotation Requests</h3>
              <button
                onClick={onRequestQuote}
                className="text-xs font-semibold text-[#0F172A] hover:underline"
              >
                + Create Manual Quote
              </button>
            </div>
            <div className="divide-y divide-stone-200 text-xs">
              <div className="py-3 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-stone-900">
                    Isabel Montelibano (Summit Media)
                  </div>
                  <div className="text-stone-500 text-[11px]">
                    Grand Gala Curation · 120 Guests · Makati Diamond Residences
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-semibold text-stone-900">₱132,000.00</div>
                  <span className="text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-medium">
                    Awaiting Contract Sign
                  </span>
                </div>
              </div>

              <div className="py-3 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-stone-900">Ayala Land Tech Summit</div>
                  <div className="text-stone-500 text-[11px]">
                    Premier Artisan Tier · 180 Guests · BGC Arts Center
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-semibold text-stone-900">₱156,600.00</div>
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium">
                    Deposit Confirmed
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: PROFILE */}
        {activeTab === 'profile' && <ProfileSettings />}
      </main>
    </div>
  );
}
