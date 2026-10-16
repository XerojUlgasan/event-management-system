import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  User as UserIcon,
  Mail,
  Phone,
  Building,
  Lock,
  CheckCircle2,
  AlertCircle,
  Shield,
  Save,
} from 'lucide-react';

export function ProfileSettings() {
  const { currentUser, updateUser } = useAuth();

  const [fullName, setFullName] = useState(currentUser?.fullName || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [organization, setOrganization] = useState(currentUser?.organization || '');
  const [department, setDepartment] = useState(currentUser?.department || '');
  const [position, setPosition] = useState(currentUser?.position || '');

  // Password fields
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(
    null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!currentUser) return null;

  const isAdmin = currentUser.role === 'ADMIN';

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      setFeedback({ type: 'error', message: 'Name, email, and phone number are required.' });
      return;
    }

    // Password change verification if attempted
    if (newPassword || currentPassword || confirmPassword) {
      if (currentPassword !== currentUser.password) {
        setFeedback({ type: 'error', message: 'Current password provided is incorrect.' });
        return;
      }
      if (newPassword.length < 6) {
        setFeedback({
          type: 'error',
          message: 'New password must be at least 6 characters long.',
        });
        return;
      }
      if (newPassword !== confirmPassword) {
        setFeedback({ type: 'error', message: 'New passwords do not match.' });
        return;
      }
    }

    setIsSubmitting(true);
    try {
      const updates: Partial<typeof currentUser> = {
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        organization: organization.trim(),
        department: department.trim(),
        position: position.trim(),
      };

      if (newPassword) {
        updates.password = newPassword;
      }

      const res = await updateUser(currentUser.id, updates);
      if (res.success) {
        setFeedback({
          type: 'success',
          message: 'Your profile information has been successfully updated.',
        });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setFeedback({ type: 'error', message: res.error || 'Failed to update profile.' });
      }
    } catch {
      setFeedback({ type: 'error', message: 'An unexpected system error occurred.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h2 className="text-xl font-bold text-[#0F172A] tracking-tight">Account &amp; Profile</h2>
        <p className="text-xs text-stone-500 mt-1">
          Review and update your personal credentials, contact phone, and account security.
        </p>
      </div>

      {feedback && (
        <div
          className={`p-4 rounded-xl text-xs flex items-center gap-3 border ${
            feedback.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-rose-50 border-rose-200 text-rose-800'
          }`}
        >
          {feedback.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Profile Overview Banner */}
      <div className="bg-white border border-[#E7E5E4] rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[#0F172A] text-white flex items-center justify-center font-bold text-lg font-mono">
            {currentUser.fullName
              .split(' ')
              .map((n) => n[0])
              .slice(0, 2)
              .join('')
              .toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm text-[#0F172A]">{currentUser.fullName}</h3>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-stone-100 text-stone-700">
                {currentUser.role}
              </span>
            </div>
            <div className="text-xs text-stone-500 mt-0.5 flex items-center gap-2">
              <span>{currentUser.position || currentUser.role}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono">{currentUser.email}</span>
            </div>
          </div>
        </div>

        <div className="text-right text-xs text-stone-500 font-mono">
          <div>Member ID: {currentUser.id}</div>
          <div className="text-[11px] text-stone-400 mt-0.5">
            Created: {new Date(currentUser.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>

      {/* Main Profile Edit Form */}
      <form onSubmit={handleSaveProfile} className="bg-white border border-[#E7E5E4] rounded-xl p-6 space-y-6">
        <div className="border-b border-[#E7E5E4] pb-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
            Personal Information
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Full Name *
            </label>
            <div className="relative">
              <UserIcon className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full pl-8 pr-3 py-2 text-xs border border-[#E7E5E4] rounded-lg focus:ring-2 focus:ring-[#0F172A] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                disabled={isAdmin}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full pl-8 pr-3 py-2 text-xs border border-[#E7E5E4] rounded-lg focus:ring-2 focus:ring-[#0F172A] focus:outline-none ${
                  isAdmin ? 'bg-stone-50 text-stone-500 cursor-not-allowed' : ''
                }`}
              />
            </div>
            {isAdmin && (
              <p className="text-[10px] text-stone-400 mt-1">
                The master administrator email cannot be modified.
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Contact Phone *
            </label>
            <div className="relative">
              <Phone className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+63 9XX XXX XXXX"
                className="w-full pl-8 pr-3 py-2 text-xs border border-[#E7E5E4] rounded-lg focus:ring-2 focus:ring-[#0F172A] focus:outline-none"
              />
            </div>
          </div>

          {currentUser.role === 'CUSTOMER' ? (
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Company / Organization
              </label>
              <div className="relative">
                <Building className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder="e.g. Summit Media Manila"
                  className="w-full pl-8 pr-3 py-2 text-xs border border-[#E7E5E4] rounded-lg focus:ring-2 focus:ring-[#0F172A] focus:outline-none"
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Assigned Position
              </label>
              <input
                type="text"
                disabled={!isAdmin}
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className={`w-full px-3 py-2 text-xs border border-[#E7E5E4] rounded-lg focus:ring-2 focus:ring-[#0F172A] focus:outline-none ${
                  !isAdmin ? 'bg-stone-50 text-stone-500 cursor-not-allowed' : ''
                }`}
              />
            </div>
          )}
        </div>

        {/* Change Password Block */}
        <div className="border-t border-[#E7E5E4] pt-5">
          <div className="flex items-center gap-2 mb-3">
            <Lock className="w-4 h-4 text-stone-600" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
              Change Security Password
            </h4>
          </div>
          <p className="text-[11px] text-stone-500 mb-4">
            Leave these fields empty if you do not wish to alter your account password.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Current Password
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Current password"
                className="w-full px-3 py-2 text-xs border border-[#E7E5E4] rounded-lg focus:ring-2 focus:ring-[#0F172A] focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New password (min 6)"
                className="w-full px-3 py-2 text-xs border border-[#E7E5E4] rounded-lg focus:ring-2 focus:ring-[#0F172A] focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repeat new password"
                className="w-full px-3 py-2 text-xs border border-[#E7E5E4] rounded-lg focus:ring-2 focus:ring-[#0F172A] focus:outline-none font-mono"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-[#E7E5E4]">
          <div className="text-[11px] text-stone-500 flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-stone-400" />
            <span>Profile updates take effect immediately across current active sessions.</span>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-5 py-2 text-xs font-semibold text-white bg-[#0F172A] hover:bg-[#1E293B] rounded-lg transition-colors flex items-center gap-2 shadow-sm disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isSubmitting ? 'Saving...' : 'Save Profile Changes'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
