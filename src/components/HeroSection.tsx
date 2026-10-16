interface HeroSectionProps {
  onExploreEstimator: () => void;
  onExploreBuffer: () => void;
}

export function HeroSection({ onExploreEstimator, onExploreBuffer }: HeroSectionProps) {
  return (
    <section className="relative px-6 lg:px-12 pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-[#E7E5E4]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Clear Value Proposition */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#B45309] mb-4">
              <span>Event Logistics</span>
              <span aria-hidden="true">·</span>
              <span>Catering Operations</span>
              <span aria-hidden="true">·</span>
              <span>Automated Turnaround</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0F172A] leading-[1.15] mb-6 text-balance">
              Intelligent event planning and resource operations, unified.
            </h1>

            <p className="text-base sm:text-lg text-stone-600 leading-relaxed mb-8 max-w-xl">
              Clemora eliminates booking bottlenecks for event and catering companies.
              Our platform connects customer inquiry handling, instant package quotation,
              and real-time equipment and staff turnaround scheduling in one quiet system.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onExploreEstimator}
                className="px-6 py-3 text-sm font-semibold text-white bg-[#0F172A] hover:bg-[#1E293B] rounded-lg transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F172A]"
              >
                Estimate Event Package
              </button>
              <button
                onClick={onExploreBuffer}
                className="px-6 py-3 text-sm font-semibold text-[#0F172A] bg-stone-100 hover:bg-stone-200 border border-[#E7E5E4] rounded-lg transition-colors whitespace-nowrap"
              >
                Inspect Turnaround Engine
              </button>
            </div>

            {/* Unboxed Metadata / Guarantees */}
            <div className="mt-10 pt-6 border-t border-[#E7E5E4] w-full flex items-center flex-wrap gap-x-6 gap-y-2 text-xs text-stone-500">
              <span className="font-medium text-stone-700">0% Double-Booking Guarantee</span>
              <span aria-hidden="true">·</span>
              <span>Dynamic Staff-to-Guest Ratios</span>
              <span aria-hidden="true">·</span>
              <span>Sanitation & Transit Buffering</span>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden border border-[#E7E5E4] shadow-sm bg-stone-100">
              <img
                src="/src/assets/images/hero_event_catering_banquet_1792158710813.jpg"
                alt="Contemporary light-filled glass pavilion styled for a luxury seated banquet event"
                referrerPolicy="no-referrer"
                className="w-full h-auto max-h-[480px] object-cover"
                loading="eager"
              />
              <div className="p-4 bg-white/95 border-t border-[#E7E5E4] flex items-center justify-between text-xs text-stone-600">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[#0F172A]">Grand Pavilion Staging</span>
                  <span aria-hidden="true">·</span>
                  <span>140 Guests</span>
                </div>
                <span className="tabular-nums font-mono text-stone-500">Buffer time: 3.5 hrs</span>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width 3-Metric Proof Strip Below Hero */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 pt-10 border-t border-[#E7E5E4]">
          <div className="flex flex-col">
            <span className="text-3xl font-bold tracking-tight text-[#0F172A] font-mono tabular-nums">
              0%
            </span>
            <span className="text-xs font-semibold text-stone-900 mt-1">Resource Overlap Rate</span>
            <span className="text-xs text-stone-500 mt-0.5">
              Equipment transit, setup, and teardown buffer time enforced before reservation approval.
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-3xl font-bold tracking-tight text-[#0F172A] font-mono tabular-nums">
              &lt; 3 mins
            </span>
            <span className="text-xs font-semibold text-stone-900 mt-1">Quotation Formulation</span>
            <span className="text-xs text-stone-500 mt-0.5">
              Customers receive accurate menu proposals matching their exact headcounts and dietary bounds.
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-3xl font-bold tracking-tight text-[#0F172A] font-mono tabular-nums">
              100%
            </span>
            <span className="text-xs font-semibold text-stone-900 mt-1">Live Inventory Visibility</span>
            <span className="text-xs text-stone-500 mt-0.5">
              Chafing sets, crystal glassware, linens, and culinary stations mapped to active bookings.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
