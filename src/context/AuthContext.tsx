import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from 'react';
import { User, WeeklyAvailability } from '../types/auth';
import { authStorage } from '../services/authStorage';

interface AuthContextType {
  currentUser: User | null;
  users: User[];
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string; user?: User }>;
  logout: () => void;
  registerCustomer: (data: {
    fullName: string;
    email: string;
    password: string;
    phone: string;
    organization?: string;
  }) => Promise<{ success: boolean; error?: string; user?: User }>;
  createUserByAdmin: (data: {
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
  }) => Promise<{ success: boolean; error?: string; user?: User }>;
  updateUser: (
    id: string,
    updates: Partial<User>
  ) => Promise<{ success: boolean; error?: string; user?: User }>;
  toggleUserStatus: (id: string) => Promise<{ success: boolean; error?: string; user?: User }>;
  resetToDefaults: () => void;
  refreshUsers: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUsers = useCallback(() => {
    const list = authStorage.getUsers();
    setUsers(list);
    const session = authStorage.getCurrentUser();
    setCurrentUser(session);
  }, []);

  useEffect(() => {
    refreshUsers();
    setIsLoading(false);
  }, [refreshUsers]);

  const login = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string; user?: User }> => {
    const cleanEmail = email.trim().toLowerCase();
    const allUsers = authStorage.getUsers();

    const matched = allUsers.find(
      (u) => u.email.toLowerCase() === cleanEmail && u.password === password
    );

    if (!matched) {
      return {
        success: false,
        error: 'Invalid email address or password. Please verify your credentials.',
      };
    }

    if (matched.status === 'deactivated') {
      return {
        success: false,
        error: 'This account has been deactivated by the system administrator. Please contact operations.',
      };
    }

    const updatedUser = {
      ...matched,
      lastLogin: new Date().toISOString(),
    };

    authStorage.updateUser(matched.id, { lastLogin: updatedUser.lastLogin });
    authStorage.setCurrentUser(updatedUser);
    setCurrentUser(updatedUser);
    refreshUsers();

    return { success: true, user: updatedUser };
  };

  const logout = useCallback(() => {
    authStorage.setCurrentUser(null);
    setCurrentUser(null);
  }, []);

  const registerCustomer = async (data: {
    fullName: string;
    email: string;
    password: string;
    phone: string;
    organization?: string;
  }): Promise<{ success: boolean; error?: string; user?: User }> => {
    const res = authStorage.createCustomer(data);
    if (res.success && res.user) {
      setCurrentUser(res.user);
      refreshUsers();
      return { success: true, user: res.user };
    }
    return { success: false, error: res.error || 'Failed to create customer account.' };
  };

  const createUserByAdmin = async (data: {
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
  }): Promise<{ success: boolean; error?: string; user?: User }> => {
    if (!currentUser || currentUser.role !== 'ADMIN') {
      return { success: false, error: 'Unauthorized: Only system administrators can provision staff/manager accounts.' };
    }

    const res = authStorage.createStaffOrManagerByAdmin(data);
    if (res.success && res.user) {
      refreshUsers();
      return { success: true, user: res.user };
    }
    return { success: false, error: res.error || 'Failed to provision account.' };
  };

  const updateUser = async (
    id: string,
    updates: Partial<User>
  ): Promise<{ success: boolean; error?: string; user?: User }> => {
    const res = authStorage.updateUser(id, updates);
    if (res.success && res.user) {
      refreshUsers();
      if (currentUser?.id === id) {
        setCurrentUser(res.user);
      }
      return { success: true, user: res.user };
    }
    return { success: false, error: res.error || 'Failed to update user profile.' };
  };

  const toggleUserStatus = async (
    id: string
  ): Promise<{ success: boolean; error?: string; user?: User }> => {
    if (!currentUser || currentUser.role !== 'ADMIN') {
      return { success: false, error: 'Unauthorized: Only administrators can modify account activation status.' };
    }
    const res = authStorage.toggleUserStatus(id);
    if (res.success) {
      refreshUsers();
      return { success: true, user: res.user };
    }
    return { success: false, error: res.error };
  };

  const resetToDefaults = () => {
    authStorage.resetDefaults();
    refreshUsers();
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        users,
        isLoading,
        login,
        logout,
        registerCustomer,
        createUserByAdmin,
        updateUser,
        toggleUserStatus,
        resetToDefaults,
        refreshUsers,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
