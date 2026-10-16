import { useState } from 'react';
import { AlertCircle, CheckCircle2, ShieldAlert } from 'lucide-react';
import { ClemoraLogo } from './common/ClemoraLogo.tsx';

export function TurnaroundBufferDemo() {
  const [simulateConflict, setSimulateConflict] = useState<boolean>(false);

  const timelineSteps = [
    {
      time: '12:00 PM',
      label: 'Loading & Transit',
      duration: '60 min',
      category: 'logistics',
      color: 'bg-[#F5EFF7] text-[#35233D] border border-purple-200',
      description: 'Van dispatched with 120 chafers, crystal flutes, and kitchen staging crates.',
    },
    {
      time: '01:00 PM',
      label: 'On-Site Setup',
      duration: '120 min',
      category: 'setup',
      color: 'bg-[#FDF3F0] text-[#B55238] border border-[#F7D2C6]',
      description: 'Linen pressing, plating lines initialized, and beverage bar station assembled.',
    },
    {
      time: '03:00 PM',
      label: 'Live Event Execution',
      duration: '240 min',
      category: 'event',
      color: 'bg-[#35233D] text-white',
      description: 'Seated dinner service, beverage coordination, and course transitions.',
    },
    {
      time: '07:00 PM',
      label: 'Teardown & Repacking',
      duration: '90 min',
      category: 'teardown',
      color: 'bg-[#F5EFF7] text-[#35233D] border border-purple-200',
      description: 'Breakdown of service areas, crate loading, and departure inspection.',
    },
    {
      time: '08:30 PM',
      label: 'Sanitization & Turnaround Buffer',
      duration: '150 min',
      category: 'buffer',
      color: 'bg-[#E07A5F] text-white shadow-xs font-semibold',
      description: 'High-temperature warewashing, cutlery polishing, and inventory readiness scan.',
    },
    {
      time: '11:00 PM',
      label: 'Ready for Re-dispatch',
      duration: 'Active',
      category: 'available',
      color: 'bg-emerald-100 text-emerald-900 border border-emerald-300',
      description: 'Equipment cleared and restocked on master warehouse shelving.',
    },
  ];

  return (
    <section id="buffer-engine" className="px-6 lg:px-12 py-16 lg:py-24 border-b border-[#E8DFEB] bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-12">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#E07A5F] mb-3 font-mono">
              <ClemoraLogo variant="icon" theme="light" size="sm" className="w-4 h-4 inline-block" />
              <span>Resource Management &amp; Conflict Engine</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#35233D] mb-4">
              Why traditional booking systems fail event caterers.
            </h2>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              Standard event calendars only record the four hours guests are eating.
              In reality, tableware, mobile kitchens, and staff require hours of transit,
              setup, teardown, and rigorous sanitization. Clemora models every phase so your
              team never commits equipment that is still in transit or being washed.
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-col items-start lg:items-end justify-center">
            <button
              onClick={() => setSimulateConflict(!simulateConflict)}
              className={`px-4 py-2.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-2 border cursor-pointer ${
                simulateConflict
                  ? 'bg-rose-50 text-rose-800 border-rose-300 hover:bg-rose-100'
                  : 'bg-[#FAF7F5] text-[#35233D] border-[#E8DFEB] hover:bg-[#F5EFF7]'
              }`}
            >
              {simulateConflict ? (
                <>
                  <ShieldAlert className="w-4 h-4 text-rose-600" />
                  <span>Conflict Simulated (Click to Reset)</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-4 h-4 text-[#E07A5F]" />
                  <span>Simulate Overlapping Booking (7:30 PM)</span>
                </>
              )}
            </button>
            <span className="text-[11px] text-stone-500 mt-2">
              Toggle to test how Clemora resolves scheduling clashes.
            </span>
          </div>
        </div>

        {/* Timeline Visualization */}
        <div className="bg-[#FAF7F5] p-6 lg:p-8 rounded-xl border border-[#E8DFEB] mb-8">
          <div className="text-xs font-bold uppercase tracking-wider text-[#35233D] mb-6 flex items-center justify-between">
            <span>Booking Resource Timeline: Sat Oct 24 (120 Guest Banquet)</span>
            <span className="font-mono text-stone-500 font-normal">Buffer Model v4.2</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-3 mb-6">
            {timelineSteps.map((step, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-lg flex flex-col justify-between ${step.color} shadow-xs`}
              >
                <div>
                  <div className="font-mono text-xs font-bold tracking-tight opacity-90">
                    {step.time}
                  </div>
                  <div className="text-xs font-semibold mt-1 leading-snug">
                    {step.label}
                  </div>
                </div>
                <div className="mt-4 pt-2 border-t border-current/20 text-[11px] opacity-80 font-mono">
                  {step.duration}
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Simulation Callout */}
          {simulateConflict ? (
            <div className="p-4 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-950">
              <div className="flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="font-bold text-rose-900">
                    Turnaround Conflict Detected at 7:30 PM
                  </div>
                  <p className="text-rose-800 leading-relaxed">
                    A customer inquired for a 7:30 PM cocktail reception requesting 120 matching glassware
                    sets and induction chafers. Clemora blocked immediate confirmation because Booking #1
                    teardown &amp; sanitization buffer remains active until 11:00 PM.
                  </p>
                  <div className="pt-2 font-medium text-rose-900 flex items-center gap-2">
                    <span>Automated Action:</span>
                    <span className="bg-white/80 px-2 py-0.5 rounded border border-rose-200 font-mono">
                      Swapped to Secondary Warehouse Stock B · Conflict Resolved
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-lg bg-white border border-[#E8DFEB] text-xs text-stone-700 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  All turnaround buffers verified. 3.5 hours of sanitization &amp; restock protected before next dispatch.
                </span>
              </div>
              <span className="font-mono text-[11px] text-stone-500">Status: Operational</span>
            </div>
          )}
        </div>

        {/* 3 Pillar Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-[#E8DFEB] text-xs text-stone-600">
          <div>
            <span className="font-bold text-[#35233D] block mb-1">
              Vehicle &amp; Transit Modeling
            </span>
            <span>
              Computes round-trip mileage and loading dock turnaround so dispatch drivers aren't stranded.
            </span>
          </div>
          <div>
            <span className="font-bold text-[#35233D] block mb-1">
              Warewash Sanitation Turnaround
            </span>
            <span>
              Dedicated dishwasher and laundry cycles ensure linens and cutlery return pristine.
            </span>
          </div>
          <div>
            <span className="font-bold text-[#35233D] block mb-1">
              Live Staff Overtime Safeguards
            </span>
            <span>
              Prevents assigning coordinators to morning setups after late-night midnight teardowns.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
