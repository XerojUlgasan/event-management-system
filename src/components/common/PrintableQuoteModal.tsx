import { Printer, CheckCircle, XCircle, Download, FileText, Calendar, MapPin, Users, ShieldAlert } from 'lucide-react';
import { Quotation } from '../../types/clemora.ts';
import { ClemoraStore } from '../../services/store.ts';
import { ClemoraLogo } from './ClemoraLogo.tsx';

interface PrintableQuoteModalProps {
  quote: Quotation | null;
  isOpen: boolean;
  onClose: () => void;
  canAcceptReject?: boolean;
}

export function PrintableQuoteModal({ quote, isOpen, onClose, canAcceptReject = false }: PrintableQuoteModalProps) {
  if (!isOpen || !quote) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleAccept = () => {
    ClemoraStore.updateQuotationStatus(quote.id, 'accepted');
    // Also generate a confirmed booking with protected turnaround buffer
    ClemoraStore.createBooking({
      customerId: quote.customerId,
      customerName: quote.customerName,
      customerEmail: quote.customerEmail,
      customerPhone: quote.customerPhone,
      eventTitle: `${quote.packageName} (${quote.eventType.toUpperCase()})`,
      eventType: quote.eventType as any,
      eventDate: quote.eventDate,
      eventStartTime: '18:00',
      eventEndTime: '22:30',
      venueName: quote.venueName,
      venueAddress: quote.venueAddress,
      guestCount: quote.guestCount,
      packageId: quote.packageId,
      packageName: quote.packageName,
      totalAmount: quote.totalAmount,
      depositPaid: quote.depositRequired,
      status: 'confirmed',
      notes: quote.notes,
    });
    onClose();
  };

  const handleReject = () => {
    ClemoraStore.updateQuotationStatus(quote.id, 'rejected');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs overflow-y-auto print:p-0 print:bg-white">
      <div className="relative w-full max-w-4xl bg-white text-stone-900 rounded-xl shadow-2xl border border-stone-200 overflow-hidden my-8 print:shadow-none print:border-none print:m-0">
        
        {/* Top Action Bar (hidden on print) */}
        <div className="bg-[#24162B] text-white px-6 py-4 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-[#E07A5F]" />
            <div>
              <h3 className="font-semibold text-sm">Official Event Quotation & Logistics Proposal</h3>
              <p className="text-xs text-purple-200/70">Ref: {quote.quoteNumber} · Revision #{quote.revision}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-purple-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <span className="text-lg leading-none">&times;</span>
            </button>
          </div>
        </div>

        {/* Printable Quotation Sheet Body */}
        <div className="p-8 md:p-10 text-sm leading-relaxed" id="printable-quotation-content">
          
          {/* Header & Letterhead with Official Clemora Logo */}
          <div className="flex flex-col md:flex-row md:items-start justify-between border-b border-stone-200 pb-6 gap-6">
            <div>
              <div className="mb-2">
                <ClemoraLogo variant="full" theme="light" size="lg" />
              </div>
              <p className="text-xs text-stone-500 uppercase tracking-widest font-semibold mt-1">
                Event Logistics & Culinary Mastery Platform
              </p>
              <p className="text-xs text-stone-600 mt-2">
                1280 St. Germain Pavilion Way, Suite 400<br />
                Concierge: +1 (800) 555-CLEM · concierge@clemora.com
              </p>
            </div>

            <div className="text-left md:text-right">
              <span className={`inline-block px-3 py-1 rounded text-xs font-bold uppercase tracking-wider mb-2 ${
                quote.status === 'accepted' ? 'bg-emerald-100 text-emerald-800' :
                quote.status === 'sent' ? 'bg-amber-100 text-amber-800' :
                quote.status === 'draft' ? 'bg-stone-100 text-stone-800' :
                'bg-rose-100 text-rose-800'
              }`}>
                Status: {quote.status.toUpperCase()}
              </span>
              <p className="text-base font-bold text-stone-900 font-mono">{quote.quoteNumber}</p>
              <p className="text-xs text-stone-500 mt-1">Issue Date: {quote.createdAt}</p>
              <p className="text-xs text-stone-500">Valid Until: <span className="font-semibold text-stone-800">{quote.validUntil}</span></p>
            </div>
          </div>

          {/* Client & Event Specs Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 p-4 rounded-lg bg-stone-50 border border-stone-200">
            <div>
              <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">Prepared Exclusively For</p>
              <p className="font-bold text-stone-900 text-base">{quote.customerName}</p>
              <p className="text-xs text-stone-600">{quote.customerEmail}</p>
              {quote.customerPhone && <p className="text-xs text-stone-600">{quote.customerPhone}</p>}
            </div>

            <div>
              <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">Event Parameters</p>
              <div className="space-y-1 text-xs text-stone-700">
                <p className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-700" />
                  <span className="font-semibold">Target Date:</span> {quote.eventDate} ({quote.eventType.toUpperCase()})
                </p>
                <p className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-amber-700" />
                  <span className="font-semibold">Guest Scale:</span> {quote.guestCount} Attendees
                </p>
                <p className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-700" />
                  <span className="font-semibold">Venue:</span> {quote.venueName}
                </p>
              </div>
            </div>
          </div>

          {/* Itemized Quotation Table */}
          <div className="mt-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">Itemized Schedule of Services</h4>
            <div className="overflow-x-auto border border-stone-200 rounded-lg">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-100 border-b border-stone-200 font-semibold text-stone-700 uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Line Item Description</th>
                    <th className="py-3 px-3 text-right">Unit Rate</th>
                    <th className="py-3 px-3 text-right">Qty</th>
                    <th className="py-3 px-4 text-right">Line Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {quote.items.map((item) => (
                    <tr key={item.id} className="hover:bg-stone-50/50">
                      <td className="py-3 px-4 text-stone-800">
                        <div className="font-medium">{item.description}</div>
                        <span className="text-[10px] text-stone-400 uppercase font-mono">{item.category}</span>
                      </td>
                      <td className="py-3 px-3 text-right font-mono tabular-nums text-stone-700">
                        ${item.unitPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-3 px-3 text-right font-mono tabular-nums text-stone-700">
                        {item.quantity}
                      </td>
                      <td className="py-3 px-4 text-right font-mono font-semibold tabular-nums text-stone-900">
                        ${item.total.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Financial Calculation Totals */}
          <div className="mt-6 flex flex-col md:flex-row justify-between items-start gap-6 pt-4 border-t border-stone-200">
            <div className="max-w-md text-xs text-stone-500 space-y-2">
              <p className="font-semibold text-stone-800">Clemora Turnaround Buffer Guarantee:</p>
              <p>
                This quotation includes protected staging buffers: 75m warehouse dispatch, 45m transit, 150m venue setup, and a mandatory 150m post-event warewash sanitization window. Zero equipment collisions guaranteed.
              </p>
              {quote.notes && (
                <div className="p-2.5 rounded bg-amber-50 border border-amber-200 text-amber-900 mt-2">
                  <span className="font-semibold">Special Coordinator Notes:</span> {quote.notes}
                </div>
              )}
            </div>

            <div className="w-full md:w-72 space-y-2 text-xs font-mono">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal:</span>
                <span className="tabular-nums font-semibold">${quote.subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>
              {quote.discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Discount ({quote.discountPercentage}%):</span>
                  <span className="tabular-nums font-semibold">-${quote.discountAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                </div>
              )}
              <div className="flex justify-between text-stone-600">
                <span>Service Fee (10%):</span>
                <span className="tabular-nums">${quote.serviceCharge.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Estimated Tax (12%):</span>
                <span className="tabular-nums">${quote.taxAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-stone-900 pt-2 border-t border-stone-300">
                <span className="font-sans">Grand Total:</span>
                <span className="tabular-nums text-amber-900">${quote.totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-xs font-semibold text-stone-700 bg-amber-50/80 p-2 rounded border border-amber-200">
                <span>30% Deposit to Lock:</span>
                <span className="tabular-nums text-amber-950">${quote.depositRequired.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>

          {/* Signature / Authorization Lines */}
          <div className="mt-10 pt-8 border-t border-stone-200 grid grid-cols-2 gap-8 text-xs text-stone-500">
            <div>
              <p className="font-semibold text-stone-700 mb-8">Authorized Coordinator Sign-off:</p>
              <div className="border-b border-stone-300 pb-1 font-serif italic text-stone-700">Marcus Vance, Lead Coordinator</div>
              <p className="mt-1">Clemora Logistics & Culinary Platform</p>
            </div>
            <div>
              <p className="font-semibold text-stone-700 mb-8">Client Acceptance Signature:</p>
              <div className="border-b border-stone-300 pb-1">
                {quote.status === 'accepted' ? (
                  <span className="text-emerald-700 font-semibold italic">Digitally Accepted on {quote.updatedAt}</span>
                ) : (
                  <span className="text-stone-400 italic">Signature required upon approval</span>
                )}
              </div>
              <p className="mt-1">Date: {quote.status === 'accepted' ? quote.updatedAt : '____________________'}</p>
            </div>
          </div>

        </div>

        {/* Action Controls for Customer / Manager (hidden in print) */}
        {canAcceptReject && quote.status === 'sent' && (
          <div className="bg-stone-50 border-t border-stone-200 p-4 px-8 flex items-center justify-between print:hidden">
            <p className="text-xs text-stone-600">
              By accepting this quote, your booking will be confirmed and 30% deposit flagged for invoice.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={handleReject}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors cursor-pointer"
              >
                <XCircle className="w-4 h-4" />
                <span>Decline Quote</span>
              </button>
              <button
                onClick={handleAccept}
                className="flex items-center gap-1.5 px-5 py-2 rounded-lg text-xs font-bold text-white bg-[#E07A5F] hover:bg-[#CB674D] shadow-sm transition-all cursor-pointer"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Accept & Confirm Booking</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
