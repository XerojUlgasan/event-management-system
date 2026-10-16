export function DesignSystemPalette() {
  const paletteSwatches = [
    {
      role: 'Dominant Canvas (60%)',
      name: 'Porcelain Alabaster',
      hex: '#FAFAF8',
      description: 'Clean, warm-tinted light canvas providing high visual comfort and culinary elegance without stark glare.',
      sampleClass: 'bg-[#FAFAF8] border border-stone-300',
      textColor: 'text-stone-800',
    },
    {
      role: 'Structural Anchor (30%)',
      name: 'Slate Navy Charcoal',
      hex: '#0F172A',
      description: 'Authoritative, timeless dark tone for typography, primary buttons, and critical status dividers.',
      sampleClass: 'bg-[#0F172A]',
      textColor: 'text-white',
    },
    {
      role: 'Intent Accent (10%)',
      name: 'Warm Amber Bronze',
      hex: '#B45309',
      description: 'High-intent hospitality accent evoking golden hour banquets, culinary craftsmanship, and active focus.',
      sampleClass: 'bg-[#B45309]',
      textColor: 'text-white',
    },
    {
      role: 'Hairline Divider',
      name: 'Stone Boundary',
      hex: '#E7E5E4',
      description: 'Subtle 1px boundary separating containers cleanly without bulky drop shadows.',
      sampleClass: 'bg-[#E7E5E4]',
      textColor: 'text-stone-700',
    },
  ];

  return (
    <section id="palette" className="px-6 lg:px-12 py-16 lg:py-20 border-b border-[#E7E5E4] bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-10">
          <div className="text-xs font-semibold tracking-wider uppercase text-[#B45309] mb-3">
            Design Architecture & Palette
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A] mb-3">
            The Clemora Design System & Color Palette
          </h2>
          <p className="text-sm text-stone-600 leading-relaxed">
            Crafted strictly for hospitality and event logistics: a 60-30-10 distribution balancing
            warm banquet hospitality with enterprise-grade operational discipline.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {paletteSwatches.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl border border-[#E7E5E4] bg-[#FAFAF8] flex flex-col justify-between"
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
                <h3 className="text-sm font-bold text-[#0F172A] mb-2">{item.name}</h3>
                <p className="text-xs text-stone-600 leading-relaxed">{item.description}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#E7E5E4] flex items-center justify-between text-[11px] font-mono text-stone-500">
                <span>Contrast: WCAG AA Pass</span>
                <span>Tailwind Native</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
