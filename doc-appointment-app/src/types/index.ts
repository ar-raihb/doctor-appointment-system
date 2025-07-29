
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'patient' | 'doctor';
  avatar?: string;
}

export interface Doctor extends User {
  role: 'doctor';
  specialization: string;
  experience: number;
  rating: number;
  consultationFee: number;
  availability: AvailabilitySlot[];
}

export interface Patient extends User {
  role: 'patient';
  age: number;
  gender: 'male' | 'female' | 'other';
  bloodGroup?: string;
}

export interface AvailabilitySlot {
  id: string;
  doctorId: string;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  symptoms?: string;
  notes?: string;
  createdAt: string;
}

export interface Prescription {
  id: string;
  patientId: string;
  doctorId: string;
  appointmentId: string;
  medications: Medication[];
  diagnosis: string;
  instructions: string;
  createdAt: string;
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
}
