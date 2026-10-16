import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ProfileSettings } from './ProfileSettings';
import {
  Calendar,
  Award,
  Clock,
  Sparkles,
  ArrowUpRight,
  LogOut,
  UserCog,
  CheckCircle,
  Briefcase,
  AlertCircle,
} from 'lucide-react';
import { DAYS_OF_WEEK } from '../../types/auth';

interface StaffDashboardProps {
  onViewPublicSite: () => void;
}

export function StaffDashboard({ onViewPublicSite }: StaffDashboardProps) {
  const { currentUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'shifts' | 'skills' | 'profile'>('shifts');

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#1C1917] flex flex-col selection:bg-[#0F172A] selection:text-white">
      {/* Top Bar */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#E7E5E4] px-6 lg:px-12 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold tracking-tight text-[#0F172A]">Clemora</span>
            <span className="text-stone-300">/</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-950 text-emerald-200">
              Staff Portal
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
              <span>Workforce Portal · Catering Crew</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-[#0F172A]">
              Welcome, {currentUser?.fullName}
            </h1>
            <div className="text-xs text-stone-500 mt-1 flex items-center gap-2">
              <span>{currentUser?.position}</span>
              <span aria-hidden="true">·</span>
              <span>{currentUser?.department}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums font-semibold text-stone-900">
                ₱{currentUser?.hourlyRate || 280}/hr
              </span>
            </div>
          </div>
        </div>

        {/* Tab Headers */}
        <div className="flex items-center gap-2 border-b border-[#E7E5E4]">
          <button
            onClick={() => setActiveTab('shifts')}
            className={`pb-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'shifts'
                ? 'border-[#0F172A] text-[#0F172A]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>My Shift Schedule</span>
          </button>

          <button
            onClick={() => setActiveTab('skills')}
            className={`pb-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'skills'
                ? 'border-[#0F172A] text-[#0F172A]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Skills &amp; Qualifications ({currentUser?.skills?.length || 0})</span>
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

        {/* TAB 1: SHIFTS & BUFFER BREAKDOWN */}
        {activeTab === 'shifts' && (
          <div className="space-y-6">
            {/* Weekly Availability Card */}
            <div className="bg-white border border-[#E7E5E4] rounded-xl p-5">
              <h3 className="text-sm font-bold text-[#0F172A] mb-1">
                Your Weekly Availability Roster
              </h3>
              <p className="text-xs text-stone-500 mb-4">
                Assigned by Operations Administration. Contact your coordinator if you need to adjust
                your roster.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
                {DAYS_OF_WEEK.map((day) => {
                  const slot = currentUser?.availability?.[day] || 'unavailable';
                  let bg = 'bg-stone-50 border-stone-200 text-stone-500';
                  let status = 'Day Off';

                  if (slot === 'full_day') {
                    bg = 'bg-emerald-50 border-emerald-200 text-emerald-800';
                    status = 'Full Day (8h)';
                  } else if (slot === 'morning') {
                    bg = 'bg-sky-50 border-sky-200 text-sky-800';
                    status = 'Morning (AM)';
                  } else if (slot === 'evening') {
                    bg = 'bg-amber-50 border-amber-200 text-amber-800';
                    status = 'Evening (PM)';
                  }

                  return (
                    <div key={day} className={`border rounded-xl p-3 text-center ${bg}`}>
                      <div className="capitalize font-bold text-xs">{day}</div>
                      <div className="text-[11px] font-medium mt-1">{status}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Upcoming Event Shift with Turnaround Buffering */}
            <div className="bg-white border border-[#E7E5E4] rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-bold text-[#0F172A]">
                    Upcoming Assigned Event: Grand Wedding Banquet
                  </h3>
                  <p className="text-xs text-stone-500">
                    Bellevue Pavilion, Alabang · Role: {currentUser?.position}
                  </p>
                </div>
                <span className="text-xs font-mono font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded">
                  Shift Confirmed
                </span>
              </div>

              <div className="border border-stone-200 rounded-xl p-4 bg-stone-50/50 space-y-3">
                <div className="text-xs font-semibold text-stone-800 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span>Turnaround Buffer Schedule (Protected Hours)</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div className="bg-white p-3 rounded-lg border border-stone-200">
                    <div className="font-semibold text-stone-900">Phase 1: Warehouse Loading</div>
                    <div className="text-stone-500 text-[11px] mt-0.5">
                      08:00 AM – 09:30 AM (90 min)
                    </div>
                    <div className="text-[11px] text-stone-600 mt-1">
                      Chafing dishes, cutlery crates, and bar mobile counter loading.
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded-lg border border-stone-200">
                    <div className="font-semibold text-stone-900">Phase 2: On-Site Table Staging</div>
                    <div className="text-stone-500 text-[11px] mt-0.5">
                      10:30 AM – 01:00 PM (150 min)
                    </div>
                    <div className="text-[11px] text-stone-600 mt-1">
                      Buffet lines, linen dressing, VIP table place settings.
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded-lg border border-stone-200">
                    <div className="font-semibold text-stone-900">
                      Phase 3: Teardown &amp; Warewash
                    </div>
                    <div className="text-stone-500 text-[11px] mt-0.5">
                      06:00 PM – 09:00 PM (180 min)
                    </div>
                    <div className="text-[11px] text-stone-600 mt-1">
                      Equipment sanitization and return to central warehouse.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SKILLS & QUALIFICATIONS */}
        {activeTab === 'skills' && (
          <div className="bg-white border border-[#E7E5E4] rounded-xl p-6">
            <h3 className="text-sm font-bold text-[#0F172A] mb-1">
              Verified Catering &amp; Hospitality Skills
            </h3>
            <p className="text-xs text-stone-500 mb-4">
              Your certified competencies in the Clemora operations database.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {currentUser?.skills?.map((skill) => (
                <div
                  key={skill}
                  className="flex items-center gap-2 p-3 bg-stone-50 border border-stone-200 rounded-xl"
                >
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-xs font-semibold text-stone-800">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: PROFILE */}
        {activeTab === 'profile' && <ProfileSettings />}
      </main>
    </div>
  );
}
