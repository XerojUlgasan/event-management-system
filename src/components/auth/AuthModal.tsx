import { useState } from 'react';
import { X, Lock, Mail, User, Phone, Building, Eye, EyeOff, ShieldCheck, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { ClemoraLogo } from '../common/ClemoraLogo.tsx';
import { ClemoraStore, useClemoraStore } from '../../services/store.ts';
import { UserRole } from '../../types/clemora.ts';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'signup';
  onAuthSuccess?: (role: UserRole) => void;
}

export function AuthModal({
  isOpen,
  onClose,
  initialMode = 'signin',
  onAuthSuccess,
}: AuthModalProps) {
  const store = useClemoraStore();
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  
  // Sign in fields
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Sign up fields
  const [name, setName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState<UserRole>('customer');

  // UI state
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  // Preset demo accounts for quick instant evaluation
  const demoAccounts = [
    {
      role: 'customer' as UserRole,
      title: 'Customer Client',
      email: 'victoria.sterling@horizoncapital.com',
      badge: 'Client Portal',
      desc: 'Bookings & Quotations',
    },
    {
      role: 'coordinator' as UserRole,
      title: 'Event Coordinator',
      email: 'coordinator@clemora.com',
      badge: 'Manager Suite',
      desc: 'Calendar & Buffers',
    },
    {
      role: 'staff' as UserRole,
      title: 'Operations Staff',
      email: 'antoine@clemora.com',
      badge: 'Staff Portal',
      desc: 'Shifts & Dispatch',
    },
    {
      role: 'administrator' as UserRole,
      title: 'Administrator',
      email: 'admin@clemora.com',
      badge: 'Admin Console',
      desc: 'Settings & Security',
    },
  ];

  const handleQuickDemoLogin = (email: string) => {
    setIsLoading(true);
    setErrorMsg('');
    setTimeout(() => {
      const res = ClemoraStore.login(email);
      setIsLoading(false);
      if (res.success && res.user) {
        setSuccessMsg(`Authenticated as ${res.user.name} (${res.user.role.toUpperCase()})`);
        setTimeout(() => {
          onAuthSuccess?.(res.user!.role);
          onClose();
        }, 600);
      } else {
        setErrorMsg(res.error || 'Login failed.');
      }
    }, 300);
  };

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signInEmail.trim()) {
      setErrorMsg('Please enter your email address.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    setTimeout(() => {
      const res = ClemoraStore.login(signInEmail, signInPassword);
      setIsLoading(false);
      if (res.success && res.user) {
        setSuccessMsg(`Welcome back, ${res.user.name}!`);
        setTimeout(() => {
          onAuthSuccess?.(res.user!.role);
          onClose();
        }, 600);
      } else {
        setErrorMsg(res.error || 'Authentication error.');
      }
    }, 400);
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !signUpEmail.trim()) {
      setErrorMsg('Full name and email address are required.');
      return;
    }
    if (!signUpEmail.includes('@')) {
      setErrorMsg('Please provide a valid email address.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    setTimeout(() => {
      const res = ClemoraStore.register({
        name,
        email: signUpEmail,
        password: signUpPassword,
        role,
        phone,
        company,
      });

      setIsLoading(false);
      if (res.success && res.user) {
        setSuccessMsg(`Welcome to Clemora, ${res.user.name}! Your account is active.`);
        setTimeout(() => {
          onAuthSuccess?.(res.user!.role);
          onClose();
        }, 700);
      } else {
        setErrorMsg(res.error || 'Registration failed.');
      }
    }, 450);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#24162B]/80 backdrop-blur-xs overflow-y-auto"
    >
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-[#E8DFEB] overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="bg-[#24162B] text-white px-6 py-5 flex items-center justify-between border-b border-purple-900/40">
          <div className="flex items-center gap-3">
            <ClemoraLogo variant="icon" theme="dark" size="sm" className="w-8 h-8 shrink-0" />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base tracking-tight text-white font-sans">
                  {mode === 'signin' ? 'Sign In to Clemora' : 'Create Clemora Account'}
                </h3>
              </div>
              <p className="text-xs text-purple-200/70">
                Turnaround Logistics &amp; Event Management
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-purple-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Toggle (Sign In / Sign Up) */}
        <div className="flex border-b border-[#E8DFEB] bg-[#FAF7F5] p-1">
          <button
            type="button"
            onClick={() => {
              setMode('signin');
              setErrorMsg('');
              setSuccessMsg('');
            }}
            className={`flex-1 py-2.5 text-xs font-bold transition-all rounded-lg cursor-pointer ${
              mode === 'signin'
                ? 'bg-white text-[#35233D] shadow-xs border border-[#E8DFEB]'
                : 'text-stone-500 hover:text-[#35233D]'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('signup');
              setErrorMsg('');
              setSuccessMsg('');
            }}
            className={`flex-1 py-2.5 text-xs font-bold transition-all rounded-lg cursor-pointer ${
              mode === 'signup'
                ? 'bg-white text-[#35233D] shadow-xs border border-[#E8DFEB]'
                : 'text-stone-500 hover:text-[#35233D]'
            }`}
          >
            Create New Account
          </button>
        </div>

        <div className="p-6 sm:p-8">
          
          {/* Notification Alerts */}
          {errorMsg && (
            <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2">
              <span className="font-bold">•</span>
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-5 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* SIGN IN VIEW */}
          {mode === 'signin' && (
            <div className="space-y-6">
              
              {/* Quick Persona Instant Login Strip */}
              <div className="p-4 rounded-xl bg-[#FAF7F5] border border-[#E8DFEB]">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#E07A5F] font-mono flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3" />
                    Quick 1-Click Role Login
                  </span>
                  <span className="text-[10px] text-stone-400">Testing Sandbox</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {demoAccounts.map((acc) => (
                    <button
                      key={acc.email}
                      type="button"
                      onClick={() => handleQuickDemoLogin(acc.email)}
                      className="p-2.5 text-left rounded-lg bg-white border border-[#E8DFEB] hover:border-[#E07A5F] transition-all cursor-pointer group shadow-2xs hover:shadow-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#35233D] group-hover:text-[#E07A5F] transition-colors">
                          {acc.title}
                        </span>
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#FDF3F0] text-[#B55238]">
                          {acc.badge}
                        </span>
                      </div>
                      <div className="text-[10px] text-stone-400 mt-0.5 truncate">
                        {acc.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-[#E8DFEB]" />
                <span className="shrink-0 px-3 text-[10px] text-stone-400 uppercase tracking-widest font-mono">
                  Or enter credentials
                </span>
                <div className="flex-grow border-t border-[#E8DFEB]" />
              </div>

              {/* Standard Sign In Form */}
              <form onSubmit={handleSignInSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="e.g. coordinator@clemora.com"
                      value={signInEmail}
                      onChange={(e) => setSignInEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-[#E8DFEB] focus:outline-none focus:border-[#35233D] bg-[#FAF7F5]"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-stone-700">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => alert('Demo mode: Preset test passwords accept any text or click 1-Click Role Login above.')}
                      className="text-[11px] text-[#E07A5F] hover:underline cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={signInPassword}
                      onChange={(e) => setSignInPassword(e.target.value)}
                      className="w-full pl-9 pr-10 py-2.5 text-xs sm:text-sm rounded-xl border border-[#E8DFEB] focus:outline-none focus:border-[#35233D] bg-[#FAF7F5]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-stone-600">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-[#E8DFEB] text-[#E07A5F] focus:ring-0 accent-[#E07A5F]"
                    />
                    <span>Keep me signed in</span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-[#35233D] hover:bg-[#24162B] transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer disabled:opacity-50"
                >
                  {isLoading ? (
                    <span>Authenticating...</span>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>

              <div className="text-center text-xs text-stone-500 pt-2">
                Don&apos;t have an account yet?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('signup');
                    setErrorMsg('');
                  }}
                  className="text-[#E07A5F] font-bold hover:underline cursor-pointer"
                >
                  Create an account
                </button>
              </div>
            </div>
          )}

          {/* SIGN UP VIEW */}
          {mode === 'signup' && (
            <form onSubmit={handleSignUpSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Katherine Sterling"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-[#E8DFEB] focus:outline-none focus:border-[#35233D] bg-[#FAF7F5]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="name@organization.com"
                      value={signUpEmail}
                      onChange={(e) => setSignUpEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-[#E8DFEB] focus:outline-none focus:border-[#35233D] bg-[#FAF7F5]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Contact Phone
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-[#E8DFEB] focus:outline-none focus:border-[#35233D] bg-[#FAF7F5]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Company / Organization (Optional)
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="e.g. Horizon Capital Events"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-[#E8DFEB] focus:outline-none focus:border-[#35233D] bg-[#FAF7F5]"
                  />
                </div>
              </div>

              {/* Role Selection */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Account Access Role
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'customer' as UserRole, label: 'Event Host / Customer', desc: 'Browse, quote & track bookings' },
                    { id: 'coordinator' as UserRole, label: 'Event Coordinator', desc: 'Manage quotes & calendars' },
                    { id: 'staff' as UserRole, label: 'Kitchen / Service Staff', desc: 'Shifts & preparation run-of-show' },
                    { id: 'administrator' as UserRole, label: 'System Admin', desc: 'Full system & analytics control' },
                  ].map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setRole(r.id)}
                      className={`p-2.5 text-left rounded-xl border transition-all cursor-pointer ${
                        role === r.id
                          ? 'border-[#35233D] bg-[#F5EFF7] ring-1 ring-[#35233D]'
                          : 'border-[#E8DFEB] hover:border-stone-400 bg-white'
                      }`}
                    >
                      <div className="text-xs font-bold text-[#35233D]">{r.label}</div>
                      <div className="text-[10px] text-stone-500 mt-0.5 leading-tight">{r.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Create Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Minimum 8 characters"
                    value={signUpPassword}
                    onChange={(e) => setSignUpPassword(e.target.value)}
                    className="w-full pl-9 pr-10 py-2.5 text-xs sm:text-sm rounded-xl border border-[#E8DFEB] focus:outline-none focus:border-[#35233D] bg-[#FAF7F5]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="text-[11px] text-stone-500 leading-normal">
                By creating an account, you agree to Clemora&apos;s Terms of Service and data protection standards under Module 1 RBAC.
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-[#E07A5F] hover:bg-[#CB674D] transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <span>Creating Account...</span>
                ) : (
                  <>
                    <span>Complete Registration</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

              <div className="text-center text-xs text-stone-500 pt-1">
                Already registered?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('signin');
                    setErrorMsg('');
                  }}
                  className="text-[#35233D] font-bold hover:underline cursor-pointer"
                >
                  Sign in here
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}
