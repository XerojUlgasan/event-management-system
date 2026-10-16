import { useState } from 'react';
import { CheckSquare, Square, AlertOctagon, Plus, CheckCircle2, Clock, ShieldAlert, FileText } from 'lucide-react';
import { useClemoraStore, ClemoraStore } from '../../services/store.ts';
import { EventIncident, IncidentSeverity } from '../../types/clemora.ts';

export function EventOperationsBoard() {
  const store = useClemoraStore();
  const [selectedBookingId, setSelectedBookingId] = useState<string>(store.bookings[0].id);

  // New Incident Modal
  const [isNewIncidentOpen, setIsNewIncidentOpen] = useState(false);
  const [incTitle, setIncTitle] = useState('');
  const [incDesc, setIncDesc] = useState('');
  const [incSeverity, setIncSeverity] = useState<IncidentSeverity>('medium');

  // Resolving Incident Modal
  const [resolvingIncId, setResolvingIncId] = useState<string | null>(null);
  const [resolutionNotes, setResolutionNotes] = useState('');

  const currentBooking = store.bookings.find((b) => b.id === selectedBookingId) || store.bookings[0];
  const bookingTasks = store.tasks.filter((t) => t.bookingId === selectedBookingId);
  const bookingIncidents = store.incidents.filter((i) => i.bookingId === selectedBookingId);

  const handleToggleTask = (taskId: string) => {
    ClemoraStore.toggleTaskCompleted(taskId);
  };

  const handleCreateIncident = () => {
    if (!incTitle || !incDesc) return;
    ClemoraStore.createIncident({
      bookingId: currentBooking.id,
      eventTitle: currentBooking.eventTitle,
      reportedBy: store.currentUser.name,
      severity: incSeverity,
      title: incTitle,
      description: incDesc,
      status: 'open',
    });
    setIsNewIncidentOpen(false);
    setIncTitle('');
    setIncDesc('');
  };

  const handleResolveIncident = () => {
    if (!resolvingIncId || !resolutionNotes) return;
    ClemoraStore.resolveIncident(resolvingIncId, resolutionNotes);
    setResolvingIncId(null);
    setResolutionNotes('');
  };

  const handleStatusChange = (newStatus: any) => {
    ClemoraStore.updateBookingStatus(currentBooking.id, newStatus);
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
            Module 7 · On-Site Operations
          </span>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-stone-900 mt-2">
            Event Operations, Checklists & Incidents
          </h1>
          <p className="text-xs md:text-sm text-stone-500 mt-1">
            Real-time staging checklist execution, live milestone progression, and incident resolution tracking.
          </p>
        </div>

        <button
          onClick={() => setIsNewIncidentOpen(true)}
          className="px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-rose-700 hover:bg-rose-600 text-white shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer self-start md:self-auto"
        >
          <AlertOctagon className="w-4 h-4" />
          <span>Report On-Site Incident</span>
        </button>
      </div>

      {/* Booking Selector Pill Bar */}
      <div className="bg-white p-3 rounded-xl border border-stone-200 shadow-xs flex items-center gap-2 overflow-x-auto text-xs">
        <span className="font-semibold text-stone-400 uppercase text-[10px] tracking-wider shrink-0 px-2">
          Select Event:
        </span>
        {store.bookings.map((b) => (
          <button
            key={b.id}
            onClick={() => setSelectedBookingId(b.id)}
            className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              selectedBookingId === b.id
                ? 'bg-[#0F172A] text-white shadow-xs'
                : 'bg-stone-50 text-stone-600 hover:bg-stone-100'
            }`}
          >
            {b.eventTitle} ({b.eventDate})
          </button>
        ))}
      </div>

      {/* Live Event Milestone Pipeline */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-serif font-bold text-base text-stone-900">
              Live Milestone Status: {currentBooking.eventTitle}
            </h3>
            <p className="text-xs text-stone-500">{currentBooking.venueName} · {currentBooking.guestCount} Guests</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-500">Current Phase:</span>
            <select
              value={currentBooking.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="p-1.5 bg-stone-50 border border-stone-300 rounded-lg text-xs font-bold uppercase text-stone-900"
            >
              <option value="inquiry">Inquiry</option>
              <option value="confirmed">Confirmed</option>
              <option value="preparing">Preparing (Kitchen & Dock)</option>
              <option value="ready">Ready (Staging Complete)</option>
              <option value="in_progress">In Progress (Live Dining)</option>
              <option value="completed">Completed (Warewash Safe)</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Milestone Steps */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2 text-center text-xs">
          {[
            { id: 'confirmed', label: '1. Confirmed', desc: 'Buffers locked' },
            { id: 'preparing', label: '2. Preparing', desc: 'Loading & Prep' },
            { id: 'ready', label: '3. Ready', desc: 'Table Staging' },
            { id: 'in_progress', label: '4. Live Dining', desc: 'Course Pacing' },
            { id: 'completed', label: '5. Completed', desc: 'Sanitization Done' },
          ].map((st, idx) => {
            const isCurrent = currentBooking.status === st.id;
            return (
              <div
                key={st.id}
                className={`p-3 rounded-xl border transition-all ${
                  isCurrent
                    ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-400 font-bold text-amber-950'
                    : 'bg-stone-50 border-stone-200 text-stone-600'
                }`}
              >
                <p className="font-semibold">{st.label}</p>
                <span className="text-[10px] text-stone-400 block mt-0.5">{st.desc}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Preparation Checklist vs Incidents */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Preparation Checklist */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200">
            <div>
              <h3 className="font-serif font-bold text-base text-stone-900">
                Operational Task Checklist
              </h3>
              <p className="text-xs text-stone-500">Tasks assigned across culinary, dock, and floor captains</p>
            </div>
            <span className="text-xs font-mono font-bold bg-amber-50 text-amber-800 px-2.5 py-1 rounded">
              {bookingTasks.filter((t) => t.completed).length} / {bookingTasks.length} Completed
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            {bookingTasks.length === 0 ? (
              <p className="text-stone-400 italic py-4 text-center">No tasks currently assigned for this event.</p>
            ) : (
              bookingTasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => handleToggleTask(task.id)}
                  className={`p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer transition-colors ${
                    task.completed
                      ? 'bg-stone-50 border-stone-200 text-stone-400'
                      : 'bg-white border-stone-200 hover:border-amber-400 text-stone-800 shadow-2xs'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {task.completed ? (
                      <CheckSquare className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Square className="w-4 h-4 text-stone-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`font-semibold ${task.completed ? 'line-through text-stone-500' : 'text-stone-900'}`}>
                      {task.title}
                    </p>
                    <div className="flex items-center gap-3 text-[10px] text-stone-400 mt-1 font-mono">
                      <span>Assigned: <strong>{task.assignedToName || 'Unassigned'}</strong></span>
                      <span>Due: {task.dueDate} {task.dueTime}</span>
                      {task.completedAt && (
                        <span className="text-emerald-700 font-semibold">Done: {task.completedAt}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Incidents & Operational Tickets */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200">
            <div>
              <h3 className="font-serif font-bold text-base text-stone-900">
                Incident & Delay Reporting
              </h3>
              <p className="text-xs text-stone-500">Live operational logs, elevator issues, crate breakage</p>
            </div>
            <button
              onClick={() => setIsNewIncidentOpen(true)}
              className="text-xs font-semibold text-rose-700 hover:underline cursor-pointer"
            >
              + Log Incident
            </button>
          </div>

          <div className="space-y-3 text-xs">
            {bookingIncidents.length === 0 ? (
              <div className="p-8 text-center bg-stone-50 rounded-xl text-stone-400 italic">
                Zero incidents recorded for this event. Flawless execution.
              </div>
            ) : (
              bookingIncidents.map((inc) => (
                <div
                  key={inc.id}
                  className={`p-4 rounded-xl border space-y-2 ${
                    inc.status === 'resolved'
                      ? 'bg-emerald-50/50 border-emerald-200 text-stone-700'
                      : 'bg-rose-50/50 border-rose-200 text-stone-900'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        inc.severity === 'high' ? 'bg-rose-600 text-white' : 'bg-amber-600 text-white'
                      }`}>
                        {inc.severity} Severity
                      </span>
                      <h4 className="font-bold text-sm text-stone-900 mt-1">{inc.title}</h4>
                      <p className="text-[10px] text-stone-400">Reported by {inc.reportedBy} at {inc.createdAt}</p>
                    </div>

                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      inc.status === 'resolved' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {inc.status}
                    </span>
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed">{inc.description}</p>

                  {inc.resolutionNotes ? (
                    <div className="p-2.5 rounded bg-white border border-stone-200 text-[11px] text-stone-700">
                      <strong className="text-emerald-800">Resolution Sign-off:</strong> {inc.resolutionNotes}
                      <span className="text-[10px] text-stone-400 block mt-0.5 font-mono">Resolved on {inc.resolvedAt}</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => setResolvingIncId(inc.id)}
                      className="px-3 py-1 rounded bg-[#0F172A] hover:bg-emerald-700 text-white text-[11px] font-semibold transition-colors cursor-pointer"
                    >
                      Resolve Incident
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* New Incident Modal */}
      {isNewIncidentOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-stone-200 p-6 space-y-4 text-xs">
            <h3 className="font-bold text-base text-stone-900">Report Operational Incident / Delay</h3>
            <p className="text-stone-500">Event: {currentBooking.eventTitle}</p>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">Severity Level</label>
              <select
                value={incSeverity}
                onChange={(e) => setIncSeverity(e.target.value as any)}
                className="w-full p-2 border border-stone-300 rounded-lg"
              >
                <option value="low">Low (Minor transit wobble, 10m setup delay)</option>
                <option value="medium">Medium (Freight elevator overlap, power restriction)</option>
                <option value="high">High (Broken chafer crate, guest count surge)</option>
                <option value="critical">Critical (Severe venue hazard, immediate escalation)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">Incident Headline</label>
              <input
                type="text"
                placeholder="e.g. Venue freight lift out of order until 16:00"
                value={incTitle}
                onChange={(e) => setIncTitle(e.target.value)}
                className="w-full p-2.5 border border-stone-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">Detailed Description & Impact</label>
              <textarea
                rows={3}
                placeholder="Describe current status and mitigation steps taken..."
                value={incDesc}
                onChange={(e) => setIncDesc(e.target.value)}
                className="w-full p-2.5 border border-stone-300 rounded-lg"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-200">
              <button
                onClick={() => setIsNewIncidentOpen(false)}
                className="px-4 py-2 rounded-lg text-stone-600 hover:bg-stone-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateIncident}
                className="px-5 py-2 rounded-lg font-bold text-white bg-rose-700 hover:bg-rose-600 cursor-pointer shadow-xs"
              >
                Submit Incident Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Resolve Incident Modal */}
      {resolvingIncId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-stone-200 p-6 space-y-4 text-xs">
            <h3 className="font-bold text-base text-stone-900">Resolve Operational Incident</h3>
            <p className="text-stone-500">Provide resolution notes and corrective actions taken.</p>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">Resolution Summary</label>
              <textarea
                rows={3}
                placeholder="e.g. Freight elevator bypassed via service ramp. Staging window preserved."
                value={resolutionNotes}
                onChange={(e) => setResolutionNotes(e.target.value)}
                className="w-full p-2.5 border border-stone-300 rounded-lg"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-200">
              <button
                onClick={() => setResolvingIncId(null)}
                className="px-4 py-2 rounded-lg text-stone-600 hover:bg-stone-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleResolveIncident}
                className="px-5 py-2 rounded-lg font-bold text-white bg-emerald-700 hover:bg-emerald-600 cursor-pointer shadow-xs"
              >
                Sign Off & Close Ticket
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
