import { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Clock, Layers } from 'lucide-react';

interface HeroSectionProps {
  onExploreEstimator: () => void;
  onExploreBuffer: () => void;
}

export function HeroSection({ onExploreEstimator, onExploreBuffer }: HeroSectionProps) {
  const [activeTheme, setActiveTheme] = useState<'evening' | 'pavilion'>('evening');

  const bgImage =
    activeTheme === 'evening'
      ? '/src/assets/images/luxury_banquet_hero_1792162588544.jpg'
      : '/src/assets/images/luxury_catering_venue_1792162393940.jpg';

  return (
    <section className="relative min-h-[640px] lg:min-h-[760px] flex flex-col justify-between px-6 lg:px-12 pt-16 pb-14 border-b border-[#E7E5E4] overflow-hidden bg-[#0B1120]">
      {/* Full-bleed background image with right-weighted positioning */}
      <div
        className="absolute inset-0 bg-cover bg-right lg:bg-center bg-no-repeat transition-all duration-1000 pointer-events-none scale-100"
        style={{ backgroundImage: `url('${bgImage}')` }}
        aria-hidden="true"
      />

      {/* Horizontal Gradient Overlay: Dark & solid on the left for maximum text contrast, fading smoothly to reveal photography on the right */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#0B1120] via-[#0B1120]/95 sm:via-[#0B1120]/88 md:via-[#0B1120]/75 to-[#0B1120]/30 lg:to-transparent pointer-events-none"
        aria-hidden="true"
      />

      {/* Vertical Ambient Shadow Vignette */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-[#0B1120]/70 pointer-events-none"
        aria-hidden="true"
      />

      {/* Warm Ambient Glow on Left */}
      <div
        className="absolute -left-20 top-1/4 w-96 h-96 rounded-full bg-amber-600/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-4 sm:pt-8 my-auto">
        <div className="max-w-2xl lg:max-w-3xl flex flex-col items-start">
          {/* Top Eyebrow Tag + Theme Switcher */}
          <div className="w-full flex items-center justify-between flex-wrap gap-3 mb-6">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-400">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Event Operations &amp; Turnaround Logistics</span>
            </div>

            {/* Subtle Atmosphere Switcher */}
            <div className="flex items-center gap-2 text-xs text-stone-300 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
              <span className="text-[11px] font-medium text-stone-400">Venue Atmosphere:</span>
              <button
                type="button"
                onClick={() => setActiveTheme('evening')}
                className={`text-[11px] transition-colors cursor-pointer ${
                  activeTheme === 'evening'
                    ? 'font-bold text-amber-400 underline underline-offset-2 decoration-amber-400'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                Evening Gala
              </button>
              <span aria-hidden="true" className="text-stone-500">·</span>
              <button
                type="button"
                onClick={() => setActiveTheme('pavilion')}
                className={`text-[11px] transition-colors cursor-pointer ${
                  activeTheme === 'pavilion'
                    ? 'font-bold text-amber-400 underline underline-offset-2 decoration-amber-400'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                Daylight Pavilion
              </button>
            </div>
          </div>

          {/* High-Impact Hero Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-2 text-balance">
            Clear Value for Every Event &amp; Catering Company
          </h1>

          {/* Signature Vertical Accent Bar Callout from Reference Format */}
          <div className="border-l-4 border-amber-500 pl-4 sm:pl-5 py-1.5 my-6 sm:my-8 max-w-2xl">
            <p className="text-base sm:text-lg text-stone-200 leading-relaxed font-normal">
              Clemora eliminates booking bottlenecks for event and catering companies.
              Our platform connects customer inquiry handling, instant package quotation,
              and real-time equipment and staff turnaround scheduling in one quiet, zero-collision system.
            </p>
          </div>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 mt-2">
            <button
              onClick={onExploreEstimator}
              className="px-8 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 rounded-lg shadow-lg hover:shadow-amber-600/25 transition-all whitespace-nowrap cursor-pointer active:scale-95 flex items-center gap-2"
            >
              <span>Estimate Event Package</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onExploreBuffer}
              className="px-6 py-3.5 text-xs sm:text-sm font-semibold text-stone-200 hover:text-white bg-white/10 hover:bg-white/15 border border-white/20 rounded-lg backdrop-blur-sm transition-all whitespace-nowrap cursor-pointer"
            >
              Inspect Turnaround Engine
            </button>
          </div>

          {/* Unboxed Meta Proof Notes */}
          <div className="mt-8 pt-5 border-t border-white/15 w-full flex items-center flex-wrap gap-x-5 gap-y-2 text-xs text-stone-300">
            <span className="font-semibold text-amber-300">0% Double-Booking Guarantee</span>
            <span aria-hidden="true" className="text-stone-500">·</span>
            <span>Dynamic Staff-to-Guest Ratios</span>
            <span aria-hidden="true" className="text-stone-500">·</span>
            <span>Sanitation &amp; Transit Buffering</span>
          </div>
        </div>
      </div>

      {/* Bottom Proof Strip with Glassmorphism */}
      <div className="relative z-10 max-w-7xl mx-auto w-full mt-12 pt-6 border-t border-white/15">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
          <div className="flex items-start gap-3.5 p-4 rounded-xl bg-black/40 backdrop-blur-md border border-white/10">
            <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold tracking-tight text-white font-mono tabular-nums">
                  0%
                </span>
                <span className="text-xs font-semibold text-stone-200">Conflict Rate</span>
              </div>
              <span className="text-xs text-stone-300 mt-1 leading-snug">
                Transit, loading, and sanitization buffer time enforced automatically before approval.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-xl bg-black/40 backdrop-blur-md border border-white/10">
            <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold tracking-tight text-white font-mono tabular-nums">
                  &lt; 3 mins
                </span>
                <span className="text-xs font-semibold text-stone-200">Quotation Formulation</span>
              </div>
              <span className="text-xs text-stone-300 mt-1 leading-snug">
                Customers receive accurate menu proposals matching their headcounts and dietary bounds.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-xl bg-black/40 backdrop-blur-md border border-white/10">
            <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold tracking-tight text-white font-mono tabular-nums">
                  100%
                </span>
                <span className="text-xs font-semibold text-stone-200">Live Inventory Visibility</span>
              </div>
              <span className="text-xs text-stone-300 mt-1 leading-snug">
                Chafing sets, crystal glassware, linens, and culinary stations mapped to active bookings.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
