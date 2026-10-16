import { useState } from 'react';
import { Calendar, MapPin, Users, CheckCircle2 } from 'lucide-react';
import { useClemoraStore } from '../../services/store.ts';
import { ClemoraLogo } from '../common/ClemoraLogo.tsx';

export function PastEventsGallery() {
  const store = useClemoraStore();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const isManagerOrAdmin = store.currentUser.role === 'administrator' || store.currentUser.role === 'coordinator';

  const filteredShowcases = store.showcases.filter((s) => {
    const matchesFilter = selectedFilter === 'all' || s.category === selectedFilter;
    return isManagerOrAdmin ? matchesFilter : matchesFilter && s.isPublished;
  });

  return (
    <section id="gallery" className="py-16 lg:py-24 px-6 lg:px-12 border-b border-[#E8DFEB] bg-[#FAF7F5]">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#E07A5F] bg-[#FDF3F0] px-3.5 py-1 rounded-sm border border-[#F7D2C6] font-mono">
            <ClemoraLogo variant="icon" theme="light" size="xs" />
            <span>Curated Portfolio Archives</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif text-[#35233D] font-bold mt-3 tracking-tight">
            Past Events &amp; Culinary Showcases
          </h2>
          <p className="text-stone-600 text-sm md:text-base mt-3 leading-relaxed">
            Explore celebrations executed with our Turnaround Buffer scheduling model. Every showcase published respects client consent and venue privacy standards.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {[
            { id: 'all', label: 'All Showcases' },
            { id: 'wedding', label: 'Luxury Weddings' },
            { id: 'corporate', label: 'Corporate Galas' },
            { id: 'private', label: 'Private Vineyard Dining' },
          ].map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedFilter(c.id)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedFilter === c.id
                  ? 'bg-[#35233D] text-white shadow-xs ring-1 ring-[#35233D]'
                  : 'bg-white text-stone-600 hover:text-stone-900 border border-[#E8DFEB] hover:border-[#E07A5F]'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Showcase Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredShowcases.map((sc) => (
            <div
              key={sc.id}
              className="group bg-white rounded-2xl border border-[#E8DFEB] hover:border-[#E07A5F]/60 overflow-hidden shadow-xs hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                {/* Photo */}
                <div className="relative h-64 overflow-hidden bg-stone-100">
                  <img
                    src={sc.imageUrl}
                    alt={sc.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#24162B]/85 via-black/25 to-transparent" />

                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="bg-[#E07A5F] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-xs">
                      {sc.category}
                    </span>
                    {sc.clientConsentApproved && (
                      <span className="bg-[#24162B]/80 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-0.5 rounded flex items-center gap-1 border border-white/10">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        Consent Verified
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <h3 className="font-serif font-bold text-lg leading-tight text-balance">{sc.title}</h3>
                    <div className="flex items-center gap-3 text-xs text-purple-200 mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#E07A5F]" />
                        {sc.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3 text-[#E07A5F]" />
                        {sc.guestCount} Guests
                      </span>
                    </div>
                  </div>
                </div>

                {/* Story & Menu */}
                <div className="p-6 space-y-4 text-xs">
                  <p className="text-stone-600 leading-relaxed line-clamp-3">
                    {sc.description}
                  </p>

                  <div className="p-3.5 bg-[#FAF7F5] rounded-xl border border-[#E8DFEB]">
                    <span className="font-bold text-[#35233D] uppercase tracking-wider text-[10px] block mb-1.5 font-mono">
                      Gastronomic Highlights Served
                    </span>
                    <ul className="space-y-1 text-stone-600">
                      {sc.menuHighlights.map((m, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 truncate">
                          <span className="text-[#E07A5F] font-bold">•</span>
                          <span className="truncate">{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Footer with Venue & Turnaround Indicator */}
              <div className="p-6 pt-0 border-t border-[#E8DFEB] flex items-center justify-between text-xs text-stone-500">
                <span className="flex items-center gap-1 truncate max-w-[200px]">
                  <MapPin className="w-3.5 h-3.5 text-[#E07A5F] shrink-0" />
                  <span className="truncate">{sc.venue}</span>
                </span>
                <span className="font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-semibold text-[10px]">
                  Buffer: 100% On-Time
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
