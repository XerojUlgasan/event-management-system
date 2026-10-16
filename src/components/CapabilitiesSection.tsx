import { MessageSquare, Clock3, Layers } from 'lucide-react';

export function CapabilitiesSection() {
  const capabilities = [
    {
      index: '01',
      title: 'AI-Assisted Customer Inquiries & Quotation',
      subtitle: 'Instant package recommendations grounded in real pricing',
      icon: MessageSquare,
      description:
        'Customers specify their event type, guest count, dietary preferences, and budget constraints in natural language. Clemora calculates viable menu configurations, compiles itemized quotations, and allows seamless handover to human event directors.',
      keyAspects: [
        'Real-time package customization matching kitchen capacity',
        'Automatic dietary and allergen breakdown',
        'One-click human coordinator escalation',
      ],
    },
    {
      index: '02',
      title: 'Turnaround & Resource Conflict Protection',
      subtitle: 'Buffer windows between back-to-back bookings',
      icon: Clock3,
      description:
        'Traditional systems fail because they treat an event as a static time slot. Clemora accounts for warehouse loading, vehicle transit, venue setup, teardown, and sanitization turnaround periods so equipment is never double-booked.',
      keyAspects: [
        'Automated turnaround buffers based on venue distance',
        'Early conflict warning during customer date selection',
        'Sanitization & inspection safety margins',
      ],
    },
    {
      index: '03',
      title: 'Staff Scheduling & Resource Inventory',
      subtitle: 'Skill-matched staffing and gear tracking',
      icon: Layers,
      description:
        'Clemora schedules service staff, head chefs, and mixologists based on certifications and verified availability. It dispatches banquet tables, chafing units, and glassware with dispatch and return verification checklists.',
      keyAspects: [
        'Staff-to-guest compliance tracking',
        'Real-time equipment dispatch & return verification',
        'Live run-of-show task assignment',
      ],
    },
  ];

  return (
    <section id="capabilities" className="px-6 lg:px-12 py-16 lg:py-24 border-b border-[#E7E5E4] bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-semibold tracking-wider uppercase text-[#B45309] mb-3">
            Core Architecture
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A] mb-4">
            Built to solve the real operational friction of catering and events.
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            Every feature in Clemora directly eliminates the guesswork, back-and-forth emails,
            and resource collisions that cause lost margins and stressed teams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {capabilities.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.index}
                className="flex flex-col p-6 rounded-xl border border-[#E7E5E4] bg-[#FAFAF8] hover:border-stone-400 transition-colors"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-sm font-bold text-[#B45309]">
                    {item.index}
                  </span>
                  <div className="p-2 rounded-lg bg-stone-200/60 text-[#0F172A]">
                    <IconComponent className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-[#0F172A] mb-2 leading-snug">
                  {item.title}
                </h3>
                <div className="text-xs font-medium text-stone-500 mb-4">
                  {item.subtitle}
                </div>

                <p className="text-sm text-stone-600 leading-relaxed mb-6 flex-grow">
                  {item.description}
                </p>

                <div className="pt-4 border-t border-[#E7E5E4] space-y-2">
                  {item.keyAspects.map((aspect, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-stone-600">
                      <span className="text-[#B45309] mt-0.5" aria-hidden="true">
                        —
                      </span>
                      <span>{aspect}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
