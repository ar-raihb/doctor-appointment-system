
import { Patient } from '@/types';

export const demoPatients: Patient[] = [
  {
    id: 'patient-1',
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1-555-0123',
    role: 'patient',
    age: 35,
    gender: 'male',
    bloodGroup: 'A+'
  },
  {
    id: 'patient-2',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1-555-0124',
    role: 'patient',
    age: 28,
    gender: 'female',
    bloodGroup: 'O-'
  }
];

export const currentPatient = demoPatients[0];
