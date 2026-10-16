import { User, WeeklyAvailability } from '../types/auth';

const STORAGE_USERS_KEY = 'clemora_users_v2';
const STORAGE_CURRENT_USER_KEY = 'clemora_current_user_v2';

const DEFAULT_AVAILABILITY: WeeklyAvailability = {
  monday: 'full_day',
  tuesday: 'full_day',
  wednesday: 'full_day',
  thursday: 'full_day',
  friday: 'full_day',
  saturday: 'morning',
  sunday: 'unavailable',
};

export const INITIAL_USERS: User[] = [
  {
    id: 'usr-admin-01',
    email: 'admin@gmail.com',
    password: 'admin123',
    fullName: 'System Administrator',
    role: 'ADMIN',
    status: 'active',
    phone: '+63 917 555 0100',
    department: 'Executive Administration',
    position: 'Chief Systems Administrator',
    createdAt: '2026-08-01T08:00:00.000Z',
    lastLogin: '2026-10-16T07:15:00.000Z',
  },
  {
    id: 'usr-mgr-01',
    email: 'clara.manager@clemora.ph',
    password: 'manager123',
    fullName: 'Clara Vance',
    role: 'MANAGER',
    status: 'active',
    phone: '+63 918 555 0122',
    department: 'Event Coordination & Planning',
    position: 'Lead Event Coordinator',
    createdAt: '2026-08-15T09:00:00.000Z',
    lastLogin: '2026-10-15T14:30:00.000Z',
  },
  {
    id: 'usr-mgr-02',
    email: 'roberto.ops@clemora.ph',
    password: 'manager123',
    fullName: 'Roberto Santos',
    role: 'MANAGER',
    status: 'active',
    phone: '+63 919 555 0133',
    department: 'Logistics & Warehousing',
    position: 'Operations & Dispatch Manager',
    createdAt: '2026-08-20T10:15:00.000Z',
    lastLogin: '2026-10-16T06:45:00.000Z',
  },
  {
    id: 'usr-stf-01',
    email: 'marvin.staff@clemora.ph',
    password: 'staff123',
    fullName: 'Marvin Dayrit',
    role: 'STAFF',
    status: 'active',
    phone: '+63 920 555 0144',
    department: 'Hospitality & Banquet',
    position: 'Senior Banquet Captain',
    hourlyRate: 350,
    skills: ['VIP Table Plating', 'Turnaround Buffer Lead', 'Buffet Line Coordination'],
    availability: {
      monday: 'morning',
      tuesday: 'full_day',
      wednesday: 'full_day',
      thursday: 'evening',
      friday: 'full_day',
      saturday: 'full_day',
      sunday: 'unavailable',
    },
    createdAt: '2026-09-01T11:00:00.000Z',
    lastLogin: '2026-10-15T18:00:00.000Z',
  },
  {
    id: 'usr-stf-02',
    email: 'lhoreese.staff@clemora.ph',
    password: 'staff123',
    fullName: 'Lhoreese Mercado',
    role: 'STAFF',
    status: 'active',
    phone: '+63 921 555 0155',
    department: 'Beverage & Bar',
    position: 'Hospitality Lead & Bartender',
    hourlyRate: 320,
    skills: ['Mixology & Craft Bar', 'VIP Table Plating', 'Food Safety (HACCP Certified)'],
    availability: {
      monday: 'full_day',
      tuesday: 'unavailable',
      wednesday: 'evening',
      thursday: 'evening',
      friday: 'full_day',
      saturday: 'full_day',
      sunday: 'evening',
    },
    createdAt: '2026-09-05T09:30:00.000Z',
    lastLogin: '2026-10-14T20:10:00.000Z',
  },
  {
    id: 'usr-stf-03',
    email: 'ken.staff@clemora.ph',
    password: 'staff123',
    fullName: 'John Kenneth Pitel',
    role: 'STAFF',
    status: 'active',
    phone: '+63 922 555 0166',
    department: 'Logistics & Warewash',
    position: 'Logistics & Sanitization Specialist',
    hourlyRate: 300,
    skills: ['Equipment Dispatch Barcoding', 'Warewash & Sanitization', 'Heavy Chafing & Furniture Staging'],
    availability: {
      monday: 'full_day',
      tuesday: 'full_day',
      wednesday: 'full_day',
      thursday: 'full_day',
      friday: 'full_day',
      saturday: 'morning',
      sunday: 'unavailable',
    },
    createdAt: '2026-09-10T08:00:00.000Z',
    lastLogin: '2026-10-15T11:20:00.000Z',
  },
  {
    id: 'usr-stf-04',
    email: 'erik.staff@clemora.ph',
    password: 'staff123',
    fullName: 'Erik Singson',
    role: 'STAFF',
    status: 'deactivated',
    phone: '+63 923 555 0177',
    department: 'Hospitality & Banquet',
    position: 'Junior Banquet Server',
    hourlyRate: 250,
    skills: ['Buffet Line Coordination', 'Heavy Chafing & Furniture Staging'],
    availability: {
      monday: 'unavailable',
      tuesday: 'unavailable',
      wednesday: 'evening',
      thursday: 'evening',
      friday: 'full_day',
      saturday: 'full_day',
      sunday: 'full_day',
    },
    createdAt: '2026-09-12T13:45:00.000Z',
  },
  {
    id: 'usr-cst-01',
    email: 'isabel.client@gmail.com',
    password: 'customer123',
    fullName: 'Isabel Montelibano',
    role: 'CUSTOMER',
    status: 'active',
    phone: '+63 920 555 0199',
    organization: 'Summit Media Manila',
    createdAt: '2026-09-18T14:20:00.000Z',
    lastLogin: '2026-10-14T09:15:00.000Z',
  },
];

export const authStorage = {
  getUsers(): User[] {
    try {
      const stored = localStorage.getItem(STORAGE_USERS_KEY);
      if (!stored) {
        localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(INITIAL_USERS));
        return INITIAL_USERS;
      }
      const parsed: User[] = JSON.parse(stored);
      // Ensure the predefined admin always exists and is active
      const adminExists = parsed.some(
        (u) => u.email.toLowerCase() === 'admin@gmail.com' && u.role === 'ADMIN'
      );
      if (!adminExists) {
        parsed.unshift(INITIAL_USERS[0]);
        localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(parsed));
      }
      return parsed;
    } catch {
      return INITIAL_USERS;
    }
  },

  saveUsers(users: User[]): void {
    // Enforcement: admin@gmail.com cannot be removed or have role changed
    const enforced = users.map((u) => {
      if (u.email.toLowerCase() === 'admin@gmail.com') {
        return {
          ...u,
          role: 'ADMIN' as const,
          status: 'active' as const,
        };
      }
      return u;
    });
    localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(enforced));
  },

  getCurrentUser(): User | null {
    try {
      const stored = localStorage.getItem(STORAGE_CURRENT_USER_KEY);
      if (!stored) return null;
      const parsed: User = JSON.parse(stored);
      // Refresh current user state with latest in database
      const all = this.getUsers();
      const current = all.find((u) => u.id === parsed.id);
      return current || null;
    } catch {
      return null;
    }
  },

  setCurrentUser(user: User | null): void {
    if (!user) {
      localStorage.removeItem(STORAGE_CURRENT_USER_KEY);
    } else {
      localStorage.setItem(STORAGE_CURRENT_USER_KEY, JSON.stringify(user));
    }
  },

  resetDefaults(): User[] {
    localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(INITIAL_USERS));
    return INITIAL_USERS;
  },

  createCustomer(data: {
    fullName: string;
    email: string;
    password: string;
    phone: string;
    organization?: string;
  }): { success: boolean; user?: User; error?: string } {
    const users = this.getUsers();
    const cleanEmail = data.email.trim().toLowerCase();

    if (cleanEmail === 'admin@gmail.com') {
      return { success: false, error: 'Registration with this reserved administrative email is prohibited.' };
    }

    if (users.some((u) => u.email.toLowerCase() === cleanEmail)) {
      return { success: false, error: 'An account with this email address already exists.' };
    }

    const newUser: User = {
      id: `usr-cst-${Date.now()}`,
      email: cleanEmail,
      password: data.password,
      fullName: data.fullName.trim(),
      role: 'CUSTOMER',
      status: 'active',
      phone: data.phone.trim(),
      organization: data.organization?.trim() || 'Private Event Host',
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
    };

    const updated = [newUser, ...users];
    this.saveUsers(updated);
    this.setCurrentUser(newUser);

    return { success: true, user: newUser };
  },

  createStaffOrManagerByAdmin(data: {
    fullName: string;
    email: string;
    password: string;
    role: 'MANAGER' | 'STAFF';
    phone: string;
    department: string;
    position: string;
    skills?: User['skills'];
    availability?: WeeklyAvailability;
    hourlyRate?: number;
  }): { success: boolean; user?: User; error?: string } {
    const users = this.getUsers();
    const cleanEmail = data.email.trim().toLowerCase();

    if (cleanEmail === 'admin@gmail.com') {
      return { success: false, error: 'Only one predefined administrator account is permitted.' };
    }

    if (users.some((u) => u.email.toLowerCase() === cleanEmail)) {
      return { success: false, error: 'An account with this email address already exists in the system.' };
    }

    const prefix = data.role === 'MANAGER' ? 'usr-mgr' : 'usr-stf';
    const newUser: User = {
      id: `${prefix}-${Date.now()}`,
      email: cleanEmail,
      password: data.password,
      fullName: data.fullName.trim(),
      role: data.role,
      status: 'active',
      phone: data.phone.trim(),
      department: data.department.trim(),
      position: data.position.trim(),
      skills: data.role === 'STAFF' ? data.skills || [] : undefined,
      availability: data.role === 'STAFF' ? data.availability || DEFAULT_AVAILABILITY : undefined,
      hourlyRate: data.role === 'STAFF' ? Number(data.hourlyRate) || 280 : undefined,
      createdAt: new Date().toISOString(),
    };

    const updated = [...users, newUser];
    this.saveUsers(updated);

    return { success: true, user: newUser };
  },

  updateUser(
    id: string,
    updates: Partial<User>
  ): { success: boolean; user?: User; error?: string } {
    const users = this.getUsers();
    const targetIndex = users.findIndex((u) => u.id === id);

    if (targetIndex === -1) {
      return { success: false, error: 'User not found in system.' };
    }

    const current = users[targetIndex];

    // Check email uniqueness if email changed
    if (updates.email && updates.email.toLowerCase() !== current.email.toLowerCase()) {
      const cleanEmail = updates.email.trim().toLowerCase();
      if (cleanEmail === 'admin@gmail.com' && current.id !== 'usr-admin-01') {
        return { success: false, error: 'The email admin@gmail.com is reserved exclusively for the system administrator.' };
      }
      if (users.some((u) => u.id !== id && u.email.toLowerCase() === cleanEmail)) {
        return { success: false, error: 'Email address is already in use by another account.' };
      }
    }

    // Protection: Admin cannot be deactivated or have role changed
    if (current.email.toLowerCase() === 'admin@gmail.com') {
      updates.role = 'ADMIN';
      updates.status = 'active';
    }

    const updatedUser: User = {
      ...current,
      ...updates,
      // preserve id and createdAt
      id: current.id,
      createdAt: current.createdAt,
    };

    users[targetIndex] = updatedUser;
    this.saveUsers(users);

    // If currently logged-in user updated themselves, refresh session
    const currentSession = this.getCurrentUser();
    if (currentSession && currentSession.id === id) {
      this.setCurrentUser(updatedUser);
    }

    return { success: true, user: updatedUser };
  },

  toggleUserStatus(id: string): { success: boolean; user?: User; error?: string } {
    const users = this.getUsers();
    const target = users.find((u) => u.id === id);

    if (!target) {
      return { success: false, error: 'Target user account not found.' };
    }

    if (target.email.toLowerCase() === 'admin@gmail.com' || target.role === 'ADMIN') {
      return { success: false, error: 'The predefined Administrator account cannot be deactivated.' };
    }

    const nextStatus = target.status === 'active' ? 'deactivated' : 'active';
    return this.updateUser(id, { status: nextStatus });
  },
};
