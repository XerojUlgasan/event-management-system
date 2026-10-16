import { useState } from 'react';
import { Sparkles, Users, Clock, Check, ChevronRight, Sliders, Calendar, MapPin, DollarSign, ArrowRight } from 'lucide-react';
import { useClemoraStore, ClemoraStore } from '../../services/store.ts';
import { EventPackage, AddOn } from '../../types/clemora.ts';
import { ClemoraLogo } from '../common/ClemoraLogo.tsx';

interface PackageCatalogProps {
  onSelectPackageForQuote: (pkg: EventPackage, guestCount: number, selectedAddons: string[]) => void;
  onRequestGeneralQuote: () => void;
}

export function PackageCatalog({ onSelectPackageForQuote, onRequestGeneralQuote }: PackageCatalogProps) {
  const store = useClemoraStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [customizingPackage, setCustomizingPackage] = useState<EventPackage | null>(null);

  // Customizer state
  const [guests, setGuests] = useState<number>(80);
  const [eventDate, setEventDate] = useState<string>('2026-11-20');
  const [venueName, setVenueName] = useState<string>('');
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>(['add_mixology']);
  const [dietaryRequirements, setDietaryRequirements] = useState<string[]>(['Vegetarian']);
  const [quoteCreatedSuccess, setQuoteCreatedSuccess] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Curations' },
    { id: 'wedding', label: 'Weddings' },
    { id: 'corporate', label: 'Corporate Galas' },
    { id: 'gala', label: 'Imperial Galas' },
    { id: 'private', label: 'Private Chef Atelier' },
  ];

  const filteredPackages = store.packages.filter(
    (p) => p.isPublished && (selectedCategory === 'all' || p.category === selectedCategory)
  );

  const handleStartCustomizing = (pkg: EventPackage) => {
    setCustomizingPackage(pkg);
    setGuests(Math.max(pkg.minimumGuests, 60));
    setQuoteCreatedSuccess(null);
  };

  const toggleAddon = (addonId: string) => {
    setSelectedAddonIds((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  // Calculations for customizer
  const packageCost = customizingPackage ? customizingPackage.pricePerGuest * guests : 0;
  const addonsCost = selectedAddonIds.reduce((sum, id) => {
    const add = store.addons.find((a) => a.id === id);
    if (!add) return sum;
    return sum + (add.pricingType === 'per_guest' ? add.price * guests : add.price);
  }, 0);
  const subtotal = packageCost + addonsCost;
  const serviceCharge = Math.round(subtotal * 0.1);
  const tax = Math.round((subtotal + serviceCharge) * 0.12);
  const grandTotal = subtotal + serviceCharge + tax;
  const deposit = Math.round(grandTotal * 0.3);

  const handleGenerateQuote = () => {
    if (!customizingPackage) return;

    const items = [
      {
        id: `qi_${Date.now()}_pkg`,
        description: `${customizingPackage.name} (${guests} guests @ $${customizingPackage.pricePerGuest}/guest)`,
        unitPrice: customizingPackage.pricePerGuest,
        quantity: guests,
        total: packageCost,
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

    const newQuote = ClemoraStore.createQuotation({
      packageId: customizingPackage.id,
      packageName: customizingPackage.name,
      eventType: customizingPackage.category,
      eventDate,
      guestCount: guests,
      venueName: venueName || 'Client Selected Venue',
      venueAddress: 'Private Address',
      items,
      status: 'pending',
      notes: `Dietary accommodation requests: ${dietaryRequirements.join(', ')}. Turnaround buffer verified.`,
    });

    setQuoteCreatedSuccess(newQuote.quoteNumber);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="text-xs font-bold uppercase tracking-widest text-[#E07A5F] bg-[#FDF3F0] px-3 py-1 rounded-full border border-[#F7D2C6]">
          Curated Culinary Collections
        </span>
        <h2 className="text-3xl md:text-4xl font-serif text-[#35233D] font-bold mt-3 tracking-tight">
          Master Event Packages &amp; Tiers
        </h2>
        <p className="text-stone-600 text-sm mt-3 leading-relaxed">
          Every package is engineered with our signature Turnaround Buffer model—ensuring culinary precision, protected staging timelines, and zero equipment collisions.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCategory(c.id)}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              selectedCategory === c.id
                ? 'bg-[#35233D] text-white shadow-xs'
                : 'bg-white text-stone-600 hover:text-stone-900 border border-[#E8DFEB] hover:border-stone-400'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Package Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPackages.map((pkg) => (
          <div
            key={pkg.id}
            className="group bg-white rounded-2xl border border-[#E8DFEB] hover:border-stone-400 overflow-hidden shadow-xs hover:shadow-xl transition-all flex flex-col justify-between"
          >
            <div>
              {/* Image Banner */}
              <div className="relative h-56 overflow-hidden bg-stone-100">
                <img
                  src={pkg.imageUrl}
                  alt={pkg.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                
                {pkg.featured && (
                  <span className="absolute top-3 left-3 bg-[#E07A5F] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm shadow-xs">
                    Signature Choice
                  </span>
                )}

                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-[#E07A5F] tracking-wider">
                      {pkg.category.toUpperCase()}
                    </span>
                    <h3 className="font-serif font-bold text-lg leading-snug">{pkg.name}</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold font-mono tabular-nums leading-none">${pkg.pricePerGuest}</span>
                    <span className="text-[10px] text-purple-200 block">/ guest</span>
                  </div>
                </div>
              </div>

              {/* Package Content */}
              <div className="p-6">
                <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-4">
                  {pkg.description}
                </p>

                {/* Logistics Badges */}
                <div className="flex items-center gap-4 text-xs text-stone-500 pb-4 border-b border-stone-100 font-mono">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#35233D]" />
                    <span>Min {pkg.minimumGuests} guests</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#E07A5F]" />
                    <span>{pkg.prepDurationHours}h prep window</span>
                  </div>
                </div>

                {/* Course Highlights */}
                <div className="mt-4">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#35233D] mb-2">
                    Gastronomic Highlights
                  </h4>
                  <ul className="space-y-1.5 text-xs text-stone-700">
                    {pkg.courseHighlights.slice(0, 3).map((course, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#E07A5F] shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{course}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-6 pt-0">
              <button
                onClick={() => handleStartCustomizing(pkg)}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#35233D] hover:bg-[#E07A5F] text-white transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-95"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Customize &amp; Estimate</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Package Customizer Drawer Modal */}
      {customizingPackage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-6">
            
            {/* Header in Deep Royal Plum */}
            <div className="bg-[#24162B] text-white p-6 flex items-center justify-between">
              <div>
                <span className="text-xs uppercase font-semibold text-[#E07A5F] tracking-wider">
                  Event Customizer &amp; Quotation Formulator
                </span>
                <h3 className="text-xl font-serif font-bold mt-1">{customizingPackage.name}</h3>
              </div>
              <button
                onClick={() => setCustomizingPackage(null)}
                className="p-1 rounded-lg text-purple-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer text-xl"
              >
                &times;
              </button>
            </div>

            {quoteCreatedSuccess ? (
              <div className="p-8 text-center space-y-4">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-stone-900 font-serif">Quotation Successfully Generated!</h4>
                <p className="text-sm text-stone-600 max-w-md mx-auto">
                  Quotation <span className="font-mono font-bold text-[#35233D]">{quoteCreatedSuccess}</span> has been formulated and logged to your Customer Portal.
                </p>
                <div className="p-4 bg-[#FAF7F5] rounded-xl border border-[#E8DFEB] max-w-sm mx-auto text-xs text-stone-700 space-y-1">
                  <p><span className="font-semibold">Event Date:</span> {eventDate}</p>
                  <p><span className="font-semibold">Guest Count:</span> {guests} Attendees</p>
                  <p><span className="font-semibold">Estimated Total:</span> ${grandTotal.toLocaleString()}</p>
                  <p><span className="font-semibold">Deposit to Lock (30%):</span> ${deposit.toLocaleString()}</p>
                </div>
                <div className="pt-4 flex items-center justify-center gap-3">
                  <button
                    onClick={() => setCustomizingPackage(null)}
                    className="px-6 py-2.5 rounded-lg text-xs font-bold bg-[#35233D] hover:bg-[#24162B] text-white cursor-pointer"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-6 md:p-8 space-y-6 text-xs max-h-[75vh] overflow-y-auto">
                
                {/* Sliders & Headcount */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#FAF7F5] p-5 rounded-xl border border-[#E8DFEB]">
                  <div>
                    <label className="block font-bold text-[#35233D] mb-2">
                      Guest Attendance Scale: <span className="font-mono text-[#E07A5F] text-sm">{guests} Guests</span>
                    </label>
                    <input
                      type="range"
                      min={customizingPackage.minimumGuests}
                      max={350}
                      step={5}
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full accent-[#E07A5F] cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-stone-400 mt-1 font-mono">
                      <span>Min: {customizingPackage.minimumGuests}</span>
                      <span>Max: 350</span>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-[#35233D] mb-2">
                      Proposed Target Event Date
                    </label>
                    <input
                      type="date"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full p-2 bg-white border border-[#E8DFEB] rounded-lg text-xs font-mono"
                    />
                    <span className="text-[10px] text-stone-500 mt-1 block">
                      Turnaround buffer automatically checked for collisions
                    </span>
                  </div>
                </div>

                {/* Venue Name */}
                <div>
                  <label className="block font-bold text-[#35233D] mb-1">
                    Event Venue / Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. The Conservatory at Grand Terrace, Private Vineyard, or Hotel Ballroom"
                    value={venueName}
                    onChange={(e) => setVenueName(e.target.value)}
                    className="w-full p-2.5 bg-white border border-stone-300 rounded-lg text-xs focus:ring-2 focus:ring-[#E07A5F]"
                  />
                </div>

                {/* Add-ons Selection */}
                <div>
                  <h4 className="font-bold text-[#35233D] text-sm mb-3">Elevate with Premium Add-ons</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {store.addons.map((add) => {
                      const isChecked = selectedAddonIds.includes(add.id);
                      return (
                        <div
                          key={add.id}
                          onClick={() => toggleAddon(add.id)}
                          className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex items-start gap-3 ${
                            isChecked
                              ? 'bg-[#FDF3F0] border-[#E07A5F] text-[#35233D] shadow-xs'
                              : 'bg-white border-[#E8DFEB] text-stone-600 hover:border-stone-300'
                          }`}
                        >
                          <div
                            className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 ${
                              isChecked ? 'bg-[#E07A5F] text-white' : 'border border-stone-300'
                            }`}
                          >
                            {isChecked && <Check className="w-3 h-3" />}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-[#35233D]">{add.name}</span>
                              <span className="font-mono font-semibold text-[#E07A5F]">
                                ${add.price}{add.pricingType === 'per_guest' ? '/gst' : ''}
                              </span>
                            </div>
                            <p className="text-[11px] text-stone-500 mt-0.5 line-clamp-2">{add.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Live Estimated Financial Breakdown */}
                <div className="p-4 bg-[#24162B] text-white rounded-xl space-y-2">
                  <div className="flex justify-between text-xs text-purple-200/80">
                    <span>Base Culinary ({guests} guests @ ${customizingPackage.pricePerGuest}):</span>
                    <span className="font-mono tabular-nums">${packageCost.toLocaleString()}</span>
                  </div>
                  {addonsCost > 0 && (
                    <div className="flex justify-between text-xs text-purple-200/80">
                      <span>Selected Add-ons Total:</span>
                      <span className="font-mono tabular-nums">${addonsCost.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-xs text-purple-200/80">
                    <span>Service Logistics &amp; Staging Fee (10%):</span>
                    <span className="font-mono tabular-nums">${serviceCharge.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs text-purple-200/80">
                    <span>Estimated Tax (12%):</span>
                    <span className="font-mono tabular-nums">${tax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold pt-2 border-t border-purple-800/40">
                    <span>Total Estimated Investment:</span>
                    <span className="font-mono text-[#E07A5F] tabular-nums text-base">${grandTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs text-purple-300/80">
                    <span>Required 30% Deposit to Lock Dates &amp; Buffers:</span>
                    <span className="font-mono text-purple-200 tabular-nums">${deposit.toLocaleString()}</span>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    onClick={() => setCustomizingPackage(null)}
                    className="px-4 py-2 rounded-lg text-xs font-semibold text-stone-600 hover:bg-stone-100 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleGenerateQuote}
                    className="px-6 py-2.5 rounded-lg text-xs font-bold text-white bg-[#E07A5F] hover:bg-[#CB674D] shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Formulate Official Quotation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
