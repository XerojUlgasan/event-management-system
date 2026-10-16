import { useState } from 'react';
import { ArrowRight, ShieldCheck, Clock, Layers } from 'lucide-react';
import { ClemoraLogo } from './common/ClemoraLogo.tsx';

interface HeroSectionProps {
  onExploreEstimator: () => void;
  onExploreBuffer: () => void;
  onOpenSignIn?: () => void;
  onOpenSignUp?: () => void;
}

export function HeroSection({
  onExploreEstimator,
  onExploreBuffer,
  onOpenSignIn,
  onOpenSignUp,
}: HeroSectionProps) {
  const [activeTheme, setActiveTheme] = useState<'evening' | 'pavilion'>('evening');

  const bgImage =
    activeTheme === 'evening'
      ? '/src/assets/images/luxury_banquet_hero_1792162588544.jpg'
      : '/src/assets/images/luxury_catering_venue_1792162393940.jpg';

  return (
    <section className="relative min-h-[640px] lg:min-h-[760px] flex flex-col justify-between px-6 lg:px-12 pt-16 pb-14 border-b border-[#E8DFEB] overflow-hidden bg-[#24162B]">
      {/* Full-bleed background image with right-weighted positioning */}
      <div
        className="absolute inset-0 bg-cover bg-right lg:bg-center bg-no-repeat transition-all duration-1000 pointer-events-none scale-100"
        style={{ backgroundImage: `url('${bgImage}')` }}
        aria-hidden="true"
      />

      {/* Horizontal Gradient Overlay: Rich royal plum on the left fading smoothly across */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#24162B] via-[#24162B]/95 sm:via-[#24162B]/90 md:via-[#24162B]/80 to-[#24162B]/35 lg:to-transparent pointer-events-none"
        aria-hidden="true"
      />

      {/* Vertical Ambient Shadow Vignette */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#24162B] via-transparent to-[#24162B]/75 pointer-events-none"
        aria-hidden="true"
      />

      {/* Warm Coral Ambient Glow */}
      <div
        className="absolute -left-20 top-1/4 w-96 h-96 rounded-full bg-[#E07A5F]/15 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-4 sm:pt-8 my-auto">
        <div className="max-w-2xl lg:max-w-3xl flex flex-col items-start">
          
          {/* Top Eyebrow Tag + Theme Switcher */}
          <div className="w-full flex items-center justify-between flex-wrap gap-3 mb-6">
            <div className="flex items-center gap-2.5 text-xs font-semibold tracking-wider uppercase text-[#E07A5F]">
              <ClemoraLogo variant="icon" theme="dark" size="sm" className="w-5 h-5 inline-block" />
              <span>Event Operations &amp; Turnaround Logistics</span>
            </div>

            {/* Subtle Atmosphere Switcher */}
            <div className="flex items-center gap-2 text-xs text-purple-200/80 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
              <span className="text-[11px] font-medium text-purple-200/60">Venue Atmosphere:</span>
              <button
                type="button"
                onClick={() => setActiveTheme('evening')}
                className={`text-[11px] transition-colors cursor-pointer ${
                  activeTheme === 'evening'
                    ? 'font-bold text-[#E07A5F] underline underline-offset-2 decoration-[#E07A5F]'
                    : 'text-purple-200/80 hover:text-white'
                }`}
              >
                Evening Gala
              </button>
              <span aria-hidden="true" className="text-purple-300/40">·</span>
              <button
                type="button"
                onClick={() => setActiveTheme('pavilion')}
                className={`text-[11px] transition-colors cursor-pointer ${
                  activeTheme === 'pavilion'
                    ? 'font-bold text-[#E07A5F] underline underline-offset-2 decoration-[#E07A5F]'
                    : 'text-purple-200/80 hover:text-white'
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

          {/* Signature Vertical Accent Bar Callout in Terracotta Coral */}
          <div className="border-l-4 border-[#E07A5F] pl-4 sm:pl-5 py-1.5 my-6 sm:my-8 max-w-2xl bg-white/5 rounded-r-lg">
            <p className="text-base sm:text-lg text-purple-100/90 leading-relaxed font-normal">
              Clemora eliminates booking bottlenecks for event and catering companies.
              Our platform connects customer inquiry handling, instant package quotation,
              and real-time equipment and staff turnaround scheduling in one quiet, zero-collision system.
            </p>
          </div>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 mt-2">
            <button
              onClick={onExploreEstimator}
              className="px-8 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-[#E07A5F] hover:bg-[#CB674D] rounded-lg shadow-lg hover:shadow-[#E07A5F]/30 transition-all whitespace-nowrap cursor-pointer active:scale-95 flex items-center gap-2"
            >
              <span>Estimate Event Package</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onExploreBuffer}
              className="px-6 py-3.5 text-xs sm:text-sm font-semibold text-purple-100 hover:text-white bg-white/10 hover:bg-white/15 border border-white/20 rounded-lg backdrop-blur-sm transition-all whitespace-nowrap cursor-pointer"
            >
              Inspect Turnaround Engine
            </button>
            {onOpenSignIn && (
              <button
                onClick={onOpenSignIn}
                className="px-5 py-3.5 text-xs sm:text-sm font-semibold text-[#E07A5F] hover:text-white bg-[#24162B]/80 hover:bg-[#35233D] border border-[#E07A5F]/40 rounded-lg backdrop-blur-sm transition-all whitespace-nowrap cursor-pointer"
              >
                Sign In / Sign Up
              </button>
            )}
          </div>

          {/* Unboxed Meta Proof Notes */}
          <div className="mt-8 pt-5 border-t border-white/15 w-full flex items-center flex-wrap gap-x-5 gap-y-2 text-xs text-purple-200/70">
            <span className="font-semibold text-[#E07A5F]">0% Double-Booking Guarantee</span>
            <span aria-hidden="true" className="text-purple-300/40">·</span>
            <span>Dynamic Staff-to-Guest Ratios</span>
            <span aria-hidden="true" className="text-purple-300/40">·</span>
            <span>Sanitation &amp; Transit Buffering</span>
          </div>
        </div>
      </div>

      {/* Bottom Proof Strip with Glassmorphism */}
      <div className="relative z-10 max-w-7xl mx-auto w-full mt-12 pt-6 border-t border-white/15">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
          <div className="flex items-start gap-3.5 p-4 rounded-xl bg-black/40 backdrop-blur-md border border-white/10">
            <div className="p-2 rounded-lg bg-[#E07A5F]/20 text-[#E07A5F] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold tracking-tight text-white font-mono tabular-nums">
                  0%
                </span>
                <span className="text-xs font-semibold text-purple-100">Conflict Rate</span>
              </div>
              <span className="text-xs text-purple-200/80 mt-1 leading-snug">
                Transit, loading, and sanitization buffer time enforced automatically before approval.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-xl bg-black/40 backdrop-blur-md border border-white/10">
            <div className="p-2 rounded-lg bg-[#E07A5F]/20 text-[#E07A5F] shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold tracking-tight text-white font-mono tabular-nums">
                  &lt; 3 mins
                </span>
                <span className="text-xs font-semibold text-purple-100">Quotation Formulation</span>
              </div>
              <span className="text-xs text-purple-200/80 mt-1 leading-snug">
                Customers receive accurate menu proposals matching their headcounts and dietary bounds.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-xl bg-black/40 backdrop-blur-md border border-white/10">
            <div className="p-2 rounded-lg bg-[#E07A5F]/20 text-[#E07A5F] shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold tracking-tight text-white font-mono tabular-nums">
                  100%
                </span>
                <span className="text-xs font-semibold text-purple-100">Live Inventory Visibility</span>
              </div>
              <span className="text-xs text-purple-200/80 mt-1 leading-snug">
                Chafing sets, crystal glassware, linens, and culinary stations mapped to active bookings.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
