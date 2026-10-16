import { useState } from 'react';
import { Calendar, Clock, MapPin, CheckSquare, Square, AlertOctagon, Utensils, CheckCircle2 } from 'lucide-react';
import { useClemoraStore, ClemoraStore } from '../../services/store.ts';

export function StaffPortal() {
  const store = useClemoraStore();
  const currentStaffUser = store.currentUser;

  // Find staff record if linked or default to first staff
  const staffProfile = store.staff.find((s) => s.email === currentStaffUser.email) || store.staff[0];

  // My assigned bookings
  const myAssignedBookings = store.bookings.filter((b) =>
    b.assignedStaffIds.includes(staffProfile.id)
  );

  // My assigned tasks
  const myTasks = store.tasks.filter((t) => t.assignedToStaffId === staffProfile.id);

  // Incident Modal
  const [isIncidentOpen, setIsIncidentOpen] = useState(false);
  const [incTitle, setIncTitle] = useState('');
  const [incDesc, setIncDesc] = useState('');

  const handleToggleTask = (taskId: string) => {
    ClemoraStore.toggleTaskCompleted(taskId);
  };

  const handleReportIncident = () => {
    if (!incTitle || !incDesc) return;
    const booking = myAssignedBookings[0] || store.bookings[0];
    ClemoraStore.createIncident({
      bookingId: booking.id,
      eventTitle: booking.eventTitle,
      reportedBy: staffProfile.name,
      severity: 'medium',
      title: incTitle,
      description: incDesc,
      status: 'open',
    });
    setIsIncidentOpen(false);
    setIncTitle('');
    setIncDesc('');
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Banner */}
      <div className="bg-[#0F172A] text-white p-6 md:p-8 rounded-2xl border border-stone-800 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
            Operations & Field Crew Portal
          </span>
          <h1 className="text-2xl md:text-3xl font-serif font-bold mt-1">
            Welcome, {staffProfile.name}
          </h1>
          <p className="text-xs md:text-sm text-stone-300 mt-1">
            Role: <strong className="text-white">{staffProfile.role}</strong> · Performance Rating:{' '}
            <strong className="text-amber-400">{staffProfile.rating} ★</strong> · Active Shifts:{' '}
            <strong>{myAssignedBookings.length}</strong>
          </p>
        </div>

        <button
          onClick={() => setIsIncidentOpen(true)}
          className="px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-rose-700 hover:bg-rose-600 text-white shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer self-start md:self-auto"
        >
          <AlertOctagon className="w-4 h-4" />
          <span>Report Live Issue</span>
        </button>
      </div>

      {/* Main Grid: My Shifts vs My Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left: My Assigned Events & Turnaround Stages */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-lg text-stone-900">
              Assigned Event Shifts ({myAssignedBookings.length})
            </h3>
            <span className="text-xs text-stone-500 font-mono">Protected Buffers Locked</span>
          </div>

          <div className="space-y-4">
            {myAssignedBookings.map((b) => (
              <div
                key={b.id}
                className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-3"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-mono text-stone-400">{b.bookingRef}</span>
                    <h4 className="font-bold text-base text-stone-900">{b.eventTitle}</h4>
                    <p className="text-xs text-stone-500">{b.venueName} · {b.guestCount} Guests</p>
                  </div>

                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                    b.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                    b.status === 'preparing' ? 'bg-amber-100 text-amber-800' :
                    b.status === 'ready' ? 'bg-indigo-100 text-indigo-800' :
                    b.status === 'completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-100 text-stone-700'
                  }`}>
                    {b.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-stone-600 bg-stone-50 p-3 rounded-xl font-mono">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-700" />
                    <span>{b.eventDate}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-700" />
                    <span>{b.eventStartTime} - {b.eventEndTime}</span>
                  </div>
                </div>

                {/* Staging & Warewash Reminder */}
                <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-xs text-amber-950 space-y-1">
                  <p className="font-semibold">Turnaround Window Protocol:</p>
                  <p className="text-[11px] text-amber-900">
                    On-Site Staging commences {b.turnaround.onSiteSetupMinutes} mins before doors open. Protected sanitization buffer runs {b.turnaround.warewashSanitizeMinutes} mins post-teardown.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Assigned Operational Checklist */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-lg text-stone-900">
              My Action Items & Checklists ({myTasks.filter((t) => t.completed).length} / {myTasks.length})
            </h3>
            <span className="text-xs text-stone-500">Tap to toggle completion</span>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-3">
            {myTasks.length === 0 ? (
              <p className="text-stone-400 italic text-center py-8 text-xs">
                No active checklist items assigned to your profile today.
              </p>
            ) : (
              myTasks.map((t) => (
                <div
                  key={t.id}
                  onClick={() => handleToggleTask(t.id)}
                  className={`p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer transition-colors ${
                    t.completed
                      ? 'bg-stone-50 border-stone-200 text-stone-400'
                      : 'bg-white border-stone-200 hover:border-amber-400 text-stone-800'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {t.completed ? (
                      <CheckSquare className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Square className="w-4 h-4 text-stone-400" />
                    )}
                  </div>
                  <div className="flex-1 text-xs">
                    <p className={`font-semibold ${t.completed ? 'line-through text-stone-500' : 'text-stone-900'}`}>
                      {t.title}
                    </p>
                    <div className="flex items-center gap-2 text-[10px] text-stone-400 mt-1 font-mono">
                      <span>Due: {t.dueDate} at {t.dueTime}</span>
                      {t.completedAt && (
                        <span className="text-emerald-700 font-semibold">Verified: {t.completedAt}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* Incident Modal */}
      {isIncidentOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-stone-200 p-6 space-y-4 text-xs">
            <h3 className="font-bold text-base text-stone-900">Report Immediate Operational Delay or Hazard</h3>
            <p className="text-stone-500">Alerts Marcus Vance and logs to the operations dashboard.</p>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">Incident Summary</label>
              <input
                type="text"
                placeholder="e.g. Crate latch damaged during van unloading"
                value={incTitle}
                onChange={(e) => setIncTitle(e.target.value)}
                className="w-full p-2.5 border border-stone-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">Details & Current Situation</label>
              <textarea
                rows={3}
                placeholder="Detail what occurred and what assistance or replacement is needed..."
                value={incDesc}
                onChange={(e) => setIncDesc(e.target.value)}
                className="w-full p-2.5 border border-stone-300 rounded-lg"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-200">
              <button
                onClick={() => setIsIncidentOpen(false)}
                className="px-4 py-2 rounded-lg text-stone-600 hover:bg-stone-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleReportIncident}
                className="px-5 py-2 rounded-lg font-bold text-white bg-rose-700 hover:bg-rose-600 cursor-pointer shadow-xs"
              >
                Broadcast Incident Alert
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
