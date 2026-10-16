import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  X,
  UserCheck,
  AlertCircle,
  Briefcase,
  Mail,
  Lock,
  Phone,
  Building,
  DollarSign,
  Calendar,
} from 'lucide-react';
import {
  ALL_STAFF_SKILLS,
  DAYS_OF_WEEK,
  StaffSkill,
  WeeklyAvailability,
  AvailabilitySlot,
} from '../../types/auth';

interface CreateStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateStaffModal({ isOpen, onClose }: CreateStaffModalProps) {
  const { createUserByAdmin } = useAuth();

  const [role, setRole] = useState<'MANAGER' | 'STAFF'>('STAFF');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('temp123');
  const [phone, setPhone] = useState('');
  const [department, setDepartment] = useState('Hospitality & Banquet');
  const [position, setPosition] = useState('Banquet Server');
  const [hourlyRate, setHourlyRate] = useState('280');
  const [selectedSkills, setSelectedSkills] = useState<StaffSkill[]>([
    'Buffet Line Coordination',
    'VIP Table Plating',
  ]);
  const [availability, setAvailability] = useState<WeeklyAvailability>({
    monday: 'full_day',
    tuesday: 'full_day',
    wednesday: 'full_day',
    thursday: 'full_day',
    friday: 'full_day',
    saturday: 'morning',
    sunday: 'unavailable',
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleToggleSkill = (skill: StaffSkill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleAvailabilityChange = (
    day: keyof WeeklyAvailability,
    val: AvailabilitySlot
  ) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: val,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!fullName.trim() || !email.trim() || !phone.trim() || !position.trim()) {
      setErrorMessage('Please fill in all mandatory account fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await createUserByAdmin({
        fullName,
        email,
        password,
        role,
        phone,
        department,
        position,
        skills: role === 'STAFF' ? selectedSkills : undefined,
        availability: role === 'STAFF' ? availability : undefined,
        hourlyRate: role === 'STAFF' ? Number(hourlyRate) : undefined,
      });

      if (res.success) {
        onClose();
      } else {
        setErrorMessage(res.error || 'Failed to create account.');
      }
    } catch {
      setErrorMessage('An unexpected error occurred while saving the account.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white border border-[#E7E5E4] rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 bg-[#0F172A] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="text-base font-bold text-white">Provision Team Member Account</h3>
              <p className="text-xs text-slate-300">
                Admin Exclusive · Create Manager or Staff Profile
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-6 flex-grow">
          {errorMessage && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Role selection tab */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1.5">
              Account Role *
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setRole('STAFF');
                  setDepartment('Hospitality & Banquet');
                  setPosition('Banquet Server');
                }}
                className={`p-3 text-left border rounded-xl transition-all ${
                  role === 'STAFF'
                    ? 'border-[#0F172A] bg-stone-50 ring-1 ring-[#0F172A]'
                    : 'border-[#E7E5E4] hover:border-stone-300'
                }`}
              >
                <div className="font-semibold text-xs text-[#0F172A]">Staff Personnel</div>
                <div className="text-[11px] text-stone-500 mt-0.5">
                  Banquet, Bartenders, Logistics Crew, Warewash Techs
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setRole('MANAGER');
                  setDepartment('Event Coordination & Planning');
                  setPosition('Event Operations Coordinator');
                }}
                className={`p-3 text-left border rounded-xl transition-all ${
                  role === 'MANAGER'
                    ? 'border-[#0F172A] bg-stone-50 ring-1 ring-[#0F172A]'
                    : 'border-[#E7E5E4] hover:border-stone-300'
                }`}
              >
                <div className="font-semibold text-xs text-[#0F172A]">Operations Manager</div>
                <div className="text-[11px] text-stone-500 mt-0.5">
                  Proposal approvals, logistics dispatch, buffer oversight
                </div>
              </button>
            </div>
          </div>

          {/* Personal Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Juan De La Cruz"
                className="w-full px-3 py-2 text-xs border border-[#E7E5E4] rounded-lg focus:ring-2 focus:ring-[#0F172A] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Email Address (Login ID) *
              </label>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@clemora.ph"
                  className="w-full pl-8 pr-3 py-2 text-xs border border-[#E7E5E4] rounded-lg focus:ring-2 focus:ring-[#0F172A] focus:outline-none"
                />
              </div>
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

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Initial Password *
              </label>
              <div className="relative">
                <Lock className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Set initial password"
                  className="w-full pl-8 pr-3 py-2 text-xs border border-[#E7E5E4] rounded-lg focus:ring-2 focus:ring-[#0F172A] focus:outline-none font-mono"
                />
              </div>
            </div>
          </div>

          {/* Department & Position */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Department
              </label>
              <div className="relative">
                <Building className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 text-xs border border-[#E7E5E4] rounded-lg focus:ring-2 focus:ring-[#0F172A] focus:outline-none bg-white"
                >
                  <option value="Hospitality & Banquet">Hospitality &amp; Banquet</option>
                  <option value="Event Coordination & Planning">Event Coordination &amp; Planning</option>
                  <option value="Logistics & Warehousing">Logistics &amp; Warehousing</option>
                  <option value="Beverage & Bar">Beverage &amp; Bar</option>
                  <option value="Culinary & Kitchen Staging">Culinary &amp; Kitchen Staging</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Position / Job Title *
              </label>
              <div className="relative">
                <Briefcase className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  placeholder="e.g. Banquet Floor Captain"
                  className="w-full pl-8 pr-3 py-2 text-xs border border-[#E7E5E4] rounded-lg focus:ring-2 focus:ring-[#0F172A] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Staff specific: Hourly rate, Skills, and Availability */}
          {role === 'STAFF' && (
            <div className="space-y-5 pt-4 border-t border-[#E7E5E4]">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Hourly Rate (PHP)
                </label>
                <div className="relative w-48">
                  <DollarSign className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="number"
                    min="100"
                    step="10"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 text-xs border border-[#E7E5E4] rounded-lg focus:ring-2 focus:ring-[#0F172A] focus:outline-none font-mono tabular-nums"
                  />
                </div>
              </div>

              {/* Skills selection */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-semibold text-stone-700">
                    Assign Catering &amp; Logistics Skills
                  </label>
                  <span className="text-[11px] text-stone-500 font-mono">
                    {selectedSkills.length} selected
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-stone-50 p-3 rounded-xl border border-stone-200">
                  {ALL_STAFF_SKILLS.map((skill) => {
                    const isChecked = selectedSkills.includes(skill);
                    return (
                      <label
                        key={skill}
                        className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer text-xs transition-colors ${
                          isChecked
                            ? 'bg-white border border-[#0F172A]/20 font-medium text-[#0F172A] shadow-xs'
                            : 'hover:bg-stone-100 text-stone-600'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleToggleSkill(skill)}
                          className="rounded border-[#E7E5E4] text-[#0F172A] focus:ring-[#0F172A]"
                        />
                        <span>{skill}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Weekly Availability Schedule */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-stone-600" />
                  <label className="text-xs font-semibold text-stone-700">
                    Default Weekly Availability Schedule
                  </label>
                </div>
                <div className="border border-stone-200 rounded-xl overflow-hidden divide-y divide-stone-200 text-xs">
                  {DAYS_OF_WEEK.map((day) => (
                    <div
                      key={day}
                      className="flex items-center justify-between px-3 py-2 bg-white hover:bg-stone-50"
                    >
                      <span className="capitalize font-medium text-stone-700 w-28">
                        {day}
                      </span>
                      <div className="flex items-center gap-1.5">
                        {(['full_day', 'morning', 'evening', 'unavailable'] as AvailabilitySlot[]).map(
                          (slot) => (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => handleAvailabilityChange(day, slot)}
                              className={`px-2.5 py-1 text-[11px] rounded font-medium transition-all ${
                                availability[day] === slot
                                  ? slot === 'unavailable'
                                    ? 'bg-rose-100 text-rose-800 font-semibold'
                                    : 'bg-[#0F172A] text-white font-semibold'
                                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                              }`}
                            >
                              {slot === 'full_day' && 'Full Day'}
                              {slot === 'morning' && 'Morning (AM)'}
                              {slot === 'evening' && 'Evening (PM)'}
                              {slot === 'unavailable' && 'Off'}
                            </button>
                          )
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Form actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E7E5E4]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 border border-stone-300 rounded-lg hover:bg-stone-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 text-xs font-semibold text-white bg-[#0F172A] hover:bg-[#1E293B] rounded-lg transition-colors shadow-sm disabled:opacity-50"
            >
              {isSubmitting ? 'Provisioning...' : 'Create & Activate Account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
