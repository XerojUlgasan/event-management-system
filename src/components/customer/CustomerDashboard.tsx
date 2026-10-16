import { useState } from 'react';
import { Calendar, Clock, MapPin, Users, FileText, CheckCircle2, Star, Eye, Shield, AlertCircle, MessageSquare } from 'lucide-react';
import { useClemoraStore, ClemoraStore } from '../../services/store.ts';
import { Booking, Quotation } from '../../types/clemora.ts';
import { PrintableQuoteModal } from '../common/PrintableQuoteModal.tsx';

interface CustomerDashboardProps {
  onOpenEstimator: () => void;
  onOpenAIChat: () => void;
}

export function CustomerDashboard({ onOpenEstimator, onOpenAIChat }: CustomerDashboardProps) {
  const store = useClemoraStore();
  const [selectedQuote, setSelectedQuote] = useState<Quotation | null>(null);
  const [selectedBookingForReview, setSelectedBookingForReview] = useState<Booking | null>(null);

  // Review state
  const [rating, setRating] = useState<number>(5);
  const [foodRating, setFoodRating] = useState<number>(5);
  const [serviceRating, setServiceRating] = useState<number>(5);
  const [reviewComment, setReviewComment] = useState<string>('');
  const [reviewSubmitted, setReviewSubmitted] = useState<boolean>(false);

  // Filter bookings for current user or show relevant customer bookings
  const myBookings = store.bookings;
  const myQuotes = store.quotations;

  const handleOpenReview = (b: Booking) => {
    setSelectedBookingForReview(b);
    setReviewSubmitted(false);
    setReviewComment('');
  };

  const handleSubmitReview = () => {
    if (!selectedBookingForReview) return;
    ClemoraStore.addReview({
      bookingId: selectedBookingForReview.id,
      customerName: store.currentUser.name,
      eventName: selectedBookingForReview.eventTitle,
      eventDate: selectedBookingForReview.eventDate,
      rating,
      foodRating,
      serviceRating,
      coordinationRating: 5,
      comment: reviewComment || 'Exquisite presentation and flawless turnaround timing.',
      isPublished: true,
    });
    setReviewSubmitted(true);
    setTimeout(() => {
      setSelectedBookingForReview(null);
    }, 1500);
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#24162B] via-[#35233D] to-[#432A4E] text-white rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-md border border-purple-900/40">
        <div>
          <span className="text-xs uppercase tracking-widest font-semibold text-[#E07A5F]">
            Customer Hospitality Portal
          </span>
          <h1 className="text-2xl md:text-3xl font-serif font-bold mt-1">
            Welcome back, {store.currentUser.name}
          </h1>
          <p className="text-purple-100/80 text-xs md:text-sm mt-1 max-w-xl">
            Track your reserved event schedules, inspect itemized proposals, view protected turnaround timelines, and communicate with our culinary concierge.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenAIChat}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#E07A5F]/20 hover:bg-[#E07A5F]/30 text-[#E07A5F] border border-[#E07A5F]/40 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>AI Concierge Chat</span>
          </button>
          <button
            onClick={onOpenEstimator}
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-[#E07A5F] hover:bg-[#CB674D] text-white transition-all cursor-pointer shadow-xs"
          >
            <span>New Quotation Request</span>
          </button>
        </div>
      </div>

      {/* Section 1: Active Event Bookings & Turnaround Tracking */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-serif font-bold text-stone-900">Active Bookings & Operational Timelines</h2>
            <p className="text-xs text-stone-500">Real-time status tracking with protected turnaround buffers</p>
          </div>
          <span className="text-xs font-mono font-semibold text-stone-600 bg-stone-100 px-2.5 py-1 rounded">
            {myBookings.length} Total Bookings
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {myBookings.map((b) => {
            const isCompleted = b.status === 'completed';
            return (
              <div
                key={b.id}
                className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  {/* Top line: Ref & Status */}
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <span className="text-[10px] font-mono text-stone-400 block">{b.bookingRef}</span>
                      <h3 className="font-bold text-base text-stone-900 leading-snug">{b.eventTitle}</h3>
                      <p className="text-xs text-stone-500">{b.packageName}</p>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                        b.status === 'confirmed'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : b.status === 'preparing'
                          ? 'bg-amber-50 text-amber-800 border border-amber-200'
                          : b.status === 'ready'
                          ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                          : b.status === 'completed'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-stone-100 text-stone-700'
                      }`}
                    >
                      {b.status.replace('_', ' ')}
                    </span>
                  </div>

                  {/* Event Details Grid */}
                  <div className="grid grid-cols-2 gap-2 text-xs text-stone-600 bg-stone-50 p-3 rounded-xl mb-4">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-amber-700" />
                      <span>{b.eventDate}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-700" />
                      <span>{b.eventStartTime} - {b.eventEndTime}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-amber-700" />
                      <span>{b.guestCount} Guests</span>
                    </div>
                    <div className="flex items-center gap-1.5 truncate">
                      <MapPin className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                      <span className="truncate">{b.venueName}</span>
                    </div>
                  </div>

                  {/* Turnaround Buffer Visualizer Micro-Gantt */}
                  <div className="p-3 bg-stone-900 text-white rounded-xl mb-4">
                    <div className="flex items-center justify-between text-[10px] text-stone-400 mb-1.5">
                      <span className="font-semibold uppercase tracking-wider text-amber-400">
                        Turnaround Buffer Schedule
                      </span>
                      <span className="font-mono text-stone-400">Guaranteed No Overlaps</span>
                    </div>
                    
                    {/* Visual 7-segment bar */}
                    <div className="grid grid-cols-7 gap-1 h-3 rounded overflow-hidden">
                      <div className="bg-amber-700/80 rounded-xs" title={`Dispatch: ${b.turnaround.warehouseDispatchMinutes}m`} />
                      <div className="bg-amber-600/80 rounded-xs" title={`Transit: ${b.turnaround.transitToVenueMinutes}m`} />
                      <div className="bg-amber-500/80 rounded-xs" title={`Setup: ${b.turnaround.onSiteSetupMinutes}m`} />
                      <div className="bg-emerald-500 rounded-xs" title={`Execution: ${b.turnaround.eventExecutionMinutes}m`} />
                      <div className="bg-amber-500/80 rounded-xs" title={`Teardown: ${b.turnaround.teardownMinutes}m`} />
                      <div className="bg-amber-600/80 rounded-xs" title={`Return Transit: ${b.turnaround.returnTransitMinutes}m`} />
                      <div className="bg-teal-500 rounded-xs" title={`Warewash Buffer: ${b.turnaround.warewashSanitizeMinutes}m`} />
                    </div>

                    <div className="flex justify-between text-[9px] text-stone-400 mt-1.5">
                      <span>Staging: {b.turnaround.onSiteSetupMinutes}m</span>
                      <span className="text-emerald-400 font-semibold">Active: {b.turnaround.eventExecutionMinutes}m</span>
                      <span className="text-teal-300 font-semibold">Sanitize Buffer: {b.turnaround.warewashSanitizeMinutes}m</span>
                    </div>
                  </div>
                </div>

                {/* Footer Status & Review Action */}
                <div className="flex items-center justify-between pt-3 border-t border-stone-100 text-xs">
                  <div>
                    <span className="text-stone-400 text-[11px] block">Total Investment</span>
                    <span className="font-mono font-bold text-stone-900 text-sm">
                      ${b.totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                  </div>

                  {isCompleted ? (
                    <button
                      onClick={() => handleOpenReview(b)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 transition-colors cursor-pointer"
                    >
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      <span>Leave Review</span>
                    </button>
                  ) : (
                    <span className="text-stone-500 text-[11px] italic">
                      Staff Assigned: {b.assignedStaffIds.length} crew members
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section 2: Quotations & Official Proposals */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-serif font-bold text-stone-900">Your Quotations & Cost Proposals</h2>
            <p className="text-xs text-stone-500">Itemized pricing sheets, valid dates, and digital acceptance</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 border-b border-stone-200 font-semibold text-stone-600 uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Quote Number</th>
                  <th className="py-3 px-4">Package & Event</th>
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-3 text-right">Guests</th>
                  <th className="py-3 px-4 text-right">Total Amount</th>
                  <th className="py-3 px-3 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {myQuotes.map((q) => (
                  <tr key={q.id} className="hover:bg-stone-50/60 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-semibold text-stone-900">
                      {q.quoteNumber}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-stone-800">{q.packageName}</div>
                      <span className="text-[10px] text-stone-500 uppercase">{q.eventType}</span>
                    </td>
                    <td className="py-3.5 px-3 text-stone-600">{q.eventDate}</td>
                    <td className="py-3.5 px-3 text-right font-mono tabular-nums">{q.guestCount}</td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-stone-900 tabular-nums">
                      ${q.totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          q.status === 'accepted'
                            ? 'bg-emerald-100 text-emerald-800'
                            : q.status === 'sent'
                            ? 'bg-amber-100 text-amber-800'
                            : q.status === 'draft'
                            ? 'bg-stone-100 text-stone-700'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {q.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setSelectedQuote(q)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#0F172A] hover:bg-amber-700 text-white transition-colors cursor-pointer"
                      >
                        <Eye className="w-3 h-3" />
                        <span>Inspect & PDF</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Review & Feedback Modal */}
      {selectedBookingForReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-stone-200 p-6 md:p-8 space-y-6">
            <div className="text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Post-Event Experience</span>
              <h3 className="text-xl font-serif font-bold text-stone-900 mt-1">
                Rate {selectedBookingForReview.eventTitle}
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Your feedback calibrates our culinary execution and scheduling buffers.
              </p>
            </div>

            {reviewSubmitted ? (
              <div className="p-6 text-center text-emerald-700 font-bold bg-emerald-50 rounded-xl border border-emerald-200">
                Thank you! Your testimonial has been recorded.
              </div>
            ) : (
              <div className="space-y-4 text-xs">
                {/* Overall Stars */}
                <div>
                  <label className="block font-semibold text-stone-700 mb-1.5 text-center">
                    Overall Satisfaction Rating
                  </label>
                  <div className="flex items-center justify-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="p-1 cursor-pointer transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= rating
                              ? 'fill-amber-500 text-amber-500'
                              : 'text-stone-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sub ratings */}
                <div className="grid grid-cols-2 gap-4 bg-stone-50 p-3 rounded-xl border border-stone-200">
                  <div>
                    <label className="block text-stone-600 mb-1">Culinary & Food Quality</label>
                    <select
                      value={foodRating}
                      onChange={(e) => setFoodRating(Number(e.target.value))}
                      className="w-full p-2 bg-white rounded border border-stone-300 text-xs font-semibold"
                    >
                      <option value={5}>5 - Extraordinary</option>
                      <option value={4}>4 - Commendable</option>
                      <option value={3}>3 - Satisfactory</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-stone-600 mb-1">Service & Timing Precision</label>
                    <select
                      value={serviceRating}
                      onChange={(e) => setServiceRating(Number(e.target.value))}
                      className="w-full p-2 bg-white rounded border border-stone-300 text-xs font-semibold"
                    >
                      <option value={5}>5 - Flawless Pacing</option>
                      <option value={4}>4 - Punctual</option>
                      <option value={3}>3 - Minor Delay</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Your Testimonial Comments
                  </label>
                  <textarea
                    rows={3}
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder="Share how the presentation, courses, and turnaround logistics felt..."
                    className="w-full p-2.5 rounded-lg border border-stone-300 text-xs focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    onClick={() => setSelectedBookingForReview(null)}
                    className="px-4 py-2 rounded-lg text-xs font-semibold text-stone-600 hover:bg-stone-100 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmitReview}
                    className="px-5 py-2 rounded-lg text-xs font-bold text-white bg-amber-700 hover:bg-amber-600 transition-colors cursor-pointer shadow-xs"
                  >
                    Submit Feedback
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Printable Quotation Modal */}
      <PrintableQuoteModal
        quote={selectedQuote}
        isOpen={!!selectedQuote}
        onClose={() => setSelectedQuote(null)}
        canAcceptReject={true}
      />

    </div>
  );
}
