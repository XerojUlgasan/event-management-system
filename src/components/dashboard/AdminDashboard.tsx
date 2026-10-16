import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, StaffSkill } from '../../types/auth';
import { CreateStaffModal } from '../auth/CreateStaffModal';
import { EditStaffModal } from '../auth/EditStaffModal';
import { ProfileSettings } from './ProfileSettings';
import {
  Users,
  UserPlus,
  ShieldAlert,
  Search,
  Edit2,
  Power,
  RotateCcw,
  Sparkles,
  Calendar,
  Layers,
  ArrowUpRight,
  LogOut,
  Sliders,
  DollarSign,
  UserCog,
} from 'lucide-react';

interface AdminDashboardProps {
  onViewPublicSite: () => void;
}

export function AdminDashboard({ onViewPublicSite }: AdminDashboardProps) {
  const { currentUser, users, logout, toggleUserStatus, resetToDefaults } = useAuth();

  const [activeTab, setActiveTab] = useState<'roster' | 'skills' | 'overview' | 'profile'>('roster');

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'ALL' | 'MANAGER' | 'STAFF' | 'CUSTOMER'>('ALL');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'active' | 'deactivated'>('ALL');
  const [skillFilter, setSkillFilter] = useState<string>('ALL');

  // Modals state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // Stats calculation
  const totalUsers = users.length;
  const managersCount = users.filter((u) => u.role === 'MANAGER').length;
  const staffCount = users.filter((u) => u.role === 'STAFF').length;
  const activeStaffCount = users.filter((u) => u.role === 'STAFF' && u.status === 'active').length;
  const customersCount = users.filter((u) => u.role === 'CUSTOMER').length;

  const filteredUsers = users.filter((u) => {
    // Admin only wants to view team or all
    const matchesSearch =
      u.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.position && u.position.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (u.department && u.department.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesRole = roleFilter === 'ALL' || u.role === roleFilter;
    const matchesStatus = statusFilter === 'ALL' || u.status === statusFilter;
    const matchesSkill =
      skillFilter === 'ALL' ||
      (u.skills && u.skills.includes(skillFilter as StaffSkill));

    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleToggleStatus = async (user: User) => {
    if (user.role === 'ADMIN') {
      alert('The Predefined Administrator account cannot be deactivated.');
      return;
    }
    const confirmMsg =
      user.status === 'active'
        ? `Are you sure you want to deactivate ${user.fullName}'s account? They will be unable to log in.`
        : `Reactivate ${user.fullName}'s account?`;

    if (window.confirm(confirmMsg)) {
      await toggleUserStatus(user.id);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#1C1917] flex flex-col selection:bg-[#0F172A] selection:text-white">
      {/* Top Navigation Bar adhering to contract */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#E7E5E4] px-6 lg:px-12 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold tracking-tight text-[#0F172A]">Clemora</span>
            <span className="text-stone-300">/</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#0F172A] text-white">
              Admin Portal
            </span>
            <span className="hidden sm:inline-block text-xs text-stone-500 font-mono">
              admin@gmail.com
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onViewPublicSite}
              className="px-3 py-1.5 text-xs font-medium text-stone-600 hover:text-[#0F172A] border border-stone-200 rounded-lg hover:bg-stone-50 transition-colors flex items-center gap-1.5"
            >
              <span>View Public Site</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={logout}
              className="px-3 py-1.5 text-xs font-medium text-rose-600 hover:text-rose-700 hover:bg-rose-50 border border-rose-200 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace Body */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow space-y-6">
        {/* Header Title & Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E7E5E4] pb-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#B45309] mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Module 01 · User &amp; Access Governance</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-[#0F172A]">
              Staff &amp; Workforce Administration
            </h1>
            <p className="text-xs text-stone-500 mt-1 max-w-2xl">
              Manage operational personnel, assign specialized catering skills, configure turnaround
              shift availability, and provision Manager and Staff credentials.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="px-4 py-2.5 text-xs font-semibold text-white bg-[#0F172A] hover:bg-[#1E293B] rounded-lg transition-colors shadow-sm flex items-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              <span>Provision Staff / Manager</span>
            </button>
          </div>
        </div>

        {/* Executive KPI Metric Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white border border-[#E7E5E4] rounded-xl p-4">
            <div className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
              Total Accounts
            </div>
            <div className="text-2xl font-bold text-[#0F172A] mt-1 font-mono tabular-nums">
              {totalUsers}
            </div>
            <div className="text-[11px] text-stone-400 mt-1">
              {customersCount} registered clients
            </div>
          </div>

          <div className="bg-white border border-[#E7E5E4] rounded-xl p-4">
            <div className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
              Active Staff Crew
            </div>
            <div className="text-2xl font-bold text-emerald-700 mt-1 font-mono tabular-nums">
              {activeStaffCount} / {staffCount}
            </div>
            <div className="text-[11px] text-stone-400 mt-1">
              Available for shift dispatch
            </div>
          </div>

          <div className="bg-white border border-[#E7E5E4] rounded-xl p-4">
            <div className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
              Operations Managers
            </div>
            <div className="text-2xl font-bold text-[#0F172A] mt-1 font-mono tabular-nums">
              {managersCount}
            </div>
            <div className="text-[11px] text-stone-400 mt-1">
              Logistics &amp; proposals
            </div>
          </div>

          <div className="bg-white border border-[#E7E5E4] rounded-xl p-4">
            <div className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
              System Admin
            </div>
            <div className="text-2xl font-bold text-[#B45309] mt-1 font-mono tabular-nums">
              1 Master
            </div>
            <div className="text-[11px] text-stone-400 mt-1">
              Predefined: admin@gmail.com
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-[#E7E5E4]">
          <button
            onClick={() => setActiveTab('roster')}
            className={`pb-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'roster'
                ? 'border-[#0F172A] text-[#0F172A]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Personnel &amp; Account Roster</span>
          </button>

          <button
            onClick={() => setActiveTab('skills')}
            className={`pb-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'skills'
                ? 'border-[#0F172A] text-[#0F172A]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Shift Availability &amp; Skills Matrix</span>
          </button>

          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'overview'
                ? 'border-[#0F172A] text-[#0F172A]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Governance &amp; Security Policy</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'profile'
                ? 'border-[#0F172A] text-[#0F172A]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <UserCog className="w-4 h-4" />
            <span>Admin Profile</span>
          </button>
        </div>

        {/* TAB 1: PERSONNEL ROSTER */}
        {activeTab === 'roster' && (
          <div className="space-y-4">
            {/* Filter & Search Bar */}
            <div className="bg-white border border-[#E7E5E4] rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name, email, department, or job title..."
                  className="w-full pl-9 pr-4 py-2 text-xs border border-[#E7E5E4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F172A]"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {/* Role filter */}
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value as any)}
                  className="text-xs px-2.5 py-2 border border-[#E7E5E4] rounded-lg bg-white text-stone-700 focus:outline-none"
                >
                  <option value="ALL">All Roles</option>
                  <option value="MANAGER">Managers Only</option>
                  <option value="STAFF">Staff Only</option>
                  <option value="CUSTOMER">Customers</option>
                </select>

                {/* Status filter */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="text-xs px-2.5 py-2 border border-[#E7E5E4] rounded-lg bg-white text-stone-700 focus:outline-none"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="active">Active Only</option>
                  <option value="deactivated">Deactivated Only</option>
                </select>

                {(searchQuery || roleFilter !== 'ALL' || statusFilter !== 'ALL') && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setRoleFilter('ALL');
                      setStatusFilter('ALL');
                    }}
                    className="px-2.5 py-2 text-xs text-stone-500 hover:text-stone-800 underline"
                  >
                    Reset Filters
                  </button>
                )}
              </div>
            </div>

            {/* User Roster Table */}
            <div className="bg-white border border-[#E7E5E4] rounded-xl overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-50 text-stone-600 font-semibold border-b border-[#E7E5E4]">
                    <tr>
                      <th className="py-3 px-4">User Details</th>
                      <th className="py-3 px-4">Role &amp; Department</th>
                      <th className="py-3 px-4">Skills / Details</th>
                      <th className="py-3 px-4">Rate &amp; Availability</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E7E5E4]">
                    {filteredUsers.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-stone-500">
                          No accounts found matching the current search criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredUsers.map((user) => {
                        const isPredefinedAdmin = user.email.toLowerCase() === 'admin@gmail.com';
                        return (
                          <tr key={user.id} className="hover:bg-stone-50/70 transition-colors">
                            {/* User details */}
                            <td className="py-3.5 px-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-stone-100 border border-stone-200 text-[#0F172A] font-bold flex items-center justify-center font-mono text-xs shrink-0">
                                  {user.fullName
                                    .split(' ')
                                    .map((n) => n[0])
                                    .slice(0, 2)
                                    .join('')
                                    .toUpperCase()}
                                </div>
                                <div>
                                  <div className="font-semibold text-stone-900 flex items-center gap-2">
                                    <span>{user.fullName}</span>
                                    {isPredefinedAdmin && (
                                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-100 text-amber-800">
                                        MASTER
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-stone-500 text-[11px] font-mono">
                                    {user.email} · {user.phone}
                                  </div>
                                </div>
                              </div>
                            </td>

                            {/* Role & Department */}
                            <td className="py-3.5 px-4">
                              <div className="font-medium text-stone-900">
                                {user.position || user.role}
                              </div>
                              <div className="text-stone-500 text-[11px]">
                                {user.department || user.organization || 'General Operations'}
                              </div>
                            </td>

                            {/* Skills / Notes */}
                            <td className="py-3.5 px-4 max-w-xs">
                              {user.skills && user.skills.length > 0 ? (
                                <div className="text-[11px] text-stone-600 truncate">
                                  {user.skills.slice(0, 2).join(' · ')}
                                  {user.skills.length > 2 && (
                                    <span className="text-stone-400 ml-1">
                                      +{user.skills.length - 2} more
                                    </span>
                                  )}
                                </div>
                              ) : (
                                <span className="text-stone-400 text-[11px]">
                                  {user.role === 'CUSTOMER' ? 'Client Event Host' : 'Administrative Scope'}
                                </span>
                              )}
                            </td>

                            {/* Rate & Availability */}
                            <td className="py-3.5 px-4">
                              {user.role === 'STAFF' ? (
                                <div className="text-[11px]">
                                  <span className="font-mono tabular-nums font-semibold text-stone-900">
                                    ₱{user.hourlyRate || 280}/hr
                                  </span>
                                  <span className="text-stone-400 mx-1">·</span>
                                  <span className="text-stone-500">
                                    {user.availability
                                      ? Object.values(user.availability).filter(
                                          (v) => v !== 'unavailable'
                                        ).length + ' days avail'
                                      : 'Standard'}
                                  </span>
                                </div>
                              ) : (
                                <span className="text-stone-400 text-[11px]">—</span>
                              )}
                            </td>

                            {/* Status */}
                            <td className="py-3.5 px-4">
                              <span
                                className={`text-[11px] font-medium px-2 py-0.5 rounded ${
                                  user.status === 'active'
                                    ? 'bg-emerald-50 text-emerald-700'
                                    : 'bg-rose-50 text-rose-700'
                                }`}
                              >
                                {user.status === 'active' ? 'Active' : 'Deactivated'}
                              </span>
                            </td>

                            {/* Actions */}
                            <td className="py-3.5 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => setEditingUser(user)}
                                  className="p-1.5 text-stone-600 hover:text-[#0F172A] hover:bg-stone-100 rounded-lg transition-colors"
                                  title="Edit account details"
                                >
                                  <Edit2 className="w-4 h-4" />
                                </button>

                                {!isPredefinedAdmin && (
                                  <button
                                    type="button"
                                    onClick={() => handleToggleStatus(user)}
                                    className={`p-1.5 rounded-lg transition-colors ${
                                      user.status === 'active'
                                        ? 'text-rose-600 hover:text-rose-700 hover:bg-rose-50'
                                        : 'text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50'
                                    }`}
                                    title={
                                      user.status === 'active'
                                        ? 'Deactivate account'
                                        : 'Activate account'
                                    }
                                  >
                                    <Power className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SHIFT AVAILABILITY & SKILLS MATRIX */}
        {activeTab === 'skills' && (
          <div className="space-y-6">
            <div className="bg-white border border-[#E7E5E4] rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-bold text-[#0F172A]">
                    Weekly Shift Coverage Roster (Staff Crew)
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Real-time availability schedule protecting turnaround buffering and event execution.
                  </p>
                </div>
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="px-3 py-1.5 text-xs font-semibold text-white bg-[#0F172A] rounded-lg hover:bg-slate-800 transition-colors"
                >
                  Add Staff Roster
                </button>
              </div>

              {/* Weekly Roster Grid */}
              <div className="overflow-x-auto border border-stone-200 rounded-xl">
                <table className="w-full text-xs">
                  <thead className="bg-stone-50 text-stone-700 font-semibold border-b border-stone-200">
                    <tr>
                      <th className="py-2.5 px-3 text-left">Staff Member</th>
                      <th className="py-2.5 px-3 text-left">Role / Position</th>
                      <th className="py-2.5 px-2 text-center">Mon</th>
                      <th className="py-2.5 px-2 text-center">Tue</th>
                      <th className="py-2.5 px-2 text-center">Wed</th>
                      <th className="py-2.5 px-2 text-center">Thu</th>
                      <th className="py-2.5 px-2 text-center">Fri</th>
                      <th className="py-2.5 px-2 text-center">Sat</th>
                      <th className="py-2.5 px-2 text-center">Sun</th>
                      <th className="py-2.5 px-3 text-right">Edit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200">
                    {users
                      .filter((u) => u.role === 'STAFF')
                      .map((staff) => (
                        <tr key={staff.id} className="hover:bg-stone-50">
                          <td className="py-2.5 px-3 font-semibold text-stone-900">
                            {staff.fullName}
                            {staff.status === 'deactivated' && (
                              <span className="ml-1.5 text-[10px] text-rose-600">(Inactive)</span>
                            )}
                          </td>
                          <td className="py-2.5 px-3 text-stone-600">
                            {staff.position || 'Hospitality Staff'}
                          </td>
                          {(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const).map(
                            (day) => {
                              const slot = staff.availability?.[day] || 'unavailable';
                              let badgeColor = 'bg-stone-100 text-stone-500';
                              let label = 'Off';

                              if (slot === 'full_day') {
                                badgeColor = 'bg-emerald-100 text-emerald-800 font-semibold';
                                label = 'Full';
                              } else if (slot === 'morning') {
                                badgeColor = 'bg-sky-100 text-sky-800 font-semibold';
                                label = 'AM';
                              } else if (slot === 'evening') {
                                badgeColor = 'bg-amber-100 text-amber-800 font-semibold';
                                label = 'PM';
                              }

                              return (
                                <td key={day} className="py-2.5 px-2 text-center">
                                  <span
                                    className={`inline-block px-1.5 py-0.5 rounded text-[10px] ${badgeColor}`}
                                  >
                                    {label}
                                  </span>
                                </td>
                              );
                            }
                          )}
                          <td className="py-2.5 px-3 text-right">
                            <button
                              onClick={() => setEditingUser(staff)}
                              className="text-[#0F172A] hover:underline font-medium text-[11px]"
                            >
                              Edit Shift
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Domain Skills Matrix Visualizer */}
            <div className="bg-white border border-[#E7E5E4] rounded-xl p-5">
              <h3 className="text-sm font-bold text-[#0F172A] mb-1">
                Domain Catering &amp; Logistics Skills Matrix
              </h3>
              <p className="text-xs text-stone-500 mb-4">
                Assigned capabilities across banquet operations, warewashing, mixology, and turnaround leads.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  'Turnaround Buffer Lead',
                  'VIP Table Plating',
                  'Buffet Line Coordination',
                  'Mixology & Craft Bar',
                  'Equipment Dispatch Barcoding',
                  'Warewash & Sanitization',
                  'Sommelier & Wine Service',
                  'Heavy Chafing & Furniture Staging',
                  'Food Safety (HACCP Certified)',
                ].map((skillName) => {
                  const qualifiedStaff = users.filter(
                    (u) => u.skills && u.skills.includes(skillName as StaffSkill)
                  );
                  return (
                    <div
                      key={skillName}
                      className="border border-stone-200 rounded-xl p-3 bg-stone-50/50"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-xs text-[#0F172A]">{skillName}</span>
                        <span className="text-[11px] font-mono px-1.5 py-0.2 rounded bg-stone-200 text-stone-800">
                          {qualifiedStaff.length} crew
                        </span>
                      </div>
                      <div className="space-y-1">
                        {qualifiedStaff.length === 0 ? (
                          <div className="text-[11px] text-stone-400 italic">
                            No crew members assigned yet
                          </div>
                        ) : (
                          qualifiedStaff.map((staff) => (
                            <div
                              key={staff.id}
                              className="text-[11px] text-stone-600 flex items-center justify-between"
                            >
                              <span>{staff.fullName}</span>
                              <span className="text-[10px] text-stone-400">{staff.position}</span>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SYSTEM GOVERNANCE & AUDIT LOG */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="bg-white border border-[#E7E5E4] rounded-xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <ShieldAlert className="w-5 h-5 text-amber-500" />
                <h3 className="text-base font-bold text-[#0F172A]">
                  Authentication &amp; User Provisioning Rules
                </h3>
              </div>
              <div className="space-y-3 text-xs text-stone-600 leading-relaxed border-t border-[#E7E5E4] pt-4">
                <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                  <span className="font-semibold text-stone-900 block mb-1">
                    1. Centralized Login Gate
                  </span>
                  Administrators, Operations Managers, Catering Crew, and Customers all authenticate
                  through the same unified login endpoint. Role detection and automated routing occur
                  instantly upon credential verification.
                </div>

                <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                  <span className="font-semibold text-stone-900 block mb-1">
                    2. Predefined Administrator Account Rule
                  </span>
                  Strict enforcement guarantees exactly ONE master administrator (
                  <code className="text-amber-800 font-mono">admin@gmail.com</code> /{' '}
                  <code className="text-amber-800 font-mono">admin123</code>). It cannot be deleted,
                  deactivated, or demoted. Public sign-up is prevented from claiming this address.
                </div>

                <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                  <span className="font-semibold text-stone-900 block mb-1">
                    3. Customer Registration vs. Internal Provisioning
                  </span>
                  The public registration portal exclusively registers customer accounts. Manager and
                  staff accounts can only be provisioned from within this administrative dashboard.
                </div>

                <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                  <span className="font-semibold text-stone-900 block mb-1">
                    4. Mock Data &amp; Local Persistence Engine
                  </span>
                  All accounts, shift modifications, and credentials persist in browser localStorage
                  for the mock testing milestone without requiring external database servers.
                </div>
              </div>

              {/* Developer Reset Helper */}
              <div className="mt-6 pt-5 border-t border-[#E7E5E4] flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-stone-900">
                    Reset Mock Database to Factory Seed
                  </div>
                  <div className="text-[11px] text-stone-500">
                    Restores initial admin, managers, staff roster, and customer demo accounts.
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('Reset all user accounts back to default seed data?')) {
                      resetToDefaults();
                    }
                  }}
                  className="px-3 py-1.5 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restore Factory Defaults</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: ADMIN PROFILE */}
        {activeTab === 'profile' && <ProfileSettings />}
      </main>

      {/* Modals */}
      <CreateStaffModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      <EditStaffModal
        isOpen={Boolean(editingUser)}
        user={editingUser}
        onClose={() => setEditingUser(null)}
      />
    </div>
  );
}
