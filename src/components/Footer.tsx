export function Footer() {
  return (
    <footer className="px-6 lg:px-12 py-12 border-t border-[#E7E5E4] bg-white">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-base font-bold tracking-tight text-[#0F172A]">
            Clemora
          </span>
          <p className="text-xs text-stone-500 mt-1 max-w-sm">
            Intelligent event planning, resource allocation, and automated turnaround management for catering and event professionals.
          </p>
        </div>

        <div className="flex items-center gap-6 text-xs text-stone-600">
          <a href="#capabilities" className="hover:text-[#0F172A] transition-colors">
            Capabilities
          </a>
          <a href="#estimator" className="hover:text-[#0F172A] transition-colors">
            Estimator
          </a>
          <a href="#buffer-engine" className="hover:text-[#0F172A] transition-colors">
            Turnaround
          </a>
          <a href="#palette" className="hover:text-[#0F172A] transition-colors">
            Palette
          </a>
        </div>

        <div className="text-xs text-stone-400 font-mono">
          © {new Date().getFullYear()} Clemora Platform. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
