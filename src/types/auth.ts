export type UserRole = 'ADMIN' | 'MANAGER' | 'STAFF' | 'CUSTOMER';

export type UserStatus = 'active' | 'deactivated';

export type AvailabilitySlot = 'full_day' | 'morning' | 'evening' | 'unavailable';

export interface WeeklyAvailability {
  monday: AvailabilitySlot;
  tuesday: AvailabilitySlot;
  wednesday: AvailabilitySlot;
  thursday: AvailabilitySlot;
  friday: AvailabilitySlot;
  saturday: AvailabilitySlot;
  sunday: AvailabilitySlot;
}

export type StaffSkill =
  | 'VIP Table Plating'
  | 'Turnaround Buffer Lead'
  | 'Buffet Line Coordination'
  | 'Mixology & Craft Bar'
  | 'Sommelier & Wine Service'
  | 'Warewash & Sanitization'
  | 'Equipment Dispatch Barcoding'
  | 'Heavy Chafing & Furniture Staging'
  | 'Culinary Prep & Finishing'
  | 'Food Safety (HACCP Certified)';

export interface User {
  id: string;
  email: string;
  password?: string;
  fullName: string;
  role: UserRole;
  status: UserStatus;
  phone: string;
  department?: string;
  position?: string;
  organization?: string;
  skills?: StaffSkill[];
  availability?: WeeklyAvailability;
  hourlyRate?: number;
  createdAt: string;
  lastLogin?: string;
}

export interface AuthState {
  currentUser: User | null;
  users: User[];
  isLoading: boolean;
}

export const ALL_STAFF_SKILLS: StaffSkill[] = [
  'VIP Table Plating',
  'Turnaround Buffer Lead',
  'Buffet Line Coordination',
  'Mixology & Craft Bar',
  'Sommelier & Wine Service',
  'Warewash & Sanitization',
  'Equipment Dispatch Barcoding',
  'Heavy Chafing & Furniture Staging',
  'Culinary Prep & Finishing',
  'Food Safety (HACCP Certified)',
];

export const DAYS_OF_WEEK: (keyof WeeklyAvailability)[] = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];
