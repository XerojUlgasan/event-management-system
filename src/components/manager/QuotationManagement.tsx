import { useState } from 'react';
import { FileText, Plus, Eye, Send, CheckCircle, XCircle, Clock, Search, Filter, Printer } from 'lucide-react';
import { useClemoraStore, ClemoraStore } from '../../services/store.ts';
import { Quotation, QuotationStatus } from '../../types/clemora.ts';
import { PrintableQuoteModal } from '../common/PrintableQuoteModal.tsx';

export function QuotationManagement() {
  const store = useClemoraStore();
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedQuoteForPrint, setSelectedQuoteForPrint] = useState<Quotation | null>(null);

  // New Quote Modal
  const [isNewQuoteOpen, setIsNewQuoteOpen] = useState(false);
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [eventType, setEventType] = useState('corporate');
  const [eventDate, setEventDate] = useState('2026-11-25');
  const [guests, setGuests] = useState(80);
  const [packageId, setPackageId] = useState(store.packages[0].id);
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>(['add_mixology']);
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [notes, setNotes] = useState('');

  const filteredQuotes = store.quotations.filter((q) => {
    const matchesStatus = statusFilter === 'all' || q.status === statusFilter;
    const matchesSearch =
      q.quoteNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.packageName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleCreateCustomQuote = () => {
    if (!clientName || !clientEmail) return;

    const pkg = store.packages.find((p) => p.id === packageId) || store.packages[0];
    const items = [
      {
        id: `qi_${Date.now()}_pkg`,
        description: `${pkg.name} (${guests} guests @ $${pkg.pricePerGuest}/guest)`,
        unitPrice: pkg.pricePerGuest,
        quantity: guests,
        total: pkg.pricePerGuest * guests,
        category: 'package' as const,
      },
      ...selectedAddonIds.map((id) => {
        const add = store.addons.find((a) => a.id === id)!;
        const total = add.pricingType === 'per_guest' ? add.price * guests : add.price;
        return {
          id: `qi_${Date.now()}_${id}`,
          description: add.name,
          unitPrice: add.price,
          quantity: add.pricingType === 'per_guest' ? guests : 1,
          total,
          category: 'addon' as const,
        };
      }),
    ];

    ClemoraStore.createQuotation({
      customerName: clientName,
      customerEmail: clientEmail,
      customerPhone: clientPhone,
      eventType,
      eventDate,
      guestCount: guests,
      packageId: pkg.id,
      packageName: pkg.name,
      items,
      discountPercentage: discountPercent,
      notes,
      status: 'sent',
    });

    setIsNewQuoteOpen(false);
    setClientName('');
    setClientEmail('');
  };

  const toggleAddon = (id: string) => {
    setSelectedAddonIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
            Module 3 · Proposal Formulation
          </span>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-stone-900 mt-2">
            Quotation Management & Cost Breakdowns
          </h1>
          <p className="text-xs md:text-sm text-stone-500 mt-1">
            Formulate itemized proposals, track client revisions, apply custom discounts, and print invoice documents.
          </p>
        </div>

        <button
          onClick={() => setIsNewQuoteOpen(true)}
          className="px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-amber-700 hover:bg-amber-600 text-white shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Formulate New Quote</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
          <input
            type="text"
            placeholder="Search by quote #, client, or package..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {['all', 'draft', 'pending', 'sent', 'accepted', 'rejected'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors cursor-pointer ${
                statusFilter === st
                  ? 'bg-[#0F172A] text-white shadow-xs'
                  : 'bg-stone-50 text-stone-600 hover:bg-stone-100'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Quotations Table */}
      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-100/70 border-b border-stone-200 font-semibold text-stone-700 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Ref & Revision</th>
                <th className="py-3 px-4">Client Name & Email</th>
                <th className="py-3 px-4">Package</th>
                <th className="py-3 px-3">Target Date</th>
                <th className="py-3 px-3 text-right">Guests</th>
                <th className="py-3 px-4 text-right">Grand Total</th>
                <th className="py-3 px-3 text-center">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredQuotes.map((q) => (
                <tr key={q.id} className="hover:bg-stone-50/70 transition-colors">
                  <td className="py-3.5 px-4">
                    <span className="font-mono font-bold text-stone-900 block">{q.quoteNumber}</span>
                    <span className="text-[10px] text-stone-400">Rev #{q.revision} · {q.createdAt}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-stone-900 block">{q.customerName}</span>
                    <span className="text-[11px] text-stone-500">{q.customerEmail}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-stone-800 block">{q.packageName}</span>
                    <span className="text-[10px] uppercase text-stone-400 font-mono">{q.eventType}</span>
                  </td>
                  <td className="py-3.5 px-3 text-stone-700 font-mono">{q.eventDate}</td>
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
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setSelectedQuoteForPrint(q)}
                        className="p-1.5 rounded-md text-stone-600 hover:text-stone-900 hover:bg-stone-100 cursor-pointer"
                        title="View & Print Official Quotation"
                      >
                        <Printer className="w-4 h-4" />
                      </button>

                      {q.status === 'draft' && (
                        <button
                          onClick={() => ClemoraStore.updateQuotationStatus(q.id, 'sent')}
                          className="px-2.5 py-1 rounded bg-amber-700 hover:bg-amber-600 text-white font-semibold text-[11px] cursor-pointer"
                        >
                          Send to Client
                        </button>
                      )}

                      {q.status === 'sent' && (
                        <button
                          onClick={() => ClemoraStore.updateQuotationStatus(q.id, 'accepted')}
                          className="px-2.5 py-1 rounded bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-[11px] cursor-pointer"
                        >
                          Mark Accepted
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Formulate Custom Quote Modal */}
      {isNewQuoteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 p-6 md:p-8 space-y-4 text-xs my-8 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <h3 className="font-bold text-base text-stone-900">Formulate Proposal & Quotation</h3>
              <button onClick={() => setIsNewQuoteOpen(false)} className="text-stone-400 text-lg cursor-pointer">&times;</button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Client Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Lord Julian Davies"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full p-2.5 border border-stone-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Client Contact Email</label>
                <input
                  type="email"
                  placeholder="e.g. j.davies@estates.co.uk"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="w-full p-2.5 border border-stone-300 rounded-lg"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Event Category</label>
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className="w-full p-2.5 border border-stone-300 rounded-lg"
                >
                  <option value="corporate">Corporate Gala</option>
                  <option value="wedding">Wedding Banquet</option>
                  <option value="gala">Imperial Gala</option>
                  <option value="private">Private Atelier</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Target Date</label>
                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full p-2.5 border border-stone-300 rounded-lg font-mono"
                />
              </div>
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Guest Scale</label>
                <input
                  type="number"
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full p-2.5 border border-stone-300 rounded-lg font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">Master Package</label>
              <select
                value={packageId}
                onChange={(e) => setPackageId(e.target.value)}
                className="w-full p-2.5 border border-stone-300 rounded-lg"
              >
                {store.packages.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} (${p.pricePerGuest}/guest - min {p.minimumGuests})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-2">Select Premium Add-ons</label>
              <div className="grid grid-cols-2 gap-2">
                {store.addons.map((add) => {
                  const checked = selectedAddonIds.includes(add.id);
                  return (
                    <div
                      key={add.id}
                      onClick={() => toggleAddon(add.id)}
                      className={`p-2 rounded border cursor-pointer ${
                        checked ? 'bg-amber-50 border-amber-500 font-semibold text-amber-950' : 'bg-stone-50 border-stone-200 text-stone-700'
                      }`}
                    >
                      <span>{add.name} (${add.price})</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">Discretionary Discount (%)</label>
              <input
                type="number"
                min={0}
                max={25}
                value={discountPercent}
                onChange={(e) => setDiscountPercent(Number(e.target.value))}
                className="w-32 p-2 border border-stone-300 rounded-lg font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">Coordinator Notes</label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Include custom dietary substitutions, venue power constraints..."
                className="w-full p-2 border border-stone-300 rounded-lg"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-200">
              <button
                onClick={() => setIsNewQuoteOpen(false)}
                className="px-4 py-2 rounded-lg text-stone-600 hover:bg-stone-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateCustomQuote}
                className="px-5 py-2 rounded-lg font-bold text-white bg-amber-700 hover:bg-amber-600 cursor-pointer shadow-xs"
              >
                Formulate & Issue Proposal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Printable Quote Modal */}
      <PrintableQuoteModal
        quote={selectedQuoteForPrint}
        isOpen={!!selectedQuoteForPrint}
        onClose={() => setSelectedQuoteForPrint(null)}
        canAcceptReject={false}
      />

    </div>
  );
}
