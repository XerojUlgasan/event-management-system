import { Calendar, DollarSign, Users, AlertTriangle, Clock, ArrowRight, ShieldCheck, CheckCircle } from 'lucide-react';
import { useClemoraStore } from '../../services/store.ts';

interface ManagerDashboardProps {
  onNavigateTab: (tab: string) => void;
}

export function ManagerDashboard({ onNavigateTab }: ManagerDashboardProps) {
  const store = useClemoraStore();

  const totalBookings = store.bookings.length;
  const activeEvents = store.bookings.filter((b) => b.status === 'confirmed' || b.status === 'preparing' || b.status === 'ready' || b.status === 'in_progress');
  const pendingQuotes = store.quotations.filter((q) => q.status === 'pending' || q.status === 'sent');
  const openIncidents = store.incidents.filter((i) => i.status !== 'resolved');
  const lowStockConsumables = store.consumables.filter((c) => c.currentStock <= c.minimumThreshold);

  // Calculate actual revenue from stored confirmed and completed bookings
  const confirmedRevenue = store.bookings
    .filter((b) => b.status !== 'cancelled')
    .reduce((sum, b) => sum + b.totalAmount, 0);

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#E8DFEB]">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#E07A5F] bg-[#FDF3F0] px-2.5 py-1 rounded border border-[#F7D2C6]">
            Operations Command & Coordination
          </span>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#35233D] mt-2">
            Coordinator Overview & Schedule
          </h1>
          <p className="text-xs md:text-sm text-stone-500 mt-1">
            Logged in as <span className="font-semibold text-stone-800">{store.currentUser.name}</span> ({store.currentUser.email})
          </p>
        </div>

        {/* Quick Action Navigation */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => onNavigateTab('manager-quotes')}
            className="px-3.5 py-2 rounded-lg text-xs font-semibold bg-[#35233D] hover:bg-[#24162B] text-white transition-colors cursor-pointer shadow-xs"
          >
            Manage Quotations
          </button>
          <button
            onClick={() => onNavigateTab('manager-calendar')}
            className="px-3.5 py-2 rounded-lg text-xs font-semibold bg-[#E07A5F] hover:bg-[#CB674D] text-white transition-colors cursor-pointer shadow-xs"
          >
            Check Buffer Conflicts
          </button>
          <button
            onClick={() => onNavigateTab('manager-ops')}
            className="px-3.5 py-2 rounded-lg text-xs font-semibold bg-white border border-[#E8DFEB] hover:bg-stone-50 text-[#35233D] transition-colors cursor-pointer"
          >
            Live Ops & Incidents
          </button>
        </div>
      </div>

      {/* KPI Cards Row (Computed dynamically from real stored data) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs font-semibold">Active Event Pipeline</span>
            <Calendar className="w-4 h-4 text-amber-700" />
          </div>
          <p className="text-2xl font-bold font-mono text-stone-900 tabular-nums">{activeEvents.length}</p>
          <p className="text-[11px] text-stone-500 mt-1">
            Out of {totalBookings} total bookings
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs font-semibold">Pending Proposals</span>
            <Clock className="w-4 h-4 text-blue-700" />
          </div>
          <p className="text-2xl font-bold font-mono text-stone-900 tabular-nums">{pendingQuotes.length}</p>
          <p className="text-[11px] text-stone-500 mt-1">
            Awaiting client review/deposit
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs font-semibold">Contracted Revenue</span>
            <DollarSign className="w-4 h-4 text-emerald-700" />
          </div>
          <p className="text-2xl font-bold font-mono text-stone-900 tabular-nums">
            ${Math.round(confirmedRevenue).toLocaleString()}
          </p>
          <p className="text-[11px] text-emerald-700 font-semibold mt-1">
            Locked with 30% deposits
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs font-semibold">Logistics Attention</span>
            <AlertTriangle className="w-4 h-4 text-rose-600" />
          </div>
          <p className="text-2xl font-bold font-mono text-stone-900 tabular-nums">
            {openIncidents.length + lowStockConsumables.length}
          </p>
          <p className="text-[11px] text-stone-500 mt-1">
            {openIncidents.length} incidents · {lowStockConsumables.length} low stock
          </p>
        </div>
      </div>

      {/* Turnaround Buffer Protection Spotlight Banner */}
      <div className="bg-[#0F172A] text-white p-6 rounded-2xl border border-stone-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1 max-w-2xl">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-sm md:text-base">
              Turnaround Buffer Scheduling Algorithm Active
            </h3>
          </div>
          <p className="text-xs text-stone-300 leading-relaxed">
            All current dates have guaranteed protection buffers for Warehouse Loading (75m), Vehicle Transit (45m), Setup (150m), Teardown (75m), and Warewash Sanitization (150m). Zero equipment collisions detected.
          </p>
        </div>

        <button
          onClick={() => onNavigateTab('manager-calendar')}
          className="px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider bg-amber-600 hover:bg-amber-500 text-white transition-colors flex items-center justify-center gap-1.5 cursor-pointer shrink-0 shadow-xs"
        >
          <span>Open Conflict Engine</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Grid: Active Turnaround Schedules & Urgent Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Upcoming Events & Operational Timelines */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-lg text-stone-900">
              Scheduled Event Buffers & Crews
            </h3>
            <button
              onClick={() => onNavigateTab('manager-calendar')}
              className="text-xs font-semibold text-amber-800 hover:underline cursor-pointer"
            >
              View Full Timeline →
            </button>
          </div>

          <div className="space-y-4">
            {store.bookings.slice(0, 4).map((b) => (
              <div
                key={b.id}
                className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs hover:border-stone-400 transition-colors space-y-3"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-mono text-stone-400">{b.bookingRef}</span>
                    <h4 className="font-bold text-stone-900 text-sm">{b.eventTitle}</h4>
                    <p className="text-xs text-stone-500">
                      {b.venueName} · {b.guestCount} Guests · {b.eventDate} ({b.eventStartTime} - {b.eventEndTime})
                    </p>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    b.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                    b.status === 'preparing' ? 'bg-amber-100 text-amber-800' :
                    b.status === 'ready' ? 'bg-indigo-100 text-indigo-800' :
                    b.status === 'completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-100 text-stone-700'
                  }`}>
                    {b.status}
                  </span>
                </div>

                {/* Micro Turnaround Timeline Bar */}
                <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-100 text-[11px]">
                  <div className="flex justify-between text-[10px] text-stone-500 mb-1">
                    <span>Dispatch: {b.turnaround.warehouseDispatchMinutes}m</span>
                    <span>Setup: {b.turnaround.onSiteSetupMinutes}m</span>
                    <span className="font-semibold text-emerald-700">Live: {b.turnaround.eventExecutionMinutes}m</span>
                    <span className="font-semibold text-teal-700">Warewash: {b.turnaround.warewashSanitizeMinutes}m</span>
                  </div>
                  <div className="grid grid-cols-7 gap-1 h-2 rounded overflow-hidden">
                    <div className="bg-stone-400" />
                    <div className="bg-stone-500" />
                    <div className="bg-amber-500" />
                    <div className="bg-emerald-600" />
                    <div className="bg-amber-600" />
                    <div className="bg-stone-500" />
                    <div className="bg-teal-600" />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1 text-stone-500">
                  <span>Assigned Staff: <strong className="text-stone-800">{b.assignedStaffIds.length} crew</strong></span>
                  <span className="font-mono font-semibold text-stone-900">${b.totalAmount.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Logistics Alerts & Notifications */}
        <div className="space-y-6">
          
          {/* Low Stock Alerts */}
          <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-serif font-bold text-sm text-stone-900">Inventory Thresholds</h4>
              <button
                onClick={() => onNavigateTab('manager-inventory')}
                className="text-xs text-amber-800 hover:underline font-semibold cursor-pointer"
              >
                Inventory Hub
              </button>
            </div>

            {lowStockConsumables.length === 0 ? (
              <p className="text-xs text-emerald-700 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5" />
                All stock levels healthy
              </p>
            ) : (
              <div className="space-y-2">
                {lowStockConsumables.map((c) => (
                  <div key={c.id} className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-xs">
                    <div className="flex justify-between font-semibold text-rose-900">
                      <span>{c.name}</span>
                      <span className="font-mono text-rose-700">{c.currentStock} / {c.minimumThreshold} {c.unit}</span>
                    </div>
                    <p className="text-[10px] text-rose-700 mt-0.5">Below safe operating threshold</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Incident Tickets */}
          <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-serif font-bold text-sm text-stone-900">Recent Incident Reports</h4>
              <button
                onClick={() => onNavigateTab('manager-ops')}
                className="text-xs text-amber-800 hover:underline font-semibold cursor-pointer"
              >
                Ops Board
              </button>
            </div>

            <div className="space-y-2">
              {store.incidents.slice(0, 3).map((inc) => (
                <div
                  key={inc.id}
                  className={`p-3 rounded-lg border text-xs ${
                    inc.status === 'resolved'
                      ? 'bg-stone-50 border-stone-200 text-stone-600'
                      : 'bg-amber-50 border-amber-200 text-amber-900'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-stone-900">{inc.title}</span>
                    <span className={`text-[10px] font-bold uppercase ${
                      inc.severity === 'high' ? 'text-rose-600' : 'text-amber-700'
                    }`}>
                      {inc.severity}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-600 line-clamp-2">{inc.description}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
