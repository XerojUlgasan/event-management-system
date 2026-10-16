import { Shield, UserCheck, Briefcase, Utensils, Globe, RefreshCw } from 'lucide-react';
import { useClemoraStore, ClemoraStore } from '../../services/store.ts';
import { UserRole } from '../../types/clemora.ts';

interface RoleSwitcherProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  onResetDemo: () => void;
}

export function RoleSwitcher({ currentTab, onTabChange, onResetDemo }: RoleSwitcherProps) {
  const store = useClemoraStore();
  const currentRole = store.currentUser?.role;

  const roles: { role: UserRole | 'public'; label: string; icon: React.ReactNode; userEmail: string; desc: string }[] = [
    {
      role: 'public',
      label: 'Public Showcase',
      icon: <Globe className="w-3.5 h-3.5" />,
      userEmail: 'Guest View',
      desc: 'Catalog, Estimator, Past Events',
    },
    {
      role: 'customer',
      label: 'Customer Portal',
      icon: <UserCheck className="w-3.5 h-3.5" />,
      userEmail: 'victoria.sterling@horizoncapital.com',
      desc: 'My Bookings, Quotes & Feedback',
    },
    {
      role: 'coordinator',
      label: 'Coordinator / Manager',
      icon: <Briefcase className="w-3.5 h-3.5" />,
      userEmail: 'coordinator@clemora.com',
      desc: 'Quotes, Calendar & Buffers',
    },
    {
      role: 'staff',
      label: 'Operations & Staff',
      icon: <Utensils className="w-3.5 h-3.5" />,
      userEmail: 'antoine@clemora.com',
      desc: 'Shifts, Tasks & Dispatch',
    },
    {
      role: 'administrator',
      label: 'Administrator',
      icon: <Shield className="w-3.5 h-3.5" />,
      userEmail: 'admin@clemora.com',
      desc: 'Analytics, KB & Security Logs',
    },
  ];

  const handleSelectRole = (roleItem: typeof roles[0]) => {
    if (roleItem.role === 'public') {
      onTabChange('public');
    } else {
      ClemoraStore.setCurrentRole(roleItem.role);
      if (roleItem.role === 'customer') onTabChange('customer-portal');
      else if (roleItem.role === 'coordinator') onTabChange('manager-portal');
      else if (roleItem.role === 'staff') onTabChange('staff-portal');
      else if (roleItem.role === 'administrator') onTabChange('admin-portal');
    }
  };

  const isPublicActive = currentTab === 'public' || currentTab === 'estimator' || currentTab === 'gallery' || currentTab === 'packages';

  return (
    <div className="bg-[#1C1021] text-purple-100 border-b border-purple-950/60 text-xs px-4 py-2 select-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Left: Capstone & System indicator */}
        <div className="flex items-center gap-2 text-stone-300">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm bg-[#35233D] border border-[#E07A5F]/40 text-[#E07A5F] font-bold text-[11px] uppercase tracking-wider">
            CAP101 · Clemora
          </span>
          <span className="hidden sm:inline text-purple-200/70">
            Turnaround Buffer Engine v4.2 · Active Persona:
          </span>
          <span className="text-white font-semibold">
            {isPublicActive ? 'Public Visitor' : `${store.currentUser?.name} (${store.currentUser?.role})`}
          </span>
        </div>

        {/* Center / Right: Instant Role Switcher Pills */}
        <div className="flex items-center gap-1.5 flex-wrap justify-center">
          <span className="text-purple-200/60 text-[11px] mr-1 hidden lg:inline">Switch Persona:</span>
          {roles.map((r) => {
            const isActive =
              r.role === 'public' ? isPublicActive : !isPublicActive && currentRole === r.role;
            return (
              <button
                key={r.role}
                onClick={() => handleSelectRole(r)}
                title={`${r.label} — ${r.desc}`}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#E07A5F] text-white shadow-xs font-bold ring-1 ring-[#E07A5F]/80'
                    : 'bg-[#2E1A36] hover:bg-[#3D2348] text-purple-100/90 hover:text-white'
                }`}
              >
                {r.icon}
                <span>{r.label}</span>
              </button>
            );
          })}

          <button
            onClick={onResetDemo}
            title="Reset system database to pristine initial demo records"
            className="flex items-center gap-1 px-2 py-1 rounded text-[11px] text-purple-300 hover:text-[#E07A5F] hover:bg-[#2E1A36] transition-colors ml-1 cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" />
            <span className="hidden xl:inline">Reset Demo</span>
          </button>
        </div>
      </div>
    </div>
  );
}
