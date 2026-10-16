import { useState } from 'react';
import { ChevronDown, HelpCircle, ArrowRight, Bot } from 'lucide-react';
import { ClemoraLogo } from './ClemoraLogo.tsx';

interface FaqSectionProps {
  onOpenAIChat: () => void;
  onRequestQuote: () => void;
}

export function FaqSection({ onOpenAIChat, onRequestQuote }: FaqSectionProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does the Turnaround Buffer Scheduling prevent equipment double-booking?',
      a: 'Traditional calendars treat events solely as the 4 to 5 hours of dining. Clemora automatically schedules and protects 7 distinct phases: warehouse dispatch (75m), transit (45m), staging (120–180m), live event execution (240–360m), teardown (75m), return transit (45m), and a strict 150-minute high-temp warewash & sanitization window. Equipment cannot be re-assigned until the warewash phase completes.',
    },
    {
      q: 'Can customers customize dietary restrictions and menu courses?',
      a: 'Yes. Our culinary catalog provides certified Vegetarian, Vegan, Gluten-Free, Halal, and Nut-Free course alternatives prepared under strict HACCP safety standards. You can mix and match custom add-ons like artisanal mixology bars, sommelier wine flights, or late-night bites directly in our package customizer.',
    },
    {
      q: 'How does the AI Concierge work with human event coordinators?',
      a: 'The AI Concierge is grounded directly in our verified package catalog, equipment inventory, and turnaround logic. When a customer requires bespoke adjustments or wishes to speak with a person, the system triggers a seamless handover with the complete conversation history forwarded to our Lead Event Coordinator.',
    },
    {
      q: 'What are the payment and deposit terms?',
      a: 'A 30% deposit is required upon quotation acceptance to protect equipment allocation and reserve turnaround buffer windows on the master schedule. Full cancellations with a refund minus a 5% administrative fee are honored up to 30 days prior to the event date.',
    },
    {
      q: 'What user roles are available in Clemora?',
      a: 'Clemora supports Role-Based Access Control (RBAC) across four primary user personas: Customers (browse, customize, quote, and track bookings), Event Coordinators (manage schedules, turnaround buffers, and quotations), Kitchen & Service Staff (view assigned shifts, run-of-show checklists, and log dispatch), and Administrators (system analytics, AI knowledge base, and security audit logs).',
    },
  ];

  return (
    <section id="faq" className="px-6 lg:px-12 py-16 lg:py-24 border-b border-[#E8DFEB] bg-[#FAF7F5]">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#E07A5F] bg-[#FDF3F0] px-3.5 py-1 rounded-sm border border-[#F7D2C6] font-mono">
            <ClemoraLogo variant="icon" theme="light" size="xs" />
            <span>Operational FAQ &amp; Guidelines</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif text-[#35233D] font-bold mt-3 tracking-tight">
            Frequently Answered Questions
          </h2>
          <p className="text-stone-600 text-sm md:text-base mt-2 leading-relaxed">
            Everything you need to know about our automated scheduling engine, menu customization, and event coordination.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-[#E8DFEB] bg-white overflow-hidden shadow-2xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FAF7F5]/50 transition-colors"
                >
                  <span className="font-bold text-sm sm:text-base text-[#35233D] font-serif">
                    {faq.q}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform ${
                      isOpen
                        ? 'bg-[#35233D] text-white rotate-180'
                        : 'bg-[#FAF7F5] text-stone-500 border border-[#E8DFEB]'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-[#E8DFEB]/60 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-[#24162B] to-[#35233D] text-white flex flex-col sm:flex-row items-center justify-between gap-4 border border-purple-900/40">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/10 text-[#E07A5F]">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm">Have a unique question or custom dietary requirement?</h4>
              <p className="text-xs text-purple-200/70">Our AI Concierge is available 24/7 with immediate answers.</p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenAIChat}
              className="px-4 py-2 text-xs font-bold bg-[#E07A5F] hover:bg-[#CB674D] text-white rounded-lg transition-colors cursor-pointer shadow-xs"
            >
              Ask AI Concierge
            </button>
            <button
              onClick={onRequestQuote}
              className="px-4 py-2 text-xs font-semibold bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors cursor-pointer"
            >
              Request Quote
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
