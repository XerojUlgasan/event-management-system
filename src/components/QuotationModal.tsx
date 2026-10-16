import { useState } from 'react';
import { X, CheckCircle2 } from 'lucide-react';

export interface QuoteDetails {
  eventType?: string;
  guests?: number;
  tierName?: string;
  selectedAddOns?: string[];
  estimatedTotal?: number;
}

interface QuotationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDetails?: QuoteDetails | null;
}

export function QuotationModal({ isOpen, onClose, initialDetails }: QuotationModalProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('2026-11-14');
  const [venue, setVenue] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) {
      setErrorMsg('Please enter your name and email address.');
      return;
    }
    if (!email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setErrorMsg('');
    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs"
    >
      <div className="bg-white rounded-xl border border-[#E7E5E4] max-w-lg w-full p-6 sm:p-8 shadow-xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={handleResetAndClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 transition-colors rounded-lg"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-6 text-center space-y-4">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#0F172A]">
              Quotation Request Received
            </h3>
            <p className="text-sm text-stone-600 max-w-md mx-auto">
              Thank you, <span className="font-semibold text-stone-900">{fullName}</span>.
              A preliminary itemized breakdown and turnaround buffer schedule have been routed to
              our event coordination team. We have also sent a confirmation to{' '}
              <span className="font-semibold text-stone-900">{email}</span>.
            </p>

            <div className="bg-stone-50 p-4 rounded-lg border border-[#E7E5E4] text-left text-xs space-y-1 font-mono text-stone-700">
              <div>Ref ID: <span className="font-bold">CLM-2026-9481</span></div>
              <div>Event: {initialDetails?.eventType || 'Custom Catering Event'}</div>
              <div>Guests: {initialDetails?.guests || 100} guests</div>
              <div>Estimated Total: ${initialDetails?.estimatedTotal?.toLocaleString() || '7,200'}</div>
            </div>

            <button
              onClick={handleResetAndClose}
              className="mt-4 px-6 py-2.5 text-xs font-semibold text-white bg-[#0F172A] hover:bg-[#1E293B] rounded-lg transition-colors"
            >
              Done & Return to Site
            </button>
          </div>
        ) : (
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#B45309] mb-1">
              Direct Quotation & Booking
            </div>
            <h3 className="text-xl font-bold text-[#0F172A] mb-2">
              Lock In Your Event Date & Package
            </h3>
            <p className="text-xs text-stone-600 mb-6">
              Our automated system cross-checks kitchen prep time, gear sanitation buffers, and staff availability before confirming your inquiry.
            </p>

            {initialDetails && (
              <div className="p-3 bg-stone-50 rounded-lg border border-[#E7E5E4] mb-6 text-xs text-stone-700 flex items-center justify-between">
                <div>
                  <span className="font-bold">{initialDetails.eventType}</span>
                  <span className="text-stone-500"> ({initialDetails.guests} guests · {initialDetails.tierName})</span>
                </div>
                <div className="font-mono font-bold text-[#0F172A]">
                  Est. ${initialDetails.estimatedTotal?.toLocaleString()}
                </div>
              </div>
            )}

            {errorMsg && (
              <div className="p-3 bg-rose-50 text-rose-800 text-xs rounded-lg border border-rose-200 mb-4">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Katherine Hayes"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-[#E7E5E4] focus:outline-none focus:border-[#0F172A] bg-stone-50/50"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-[#E7E5E4] focus:outline-none focus:border-[#0F172A] bg-stone-50/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Contact Phone
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-[#E7E5E4] focus:outline-none focus:border-[#0F172A] bg-stone-50/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Target Event Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-[#E7E5E4] focus:outline-none focus:border-[#0F172A] bg-stone-50/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Venue or City
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Skyline Pavilion, Seattle"
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-[#E7E5E4] focus:outline-none focus:border-[#0F172A] bg-stone-50/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Dietary Restrictions or Special Logistics
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. 12 vegetarian guests, 3 gluten-free, load-in requires service elevator"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-[#E7E5E4] focus:outline-none focus:border-[#0F172A] bg-stone-50/50"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 text-xs font-semibold text-white bg-[#0F172A] hover:bg-[#1E293B] rounded-lg transition-colors mt-2"
              >
                Submit Quotation Request
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
