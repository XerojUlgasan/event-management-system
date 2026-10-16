import { useState, useMemo } from 'react';
import { EVENT_TYPES, PACKAGE_TIERS, ADD_ONS } from '../data/mockData.ts';
import { Users, Clock, UtensilsCrossed, Sparkles } from 'lucide-react';

interface InteractiveEstimatorProps {
  onProceedToQuote: (details: {
    eventType: string;
    guests: number;
    tierName: string;
    selectedAddOns: string[];
    estimatedTotal: number;
  }) => void;
}

export function InteractiveEstimator({ onProceedToQuote }: InteractiveEstimatorProps) {
  const [selectedEventTypeId, setSelectedEventTypeId] = useState<string>('wedding');
  const [guests, setGuests] = useState<number>(100);
  const [selectedTierId, setSelectedTierId] = useState<string>('premier');
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>(['bar_service']);

  const currentEventType = useMemo(
    () => EVENT_TYPES.find((e) => e.id === selectedEventTypeId) || EVENT_TYPES[0],
    [selectedEventTypeId]
  );

  const currentTier = useMemo(
    () => PACKAGE_TIERS.find((t) => t.id === selectedTierId) || PACKAGE_TIERS[1],
    [selectedTierId]
  );

  const toggleAddOn = (id: string) => {
    setSelectedAddOnIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Calculations
  const baseFoodCost = currentTier.pricePerGuest * guests;
  const addOnsCost = useMemo(() => {
    return selectedAddOnIds.reduce((sum, id) => {
      const match = ADD_ONS.find((a) => a.id === id);
      return sum + (match ? match.price : 0);
    }, 0);
  }, [selectedAddOnIds]);

  const estimatedTotal = baseFoodCost + addOnsCost;
  const perGuestTotal = Math.round(estimatedTotal / guests);

  // Operational metrics calculated automatically
  const staffWaiters = Math.max(2, Math.ceil(guests / 16));
  const staffChefs = Math.max(1, Math.ceil(guests / 35));
  const totalStaff = staffWaiters + staffChefs + (selectedAddOnIds.includes('bar_service') ? 2 : 0);

  // Turnaround buffer hours needed
  const setupHours = currentTier.prepTimeHours;
  const eventDurationHours = 5.0;
  const teardownHours = 1.5;
  const sanitationHours = guests > 150 ? 3.0 : 2.0;
  const totalTurnaroundBuffer = setupHours + teardownHours + sanitationHours;

  const handleBookEstimate = () => {
    const selectedAddOnNames = ADD_ONS.filter((a) => selectedAddOnIds.includes(a.id)).map(
      (a) => a.name
    );
    onProceedToQuote({
      eventType: currentEventType.name,
      guests,
      tierName: currentTier.name,
      selectedAddOns: selectedAddOnNames,
      estimatedTotal,
    });
  };

  return (
    <section id="estimator" className="px-6 lg:px-12 py-16 lg:py-24 border-b border-[#E7E5E4] bg-[#FAFAF8]">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-semibold tracking-wider uppercase text-[#B45309] mb-3">
            Interactive Package Estimator
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A] mb-3">
            Configure your event package with instant turnaround verification.
          </h2>
          <p className="text-sm sm:text-base text-stone-600">
            Select your event profile and service tier below to calculate live pricing,
            accurate staffing requirements, and minimum operational buffer times.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-8 bg-white p-6 sm:p-8 rounded-xl border border-[#E7E5E4]">
            {/* 1. Event Type Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-3">
                1. Select Event Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                {EVENT_TYPES.map((type) => {
                  const isSelected = type.id === selectedEventTypeId;
                  return (
                    <button
                      key={type.id}
                      onClick={() => {
                        setSelectedEventTypeId(type.id);
                        setGuests(type.baseGuests);
                      }}
                      className={`p-3.5 text-left rounded-lg border transition-colors ${
                        isSelected
                          ? 'border-[#0F172A] bg-stone-50'
                          : 'border-[#E7E5E4] hover:border-stone-400 bg-white'
                      }`}
                    >
                      <div className="text-sm font-semibold text-[#0F172A]">{type.name}</div>
                      <div className="text-xs text-stone-500 mt-1 line-clamp-1">
                        {type.description}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Headcount Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                  2. Number of Guests
                </label>
                <span className="font-mono text-base font-bold text-[#0F172A] tabular-nums">
                  {guests} Guests
                </span>
              </div>
              <input
                type="range"
                min={20}
                max={350}
                step={5}
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#0F172A]"
              />
              <div className="flex justify-between text-xs text-stone-400 mt-1 font-mono">
                <span>20 guests</span>
                <span>150 guests</span>
                <span>350 guests</span>
              </div>
            </div>

            {/* 3. Catering & Service Tier */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-3">
                3. Menu & Dining Tier
              </label>
              <div className="space-y-3">
                {PACKAGE_TIERS.map((tier) => {
                  const isSelected = tier.id === selectedTierId;
                  return (
                    <div
                      key={tier.id}
                      onClick={() => setSelectedTierId(tier.id)}
                      className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                        isSelected
                          ? 'border-[#0F172A] bg-stone-50'
                          : 'border-[#E7E5E4] hover:border-stone-400 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-semibold text-[#0F172A]">{tier.name}</div>
                        <div className="font-mono text-sm font-bold text-[#0F172A] tabular-nums">
                          ${tier.pricePerGuest} <span className="text-xs font-normal text-stone-500">/ guest</span>
                        </div>
                      </div>
                      <p className="text-xs text-stone-600 mt-1">{tier.description}</p>
                      <div className="mt-2 text-xs text-stone-500 font-mono">
                        Included: {tier.courses}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 4. Service Add-Ons */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-3">
                4. Operational Add-Ons
              </label>
              <div className="space-y-2">
                {ADD_ONS.map((addOn) => {
                  const isChecked = selectedAddOnIds.includes(addOn.id);
                  return (
                    <div
                      key={addOn.id}
                      onClick={() => toggleAddOn(addOn.id)}
                      className={`flex items-start justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                        isChecked
                          ? 'border-stone-600 bg-stone-50/80'
                          : 'border-[#E7E5E4] hover:border-stone-300 bg-white'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="mt-0.5 rounded border-stone-300 text-[#0F172A] focus:ring-0"
                        />
                        <div>
                          <div className="text-xs font-semibold text-[#0F172A]">{addOn.name}</div>
                          <div className="text-xs text-stone-500">{addOn.description}</div>
                        </div>
                      </div>
                      <span className="font-mono text-xs font-semibold text-stone-700 tabular-nums shrink-0 ml-4">
                        +${addOn.price}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quotation & Logistics Breakdown Sticky Card */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-xl border border-[#0F172A]/20 shadow-sm sticky top-24">
            <div className="text-xs font-semibold tracking-wider uppercase text-stone-500 mb-2">
              Preliminary Quotation Summary
            </div>
            <div className="flex items-baseline justify-between border-b border-[#E7E5E4] pb-4 mb-6">
              <div>
                <div className="text-3xl font-bold font-mono text-[#0F172A] tabular-nums">
                  ${estimatedTotal.toLocaleString()}
                </div>
                <div className="text-xs text-stone-500 mt-0.5">
                  Approx. ${perGuestTotal} / guest for {guests} guests
                </div>
              </div>
              <span className="text-xs font-mono px-2 py-1 bg-stone-100 text-stone-700 rounded border border-stone-200">
                Itemized Estimate
              </span>
            </div>

            {/* Resource & Operational Metrics */}
            <div className="space-y-4 mb-6">
              <div className="text-xs font-bold uppercase tracking-wider text-stone-700">
                Resource Allocation & Scheduling
              </div>

              <div className="flex items-center justify-between text-xs py-2 border-b border-[#E7E5E4]">
                <div className="flex items-center gap-2 text-stone-600">
                  <Users className="w-4 h-4 text-stone-500" />
                  <span>Required Service Staff</span>
                </div>
                <span className="font-mono font-semibold text-[#0F172A] tabular-nums">
                  {totalStaff} personnel ({staffWaiters} servers, {staffChefs} kitchen)
                </span>
              </div>

              <div className="flex items-center justify-between text-xs py-2 border-b border-[#E7E5E4]">
                <div className="flex items-center gap-2 text-stone-600">
                  <UtensilsCrossed className="w-4 h-4 text-stone-500" />
                  <span>Catering Place Settings</span>
                </div>
                <span className="font-mono font-semibold text-[#0F172A] tabular-nums">
                  {guests * 3} pieces (service ware + glassware)
                </span>
              </div>

              <div className="flex items-center justify-between text-xs py-2 border-b border-[#E7E5E4]">
                <div className="flex items-center gap-2 text-stone-600">
                  <Clock className="w-4 h-4 text-stone-500" />
                  <span>Total Turnaround Buffer Window</span>
                </div>
                <span className="font-mono font-semibold text-[#B45309] tabular-nums">
                  {totalTurnaroundBuffer} hours protected
                </span>
              </div>
            </div>

            {/* Buffer Explanation Box */}
            <div className="p-3 bg-stone-50 rounded-lg border border-[#E7E5E4] text-xs text-stone-600 mb-6">
              <div className="font-semibold text-stone-800 mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#B45309]" />
                Automated Turnaround Protection
              </div>
              <span>
                Clemora automatically reserves {setupHours}h on-site prep, 1.5h teardown, and {sanitationHours}h
                equipment sanitization to prevent back-to-back resource collisions.
              </span>
            </div>

            <button
              onClick={handleBookEstimate}
              className="w-full py-3 px-4 text-sm font-semibold text-white bg-[#0F172A] hover:bg-[#1E293B] rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F172A]"
            >
              Request Formal Proposal & Hold Date
            </button>
            <div className="text-center text-[11px] text-stone-400 mt-2">
              No immediate commitment required. Quotation valid for 14 calendar days.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
