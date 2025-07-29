
import { Appointment } from '@/types';

export const demoAppointments: Appointment[] = [
  {
    id: 'appointment-1',
    patientId: 'patient-1',
    doctorId: 'doctor-1',
    date: '2025-06-02',
    time: '10:00',
    status: 'completed',
    symptoms: 'Chest pain and shortness of breath',
    notes: 'Patient reports occasional chest discomfort',
    createdAt: '2025-05-28T10:00:00Z'
  },
  {
    id: 'appointment-2',
    patientId: 'patient-1',
    doctorId: 'doctor-2',
    date: '2025-06-08',
    time: '14:30',
    status: 'confirmed',
    symptoms: 'Frequent headaches',
    createdAt: '2025-06-01T15:30:00Z'
  },
  {
    id: 'appointment-3',
    patientId: 'patient-2',
    doctorId: 'doctor-1',
    date: '2025-06-05',
    time: '09:00',
    status: 'pending',
    symptoms: 'Irregular heartbeat and fatigue',
    notes: 'Patient experiencing palpitations for the past week',
    createdAt: '2025-06-02T08:00:00Z'
  },
  {
    id: 'appointment-4',
    patientId: 'patient-1',
    doctorId: 'doctor-1',
    date: '2025-06-10',
    time: '11:30',
    status: 'pending',
    symptoms: 'Follow-up for chest pain',
    notes: 'Scheduled follow-up appointment',
    createdAt: '2025-06-02T14:00:00Z'
  }
];
