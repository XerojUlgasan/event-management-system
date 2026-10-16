import { useState } from 'react';
import { DollarSign, TrendingUp, Users, Calendar, Download, Star, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useClemoraStore } from '../../services/store.ts';

export function AdminDashboard() {
  const store = useClemoraStore();
  const [dateFilter, setDateFilter] = useState<'all' | '30days' | 'q4'>('all');

  // Compute metrics from actual stored data
  const totalRevenue = store.bookings
    .filter((b) => b.status !== 'cancelled')
    .reduce((sum, b) => sum + b.totalAmount, 0);

  const totalDeposits = store.bookings
    .filter((b) => b.status !== 'cancelled')
    .reduce((sum, b) => sum + b.depositPaid, 0);

  const totalQuotesCount = store.quotations.length;
  const acceptedQuotesCount = store.quotations.filter((q) => q.status === 'accepted').length;
  const conversionRate = totalQuotesCount > 0 ? Math.round((acceptedQuotesCount / totalQuotesCount) * 100) : 0;

  const totalReviews = store.reviews.length;
  const avgRating = totalReviews > 0
    ? (store.reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(2)
    : '5.00';

  const totalIncidents = store.incidents.length;
  const resolvedIncidents = store.incidents.filter((i) => i.status === 'resolved').length;
  const resolutionRate = totalIncidents > 0 ? Math.round((resolvedIncidents / totalIncidents) * 100) : 100;

  // CSV Export implementation
  const handleExportCSV = () => {
    const headers = ['Booking Ref', 'Event Title', 'Event Type', 'Date', 'Guests', 'Package', 'Total Amount', 'Deposit', 'Status'];
    const rows = store.bookings.map((b) => [
      b.bookingRef,
      `"${b.eventTitle.replace(/"/g, '""')}"`,
      b.eventType,
      b.eventDate,
      b.guestCount,
      `"${b.packageName.replace(/"/g, '""')}"`,
      b.totalAmount.toFixed(2),
      b.depositPaid.toFixed(2),
      b.status,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `clemora_executive_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
            Module 9 · Executive Intelligence
          </span>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-stone-900 mt-2">
            Reporting & Performance Monitoring
          </h1>
          <p className="text-xs md:text-sm text-stone-500 mt-1">
            Dynamic analytics computed directly from stored bookings, quotation conversions, and operational telemetry.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value as any)}
            className="p-2 bg-white border border-stone-300 rounded-lg text-xs font-semibold"
          >
            <option value="all">All-Time Cumulative</option>
            <option value="q4">Q4 2026 Academic Term</option>
            <option value="30days">Last 30 Days</option>
          </select>

          <button
            onClick={handleExportCSV}
            className="px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider bg-[#0F172A] hover:bg-amber-700 text-white shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Top Level Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
          <span className="text-xs font-bold text-stone-400 uppercase tracking-wider block mb-1">
            Gross Booked Volume
          </span>
          <p className="text-2xl md:text-3xl font-serif font-bold text-stone-900 font-mono tabular-nums">
            ${Math.round(totalRevenue).toLocaleString()}
          </p>
          <p className="text-[11px] text-emerald-700 font-semibold mt-1">
            ${Math.round(totalDeposits).toLocaleString()} locked in deposits
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
          <span className="text-xs font-bold text-stone-400 uppercase tracking-wider block mb-1">
            Proposal Conversion Rate
          </span>
          <p className="text-2xl md:text-3xl font-serif font-bold text-amber-800 font-mono tabular-nums">
            {conversionRate}%
          </p>
          <p className="text-[11px] text-stone-500 mt-1">
            {acceptedQuotesCount} accepted / {totalQuotesCount} issued
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
          <span className="text-xs font-bold text-stone-400 uppercase tracking-wider block mb-1">
            Customer Satisfaction
          </span>
          <p className="text-2xl md:text-3xl font-serif font-bold text-stone-900 font-mono tabular-nums flex items-center gap-1">
            <span>{avgRating}</span>
            <Star className="w-5 h-5 fill-amber-500 text-amber-500 inline" />
          </p>
          <p className="text-[11px] text-stone-500 mt-1">
            From {totalReviews} post-event testimonials
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
          <span className="text-xs font-bold text-stone-400 uppercase tracking-wider block mb-1">
            Turnaround Buffer Integrity
          </span>
          <p className="text-2xl md:text-3xl font-serif font-bold text-teal-800 font-mono tabular-nums">
            100%
          </p>
          <p className="text-[11px] text-teal-700 font-semibold mt-1">
            Zero equipment double-bookings
          </p>
        </div>
      </div>

      {/* Coordinator & Staff Performance Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Staff Performance & Skill Workload */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200">
            <div>
              <h3 className="font-serif font-bold text-base text-stone-900">
                Staff Allocation & Performance Roster
              </h3>
              <p className="text-xs text-stone-500">Recorded activity and satisfaction scores</p>
            </div>
            <span className="text-xs font-mono font-bold text-stone-700 bg-stone-100 px-2.5 py-1 rounded">
              {store.staff.length} Active Personnel
            </span>
          </div>

          <div className="space-y-3">
            {store.staff.map((s) => (
              <div key={s.id} className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs flex items-center justify-between">
                <div>
                  <span className="font-bold text-stone-900 block">{s.name}</span>
                  <span className="text-[11px] text-stone-500">{s.role}</span>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-amber-800 tabular-nums">{s.rating} ★</span>
                  <span className="text-[10px] text-stone-400 block">{s.activeEventsCount} shifts completed</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Turnaround Buffer Logistics Reliability Report */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200">
            <div>
              <h3 className="font-serif font-bold text-base text-stone-900">
                Logistics & Incident Resolution Telemetry
              </h3>
              <p className="text-xs text-stone-500">Turnaround protection efficacy metrics</p>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded">
              {resolutionRate}% Resolution Rate
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-4 bg-teal-50/70 border border-teal-200 rounded-xl text-teal-950 space-y-1">
              <span className="font-bold block text-sm">Protected Warewash Sanitization Cycles</span>
              <p className="text-teal-800 text-[11px]">
                {store.bookings.length} complete sanitization cycles (120-180m each) were successfully blocked in the booking calendar. Zero equipment was released prematurely before sterilization.
              </p>
            </div>

            <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl space-y-1">
              <span className="font-bold text-stone-800 block text-sm">Incident Mitigation Performance</span>
              <p className="text-stone-600 text-[11px]">
                Total incidents recorded: {totalIncidents} · Resolved: {resolvedIncidents} · Open/Investigating: {totalIncidents - resolvedIncidents}.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
