import { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, X, Sparkles, UserPlus, CheckCircle2, ChevronRight, HelpCircle } from 'lucide-react';
import { useClemoraStore, ClemoraStore } from '../../services/store.ts';
import { ChatMessage, EventPackage } from '../../types/clemora.ts';
import { ClemoraLogo } from '../common/ClemoraLogo.tsx';

interface AIChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPackage?: (pkg: EventPackage) => void;
}

export function AIChatbot({ isOpen, onClose, onSelectPackage }: AIChatbotProps) {
  const store = useClemoraStore();
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm_init',
      sender: 'assistant',
      text: "Greetings. I am Clemora's AI Event Concierge, grounded in our real culinary repertoire, turnaround buffer logistics, and active pricing. How may I assist your event planning today?",
      timestamp: 'Just now',
    },
  ]);
  const [isHandoverOpen, setIsHandoverOpen] = useState(false);
  const [handoverReason, setHandoverReason] = useState('');
  const [handoverSuccess, setHandoverSuccess] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  if (!isOpen) return null;

  // Grounded search in Knowledge Base and Packages
  const generateGroundedResponse = (query: string): { reply: string; recommendedPackageId?: string; isHandoverTrigger?: boolean } => {
    const q = query.toLowerCase();

    // Handover triggers
    if (q.includes('human') || q.includes('manager') || q.includes('coordinator') || q.includes('talk to someone') || q.includes('speak to a person')) {
      return {
        reply: "I would be delighted to connect you with Marcus Vance, our Lead Event Coordinator. I will prepare our conversation transcript and requirements summary for immediate handover.",
        isHandoverTrigger: true,
      };
    }

    // Turnaround buffer questions
    if (q.includes('buffer') || q.includes('turnaround') || q.includes('setup') || q.includes('double-booking') || q.includes('clean')) {
      const kb = store.knowledgeBase.find((k) => k.category === 'turnaround_buffer');
      return {
        reply: kb ? kb.answer : "Clemora utilizes a patented 7-phase Turnaround Buffer Scheduling model. Beyond the active event hours, we automatically block and protect warehouse dispatch (75m), transit (45m), setup (150m), teardown (75m), and a strict 150m protected warewash sanitization window. This guarantees zero equipment collisions.",
      };
    }

    // Packages & pricing queries
    if (q.includes('wedding') || q.includes('bride') || q.includes('marriage')) {
      const pkg = store.packages.find((p) => p.category === 'wedding') || store.packages[1];
      return {
        reply: `For weddings, we recommend our ${pkg.name} at $${pkg.pricePerGuest}/guest (minimum ${pkg.minimumGuests} guests). It includes 4 passed canapés, 4-course gastronomic dinner, vintage crystal stemware, and our dedicated Bridal Maitre d'.`,
        recommendedPackageId: pkg.id,
      };
    }

    if (q.includes('corporate') || q.includes('business') || q.includes('summit') || q.includes('gala') || q.includes('conference')) {
      const pkg = store.packages.find((p) => p.category === 'corporate' || p.category === 'gala') || store.packages[0];
      return {
        reply: `For executive gatherings, the ${pkg.name} ($${pkg.pricePerGuest}/guest, min ${pkg.minimumGuests} guests) delivers synchronized high-speed service, artisanal plating, and dedicated floor captaincy tailored for punctuality.`,
        recommendedPackageId: pkg.id,
      };
    }

    if (q.includes('intimate') || q.includes('private') || q.includes('small') || q.includes('chef') || q.includes('estate')) {
      const pkg = store.packages.find((p) => p.category === 'private') || store.packages[3];
      return {
        reply: `Our boutique ${pkg.name} ($${pkg.pricePerGuest}/guest, min 15 guests) features Executive Chef Antoine Laurent executing an interactive 6-course micro-degustation with sommelier pairings tableside.`,
        recommendedPackageId: pkg.id,
      };
    }

    if (q.includes('dietary') || q.includes('vegan') || q.includes('allergy') || q.includes('halal') || q.includes('gluten')) {
      const kb = store.knowledgeBase.find((k) => k.category === 'menus');
      return {
        reply: kb ? kb.answer : "Every course in our master catalog includes certified Vegetarian, Vegan, Gluten-Free, Halal, and Nut-Free alternatives prepared under strict HACCP culinary protocols at no surcharge.",
      };
    }

    if (q.includes('deposit') || q.includes('cancel') || q.includes('policy') || q.includes('refund')) {
      const kb = store.knowledgeBase.find((k) => k.category === 'policies');
      return {
        reply: kb ? kb.answer : "We require a 30% deposit upon quotation acceptance to lock equipment and turnaround buffers. Full refund minus 5% admin fee is available up to 30 days prior to event.",
      };
    }

    if (q.includes('price') || q.includes('cost') || q.includes('rates') || q.includes('how much')) {
      return {
        reply: "Our curated packages start at $48/guest (Classic Bistro), $78/guest (Premier Artisan), $115/guest (Grand Gala), and $135/guest (Private Chef Atelier). You can use our Instant Estimator for real-time calculations including add-ons, service fees, and local taxes.",
      };
    }

    // Default informative response with suggestions
    return {
      reply: `I have access to Clemora's master catalog of 4 culinary tiers, full dietary options, and real-time scheduling buffers. You can ask about our packages, dietary accommodations, the Turnaround Buffer science, deposit policies, or request an instant coordinator handover.`,
    };
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userText = input.trim();
    const userMsg: ChatMessage = {
      id: `m_${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = generateGroundedResponse(userText);
      const assistantMsg: ChatMessage = {
        id: `m_${Date.now() + 1}`,
        sender: 'assistant',
        text: response.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        recommendedPackageId: response.recommendedPackageId,
        isHandoverTrigger: response.isHandoverTrigger,
      };

      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);

      if (response.isHandoverTrigger) {
        setIsHandoverOpen(true);
      }
    }, 700);
  };

  const handleConfirmHandover = () => {
    const snippet = messages.map((m) => ({
      sender: m.sender,
      text: m.text,
      timestamp: m.timestamp,
    }));

    ClemoraStore.createHandover({
      customerId: store.currentUser.id,
      customerName: store.currentUser.name,
      customerEmail: store.currentUser.email,
      summary: handoverReason || 'Customer requested human coordinator consultation via AI chat.',
      conversationSnippet: snippet,
      assignedCoordinator: 'Marcus Vance',
    });

    setHandoverSuccess(true);
    setTimeout(() => {
      setIsHandoverOpen(false);
      setHandoverSuccess(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `m_${Date.now()}`,
          sender: 'coordinator',
          text: "Marcus Vance here (Lead Event Coordinator). I have received your complete conversation transcript and requirements. I will review the scheduling buffers and follow up directly with you.",
          timestamp: 'Just now',
        },
      ]);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end sm:justify-end p-2 sm:p-6 bg-black/50 backdrop-blur-xs">
      <div className="w-full sm:w-[480px] h-[92vh] sm:h-[680px] bg-white rounded-2xl shadow-2xl border border-stone-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
        
        {/* Chat Header */}
        <div className="bg-[#24162B] text-white p-4 px-5 flex items-center justify-between border-b border-purple-900/40">
          <div className="flex items-center gap-3">
            <ClemoraLogo variant="icon" theme="dark" size="sm" className="w-8 h-8" />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-sm">Clemora AI Concierge</h3>
                <span className="w-2 h-2 rounded-full bg-[#E07A5F] animate-pulse" />
              </div>
              <p className="text-[11px] text-purple-200/70">Grounded in Knowledge Base & Buffer Logic</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setIsHandoverOpen(true)}
              className="px-2.5 py-1 rounded text-[11px] font-medium bg-white/10 hover:bg-white/20 text-purple-100 border border-white/15 transition-colors cursor-pointer flex items-center gap-1"
              title="Escalate to human event coordinator"
            >
              <UserPlus className="w-3 h-3 text-[#E07A5F]" />
              <span>Manager Handover</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-purple-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="bg-[#FAF7F5] border-b border-[#E8DFEB] px-4 py-2 flex items-center gap-1.5 overflow-x-auto text-[11px]">
          <span className="text-stone-400 font-semibold uppercase text-[9px] tracking-wider shrink-0">Ask:</span>
          <button
            onClick={() => { setInput('Explain the Turnaround Buffer scheduling'); }}
            className="px-2.5 py-1 rounded-full bg-white border border-[#E8DFEB] hover:border-[#E07A5F] text-[#35233D] transition-colors whitespace-nowrap cursor-pointer"
          >
            Turnaround Buffer?
          </button>
          <button
            onClick={() => { setInput('What packages do you have for a wedding?'); }}
            className="px-2.5 py-1 rounded-full bg-white border border-[#E8DFEB] hover:border-[#E07A5F] text-[#35233D] transition-colors whitespace-nowrap cursor-pointer"
          >
            Wedding Packages?
          </button>
          <button
            onClick={() => { setInput('What is the deposit and cancellation policy?'); }}
            className="px-2.5 py-1 rounded-full bg-white border border-[#E8DFEB] hover:border-[#E07A5F] text-[#35233D] transition-colors whitespace-nowrap cursor-pointer"
          >
            Deposit Policy?
          </button>
        </div>

        {/* Message Thread */}
        <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-4 text-xs leading-relaxed bg-[#FAF7F5]/40">
          {messages.map((m) => {
            const isUser = m.sender === 'user';
            const isCoord = m.sender === 'coordinator';
            const recPkg = m.recommendedPackageId ? store.packages.find((p) => p.id === m.recommendedPackageId) : null;

            return (
              <div
                key={m.id}
                className={`flex gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                    isUser
                      ? 'bg-[#E07A5F] text-white'
                      : isCoord
                      ? 'bg-[#35233D] text-white'
                      : 'bg-[#35233D] text-[#E07A5F]'
                  }`}
                >
                  {isUser ? <User className="w-3.5 h-3.5" /> : isCoord ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                </div>

                <div className={`max-w-[82%] space-y-2`}>
                  <div
                    className={`p-3.5 rounded-2xl ${
                      isUser
                        ? 'bg-[#E07A5F] text-white rounded-tr-xs shadow-xs'
                        : isCoord
                        ? 'bg-[#F5EFF7] text-[#35233D] border border-purple-200 rounded-tl-xs'
                        : 'bg-white text-stone-800 rounded-tl-xs border border-[#E8DFEB] shadow-2xs'
                    }`}
                  >
                    {isCoord && (
                      <p className="font-bold text-[10px] text-[#35233D] uppercase tracking-wider mb-1">
                        Coordinator Handover Active
                      </p>
                    )}
                    <p>{m.text}</p>
                  </div>

                  {/* Recommended Package Card if suggested */}
                  {recPkg && (
                    <div className="p-3 bg-white rounded-xl border border-[#E8DFEB] shadow-xs hover:border-[#E07A5F] transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#35233D]">{recPkg.name}</span>
                        <span className="font-mono font-semibold text-[#E07A5F] tabular-nums">
                          ${recPkg.pricePerGuest}/guest
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-500 line-clamp-2 mt-1">{recPkg.description}</p>
                      <button
                        onClick={() => {
                          if (onSelectPackage) onSelectPackage(recPkg);
                          onClose();
                        }}
                        className="mt-2 w-full py-1.5 rounded-md text-[11px] font-semibold bg-[#35233D] text-white hover:bg-[#E07A5F] transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <span>View & Customize Package</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  )}

                  <span className="block text-[10px] text-stone-400 px-1">{m.timestamp}</span>
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-center gap-2 text-[#35233D]/60 text-xs italic">
              <Bot className="w-4 h-4 animate-bounce text-[#E07A5F]" />
              <span>Consulting grounding knowledge base...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-[#E8DFEB]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about packages, menus, turnaround buffer science..."
              className="flex-1 py-2.5 px-3.5 rounded-xl border border-stone-300 bg-[#FAF7F5] text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#E07A5F]"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-2.5 rounded-xl bg-[#35233D] hover:bg-[#E07A5F] text-white disabled:opacity-40 transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Manager Handover Modal / Drawer */}
        {isHandoverOpen && (
          <div className="absolute inset-0 bg-white z-10 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-stone-200">
                <div className="flex items-center gap-2">
                  <UserPlus className="w-5 h-5 text-[#E07A5F]" />
                  <h3 className="font-bold text-sm text-[#35233D]">Coordinator Handover Escalation</h3>
                </div>
                <button
                  onClick={() => setIsHandoverOpen(false)}
                  className="text-stone-400 hover:text-stone-800 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-4 space-y-4 text-xs">
                <p className="text-stone-600">
                  Our AI Concierge will bundle your entire chat transcript, guest count, and questions into an urgent consultation ticket for <strong>Marcus Vance (Lead Coordinator)</strong>.
                </p>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Your Name & Contact Email
                  </label>
                  <input
                    type="text"
                    disabled
                    value={`${store.currentUser.name} (${store.currentUser.email})`}
                    className="w-full p-2.5 bg-stone-100 rounded-lg border border-stone-200 text-stone-600"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Specific Requirement or Question for Coordinator
                  </label>
                  <textarea
                    rows={3}
                    value={handoverReason}
                    onChange={(e) => setHandoverReason(e.target.value)}
                    placeholder="e.g. Inquiring about custom Sommelier pairing for 140 guests on Nov 28, or venue staging restrictions."
                    className="w-full p-2.5 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E07A5F]"
                  />
                </div>

                <div className="p-3 bg-[#FDF3F0] rounded-lg border border-[#F7D2C6] text-[#B55238]">
                  <p className="font-semibold mb-0.5">Turnaround Buffer Guarantee Enforced</p>
                  <p className="text-[11px]">
                    The coordinator will verify that your proposed date has no conflicting warewash or vehicle transit overlaps.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-200 flex items-center justify-end gap-2">
              <button
                onClick={() => setIsHandoverOpen(false)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-stone-600 hover:bg-stone-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmHandover}
                disabled={handoverSuccess}
                className="px-5 py-2 rounded-lg text-xs font-bold text-white bg-[#E07A5F] hover:bg-[#CB674D] shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
              >
                {handoverSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                    <span>Handover Sent!</span>
                  </>
                ) : (
                  <span>Send Handover Request</span>
                )}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
