import { useState, useRef, useEffect } from 'react';
import { Bell, Bot, Calendar, FileText, CheckCircle2, AlertTriangle, Layers, X, User, LogOut, ChevronDown, Sparkles, LogIn, UserPlus } from 'lucide-react';
import { useClemoraStore, ClemoraStore } from '../../services/store.ts';
import { ClemoraLogo } from '../common/ClemoraLogo.tsx';

interface NavbarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  onOpenAIChat: () => void;
  onRequestQuote: () => void;
  onOpenSignIn: () => void;
  onOpenSignUp: () => void;
}

export function Navbar({
  currentTab,
  onTabChange,
  onOpenAIChat,
  onRequestQuote,
  onOpenSignIn,
  onOpenSignUp,
}: NavbarProps) {
  const store = useClemoraStore();
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const unreadCount = store.notifications.filter((n) => !n.read).length;

  const userDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(e.target as Node)) {
        setShowUserDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Determine active portal mode
  const isCustomerPortal = currentTab.startsWith('customer');
  const isManagerPortal = currentTab.startsWith('manager');
  const isStaffPortal = currentTab.startsWith('staff');
  const isAdminPortal = currentTab.startsWith('admin');
  const isPublic = !isCustomerPortal && !isManagerPortal && !isStaffPortal && !isAdminPortal;

  const currentUser = store.currentUser;

  const handleSignOut = () => {
    ClemoraStore.logout();
    setShowUserDropdown(false);
    onTabChange('public');
  };

  return (
    <header className="sticky top-0 z-40 bg-[#24162B] border-b border-purple-900/30 text-white px-4 lg:px-8 py-3 transition-colors shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Zone 1: Official Logo + Subtitle Tag */}
        <div className="flex items-center gap-6 shrink-0">
          <button
            onClick={() => onTabChange('public')}
            className="flex items-center gap-3 text-left hover:opacity-95 transition-opacity cursor-pointer group"
          >
            <ClemoraLogo variant="full" theme="dark" size="sm" />
            <span className="hidden xl:inline-block text-[10px] text-[#E07A5F] font-sans tracking-widest uppercase font-bold border-l border-white/20 pl-3">
              Turnaround Logistics
            </span>
          </button>
        </div>

        {/* Zone 2: Contextual Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5 lg:gap-2 text-xs font-medium overflow-x-auto py-1">
          {isPublic && (
            <>
              <button
                onClick={() => onTabChange('public')}
                className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                  currentTab === 'public' ? 'text-[#E07A5F] bg-white/10 font-bold' : 'text-stone-300 hover:text-white'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => onTabChange('packages')}
                className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                  currentTab === 'packages' ? 'text-[#E07A5F] bg-white/10 font-bold' : 'text-stone-300 hover:text-white'
                }`}
              >
                Packages &amp; Customizer
              </button>
              <button
                onClick={() => onTabChange('estimator')}
                className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                  currentTab === 'estimator' ? 'text-[#E07A5F] bg-white/10 font-bold' : 'text-stone-300 hover:text-white'
                }`}
              >
                Instant Estimator
              </button>
              <button
                onClick={() => onTabChange('buffer')}
                className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                  currentTab === 'buffer' ? 'text-[#E07A5F] bg-white/10 font-bold' : 'text-stone-300 hover:text-white'
                }`}
              >
                Turnaround Science
              </button>
              <button
                onClick={() => onTabChange('gallery')}
                className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                  currentTab === 'gallery' ? 'text-[#E07A5F] bg-white/10 font-bold' : 'text-stone-300 hover:text-white'
                }`}
              >
                Past Events
              </button>
            </>
          )}

          {isCustomerPortal && (
            <>
              <button
                onClick={() => onTabChange('customer-portal')}
                className="px-3 py-1.5 rounded-md text-[#E07A5F] bg-white/10 font-bold cursor-pointer"
              >
                Customer Portal Dashboard
              </button>
              <button
                onClick={() => onTabChange('packages')}
                className="px-3 py-1.5 rounded-md text-stone-300 hover:text-white transition-colors cursor-pointer"
              >
                Browse Packages
              </button>
            </>
          )}

          {isManagerPortal && (
            <>
              <button
                onClick={() => onTabChange('manager-portal')}
                className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                  currentTab === 'manager-portal' ? 'text-[#E07A5F] bg-white/10 font-bold' : 'text-stone-300 hover:text-white'
                }`}
              >
                Coordinator KPIs
              </button>
              <button
                onClick={() => onTabChange('manager-quotes')}
                className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                  currentTab === 'manager-quotes' ? 'text-[#E07A5F] bg-white/10 font-bold' : 'text-stone-300 hover:text-white'
                }`}
              >
                Quotations
              </button>
              <button
                onClick={() => onTabChange('manager-calendar')}
                className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                  currentTab === 'manager-calendar' ? 'text-[#E07A5F] bg-white/10 font-bold' : 'text-stone-300 hover:text-white'
                }`}
              >
                Booking Calendar
              </button>
              <button
                onClick={() => onTabChange('manager-roster')}
                className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                  currentTab === 'manager-roster' ? 'text-[#E07A5F] bg-white/10 font-bold' : 'text-stone-300 hover:text-white'
                }`}
              >
                Staff Roster
              </button>
              <button
                onClick={() => onTabChange('manager-inventory')}
                className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                  currentTab === 'manager-inventory' ? 'text-[#E07A5F] bg-white/10 font-bold' : 'text-stone-300 hover:text-white'
                }`}
              >
                Inventory
              </button>
              <button
                onClick={() => onTabChange('manager-ops')}
                className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                  currentTab === 'manager-ops' ? 'text-[#E07A5F] bg-white/10 font-bold' : 'text-stone-300 hover:text-white'
                }`}
              >
                Event Ops
              </button>
            </>
          )}

          {isStaffPortal && (
            <button
              onClick={() => onTabChange('staff-portal')}
              className="px-3 py-1.5 rounded-md text-[#E07A5F] bg-white/10 font-bold cursor-pointer"
            >
              Operations &amp; Tasks Board
            </button>
          )}

          {isAdminPortal && (
            <>
              <button
                onClick={() => onTabChange('admin-portal')}
                className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                  currentTab === 'admin-portal' ? 'text-[#E07A5F] bg-white/10 font-bold' : 'text-stone-300 hover:text-white'
                }`}
              >
                Executive Analytics
              </button>
              <button
                onClick={() => onTabChange('admin-packages')}
                className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                  currentTab === 'admin-packages' ? 'text-[#E07A5F] bg-white/10 font-bold' : 'text-stone-300 hover:text-white'
                }`}
              >
                Package Admin
              </button>
              <button
                onClick={() => onTabChange('admin-kb')}
                className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                  currentTab === 'admin-kb' ? 'text-[#E07A5F] bg-white/10 font-bold' : 'text-stone-300 hover:text-white'
                }`}
              >
                AI Knowledge Base
              </button>
              <button
                onClick={() => onTabChange('admin-settings')}
                className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                  currentTab === 'admin-settings' ? 'text-[#E07A5F] bg-white/10 font-bold' : 'text-stone-300 hover:text-white'
                }`}
              >
                Audit Logs &amp; Settings
              </button>
            </>
          )}
        </nav>

        {/* Zone 3: AI Concierge, Notifications, Sign In / Sign Up, and Primary Action */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          
          {/* AI Concierge Trigger */}
          <button
            onClick={onOpenAIChat}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#E07A5F]/20 hover:bg-[#E07A5F]/30 text-[#E07A5F] border border-[#E07A5F]/40 transition-all cursor-pointer shadow-xs"
            title="Chat with AI Event Planning Assistant"
          >
            <Bot className="w-3.5 h-3.5 text-[#E07A5F]" />
            <span className="hidden sm:inline">AI Concierge</span>
          </button>

          {/* In-App Notifications Center Trigger */}
          <div className="relative">
            <button
              onClick={() => setShowNotifDropdown(!showNotifDropdown)}
              className="relative p-2 rounded-lg text-stone-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="System Notifications & Alerts"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#E07A5F] ring-2 ring-[#24162B]" />
              )}
            </button>

            {/* Notifications Dropdown Drawer */}
            {showNotifDropdown && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white text-stone-900 rounded-xl shadow-2xl border border-stone-200 overflow-hidden z-50">
                <div className="p-3 bg-[#24162B] text-white flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-[#E07A5F]" />
                    <span className="font-semibold text-xs">Notifications &amp; Alerts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {unreadCount > 0 && (
                      <button
                        onClick={() => ClemoraStore.markAllNotificationsRead()}
                        className="text-[11px] text-[#E07A5F] hover:underline cursor-pointer"
                      >
                        Mark all read
                      </button>
                    )}
                    <button
                      onClick={() => setShowNotifDropdown(false)}
                      className="text-stone-400 hover:text-white cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-stone-100">
                  {store.notifications.length === 0 ? (
                    <div className="p-6 text-center text-xs text-stone-400">
                      No notifications at this time
                    </div>
                  ) : (
                    store.notifications.slice(0, 8).map((n) => (
                      <div
                        key={n.id}
                        onClick={() => {
                          ClemoraStore.markNotificationRead(n.id);
                          if (n.actionUrl) {
                            if (n.actionUrl === 'bookings') onTabChange('manager-calendar');
                            else if (n.actionUrl === 'inventory') onTabChange('manager-inventory');
                            else if (n.actionUrl === 'calendar') onTabChange('manager-calendar');
                            else if (n.actionUrl === 'staff') onTabChange('manager-roster');
                            else if (n.actionUrl === 'operations') onTabChange('manager-ops');
                          }
                          setShowNotifDropdown(false);
                        }}
                        className={`p-3 text-xs hover:bg-[#FDF3F0]/60 cursor-pointer transition-colors ${
                          !n.read ? 'bg-[#FDF3F0] font-medium' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-semibold text-[#35233D] leading-tight">{n.title}</p>
                          <span className="text-[10px] text-stone-400 font-mono whitespace-nowrap">{n.createdAt.split(' ')[1]}</span>
                        </div>
                        <p className="text-stone-600 mt-1 leading-normal text-[11px]">{n.message}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Account / Sign In / Sign Up Group */}
          <div className="relative" ref={userDropdownRef}>
            {currentUser ? (
              <button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="flex items-center gap-1.5 p-1.5 sm:px-2.5 sm:py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer border border-white/15"
                title={`${currentUser.name} (${currentUser.role})`}
              >
                <div className="w-6 h-6 rounded-full bg-[#E07A5F] text-white flex items-center justify-center text-[10px] font-bold">
                  {currentUser.name.charAt(0)}
                </div>
                <div className="hidden lg:block text-left">
                  <div className="text-[11px] font-bold leading-none truncate max-w-[100px]">
                    {currentUser.name.split(' ')[0]}
                  </div>
                  <div className="text-[9px] uppercase tracking-wider text-[#E07A5F] font-mono leading-none mt-0.5">
                    {currentUser.role}
                  </div>
                </div>
                <ChevronDown className="w-3 h-3 text-purple-200" />
              </button>
            ) : (
              <div className="flex items-center gap-1 sm:gap-1.5">
                <button
                  onClick={onOpenSignIn}
                  className="px-2.5 py-1.5 text-xs font-semibold text-purple-100 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                </button>
                <button
                  onClick={onOpenSignUp}
                  className="hidden sm:flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-[#E07A5F] border border-[#E07A5F]/40 hover:bg-[#E07A5F]/20 rounded-lg transition-colors cursor-pointer"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Sign Up</span>
                </button>
              </div>
            )}

            {/* User Dropdown Menu */}
            {showUserDropdown && currentUser && (
              <div className="absolute right-0 mt-2 w-64 bg-white text-stone-900 rounded-xl shadow-2xl border border-[#E8DFEB] overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="p-3.5 bg-[#24162B] text-white border-b border-purple-900/40">
                  <div className="text-xs font-bold truncate">{currentUser.name}</div>
                  <div className="text-[11px] text-purple-200/70 truncate">{currentUser.email}</div>
                  <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#E07A5F]/20 border border-[#E07A5F]/40 text-[#E07A5F] text-[10px] font-bold uppercase font-mono">
                    <Sparkles className="w-2.5 h-2.5" />
                    <span>Role: {currentUser.role}</span>
                  </div>
                </div>

                <div className="p-2 space-y-1 text-xs">
                  <button
                    onClick={() => {
                      setShowUserDropdown(false);
                      if (currentUser.role === 'customer') onTabChange('customer-portal');
                      else if (currentUser.role === 'coordinator') onTabChange('manager-portal');
                      else if (currentUser.role === 'staff') onTabChange('staff-portal');
                      else if (currentUser.role === 'administrator') onTabChange('admin-portal');
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#FAF7F5] text-[#35233D] font-semibold transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <span>My Role Portal</span>
                    <span className="text-[10px] text-[#E07A5F] font-mono">Open &rarr;</span>
                  </button>

                  <button
                    onClick={() => {
                      setShowUserDropdown(false);
                      onOpenSignIn();
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#FAF7F5] text-stone-700 transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <span>Switch User / Persona</span>
                    <User className="w-3.5 h-3.5 text-stone-400" />
                  </button>

                  <button
                    onClick={() => {
                      setShowUserDropdown(false);
                      onOpenSignUp();
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#FAF7F5] text-stone-700 transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <span>Register New Account</span>
                    <UserPlus className="w-3.5 h-3.5 text-stone-400" />
                  </button>

                  <div className="border-t border-[#E8DFEB] pt-1 mt-1">
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-rose-50 text-rose-700 font-semibold transition-colors flex items-center justify-between cursor-pointer"
                    >
                      <span>Sign Out</span>
                      <LogOut className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Primary Action Button */}
          {isPublic ? (
            <button
              onClick={onRequestQuote}
              className="px-3.5 sm:px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-[#E07A5F] hover:bg-[#CB674D] rounded-lg shadow-sm hover:shadow-md transition-all whitespace-nowrap cursor-pointer active:scale-95"
            >
              Request Quote
            </button>
          ) : isCustomerPortal ? (
            <button
              onClick={() => onTabChange('packages')}
              className="px-3.5 sm:px-4 py-2 text-xs font-bold text-white bg-[#E07A5F] hover:bg-[#CB674D] rounded-lg shadow-sm transition-all whitespace-nowrap cursor-pointer"
            >
              Book Event
            </button>
          ) : (
            <button
              onClick={() => onTabChange('public')}
              className="px-3 py-1.5 text-xs font-medium text-stone-300 hover:text-white bg-white/10 hover:bg-white/20 rounded-lg transition-colors cursor-pointer"
            >
              Exit to Site
            </button>
          )}

        </div>
      </div>
    </header>
  );
}
