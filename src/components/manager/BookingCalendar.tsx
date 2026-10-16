import { useState } from 'react';
import { Calendar as CalendarIcon, Clock, ShieldCheck, AlertOctagon, CheckCircle2, Plus, Users, MapPin, XCircle, ArrowRight } from 'lucide-react';
import { useClemoraStore, ClemoraStore } from '../../services/store.ts';
import { Booking } from '../../types/clemora.ts';

export function BookingCalendar() {
  const store = useClemoraStore();
  const [selectedDate, setSelectedDate] = useState<string>('2026-11-14');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(store.bookings[0]);

  // Conflict Detector Simulator State
  const [testDate, setTestDate] = useState<string>('2026-10-24');
  const [testStartTime, setTestStartTime] = useState<string>('18:00');
  const [testEndTime, setTestEndTime] = useState<string>('22:00');
  const [conflictResult, setConflictResult] = useState<{ hasConflict: boolean; conflictingBookings: Booking[]; reason?: string } | null>(null);

  // New Booking Modal State
  const [isNewBookingModalOpen, setIsNewBookingModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCustomerName, setNewCustomerName] = useState('');
  const [newCustomerEmail, setNewCustomerEmail] = useState('');
  const [newDate, setNewDate] = useState('2026-12-10');
  const [newGuests, setNewGuests] = useState(75);
  const [newPackageId, setNewPackageId] = useState(store.packages[0].id);
  const [newVenue, setNewVenue] = useState('Grand Pavilion');

  // Cancellation Modal State
  const [cancellingBookingId, setCancellingBookingId] = useState<string | null>(null);
  const [cancellationReason, setCancellationReason] = useState('');

  const handleRunConflictCheck = () => {
    const result = ClemoraStore.checkSchedulingConflicts(testDate, testStartTime, testEndTime);
    setConflictResult(result);
  };

  const handleCreateBooking = () => {
    if (!newTitle || !newCustomerName) return;

    // Check conflict first
    const check = ClemoraStore.checkSchedulingConflicts(newDate, '18:00', '22:30');
    if (check.hasConflict) {
      alert(`Conflict Detected: ${check.reason}`);
      return;
    }

    ClemoraStore.createBooking({
      eventTitle: newTitle,
      customerName: newCustomerName,
      customerEmail: newCustomerEmail || 'client@example.com',
      eventDate: newDate,
      eventStartTime: '18:00',
      eventEndTime: '22:30',
      guestCount: newGuests,
      packageId: newPackageId,
      venueName: newVenue,
    });

    setIsNewBookingModalOpen(false);
    setNewTitle('');
    setNewCustomerName('');
  };

  const handleConfirmCancel = () => {
    if (!cancellingBookingId) return;
    ClemoraStore.updateBookingStatus(cancellingBookingId, 'cancelled', cancellationReason || 'Client requested cancellation.');
    setCancellingBookingId(null);
    setCancellationReason('');
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
            Module 4 · Turnaround Buffer Scheduling
          </span>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-stone-900 mt-2">
            Event Calendar & Collision Detection Engine
          </h1>
          <p className="text-xs md:text-sm text-stone-500 mt-1">
            Simulate proposed event timings, detect protected turnaround window overlaps, and guarantee zero equipment double-booking.
          </p>
        </div>

        <button
          onClick={() => setIsNewBookingModalOpen(true)}
          className="px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-amber-700 hover:bg-amber-600 text-white shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Scheduled Event</span>
        </button>
      </div>

      {/* Interactive Conflict Detector Card (Research Core) */}
      <div className="bg-white rounded-2xl border-2 border-stone-800 p-6 shadow-md">
        <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-4">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-6 h-6 text-amber-600" />
            <div>
              <h3 className="font-serif font-bold text-base text-stone-900">
                Turnaround Buffer Conflict Simulator
              </h3>
              <p className="text-xs text-stone-500">
                Validates: 75m Loading Dock + 45m Transit + 150m Staging + Active Hours + 75m Teardown + 45m Return + 150m Warewash Sanitization
              </p>
            </div>
          </div>
          <span className="hidden sm:inline-block px-2.5 py-1 rounded text-[11px] font-mono font-bold bg-amber-50 text-amber-800 border border-amber-200">
            Real-Time Collision Algorithm
          </span>
        </div>

        {/* Simulator Form */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end text-xs">
          <div>
            <label className="block font-bold text-stone-700 mb-1">Target Date</label>
            <input
              type="date"
              value={testDate}
              onChange={(e) => setTestDate(e.target.value)}
              className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg font-mono focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <div>
            <label className="block font-bold text-stone-700 mb-1">Proposed Start Time</label>
            <input
              type="time"
              value={testStartTime}
              onChange={(e) => setTestStartTime(e.target.value)}
              className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg font-mono focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <div>
            <label className="block font-bold text-stone-700 mb-1">Proposed End Time</label>
            <input
              type="time"
              value={testEndTime}
              onChange={(e) => setTestEndTime(e.target.value)}
              className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg font-mono focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <div>
            <button
              onClick={handleRunConflictCheck}
              className="w-full py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-[#0F172A] hover:bg-amber-700 text-white transition-colors cursor-pointer shadow-xs flex items-center justify-center gap-2"
            >
              <span>Execute Conflict Check</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Conflict Check Output Box */}
        {conflictResult && (
          <div className="mt-5 p-4 rounded-xl text-xs transition-all">
            {conflictResult.hasConflict ? (
              <div className="bg-rose-50 border border-rose-300 text-rose-900 p-4 rounded-xl space-y-2">
                <div className="flex items-center gap-2 font-bold text-rose-800 text-sm">
                  <AlertOctagon className="w-5 h-5 text-rose-600" />
                  <span>LOGISTICAL OVERLAP DETECTED (Turnaround Buffer Blocked)</span>
                </div>
                <p className="leading-relaxed">{conflictResult.reason}</p>
                <div className="p-3 bg-white/80 rounded-lg border border-rose-200 mt-2">
                  <span className="font-semibold text-rose-950">Conflicting Locked Event:</span>{' '}
                  {conflictResult.conflictingBookings[0].eventTitle} on {conflictResult.conflictingBookings[0].eventDate} ({conflictResult.conflictingBookings[0].eventStartTime} - {conflictResult.conflictingBookings[0].eventEndTime})
                </div>
              </div>
            ) : (
              <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 p-4 rounded-xl flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                <div>
                  <p className="font-bold text-emerald-800 text-sm">RUNWAY 100% CLEAR · ZERO COLLISION RISKS</p>
                  <p className="text-emerald-700 mt-0.5">
                    No warewash sanitization buffer or transit overlap on {testDate} between {testStartTime} and {testEndTime}. Staging crew and chafing dishes are safely allocated.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Main Calendar / Event List Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Scheduled Event Cards */}
        <div className="lg:col-span-1 space-y-3">
          <h3 className="font-serif font-bold text-base text-stone-900 mb-2">
            Scheduled Events Timeline
          </h3>

          <div className="space-y-3 max-h-[640px] overflow-y-auto pr-1">
            {store.bookings.map((b) => {
              const isSelected = selectedBooking?.id === b.id;
              const isCancelled = b.status === 'cancelled';
              return (
                <div
                  key={b.id}
                  onClick={() => setSelectedBooking(b)}
                  className={`p-4 rounded-xl border text-xs cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-amber-50/70 border-amber-500 shadow-xs ring-1 ring-amber-400'
                      : 'bg-white border-stone-200 hover:border-stone-300'
                  } ${isCancelled ? 'opacity-60 bg-stone-100' : ''}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-mono text-[10px] text-stone-400">{b.bookingRef}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      b.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                      b.status === 'preparing' ? 'bg-amber-100 text-amber-800' :
                      b.status === 'ready' ? 'bg-indigo-100 text-indigo-800' :
                      b.status === 'completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {b.status}
                    </span>
                  </div>

                  <h4 className="font-bold text-stone-900 text-sm mt-1">{b.eventTitle}</h4>
                  <p className="text-stone-500 text-[11px] mt-0.5">{b.venueName}</p>

                  <div className="flex items-center gap-3 text-[11px] text-stone-600 mt-2 font-mono">
                    <div className="flex items-center gap-1">
                      <CalendarIcon className="w-3 h-3 text-amber-700" />
                      <span>{b.eventDate}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-700" />
                      <span>{b.eventStartTime}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 2 Columns: Selected Booking Deep-Dive & 7-Stage Buffer Inspector */}
        <div className="lg:col-span-2">
          {selectedBooking ? (
            <div className="bg-white rounded-2xl border border-stone-200 p-6 md:p-8 space-y-6 shadow-xs">
              
              {/* Header */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-stone-200">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-semibold text-stone-400">{selectedBooking.bookingRef}</span>
                    <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded uppercase">
                      {selectedBooking.eventType}
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-xl text-stone-900 mt-1">{selectedBooking.eventTitle}</h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Client: {selectedBooking.customerName} ({selectedBooking.customerEmail})
                  </p>
                </div>

                {selectedBooking.status !== 'cancelled' && (
                  <button
                    onClick={() => setCancellingBookingId(selectedBooking.id)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors cursor-pointer"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Cancel Event</span>
                  </button>
                )}
              </div>

              {/* Event Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-stone-50 p-4 rounded-xl border border-stone-200 text-xs">
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase font-bold">Date & Active Hours</span>
                  <p className="font-semibold text-stone-900">{selectedBooking.eventDate}</p>
                  <p className="font-mono text-stone-600">{selectedBooking.eventStartTime} - {selectedBooking.eventEndTime}</p>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase font-bold">Venue Location</span>
                  <p className="font-semibold text-stone-900 truncate">{selectedBooking.venueName}</p>
                  <p className="text-stone-600 truncate">{selectedBooking.venueAddress || 'Confirmed address'}</p>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase font-bold">Guest Scale</span>
                  <p className="font-semibold text-stone-900 font-mono">{selectedBooking.guestCount} Guests</p>
                  <p className="text-stone-600">{selectedBooking.packageName}</p>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase font-bold">Contracted Value</span>
                  <p className="font-semibold text-stone-900 font-mono">${selectedBooking.totalAmount.toLocaleString()}</p>
                  <p className="text-emerald-700 font-semibold font-mono">Deposit: ${selectedBooking.depositPaid.toLocaleString()}</p>
                </div>
              </div>

              {/* 7-Stage Turnaround Buffer Breakdown */}
              <div>
                <h4 className="font-bold text-stone-900 text-sm mb-3 flex items-center justify-between">
                  <span>Protected Turnaround Buffer Timeline Stages</span>
                  <span className="text-[11px] text-amber-700 font-normal font-mono">Guaranteed Zero Collision Window</span>
                </h4>

                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-stone-100 rounded-lg flex items-center justify-between">
                    <span className="font-semibold text-stone-800">1. Warehouse Loading Dock & Barcode Dispatch</span>
                    <span className="font-mono text-stone-600">{selectedBooking.turnaround.warehouseDispatchMinutes} mins</span>
                  </div>
                  <div className="p-3 bg-stone-100 rounded-lg flex items-center justify-between">
                    <span className="font-semibold text-stone-800">2. Transport Vehicle Transit to Venue</span>
                    <span className="font-mono text-stone-600">{selectedBooking.turnaround.transitToVenueMinutes} mins</span>
                  </div>
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-center justify-between text-amber-900">
                    <span className="font-semibold">3. On-Site Kitchen Staging & Tablescape Setup</span>
                    <span className="font-mono font-bold">{selectedBooking.turnaround.onSiteSetupMinutes} mins</span>
                  </div>
                  <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-lg flex items-center justify-between text-emerald-950">
                    <span className="font-bold">4. LIVE EVENT EXECUTION & DINING SERVICE</span>
                    <span className="font-mono font-bold text-emerald-800">{selectedBooking.turnaround.eventExecutionMinutes} mins</span>
                  </div>
                  <div className="p-3 bg-stone-100 rounded-lg flex items-center justify-between">
                    <span className="font-semibold text-stone-800">5. Teardown, Glassware Crate Packing & Retrieval</span>
                    <span className="font-mono text-stone-600">{selectedBooking.turnaround.teardownMinutes} mins</span>
                  </div>
                  <div className="p-3 bg-stone-100 rounded-lg flex items-center justify-between">
                    <span className="font-semibold text-stone-800">6. Return Transit to Central Warehouse</span>
                    <span className="font-mono text-stone-600">{selectedBooking.turnaround.returnTransitMinutes} mins</span>
                  </div>
                  <div className="p-3 bg-teal-50 border-2 border-teal-400 rounded-lg flex items-center justify-between text-teal-950 shadow-xs">
                    <div>
                      <span className="font-bold block">7. MANDATORY WAREWASH, INSPECTION & SANITIZATION BUFFER</span>
                      <span className="text-[10px] text-teal-700">Protected algorithmically—equipment cannot be allocated to another event until complete.</span>
                    </div>
                    <span className="font-mono font-bold text-teal-800">{selectedBooking.turnaround.warewashSanitizeMinutes} mins</span>
                  </div>
                </div>
              </div>

              {/* Assigned Staff & Equipment */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-stone-200 text-xs">
                <div>
                  <h5 className="font-bold text-stone-800 mb-2">Assigned Hospitality & Kitchen Crew</h5>
                  <div className="space-y-1.5">
                    {selectedBooking.assignedStaffIds.map((id) => {
                      const stf = store.staff.find((s) => s.id === id);
                      if (!stf) return null;
                      return (
                        <div key={id} className="flex items-center justify-between p-2 rounded bg-stone-50 border border-stone-200">
                          <div>
                            <span className="font-bold text-stone-900">{stf.name}</span>
                            <span className="text-[10px] text-stone-500 block">{stf.role}</span>
                          </div>
                          <span className="font-mono text-amber-700 font-semibold">{stf.rating} ★</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <h5 className="font-bold text-stone-800 mb-2">Allocated Equipment Sets</h5>
                  <div className="space-y-1.5">
                    {selectedBooking.allocatedEquipmentIds.map((id) => {
                      const eq = store.equipment.find((e) => e.id === id);
                      if (!eq) return null;
                      return (
                        <div key={id} className="flex items-center justify-between p-2 rounded bg-stone-50 border border-stone-200">
                          <span className="font-semibold text-stone-800">{eq.name}</span>
                          <span className="font-mono text-[11px] text-stone-500">{eq.condition}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center text-stone-400">
              Select an event to inspect its turnaround buffer stages and crew allocations.
            </div>
          )}
        </div>

      </div>

      {/* New Booking Modal */}
      {isNewBookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-stone-200 p-6 md:p-8 space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <h3 className="font-bold text-base text-stone-900">Schedule New Event Booking</h3>
              <button onClick={() => setIsNewBookingModalOpen(false)} className="text-stone-400 text-lg cursor-pointer">&times;</button>
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">Event Title</label>
              <input
                type="text"
                placeholder="e.g. Apex Global Autumn Summit"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full p-2.5 border border-stone-300 rounded-lg"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Client Name</label>
                <input
                  type="text"
                  placeholder="e.g. Elena Rostova"
                  value={newCustomerName}
                  onChange={(e) => setNewCustomerName(e.target.value)}
                  className="w-full p-2.5 border border-stone-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Client Email</label>
                <input
                  type="email"
                  placeholder="e.g. client@company.com"
                  value={newCustomerEmail}
                  onChange={(e) => setNewCustomerEmail(e.target.value)}
                  className="w-full p-2.5 border border-stone-300 rounded-lg"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Date</label>
                <input
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full p-2.5 border border-stone-300 rounded-lg font-mono"
                />
              </div>
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Guests</label>
                <input
                  type="number"
                  value={newGuests}
                  onChange={(e) => setNewGuests(Number(e.target.value))}
                  className="w-full p-2.5 border border-stone-300 rounded-lg font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">Culinary Package</label>
              <select
                value={newPackageId}
                onChange={(e) => setNewPackageId(e.target.value)}
                className="w-full p-2.5 border border-stone-300 rounded-lg"
              >
                {store.packages.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} (${p.pricePerGuest}/guest)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">Venue Location</label>
              <input
                type="text"
                placeholder="e.g. Grand Terrace Ballroom"
                value={newVenue}
                onChange={(e) => setNewVenue(e.target.value)}
                className="w-full p-2.5 border border-stone-300 rounded-lg"
              />
            </div>

            <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-amber-900 text-[11px]">
              Turnaround Buffer Scheduling will automatically reserve 75m dispatch, 150m staging, and 150m sanitization around this event.
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-200">
              <button
                onClick={() => setIsNewBookingModalOpen(false)}
                className="px-4 py-2 rounded-lg text-stone-600 hover:bg-stone-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateBooking}
                className="px-5 py-2 rounded-lg font-bold text-white bg-amber-700 hover:bg-amber-600 cursor-pointer shadow-xs"
              >
                Confirm & Lock Buffers
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancellation Modal */}
      {cancellingBookingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-stone-200 p-6 space-y-4 text-xs">
            <h3 className="font-bold text-base text-stone-900">Confirm Booking Cancellation</h3>
            <p className="text-stone-600">
              Cancelling will release the allocated equipment and turnaround staging window back into availability.
            </p>
            <div>
              <label className="block font-semibold text-stone-700 mb-1">Cancellation Reason</label>
              <textarea
                rows={3}
                value={cancellationReason}
                onChange={(e) => setCancellationReason(e.target.value)}
                placeholder="e.g. Client requested postponement to Spring 2027"
                className="w-full p-2.5 border border-stone-300 rounded-lg focus:ring-2 focus:ring-rose-500"
              />
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setCancellingBookingId(null)}
                className="px-4 py-2 rounded-lg text-stone-600 hover:bg-stone-100 cursor-pointer"
              >
                Keep Booking
              </button>
              <button
                onClick={handleConfirmCancel}
                className="px-5 py-2 rounded-lg font-bold text-white bg-rose-700 hover:bg-rose-600 cursor-pointer"
              >
                Confirm Cancellation
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
