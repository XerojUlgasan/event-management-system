import { useState } from 'react';
import { Users, Star, Plus, Check, Shield, Calendar, Phone, Mail } from 'lucide-react';
import { useClemoraStore } from '../../services/store.ts';
import { StaffMember } from '../../types/clemora.ts';

export function StaffRosterView() {
  const store = useClemoraStore();
  const [selectedRoleFilter, setSelectedRoleFilter] = useState<string>('all');
  const [selectedDayFilter, setSelectedDayFilter] = useState<string>('all');

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const filteredStaff = store.staff.filter((s) => {
    const matchesRole = selectedRoleFilter === 'all' || s.role === selectedRoleFilter;
    const matchesDay = selectedDayFilter === 'all' || s.availableDays.includes(selectedDayFilter as any);
    return matchesRole && matchesDay;
  });

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
            Module 1 & 4 · Crew Logistics
          </span>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-stone-900 mt-2">
            Staff Rostering & Skill Matrix
          </h1>
          <p className="text-xs md:text-sm text-stone-500 mt-1">
            Track certified culinary leads, floor maitre d's, sommeliers, and warewash buffer logistics crew.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-semibold px-3 py-1.5 rounded-lg bg-stone-100 text-stone-700">
            {store.staff.length} Active Personnel
          </span>
        </div>
      </div>

      {/* Filter Row */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-stone-200 shadow-xs text-xs">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          <span className="font-semibold text-stone-500 uppercase text-[10px] tracking-wider shrink-0">Day:</span>
          <button
            onClick={() => setSelectedDayFilter('all')}
            className={`px-2.5 py-1 rounded text-xs font-semibold cursor-pointer ${
              selectedDayFilter === 'all' ? 'bg-[#0F172A] text-white' : 'bg-stone-50 text-stone-600'
            }`}
          >
            All Days
          </button>
          {daysOfWeek.map((d) => (
            <button
              key={d}
              onClick={() => setSelectedDayFilter(d)}
              className={`px-2 py-1 rounded text-xs font-mono font-semibold cursor-pointer ${
                selectedDayFilter === d ? 'bg-amber-700 text-white' : 'bg-stone-50 text-stone-600 hover:bg-stone-100'
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="font-semibold text-stone-500 uppercase text-[10px] tracking-wider shrink-0">Specialty:</span>
          <select
            value={selectedRoleFilter}
            onChange={(e) => setSelectedRoleFilter(e.target.value)}
            className="p-1.5 bg-stone-50 border border-stone-300 rounded text-xs"
          >
            <option value="all">All Specialties</option>
            <option value="Executive Chef">Executive Chef</option>
            <option value="Lead Maitre d'">Lead Maitre d'</option>
            <option value="Sommelier">Sommelier</option>
            <option value="Mixologist">Mixologist</option>
            <option value="Logistics Lead">Logistics Lead</option>
            <option value="Event Coordinator">Event Coordinator</option>
          </select>
        </div>
      </div>

      {/* Staff Roster Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStaff.map((staff) => (
          <div
            key={staff.id}
            className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-bold text-base text-stone-900">{staff.name}</h3>
                  <span className="text-xs font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded inline-block mt-0.5">
                    {staff.role}
                  </span>
                </div>
                <div className="flex items-center gap-1 font-mono text-xs font-bold text-amber-700 bg-amber-50/60 px-2 py-1 rounded">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>{staff.rating}</span>
                </div>
              </div>

              {/* Contact Info */}
              <div className="mt-3 space-y-1 text-xs text-stone-500">
                <p className="flex items-center gap-2 truncate">
                  <Mail className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  <span className="truncate">{staff.email}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  <span>{staff.phone}</span>
                </p>
              </div>

              {/* Skills Tags */}
              <div className="mt-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1.5">
                  Certified Skills & Competencies
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {staff.skills.map((sk, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-sm bg-stone-100 text-stone-700 text-[11px] font-medium"
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              {/* Availability Days */}
              <div className="mt-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1.5">
                  Weekly Shift Availability
                </span>
                <div className="flex items-center gap-1">
                  {daysOfWeek.map((d) => {
                    const isAvail = staff.availableDays.includes(d as any);
                    return (
                      <span
                        key={d}
                        className={`w-7 h-6 rounded flex items-center justify-center text-[10px] font-mono font-semibold ${
                          isAvail
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-stone-100 text-stone-400 opacity-50'
                        }`}
                      >
                        {d[0]}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500 font-mono">
              <span>Active Shifts: <strong>{staff.activeEventsCount} events</strong></span>
              <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                staff.status === 'active' ? 'text-emerald-700 bg-emerald-50' : 'text-stone-500 bg-stone-100'
              }`}>
                {staff.status}
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
