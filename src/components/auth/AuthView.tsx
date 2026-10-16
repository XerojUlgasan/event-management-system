import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  Lock,
  Mail,
  User as UserIcon,
  Phone,
  Building2,
  ShieldCheck,
  ArrowRight,
  Eye,
  EyeOff,
  AlertCircle,
  Sparkles,
  ArrowLeft,
  Briefcase,
} from 'lucide-react';

interface AuthViewProps {
  onBackToPublic: () => void;
  defaultMode?: 'login' | 'register';
}

export function AuthView({ onBackToPublic, defaultMode = 'login' }: AuthViewProps) {
  const { login, registerCustomer } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>(defaultMode);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Register form state (Customer only)
  const [regFullName, setRegFullName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regOrg, setRegOrg] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);

  // Status feedback
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDemoFill = (role: 'admin' | 'manager' | 'staff' | 'customer') => {
    setErrorMessage(null);
    setMode('login');
    if (role === 'admin') {
      setLoginEmail('admin@gmail.com');
      setLoginPassword('admin123');
    } else if (role === 'manager') {
      setLoginEmail('clara.manager@clemora.ph');
      setLoginPassword('manager123');
    } else if (role === 'staff') {
      setLoginEmail('marvin.staff@clemora.ph');
      setLoginPassword('staff123');
    } else if (role === 'customer') {
      setLoginEmail('isabel.client@gmail.com');
      setLoginPassword('customer123');
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!loginEmail.trim() || !loginPassword.trim()) {
      setErrorMessage('Please provide both your registered email address and password.');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await login(loginEmail, loginPassword);
      if (!result.success) {
        setErrorMessage(result.error || 'Login failed. Please check your credentials.');
      }
    } catch {
      setErrorMessage('An unexpected error occurred during authentication.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!regFullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!regEmail.trim()) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!regPhone.trim()) {
      setErrorMessage('Please provide a contact phone number.');
      return;
    }
    if (regPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setErrorMessage('Passwords do not match. Please verify your input.');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await registerCustomer({
        fullName: regFullName,
        email: regEmail,
        phone: regPhone,
        password: regPassword,
        organization: regOrg,
      });

      if (!result.success) {
        setErrorMessage(result.error || 'Failed to complete registration.');
      }
    } catch {
      setErrorMessage('Registration failed due to a system error.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] flex flex-col justify-between selection:bg-[#0F172A] selection:text-white">
      {/* Top utility bar */}
      <div className="w-full border-b border-[#E7E5E4] bg-white/70 backdrop-blur-md px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBackToPublic}
              className="inline-flex items-center gap-2 text-xs font-semibold text-stone-600 hover:text-[#0F172A] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Public Showcase</span>
            </button>
            <span className="text-[#E7E5E4]">|</span>
            <span className="text-xs text-stone-500">Clemora Unified Access Control</span>
          </div>
          <span className="text-xs font-mono text-stone-500 tabular-nums">Module 01 · RBAC Active</span>
        </div>
      </div>

      {/* Main card viewport */}
      <div className="w-full max-w-4xl mx-auto px-4 py-8 lg:py-12 flex-grow flex items-center justify-center">
        <div className="w-full bg-white border border-[#E7E5E4] rounded-2xl shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12">
          {/* Left Context & Policy Sidebar (5 cols) */}
          <div className="md:col-span-5 bg-[#0F172A] text-white p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#1E293B]">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Clemora Enterprise Portal</span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-white mb-3">
                Event Logistics &amp; Operations Center
              </h2>
              <p className="text-xs leading-relaxed text-slate-300 mb-6">
                Centralized authentication gate for Administrators, Event Managers, Operations Staff,
                and Event Host Clients.
              </p>

              {/* Administrative Security Notice */}
              <div className="border border-slate-700/80 bg-slate-800/50 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-300 mb-2">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>Predefined Administrator Access</span>
                </div>
                <div className="text-xs space-y-1 font-mono text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Email:</span>
                    <span className="text-white font-medium">admin@gmail.com</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Password:</span>
                    <span className="text-white font-medium">admin123</span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 mt-2.5 leading-snug">
                  Only 1 master administrator account exists. Staff and Manager profiles are provisioned
                  internally via the Admin Dashboard.
                </p>
              </div>

              {/* Quick Demo Switcher */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Instant Demo Autofill
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleDemoFill('admin')}
                    className="text-left px-3 py-2 text-xs rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
                  >
                    <span className="font-semibold block text-amber-300">Admin</span>
                    <span className="text-[10px] text-slate-400 truncate block">admin@gmail.com</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDemoFill('manager')}
                    className="text-left px-3 py-2 text-xs rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
                  >
                    <span className="font-semibold block text-sky-300">Manager</span>
                    <span className="text-[10px] text-slate-400 truncate block">clara.manager</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDemoFill('staff')}
                    className="text-left px-3 py-2 text-xs rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
                  >
                    <span className="font-semibold block text-emerald-300">Staff</span>
                    <span className="text-[10px] text-slate-400 truncate block">marvin.staff</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDemoFill('customer')}
                    className="text-left px-3 py-2 text-xs rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
                  >
                    <span className="font-semibold block text-indigo-300">Customer</span>
                    <span className="text-[10px] text-slate-400 truncate block">isabel.client</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800 text-[11px] text-slate-400">
              Clemora Buffer Scheduling &amp; Catering Engine · v2.4
            </div>
          </div>

          {/* Right Interactive Form Area (7 cols) */}
          <div className="md:col-span-7 p-8 lg:p-10 flex flex-col justify-between">
            <div>
              {/* Segmented Mode Selector */}
              <div className="flex items-center gap-2 p-1 bg-stone-100 rounded-xl mb-6">
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setErrorMessage(null);
                  }}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                    mode === 'login'
                      ? 'bg-white text-[#0F172A] shadow-sm'
                      : 'text-stone-600 hover:text-[#0F172A]'
                  }`}
                >
                  Centralized Sign In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode('register');
                    setErrorMessage(null);
                  }}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                    mode === 'register'
                      ? 'bg-white text-[#0F172A] shadow-sm'
                      : 'text-stone-600 hover:text-[#0F172A]'
                  }`}
                >
                  Customer Registration
                </button>
              </div>

              {/* Error feedback banner */}
              {errorMessage && (
                <div className="mb-6 p-3.5 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-3 text-rose-800 text-xs animate-in fade-in">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <div className="leading-relaxed">{errorMessage}</div>
                </div>
              )}

              {mode === 'login' ? (
                /* CENTRALIZED LOGIN FORM */
                <div>
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-[#0F172A] tracking-tight">
                      Sign in to your account
                    </h3>
                    <p className="text-xs text-stone-500 mt-1">
                      Enter your verified credentials. The system will automatically direct you to your
                      designated role workspace.
                    </p>
                  </div>

                  <form onSubmit={handleLoginSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="email"
                          required
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          placeholder="e.g. admin@gmail.com or name@clemora.ph"
                          className="w-full pl-10 pr-4 py-2.5 text-xs text-[#0F172A] bg-white border border-[#E7E5E4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F172A] focus:border-transparent transition-all placeholder:text-stone-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type={showLoginPassword ? 'text' : 'password'}
                          required
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          placeholder="Enter your account password"
                          className="w-full pl-10 pr-10 py-2.5 text-xs text-[#0F172A] bg-white border border-[#E7E5E4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F172A] focus:border-transparent transition-all placeholder:text-stone-400 font-mono"
                        />
                        <button
                          type="button"
                          onClick={() => setShowLoginPassword(!showLoginPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                        >
                          {showLoginPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <label className="flex items-center gap-2 cursor-pointer text-xs text-stone-600">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="rounded border-[#E7E5E4] text-[#0F172A] focus:ring-[#0F172A]"
                        />
                        <span>Remember this workstation</span>
                      </label>
                      <span className="text-[11px] text-stone-400">Standard Session: 30 Days</span>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full mt-2 py-2.5 px-4 bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
                    >
                      <span>{isSubmitting ? 'Authenticating...' : 'Sign In & Access Dashboard'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              ) : (
                /* CUSTOMER REGISTRATION FORM */
                <div>
                  <div className="mb-5">
                    <h3 className="text-xl font-bold text-[#0F172A] tracking-tight">
                      Create Customer Account
                    </h3>
                    <p className="text-xs text-stone-500 mt-1">
                      Public registration is reserved for clients and event hosts. Staff and Manager
                      accounts are provisioned by the Administrator.
                    </p>
                  </div>

                  <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Full Name *
                      </label>
                      <div className="relative">
                        <UserIcon className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="text"
                          required
                          value={regFullName}
                          onChange={(e) => setRegFullName(e.target.value)}
                          placeholder="e.g. Maria Clarita Reyes"
                          className="w-full pl-10 pr-4 py-2 text-xs text-[#0F172A] bg-white border border-[#E7E5E4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F172A]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          Email Address *
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <input
                            type="email"
                            required
                            value={regEmail}
                            onChange={(e) => setRegEmail(e.target.value)}
                            placeholder="client@company.com"
                            className="w-full pl-10 pr-4 py-2 text-xs text-[#0F172A] bg-white border border-[#E7E5E4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F172A]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          Contact Phone *
                        </label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <input
                            type="tel"
                            required
                            value={regPhone}
                            onChange={(e) => setRegPhone(e.target.value)}
                            placeholder="+63 9XX XXX XXXX"
                            className="w-full pl-10 pr-4 py-2 text-xs text-[#0F172A] bg-white border border-[#E7E5E4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F172A]"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Company or Event Organization (Optional)
                      </label>
                      <div className="relative">
                        <Building2 className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="text"
                          value={regOrg}
                          onChange={(e) => setRegOrg(e.target.value)}
                          placeholder="e.g. Apex Financial or Private Wedding Host"
                          className="w-full pl-10 pr-4 py-2 text-xs text-[#0F172A] bg-white border border-[#E7E5E4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F172A]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          Password (Min 6 chars) *
                        </label>
                        <div className="relative">
                          <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <input
                            type={showRegPassword ? 'text' : 'password'}
                            required
                            value={regPassword}
                            onChange={(e) => setRegPassword(e.target.value)}
                            placeholder="Create password"
                            className="w-full pl-10 pr-9 py-2 text-xs text-[#0F172A] bg-white border border-[#E7E5E4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F172A] font-mono"
                          />
                          <button
                            type="button"
                            onClick={() => setShowRegPassword(!showRegPassword)}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400"
                          >
                            {showRegPassword ? (
                              <EyeOff className="w-3.5 h-3.5" />
                            ) : (
                              <Eye className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          Confirm Password *
                        </label>
                        <div className="relative">
                          <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <input
                            type={showRegPassword ? 'text' : 'password'}
                            required
                            value={regConfirmPassword}
                            onChange={(e) => setRegConfirmPassword(e.target.value)}
                            placeholder="Repeat password"
                            className="w-full pl-10 pr-4 py-2 text-xs text-[#0F172A] bg-white border border-[#E7E5E4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F172A] font-mono"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-stone-50 border border-stone-200 rounded-lg text-[11px] text-stone-600 flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-stone-400 shrink-0" />
                      <span>
                        Are you a catering crew member or event coordinator? Please contact your Clemora
                        Operations Administrator to obtain your staff access key.
                      </span>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-2.5 px-4 bg-[#B45309] hover:bg-[#92400E] text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
                    >
                      <span>{isSubmitting ? 'Creating Customer Profile...' : 'Complete Registration & Access Portal'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              )}
            </div>

            {/* Bottom footnote */}
            <div className="pt-6 border-t border-[#E7E5E4] text-[11px] text-stone-500 flex items-center justify-between">
              <span>Encrypted Session · Clemora Role-Based Engine</span>
              <span>CAP101 - SBIT4P</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
