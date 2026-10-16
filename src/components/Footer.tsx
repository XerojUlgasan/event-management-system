import { ClemoraLogo } from './common/ClemoraLogo.tsx';

export function Footer() {
  return (
    <footer className="px-6 lg:px-12 py-12 border-t border-[#E8DFEB] bg-white">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <ClemoraLogo variant="full" theme="light" size="sm" />
          <p className="text-xs text-stone-500 mt-2 max-w-sm">
            Intelligent event planning, resource allocation, and automated turnaround management for catering and event professionals.
          </p>
        </div>

        <div className="flex items-center gap-6 text-xs text-stone-600">
          <a href="#capabilities" className="hover:text-[#E07A5F] transition-colors">
            Capabilities
          </a>
          <a href="#estimator" className="hover:text-[#E07A5F] transition-colors">
            Estimator
          </a>
          <a href="#buffer-engine" className="hover:text-[#E07A5F] transition-colors">
            Turnaround
          </a>
          <a href="#palette" className="hover:text-[#E07A5F] transition-colors">
            Palette
          </a>
        </div>

        <div className="text-xs text-stone-400 font-mono">
          © {new Date().getFullYear()} Clemora Platform · CAP101. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
