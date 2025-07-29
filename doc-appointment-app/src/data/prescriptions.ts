
import { Prescription } from '@/types';

export const demoPrescriptions: Prescription[] = [
  {
    id: 'prescription-1',
    patientId: 'patient-1',
    doctorId: 'doctor-1',
    appointmentId: 'appointment-1',
    medications: [
      {
        name: 'Metoprolol',
        dosage: '25mg',
        frequency: 'Twice daily',
        duration: '30 days'
      },
      {
        name: 'Aspirin',
        dosage: '81mg',
        frequency: 'Once daily',
        duration: '90 days'
      }
    ],
    diagnosis: 'Mild hypertension',
    instructions: 'Take medications with food. Monitor blood pressure daily. Follow up in 2 weeks.',
    createdAt: '2025-06-02T10:30:00Z'
  },
  {
    id: 'prescription-2',
    patientId: 'patient-1',
    doctorId: 'doctor-2',
    appointmentId: 'appointment-2',
    medications: [
      {
        name: 'Ibuprofen',
        dosage: '400mg',
        frequency: 'Three times daily',
        duration: '7 days'
      }
    ],
    diagnosis: 'Tension headaches',
    instructions: 'Take with food to avoid stomach upset. Stay hydrated and get adequate rest.',
    createdAt: '2025-06-04T14:15:00Z'
  },
  {
    id: 'prescription-3',
    patientId: 'patient-1',
    doctorId: 'doctor-1',
    appointmentId: 'appointment-4',
    medications: [
      {
        name: 'Lisinopril',
        dosage: '10mg',
        frequency: 'Once daily',
        duration: '90 days'
      },
      {
        name: 'Atorvastatin',
        dosage: '20mg',
        frequency: 'Once daily at bedtime',
        duration: '90 days'
      }
    ],
    diagnosis: 'Hypertension and elevated cholesterol',
    instructions: 'Take Lisinopril in the morning, Atorvastatin at bedtime. Regular monitoring of liver function required.',
    createdAt: '2025-06-05T11:20:00Z'
  }
];
