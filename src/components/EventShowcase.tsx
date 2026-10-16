import { Star, Check } from 'lucide-react';

export function EventShowcase() {
  return (
    <section id="showcase" className="px-6 lg:px-12 py-16 lg:py-24 border-b border-[#E7E5E4] bg-[#FAFAF8]">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-semibold tracking-wider uppercase text-[#B45309] mb-3">
            Executed Operations & Past Events
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A] mb-4">
            Proven execution from intimate tastings to 350-guest banquets.
          </h2>
          <p className="text-sm sm:text-base text-stone-600">
            Real catering teams use Clemora to deliver flawless hospitality backed by rigorous resource management.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left card with verified plating image */}
          <div className="lg:col-span-7 rounded-xl border border-[#E7E5E4] bg-white overflow-hidden flex flex-col">
            <div className="relative h-72 sm:h-80 overflow-hidden bg-stone-100">
              <img
                src="/src/assets/images/showcase_culinary_plating_1792158729100.jpg"
                alt="Artisan duck breast entree with reduction sauce and microgreens on stoneware plate"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute top-4 left-4 bg-[#0F172A]/90 text-white text-xs px-3 py-1 rounded backdrop-blur-sm font-mono">
                Grand Gala Curation · Autumn Portfolio
              </div>
            </div>

            <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between">
              <div>
                {/* Unboxed metadata */}
                <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
                  <span>Botanical Pavilion</span>
                  <span aria-hidden="true">·</span>
                  <span>180 Guests</span>
                  <span aria-hidden="true">·</span>
                  <span>5-Course Tasting Service</span>
                </div>

                <h3 className="text-xl font-bold text-[#0F172A] mb-3">
                  The Meridian Gala: Zero-Delay Course Timing
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed mb-6">
                  Executing a 180-guest plated dinner with hot course delivery requires synchronizing
                  14 floor staff, 5 line cooks, and 540 pieces of temperature-regulated dinnerware.
                  Clemora tracked prep milestones to maintain course delivery within 4 minutes of target run-of-show.
                </p>
              </div>

              <div className="pt-4 border-t border-[#E7E5E4] grid grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-stone-400 block font-mono">Run-of-Show</span>
                  <span className="font-semibold text-stone-900 mt-0.5 block">100% On-Schedule</span>
                </div>
                <div>
                  <span className="text-stone-400 block font-mono">Turnaround</span>
                  <span className="font-semibold text-stone-900 mt-0.5 block">2.5h Clean Recovery</span>
                </div>
                <div>
                  <span className="text-stone-400 block font-mono">Guest Satisfaction</span>
                  <span className="font-semibold text-stone-900 mt-0.5 block">5.0 / 5.0 Rated</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right card: Operational Review & Testimonial */}
          <div className="lg:col-span-5 rounded-xl border border-[#E7E5E4] bg-white p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1 text-[#B45309] mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
                <span className="text-xs font-mono text-stone-600 ml-2 font-bold">5.0 / 5.0</span>
              </div>

              <blockquote className="text-sm sm:text-base text-stone-800 leading-relaxed mb-6 font-normal">
                "Before Clemora, Saturday nights were a logistical high-wire act. We routinely had vans
                scrambling back to the warehouse because someone double-booked chafers or forgot to factor
                in dishwashing turnaround between a noon wedding and an evening gala.
                <br /><br />
                Clemora's buffer engine solved our equipment bottlenecks permanently, and the AI customer
                inquiry tool cut our proposal drafting time from 2 days down to 10 minutes."
              </blockquote>

              <div className="border-t border-[#E7E5E4] pt-4">
                <div className="font-bold text-sm text-[#0F172A]">Elena Vance</div>
                <div className="text-xs text-stone-500">Director of Operations, Vance & Co. Premier Catering</div>
                <div className="text-xs text-stone-400 font-mono mt-1">Over 240 events managed annually</div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#E7E5E4] space-y-2 text-xs text-stone-600">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Automated inventory check-in and checkout barcodes</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Live WhatsApp / SMS coordinator alerts on schedule changes</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Seamless handover between AI receptionist and catering director</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
