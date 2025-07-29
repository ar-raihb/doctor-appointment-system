
export interface AuthUser {
  id: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  role: 'patient' | 'doctor';
  phone: string;
  // Patient specific fields
  age?: number;
  gender?: 'male' | 'female' | 'other';
  bloodGroup?: string;
  // Doctor specific fields
  specialization?: string;
  experience?: number;
  rating?: number;
  consultationFee?: number;
}

export type UserRole = 'patient' | 'doctor';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends Omit<AuthUser, 'id'> {
  confirmPassword: string;
}

// Demo login credentials
export const demoUsers: AuthUser[] = [
  // Patient credentials
  {
    id: 'patient-1',
    email: 'patient@demo.com',
    password: 'patient123',
    first_name: 'John',
    last_name: 'Smith',
    role: 'patient',
    phone: '+1-555-0123',
    age: 35,
    gender: 'male',
    bloodGroup: 'A+'
  },
  {
    id: 'patient-2',
    email: 'sarah@demo.com',
    password: 'sarah123',
    first_name: 'Sarah',
    last_name: 'Johnson',
    role: 'patient',
    phone: '+1-555-0124',
    age: 28,
    gender: 'female',
    bloodGroup: 'O-'
  },
  // Doctor credentials
  {
    id: 'doctor-1',
    email: 'doctor@demo.com',
    password: 'doctor123',
    first_name: 'Michael',
    last_name: 'Chen',
    role: 'doctor',
    phone: '+1-555-0201',
    specialization: 'Cardiology',
    experience: 15,
    rating: 4.8,
    consultationFee: 200
  },
  {
    id: 'doctor-2',
    email: 'emily@demo.com',
    password: 'emily123',
    first_name: 'Emily',
    last_name: 'Wilson',
    role: 'doctor',
    phone: '+1-555-0202',
    specialization: 'Dermatology',
    experience: 12,
    rating: 4.9,
    consultationFee: 180
  }
];

// Authentication functions
export const authenticateUser = (email: string, password: string): AuthUser | null => {
  const user = demoUsers.find(u => u.email === email && u.password === password);
  return user || null;
};

export const registerUser = (userData: RegisterData): AuthUser => {
  const newUser: AuthUser = {
    id: `${userData.role}-${Date.now()}`,
    email: userData.email,
    password: userData.password,
    name: userData.name,
    role: userData.role,
    phone: userData.phone,
    ...(userData.role === 'patient' && {
      age: userData.age,
      gender: userData.gender,
      bloodGroup: userData.bloodGroup
    }),
    ...(userData.role === 'doctor' && {
      specialization: userData.specialization,
      experience: userData.experience,
      rating: userData.rating || 5.0,
      consultationFee: userData.consultationFee
    })
  };
  
  demoUsers.push(newUser);
  return newUser;
};

// Create alias for createUser to match Register.tsx expectations
export const createUser = (userData: { name: string; email: string; password: string; role: UserRole }): AuthUser => {
  const newUser: AuthUser = {
    id: `${userData.role}-${Date.now()}`,
    email: userData.email,
    password: userData.password,
    name: userData.name,
    role: userData.role,
    phone: '', // Default empty phone for basic registration
  };
  
  demoUsers.push(newUser);
  return newUser;
};

export const getCurrentUser = (): AuthUser | null => {
  const userStr = localStorage.getItem('currentUser');
  return userStr ? JSON.parse(userStr) : null;
};

export const setCurrentUser = (user: AuthUser): void => {
  localStorage.setItem('currentUser', JSON.stringify(user));
};

export const clearCurrentUser = (): void => {
  localStorage.removeItem('currentUser');
};
