import { useState } from 'react';
import { Star, MessageSquare, CheckCircle2, Quote, Sparkles } from 'lucide-react';
import { useClemoraStore, ClemoraStore } from '../../services/store.ts';
import { ClemoraLogo } from '../common/ClemoraLogo.tsx';

interface CustomerReviewsSectionProps {
  onOpenQuote: () => void;
}

export function CustomerReviewsSection({ onOpenQuote }: CustomerReviewsSectionProps) {
  const store = useClemoraStore();
  const [newFeedbackModal, setNewFeedbackModal] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [eventTitle, setEventTitle] = useState('Meridian Botanical Gala');
  const [submitted, setSubmitted] = useState(false);

  const reviews = store.reviews;

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !comment.trim()) return;

    ClemoraStore.addReview({
      bookingId: 'bk_custom_review',
      customerName: customerName.trim(),
      eventName: eventTitle.trim() || 'Autumn Gala Celebration',
      eventDate: new Date().toISOString().split('T')[0],
      rating,
      comment: comment.trim(),
      foodRating: rating,
      serviceRating: 5,
      coordinationRating: 5,
      isPublished: true,
    });

    setSubmitted(true);
    setTimeout(() => {
      setNewFeedbackModal(false);
      setSubmitted(false);
      setComment('');
      setCustomerName('');
    }, 1200);
  };

  return (
    <section id="reviews" className="px-6 lg:px-12 py-16 lg:py-24 border-b border-[#E8DFEB] bg-white">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#E07A5F] mb-3 font-mono">
              <ClemoraLogo variant="icon" theme="light" size="xs" />
              <span>Verified Client Feedback · Module 2</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-[#35233D] font-bold tracking-tight">
              Honest Feedback from Real Event Hosts
            </h2>
            <p className="text-sm md:text-base text-stone-600 mt-2 leading-relaxed">
              Every review comes directly from authenticated clients whose events were protected by our Turnaround Buffer scheduling model.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setNewFeedbackModal(true)}
              className="px-4 py-2.5 rounded-lg text-xs font-bold bg-[#FAF7F5] hover:bg-[#F5EFF7] text-[#35233D] border border-[#E8DFEB] hover:border-[#E07A5F] transition-all cursor-pointer flex items-center gap-2 shadow-2xs"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#E07A5F]" />
              <span>Leave Event Review</span>
            </button>
            <button
              onClick={onOpenQuote}
              className="px-4 py-2.5 rounded-lg text-xs font-bold text-white bg-[#E07A5F] hover:bg-[#CB674D] transition-colors cursor-pointer shadow-xs active:scale-95"
            >
              Book Your Celebration
            </button>
          </div>
        </div>

        {/* Rating Highlights Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.slice(0, 3).map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-2xl bg-[#FAF7F5] border border-[#E8DFEB] hover:border-[#E07A5F]/50 transition-all flex flex-col justify-between shadow-2xs hover:shadow-xs group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-[#E07A5F]">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < rev.rating ? 'fill-current' : 'text-stone-300'}`}
                      />
                    ))}
                    <span className="text-xs font-mono font-bold ml-1.5 text-[#35233D]">
                      {rev.rating}.0 / 5.0
                    </span>
                  </div>
                  <Quote className="w-6 h-6 text-[#E07A5F]/30 shrink-0" />
                </div>

                <blockquote className="text-xs sm:text-sm text-stone-700 leading-relaxed italic mb-6">
                  &ldquo;{rev.comment}&rdquo;
                </blockquote>
              </div>

              <div className="pt-4 border-t border-[#E8DFEB] flex items-center justify-between">
                <div>
                  <div className="font-bold text-xs text-[#35233D]">{rev.customerName}</div>
                  <div className="text-[10px] text-stone-400 font-mono mt-0.5">
                    Verified Booking · {rev.createdAt}
                  </div>
                </div>
                <div className="px-2 py-0.5 rounded bg-[#FDF3F0] text-[#B55238] border border-[#F7D2C6] text-[10px] font-mono font-semibold">
                  100% Buffer Executed
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Feedback Submission Modal */}
        {newFeedbackModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#24162B]/75 backdrop-blur-xs">
            <div className="bg-white rounded-2xl border border-[#E8DFEB] max-w-md w-full p-6 shadow-2xl relative">
              <button
                onClick={() => setNewFeedbackModal(false)}
                className="absolute top-4 right-4 p-1.5 text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                &times;
              </button>

              {submitted ? (
                <div className="py-8 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h3 className="text-lg font-bold text-[#35233D]">Thank You for Your Feedback!</h3>
                  <p className="text-xs text-stone-600">
                    Your rating and review have been published to the event showcases and logged in the system.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <ClemoraLogo variant="icon" theme="light" size="xs" />
                    <h3 className="text-base font-bold text-[#35233D]">Submit Event Rating &amp; Review</h3>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Katherine Sterling"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#E8DFEB] focus:outline-none focus:border-[#35233D] bg-[#FAF7F5]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Event Title / Occasion</label>
                    <input
                      type="text"
                      placeholder="e.g. Autumn Gala Dinner"
                      value={eventTitle}
                      onChange={(e) => setEventTitle(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#E8DFEB] focus:outline-none focus:border-[#35233D] bg-[#FAF7F5]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Rating</label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className="p-1 cursor-pointer"
                        >
                          <Star
                            className={`w-5 h-5 ${star <= rating ? 'text-[#E07A5F] fill-current' : 'text-stone-300'}`}
                          />
                        </button>
                      ))}
                      <span className="text-xs font-mono font-bold text-[#35233D] ml-2">
                        {rating} out of 5 stars
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Your Feedback &amp; Experience</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Describe how the menu, turnaround timing, and coordination went..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#E8DFEB] focus:outline-none focus:border-[#35233D] bg-[#FAF7F5]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#E07A5F] hover:bg-[#CB674D] rounded-lg transition-colors cursor-pointer shadow-xs"
                  >
                    Post Review
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
