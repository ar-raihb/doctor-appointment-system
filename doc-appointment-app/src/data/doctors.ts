
import { Doctor } from '@/types';

export const demoDoctors: Doctor[] = [
  // Cardiology Department
  {
    id: 'doctor-1',
    name: 'Dr. Emily Chen',
    email: 'emily.chen@medcare.com',
    phone: '+1-555-0201',
    role: 'doctor',
    specialization: 'Cardiology',
    experience: 12,
    rating: 4.8,
    consultationFee: 150,
    availability: [
      {
        id: 'slot-1',
        doctorId: 'doctor-1',
        date: '2025-06-03',
        startTime: '09:00',
        endTime: '09:30',
        isBooked: false
      },
      {
        id: 'slot-2',
        doctorId: 'doctor-1',
        date: '2025-06-03',
        startTime: '10:00',
        endTime: '10:30',
        isBooked: false
      },
      {
        id: 'slot-3',
        doctorId: 'doctor-1',
        date: '2025-06-04',
        startTime: '14:00',
        endTime: '14:30',
        isBooked: false
      }
    ]
  },
  {
    id: 'doctor-13',
    name: 'Dr. Alex Johnson',
    email: 'alex.johnson@medcare.com',
    phone: '+1-555-0213',
    role: 'doctor',
    specialization: 'Cardiology',
    experience: 18,
    rating: 4.9,
    consultationFee: 200,
    availability: [
      {
        id: 'slot-26',
        doctorId: 'doctor-13',
        date: '2025-06-03',
        startTime: '11:00',
        endTime: '11:30',
        isBooked: false
      },
      {
        id: 'slot-27',
        doctorId: 'doctor-13',
        date: '2025-06-04',
        startTime: '09:00',
        endTime: '09:30',
        isBooked: false
      },
      {
        id: 'slot-28',
        doctorId: 'doctor-13',
        date: '2025-06-05',
        startTime: '15:00',
        endTime: '15:30',
        isBooked: false
      },
      {
        id: 'slot-29',
        doctorId: 'doctor-13',
        date: '2025-06-06',
        startTime: '10:00',
        endTime: '10:30',
        isBooked: false
      }
    ]
  },
  {
    id: 'doctor-14',
    name: 'Dr. Rachel Martinez',
    email: 'rachel.martinez@medcare.com',
    phone: '+1-555-0214',
    role: 'doctor',
    specialization: 'Cardiology',
    experience: 8,
    rating: 4.6,
    consultationFee: 130,
    availability: [
      {
        id: 'slot-30',
        doctorId: 'doctor-14',
        date: '2025-06-03',
        startTime: '16:00',
        endTime: '16:30',
        isBooked: false
      },
      {
        id: 'slot-31',
        doctorId: 'doctor-14',
        date: '2025-06-05',
        startTime: '14:00',
        endTime: '14:30',
        isBooked: false
      }
    ]
  },

  // Neurology Department
  {
    id: 'doctor-2',
    name: 'Dr. Michael Rodriguez',
    email: 'michael.rodriguez@medcare.com',
    phone: '+1-555-0202',
    role: 'doctor',
    specialization: 'Neurology',
    experience: 8,
    rating: 4.6,
    consultationFee: 180,
    availability: [
      {
        id: 'slot-4',
        doctorId: 'doctor-2',
        date: '2025-06-03',
        startTime: '11:00',
        endTime: '11:30',
        isBooked: false
      },
      {
        id: 'slot-5',
        doctorId: 'doctor-2',
        date: '2025-06-05',
        startTime: '15:00',
        endTime: '15:30',
        isBooked: false
      }
    ]
  },
  {
    id: 'doctor-15',
    name: 'Dr. Steven Kumar',
    email: 'steven.kumar@medcare.com',
    phone: '+1-555-0215',
    role: 'doctor',
    specialization: 'Neurology',
    experience: 15,
    rating: 4.8,
    consultationFee: 220,
    availability: [
      {
        id: 'slot-32',
        doctorId: 'doctor-15',
        date: '2025-06-03',
        startTime: '13:00',
        endTime: '13:30',
        isBooked: false
      },
      {
        id: 'slot-33',
        doctorId: 'doctor-15',
        date: '2025-06-04',
        startTime: '11:00',
        endTime: '11:30',
        isBooked: false
      },
      {
        id: 'slot-34',
        doctorId: 'doctor-15',
        date: '2025-06-05',
        startTime: '09:00',
        endTime: '09:30',
        isBooked: false
      }
    ]
  },
  {
    id: 'doctor-16',
    name: 'Dr. Patricia Walsh',
    email: 'patricia.walsh@medcare.com',
    phone: '+1-555-0216',
    role: 'doctor',
    specialization: 'Neurology',
    experience: 11,
    rating: 4.7,
    consultationFee: 195,
    availability: [
      {
        id: 'slot-35',
        doctorId: 'doctor-16',
        date: '2025-06-04',
        startTime: '15:00',
        endTime: '15:30',
        isBooked: false
      },
      {
        id: 'slot-36',
        doctorId: 'doctor-16',
        date: '2025-06-06',
        startTime: '12:00',
        endTime: '12:30',
        isBooked: false
      }
    ]
  },

  // Dermatology Department
  {
    id: 'doctor-3',
    name: 'Dr. Lisa Park',
    email: 'lisa.park@medcare.com',
    phone: '+1-555-0203',
    role: 'doctor',
    specialization: 'Dermatology',
    experience: 6,
    rating: 4.9,
    consultationFee: 120,
    availability: [
      {
        id: 'slot-6',
        doctorId: 'doctor-3',
        date: '2025-06-04',
        startTime: '09:30',
        endTime: '10:00',
        isBooked: false
      },
      {
        id: 'slot-7',
        doctorId: 'doctor-3',
        date: '2025-06-06',
        startTime: '16:00',
        endTime: '16:30',
        isBooked: false
      }
    ]
  },
  {
    id: 'doctor-17',
    name: 'Dr. Benjamin Foster',
    email: 'benjamin.foster@medcare.com',
    phone: '+1-555-0217',
    role: 'doctor',
    specialization: 'Dermatology',
    experience: 12,
    rating: 4.8,
    consultationFee: 145,
    availability: [
      {
        id: 'slot-37',
        doctorId: 'doctor-17',
        date: '2025-06-03',
        startTime: '10:00',
        endTime: '10:30',
        isBooked: false
      },
      {
        id: 'slot-38',
        doctorId: 'doctor-17',
        date: '2025-06-04',
        startTime: '13:00',
        endTime: '13:30',
        isBooked: false
      },
      {
        id: 'slot-39',
        doctorId: 'doctor-17',
        date: '2025-06-05',
        startTime: '16:00',
        endTime: '16:30',
        isBooked: false
      }
    ]
  },
  {
    id: 'doctor-18',
    name: 'Dr. Amanda Cooper',
    email: 'amanda.cooper@medcare.com',
    phone: '+1-555-0218',
    role: 'doctor',
    specialization: 'Dermatology',
    experience: 9,
    rating: 4.5,
    consultationFee: 110,
    availability: [
      {
        id: 'slot-40',
        doctorId: 'doctor-18',
        date: '2025-06-03',
        startTime: '14:00',
        endTime: '14:30',
        isBooked: false
      },
      {
        id: 'slot-41',
        doctorId: 'doctor-18',
        date: '2025-06-06',
        startTime: '11:00',
        endTime: '11:30',
        isBooked: false
      }
    ]
  },

  // Orthopedics Department
  {
    id: 'doctor-4',
    name: 'Dr. James Wilson',
    email: 'james.wilson@medcare.com',
    phone: '+1-555-0204',
    role: 'doctor',
    specialization: 'Orthopedics',
    experience: 15,
    rating: 4.7,
    consultationFee: 160,
    availability: [
      {
        id: 'slot-8',
        doctorId: 'doctor-4',
        date: '2025-06-03',
        startTime: '13:00',
        endTime: '13:30',
        isBooked: false
      },
      {
        id: 'slot-9',
        doctorId: 'doctor-4',
        date: '2025-06-05',
        startTime: '11:00',
        endTime: '11:30',
        isBooked: false
      }
    ]
  },
  {
    id: 'doctor-19',
    name: 'Dr. Christopher Lee',
    email: 'christopher.lee@medcare.com',
    phone: '+1-555-0219',
    role: 'doctor',
    specialization: 'Orthopedics',
    experience: 20,
    rating: 4.9,
    consultationFee: 210,
    availability: [
      {
        id: 'slot-42',
        doctorId: 'doctor-19',
        date: '2025-06-03',
        startTime: '09:00',
        endTime: '09:30',
        isBooked: false
      },
      {
        id: 'slot-43',
        doctorId: 'doctor-19',
        date: '2025-06-04',
        startTime: '10:00',
        endTime: '10:30',
        isBooked: false
      },
      {
        id: 'slot-44',
        doctorId: 'doctor-19',
        date: '2025-06-05',
        startTime: '14:00',
        endTime: '14:30',
        isBooked: false
      }
    ]
  },
  {
    id: 'doctor-20',
    name: 'Dr. Michelle Turner',
    email: 'michelle.turner@medcare.com',
    phone: '+1-555-0220',
    role: 'doctor',
    specialization: 'Orthopedics',
    experience: 7,
    rating: 4.4,
    consultationFee: 140,
    availability: [
      {
        id: 'slot-45',
        doctorId: 'doctor-20',
        date: '2025-06-04',
        startTime: '16:00',
        endTime: '16:30',
        isBooked: false
      },
      {
        id: 'slot-46',
        doctorId: 'doctor-20',
        date: '2025-06-06',
        startTime: '09:00',
        endTime: '09:30',
        isBooked: false
      }
    ]
  },

  // Pediatrics Department
  {
    id: 'doctor-5',
    name: 'Dr. Sarah Thompson',
    email: 'sarah.thompson@medcare.com',
    phone: '+1-555-0205',
    role: 'doctor',
    specialization: 'Pediatrics',
    experience: 10,
    rating: 4.9,
    consultationFee: 140,
    availability: [
      {
        id: 'slot-10',
        doctorId: 'doctor-5',
        date: '2025-06-04',
        startTime: '10:00',
        endTime: '10:30',
        isBooked: false
      },
      {
        id: 'slot-11',
        doctorId: 'doctor-5',
        date: '2025-06-06',
        startTime: '14:00',
        endTime: '14:30',
        isBooked: false
      }
    ]
  },
  {
    id: 'doctor-21',
    name: 'Dr. Daniel Roberts',
    email: 'daniel.roberts@medcare.com',
    phone: '+1-555-0221',
    role: 'doctor',
    specialization: 'Pediatrics',
    experience: 14,
    rating: 4.8,
    consultationFee: 155,
    availability: [
      {
        id: 'slot-47',
        doctorId: 'doctor-21',
        date: '2025-06-03',
        startTime: '15:00',
        endTime: '15:30',
        isBooked: false
      },
      {
        id: 'slot-48',
        doctorId: 'doctor-21',
        date: '2025-06-04',
        startTime: '11:00',
        endTime: '11:30',
        isBooked: false
      },
      {
        id: 'slot-49',
        doctorId: 'doctor-21',
        date: '2025-06-05',
        startTime: '10:00',
        endTime: '10:30',
        isBooked: false
      }
    ]
  },
  {
    id: 'doctor-22',
    name: 'Dr. Jessica Miller',
    email: 'jessica.miller@medcare.com',
    phone: '+1-555-0222',
    role: 'doctor',
    specialization: 'Pediatrics',
    experience: 6,
    rating: 4.6,
    consultationFee: 125,
    availability: [
      {
        id: 'slot-50',
        doctorId: 'doctor-22',
        date: '2025-06-03',
        startTime: '12:00',
        endTime: '12:30',
        isBooked: false
      },
      {
        id: 'slot-51',
        doctorId: 'doctor-22',
        date: '2025-06-06',
        startTime: '13:00',
        endTime: '13:30',
        isBooked: false
      }
    ]
  },

  // Psychiatry Department
  {
    id: 'doctor-6',
    name: 'Dr. Robert Kim',
    email: 'robert.kim@medcare.com',
    phone: '+1-555-0206',
    role: 'doctor',
    specialization: 'Psychiatry',
    experience: 14,
    rating: 4.5,
    consultationFee: 200,
    availability: [
      {
        id: 'slot-12',
        doctorId: 'doctor-6',
        date: '2025-06-03',
        startTime: '15:00',
        endTime: '15:30',
        isBooked: false
      },
      {
        id: 'slot-13',
        doctorId: 'doctor-6',
        date: '2025-06-05',
        startTime: '09:00',
        endTime: '09:30',
        isBooked: false
      }
    ]
  },
  {
    id: 'doctor-23',
    name: 'Dr. Helen Carter',
    email: 'helen.carter@medcare.com',
    phone: '+1-555-0223',
    role: 'doctor',
    specialization: 'Psychiatry',
    experience: 16,
    rating: 4.8,
    consultationFee: 225,
    availability: [
      {
        id: 'slot-52',
        doctorId: 'doctor-23',
        date: '2025-06-03',
        startTime: '10:00',
        endTime: '10:30',
        isBooked: false
      },
      {
        id: 'slot-53',
        doctorId: 'doctor-23',
        date: '2025-06-04',
        startTime: '14:00',
        endTime: '14:30',
        isBooked: false
      },
      {
        id: 'slot-54',
        doctorId: 'doctor-23',
        date: '2025-06-05',
        startTime: '16:00',
        endTime: '16:30',
        isBooked: false
      }
    ]
  },
  {
    id: 'doctor-24',
    name: 'Dr. Peter Collins',
    email: 'peter.collins@medcare.com',
    phone: '+1-555-0224',
    role: 'doctor',
    specialization: 'Psychiatry',
    experience: 9,
    rating: 4.3,
    consultationFee: 175,
    availability: [
      {
        id: 'slot-55',
        doctorId: 'doctor-24',
        date: '2025-06-04',
        startTime: '12:00',
        endTime: '12:30',
        isBooked: false
      },
      {
        id: 'slot-56',
        doctorId: 'doctor-24',
        date: '2025-06-06',
        startTime: '15:00',
        endTime: '15:30',
        isBooked: false
      }
    ]
  },

  // Gynecology Department
  {
    id: 'doctor-7',
    name: 'Dr. Maria Garcia',
    email: 'maria.garcia@medcare.com',
    phone: '+1-555-0207',
    role: 'doctor',
    specialization: 'Gynecology',
    experience: 11,
    rating: 4.8,
    consultationFee: 170,
    availability: [
      {
        id: 'slot-14',
        doctorId: 'doctor-7',
        date: '2025-06-04',
        startTime: '11:00',
        endTime: '11:30',
        isBooked: false
      },
      {
        id: 'slot-15',
        doctorId: 'doctor-7',
        date: '2025-06-06',
        startTime: '10:00',
        endTime: '10:30',
        isBooked: false
      }
    ]
  },
  {
    id: 'doctor-25',
    name: 'Dr. Nicole Adams',
    email: 'nicole.adams@medcare.com',
    phone: '+1-555-0225',
    role: 'doctor',
    specialization: 'Gynecology',
    experience: 13,
    rating: 4.9,
    consultationFee: 185,
    availability: [
      {
        id: 'slot-57',
        doctorId: 'doctor-25',
        date: '2025-06-03',
        startTime: '11:00',
        endTime: '11:30',
        isBooked: false
      },
      {
        id: 'slot-58',
        doctorId: 'doctor-25',
        date: '2025-06-04',
        startTime: '15:00',
        endTime: '15:30',
        isBooked: false
      },
      {
        id: 'slot-59',
        doctorId: 'doctor-25',
        date: '2025-06-05',
        startTime: '12:00',
        endTime: '12:30',
        isBooked: false
      }
    ]
  },
  {
    id: 'doctor-26',
    name: 'Dr. Laura Hayes',
    email: 'laura.hayes@medcare.com',
    phone: '+1-555-0226',
    role: 'doctor',
    specialization: 'Gynecology',
    experience: 8,
    rating: 4.6,
    consultationFee: 155,
    availability: [
      {
        id: 'slot-60',
        doctorId: 'doctor-26',
        date: '2025-06-03',
        startTime: '14:00',
        endTime: '14:30',
        isBooked: false
      },
      {
        id: 'slot-61',
        doctorId: 'doctor-26',
        date: '2025-06-06',
        startTime: '16:00',
        endTime: '16:30',
        isBooked: false
      }
    ]
  },

  // Ophthalmology Department
  {
    id: 'doctor-8',
    name: 'Dr. David Lee',
    email: 'david.lee@medcare.com',
    phone: '+1-555-0208',
    role: 'doctor',
    specialization: 'Ophthalmology',
    experience: 9,
    rating: 4.6,
    consultationFee: 155,
    availability: [
      {
        id: 'slot-16',
        doctorId: 'doctor-8',
        date: '2025-06-03',
        startTime: '16:00',
        endTime: '16:30',
        isBooked: false
      },
      {
        id: 'slot-17',
        doctorId: 'doctor-8',
        date: '2025-06-05',
        startTime: '13:00',
        endTime: '13:30',
        isBooked: false
      }
    ]
  },
  {
    id: 'doctor-27',
    name: 'Dr. Kevin Wright',
    email: 'kevin.wright@medcare.com',
    phone: '+1-555-0227',
    role: 'doctor',
    specialization: 'Ophthalmology',
    experience: 17,
    rating: 4.9,
    consultationFee: 190,
    availability: [
      {
        id: 'slot-62',
        doctorId: 'doctor-27',
        date: '2025-06-03',
        startTime: '09:00',
        endTime: '09:30',
        isBooked: false
      },
      {
        id: 'slot-63',
        doctorId: 'doctor-27',
        date: '2025-06-04',
        startTime: '12:00',
        endTime: '12:30',
        isBooked: false
      },
      {
        id: 'slot-64',
        doctorId: 'doctor-27',
        date: '2025-06-05',
        startTime: '15:00',
        endTime: '15:30',
        isBooked: false
      }
    ]
  },
  {
    id: 'doctor-28',
    name: 'Dr. Sandra Bell',
    email: 'sandra.bell@medcare.com',
    phone: '+1-555-0228',
    role: 'doctor',
    specialization: 'Ophthalmology',
    experience: 12,
    rating: 4.7,
    consultationFee: 165,
    availability: [
      {
        id: 'slot-65',
        doctorId: 'doctor-28',
        date: '2025-06-04',
        startTime: '09:00',
        endTime: '09:30',
        isBooked: false
      },
      {
        id: 'slot-66',
        doctorId: 'doctor-28',
        date: '2025-06-06',
        startTime: '14:00',
        endTime: '14:30',
        isBooked: false
      }
    ]
  },

  // Endocrinology Department
  {
    id: 'doctor-9',
    name: 'Dr. Anna Williams',
    email: 'anna.williams@medcare.com',
    phone: '+1-555-0209',
    role: 'doctor',
    specialization: 'Endocrinology',
    experience: 13,
    rating: 4.7,
    consultationFee: 175,
    availability: [
      {
        id: 'slot-18',
        doctorId: 'doctor-9',
        date: '2025-06-04',
        startTime: '15:00',
        endTime: '15:30',
        isBooked: false
      },
      {
        id: 'slot-19',
        doctorId: 'doctor-9',
        date: '2025-06-06',
        startTime: '11:00',
        endTime: '11:30',
        isBooked: false
      }
    ]
  },
  {
    id: 'doctor-29',
    name: 'Dr. Richard Green',
    email: 'richard.green@medcare.com',
    phone: '+1-555-0229',
    role: 'doctor',
    specialization: 'Endocrinology',
    experience: 19,
    rating: 4.8,
    consultationFee: 205,
    availability: [
      {
        id: 'slot-67',
        doctorId: 'doctor-29',
        date: '2025-06-03',
        startTime: '12:00',
        endTime: '12:30',
        isBooked: false
      },
      {
        id: 'slot-68',
        doctorId: 'doctor-29',
        date: '2025-06-04',
        startTime: '16:00',
        endTime: '16:30',
        isBooked: false
      },
      {
        id: 'slot-69',
        doctorId: 'doctor-29',
        date: '2025-06-05',
        startTime: '11:00',
        endTime: '11:30',
        isBooked: false
      }
    ]
  },
  {
    id: 'doctor-30',
    name: 'Dr. Karen Phillips',
    email: 'karen.phillips@medcare.com',
    phone: '+1-555-0230',
    role: 'doctor',
    specialization: 'Endocrinology',
    experience: 10,
    rating: 4.5,
    consultationFee: 160,
    availability: [
      {
        id: 'slot-70',
        doctorId: 'doctor-30',
        date: '2025-06-03',
        startTime: '15:00',
        endTime: '15:30',
        isBooked: false
      },
      {
        id: 'slot-71',
        doctorId: 'doctor-30',
        date: '2025-06-06',
        startTime: '12:00',
        endTime: '12:30',
        isBooked: false
      }
    ]
  },

  // Urology Department
  {
    id: 'doctor-10',
    name: 'Dr. Thomas Brown',
    email: 'thomas.brown@medcare.com',
    phone: '+1-555-0210',
    role: 'doctor',
    specialization: 'Urology',
    experience: 16,
    rating: 4.8,
    consultationFee: 185,
    availability: [
      {
        id: 'slot-20',
        doctorId: 'doctor-10',
        date: '2025-06-03',
        startTime: '12:00',
        endTime: '12:30',
        isBooked: false
      },
      {
        id: 'slot-21',
        doctorId: 'doctor-10',
        date: '2025-06-05',
        startTime: '16:00',
        endTime: '16:30',
        isBooked: false
      }
    ]
  },
  {
    id: 'doctor-31',
    name: 'Dr. Gregory Stone',
    email: 'gregory.stone@medcare.com',
    phone: '+1-555-0231',
    role: 'doctor',
    specialization: 'Urology',
    experience: 21,
    rating: 4.9,
    consultationFee: 215,
    availability: [
      {
        id: 'slot-72',
        doctorId: 'doctor-31',
        date: '2025-06-03',
        startTime: '10:00',
        endTime: '10:30',
        isBooked: false
      },
      {
        id: 'slot-73',
        doctorId: 'doctor-31',
        date: '2025-06-04',
        startTime: '13:00',
        endTime: '13:30',
        isBooked: false
      },
      {
        id: 'slot-74',
        doctorId: 'doctor-31',
        date: '2025-06-06',
        startTime: '10:00',
        endTime: '10:30',
        isBooked: false
      }
    ]
  },
  {
    id: 'doctor-32',
    name: 'Dr. Brian Murphy',
    email: 'brian.murphy@medcare.com',
    phone: '+1-555-0232',
    role: 'doctor',
    specialization: 'Urology',
    experience: 11,
    rating: 4.6,
    consultationFee: 170,
    availability: [
      {
        id: 'slot-75',
        doctorId: 'doctor-32',
        date: '2025-06-04',
        startTime: '14:00',
        endTime: '14:30',
        isBooked: false
      },
      {
        id: 'slot-76',
        doctorId: 'doctor-32',
        date: '2025-06-05',
        startTime: '13:00',
        endTime: '13:30',
        isBooked: false
      }
    ]
  },

  // Oncology Department
  {
    id: 'doctor-11',
    name: 'Dr. Jennifer Davis',
    email: 'jennifer.davis@medcare.com',
    phone: '+1-555-0211',
    role: 'doctor',
    specialization: 'Oncology',
    experience: 18,
    rating: 4.9,
    consultationFee: 220,
    availability: [
      {
        id: 'slot-22',
        doctorId: 'doctor-11',
        date: '2025-06-04',
        startTime: '13:00',
        endTime: '13:30',
        isBooked: false
      },
      {
        id: 'slot-23',
        doctorId: 'doctor-11',
        date: '2025-06-06',
        startTime: '15:00',
        endTime: '15:30',
        isBooked: false
      }
    ]
  },
  {
    id: 'doctor-33',
    name: 'Dr. Matthew Clark',
    email: 'matthew.clark@medcare.com',
    phone: '+1-555-0233',
    role: 'doctor',
    specialization: 'Oncology',
    experience: 22,
    rating: 4.9,
    consultationFee: 250,
    availability: [
      {
        id: 'slot-77',
        doctorId: 'doctor-33',
        date: '2025-06-03',
        startTime: '14:00',
        endTime: '14:30',
        isBooked: false
      },
      {
        id: 'slot-78',
        doctorId: 'doctor-33',
        date: '2025-06-04',
        startTime: '11:00',
        endTime: '11:30',
        isBooked: false
      },
      {
        id: 'slot-79',
        doctorId: 'doctor-33',
        date: '2025-06-05',
        startTime: '14:00',
        endTime: '14:30',
        isBooked: false
      }
    ]
  },
  {
    id: 'doctor-34',
    name: 'Dr. Stephanie Ross',
    email: 'stephanie.ross@medcare.com',
    phone: '+1-555-0234',
    role: 'doctor',
    specialization: 'Oncology',
    experience: 15,
    rating: 4.7,
    consultationFee: 195,
    availability: [
      {
        id: 'slot-80',
        doctorId: 'doctor-34',
        date: '2025-06-03',
        startTime: '16:00',
        endTime: '16:30',
        isBooked: false
      },
      {
        id: 'slot-81',
        doctorId: 'doctor-34',
        date: '2025-06-06',
        startTime: '11:00',
        endTime: '11:30',
        isBooked: false
      }
    ]
  },

  // Radiology Department
  {
    id: 'doctor-12',
    name: 'Dr. Mark Anderson',
    email: 'mark.anderson@medcare.com',
    phone: '+1-555-0212',
    role: 'doctor',
    specialization: 'Radiology',
    experience: 12,
    rating: 4.6,
    consultationFee: 165,
    availability: [
      {
        id: 'slot-24',
        doctorId: 'doctor-12',
        date: '2025-06-03',
        startTime: '14:00',
        endTime: '14:30',
        isBooked: false
      },
      {
        id: 'slot-25',
        doctorId: 'doctor-12',
        date: '2025-06-05',
        startTime: '12:00',
        endTime: '12:30',
        isBooked: false
      }
    ]
  },
  {
    id: 'doctor-35',
    name: 'Dr. Andrew Scott',
    email: 'andrew.scott@medcare.com',
    phone: '+1-555-0235',
    role: 'doctor',
    specialization: 'Radiology',
    experience: 16,
    rating: 4.8,
    consultationFee: 180,
    availability: [
      {
        id: 'slot-82',
        doctorId: 'doctor-35',
        date: '2025-06-03',
        startTime: '11:00',
        endTime: '11:30',
        isBooked: false
      },
      {
        id: 'slot-83',
        doctorId: 'doctor-35',
        date: '2025-06-04',
        startTime: '15:00',
        endTime: '15:30',
        isBooked: false
      },
      {
        id: 'slot-84',
        doctorId: 'doctor-35',
        date: '2025-06-06',
        startTime: '09:00',
        endTime: '09:30',
        isBooked: false
      }
    ]
  },
  {
    id: 'doctor-36',
    name: 'Dr. Catherine Young',
    email: 'catherine.young@medcare.com',
    phone: '+1-555-0236',
    role: 'doctor',
    specialization: 'Radiology',
    experience: 9,
    rating: 4.4,
    consultationFee: 150,
    availability: [
      {
        id: 'slot-85',
        doctorId: 'doctor-36',
        date: '2025-06-04',
        startTime: '12:00',
        endTime: '12:30',
        isBooked: false
      },
      {
        id: 'slot-86',
        doctorId: 'doctor-36',
        date: '2025-06-05',
        startTime: '16:00',
        endTime: '16:30',
        isBooked: false
      }
    ]
  }
];

export const currentDoctor = demoDoctors[0];
