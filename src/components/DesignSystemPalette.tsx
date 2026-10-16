import { ClemoraLogo, logoAssetUrl } from './common/ClemoraLogo.tsx';
import { Download, Sparkles } from 'lucide-react';

export function DesignSystemPalette() {
  const paletteSwatches = [
    {
      role: 'Dominant Canvas (60%)',
      name: 'Cashmere Alabaster',
      hex: '#FAF7F5',
      description: 'Clean, warm-tinted light canvas providing high visual comfort and culinary elegance without stark glare.',
      sampleClass: 'bg-[#FAF7F5] border border-[#E8DFEB]',
      textColor: 'text-[#35233D]',
    },
    {
      role: 'Structural Brand Anchor (30%)',
      name: 'Royal Plum Aubergine',
      hex: '#35233D',
      description: 'The signature brand color of the Clemora wordmark and lettermark "C". Conveys heritage, prestige, and executive discipline.',
      sampleClass: 'bg-[#35233D]',
      textColor: 'text-white',
    },
    {
      role: 'High-Intent Accent (10%)',
      name: 'Terracotta Coral Star',
      hex: '#E07A5F',
      description: 'The energetic four-pointed starburst from the logo. Drives primary CTAs, active focus states, and turnaround buffer execution.',
      sampleClass: 'bg-[#E07A5F]',
      textColor: 'text-white',
    },
    {
      role: 'Night Plum Accent',
      name: 'Deep Obsidian Plum',
      hex: '#24162B',
      description: 'Rich dark foundation for navigation headers, footers, and modal framing directly complementing Royal Plum.',
      sampleClass: 'bg-[#24162B]',
      textColor: 'text-purple-200',
    },
    {
      role: 'Hairline Divider',
      name: 'Plum Stone Boundary',
      hex: '#E8DFEB',
      description: 'Subtle 1px boundary separating cards and schedule segments without heavy visual noise.',
      sampleClass: 'bg-[#E8DFEB]',
      textColor: 'text-[#35233D]',
    },
    {
      role: 'Subtle Star Glow',
      name: 'Apricot Peach Blush',
      hex: '#FDF3F0',
      description: 'Soft highlighting background for active quotes, notices, and dietary badges.',
      sampleClass: 'bg-[#FDF3F0] border border-[#F7D2C6]',
      textColor: 'text-[#B55238]',
    },
  ];

  return (
    <section id="palette" className="px-6 lg:px-12 py-16 lg:py-20 border-b border-[#E8DFEB] bg-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Brand Identity & Logo Feature Card */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-[#24162B] via-[#35233D] to-[#432A4E] text-white mb-12 shadow-md border border-purple-900/40">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#E07A5F] bg-[#E07A5F]/20 px-3 py-1 rounded-sm border border-[#E07A5F]/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Connected Brand Identity</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                Official Clemora Emblem &amp; Palette
              </h2>
              <p className="text-xs sm:text-sm text-purple-100/80 leading-relaxed">
                Designed around our signature emblem: a sovereign Royal Plum (<code className="font-mono text-purple-200">#35233D</code>) lettermark embracing an energetic Terracotta Coral (<code className="font-mono text-[#E07A5F]">#E07A5F</code>) starburst, symbolizing logistical precision and culinary hospitality.
              </p>
              
              <div className="pt-2 flex items-center gap-3">
                <a
                  href={logoAssetUrl}
                  download="clemora-logo.svg"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/20 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Master SVG</span>
                </a>
                <span className="text-xs text-purple-200/60 font-mono">
                  Vector Scalable (SVG)
                </span>
              </div>
            </div>

            {/* Logo Presentation in Both Light and Dark Backings */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 shrink-0">
              {/* Light presentation */}
              <div className="p-6 bg-[#FAF7F5] rounded-xl border border-[#E8DFEB] shadow-sm flex flex-col items-center justify-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 font-bold">
                  Light Canvas Mode
                </span>
                <div className="p-2">
                  <ClemoraLogo variant="full" theme="light" size="lg" />
                </div>
                <span className="text-[10px] text-stone-400 font-mono">
                  #35233D · #E07A5F
                </span>
              </div>

              {/* Dark presentation */}
              <div className="p-6 bg-[#24162B] rounded-xl border border-purple-900/40 shadow-sm flex flex-col items-center justify-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-purple-300 font-bold">
                  Night Plum Mode
                </span>
                <div className="p-2">
                  <ClemoraLogo variant="full" theme="dark" size="lg" />
                </div>
                <span className="text-[10px] text-purple-300/60 font-mono">
                  #FFFFFF · #E07A5F
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Section Heading */}
        <div className="max-w-2xl mb-8">
          <div className="text-xs font-semibold tracking-wider uppercase text-[#E07A5F] mb-2 font-mono">
            Color Constitution &amp; Proportions
          </div>
          <h3 className="text-2xl font-bold tracking-tight text-[#35233D] mb-2">
            The 60-30-10 Cohesive Palette
          </h3>
          <p className="text-sm text-stone-600 leading-relaxed">
            Every screen, modal, and button harmonizes with the brand logo colors, creating an unmistakable, premium identity.
          </p>
        </div>

        {/* Swatches Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paletteSwatches.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl border border-[#E8DFEB] bg-[#FAF7F5] flex flex-col justify-between shadow-2xs hover:shadow-xs transition-shadow"
            >
              <div>
                <div
                  className={`h-20 w-full rounded-lg mb-4 flex items-end p-3 ${item.sampleClass}`}
                >
                  <span className={`font-mono text-xs font-bold ${item.textColor}`}>
                    {item.hex}
                  </span>
                </div>
                <div className="text-xs font-mono font-medium text-stone-500 mb-1">
                  {item.role}
                </div>
                <h3 className="text-sm font-bold text-[#35233D] mb-1.5">{item.name}</h3>
                <p className="text-xs text-stone-600 leading-relaxed">{item.description}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#E8DFEB] flex items-center justify-between text-[11px] font-mono text-stone-500">
                <span>Contrast: WCAG AAA/AA</span>
                <span>Tailwind 4 Ready</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
