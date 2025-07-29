// import axios from 'axios';
// import React, { useState, useEffect } from 'react';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Badge } from '@/components/ui/badge';
// import { Search, Star, Calendar, Clock, DollarSign } from 'lucide-react';
// import { useToast } from '@/hooks/use-toast';

// const DoctorSearch = () => {
//   const [doctors, setDoctors] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedDoctor, setSelectedDoctor] = useState(null);
//   const [selectedSlot, setSelectedSlot] = useState(null);
//   const [selectedSpecialization, setSelectedSpecialization] = useState('All');
//   const { toast } = useToast();

//   // Fetch doctors from backend
//   useEffect(() => {
//     const fetchDoctors = async () => {
//       try {
//         const res = await axios.get('http://localhost:3000/api/patientDashboard/findDoctors');
//         setDoctors(res.data);
//       } catch (error) {
//         setDoctors([]);
//       }
//     };
//     fetchDoctors();
//   }, []);

//   // Get all unique specializations from fetched doctors
//   const specializations = ['All', ...Array.from(new Set(doctors.map(doc => doc.specialization)))];

//   // Filter doctors by search and specialization
//   const filteredDoctors = doctors.filter(doctor => {
//     const matchesSearch =
//       doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesSpecialization =
//       selectedSpecialization === 'All' || doctor.specialization === selectedSpecialization;
//     return matchesSearch && matchesSpecialization;
//   });

//   const handleBookAppointment = () => {
//     if (selectedDoctor && selectedSlot) {
//       toast({
//         title: "Appointment Booked!",
//         description: `Your appointment with ${selectedDoctor.name} has been scheduled for ${selectedSlot.date} at ${selectedSlot.startTime}.`,
//       });
//       setSelectedDoctor(null);
//       setSelectedSlot(null);
//     }
//   };

//   const getAvailableSlots = (doctor) => {
//     return Array.isArray(doctor.availability)
//       ? doctor.availability.filter(slot => !slot.isBooked)
//       : [];
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h2 className="text-2xl font-bold text-gray-900">Find Doctors</h2>
//       </div>

//       <div className="space-y-4">
//         <div className="relative">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//           <Input
//             placeholder="Search by doctor name or specialization..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="pl-10"
//           />
//         </div>

//         <div className="space-y-3">
//           <h3 className="text-sm font-medium text-gray-700">Filter by Specialization</h3>
//           <div className="flex flex-wrap gap-2">
//             {specializations.map((specialization) => (
//               <Button
//                 key={specialization}
//                 variant={selectedSpecialization === specialization ? 'default' : 'outline'}
//                 size="sm"
//                 onClick={() => setSelectedSpecialization(specialization)}
//                 className="text-xs"
//               >
//                 {specialization}
//               </Button>
//             ))}
//           </div>
//         </div>
//       </div>

//       {selectedDoctor ? (
//         <Card>
//           <CardHeader>
//             <div className="flex items-center justify-between">
//               <div>
//                 <CardTitle className="text-xl">{selectedDoctor.name}</CardTitle>
//                 <CardDescription>{selectedDoctor.specialization}</CardDescription>
//               </div>
//               <Button variant="outline" onClick={() => setSelectedDoctor(null)}>
//                 Back to Search
//               </Button>
//             </div>
//           </CardHeader>
//           <CardContent className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div className="flex items-center space-x-2">
//                 <Star className="w-4 h-4 text-yellow-500" />
//                 <span className="text-sm">{selectedDoctor.rating} rating</span>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <Calendar className="w-4 h-4 text-blue-500" />
//                 <span className="text-sm">{selectedDoctor.experience} years experience</span>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <DollarSign className="w-4 h-4 text-green-500" />
//                 <span className="text-sm">${selectedDoctor.consultationFee} consultation</span>
//               </div>
//             </div>

//             <div>
//               <h4 className="font-medium text-gray-900 mb-3">Available Time Slots</h4>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
//                 {getAvailableSlots(selectedDoctor).map((slot) => (
//                   <Card
//                     key={slot.id}
//                     className={`cursor-pointer transition-colors ${
//                       selectedSlot?.id === slot.id
//                         ? 'border-blue-500 bg-blue-50'
//                         : 'hover:border-gray-300'
//                     }`}
//                     onClick={() => setSelectedSlot(slot)}
//                   >
//                     <CardContent className="p-4">
//                       <div className="text-center">
//                         <div className="font-medium">{new Date(slot.date).toLocaleDateString()}</div>
//                         <div className="text-sm text-gray-600 flex items-center justify-center mt-1">
//                           <Clock className="w-3 h-3 mr-1" />
//                           {slot.startTime} - {slot.endTime}
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//               {getAvailableSlots(selectedDoctor).length === 0 && (
//                 <p className="text-gray-500 text-center py-4">No available slots at the moment.</p>
//               )}
//             </div>

//             {selectedSlot && (
//               <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//                 <h4 className="font-medium text-blue-900 mb-2">Booking Summary</h4>
//                 <div className="space-y-1 text-sm text-blue-800">
//                   <p>Doctor: {selectedDoctor.name}</p>
//                   <p>Specialization: {selectedDoctor.specialization}</p>
//                   <p>Date: {new Date(selectedSlot.date).toLocaleDateString()}</p>
//                   <p>Time: {selectedSlot.startTime} - {selectedSlot.endTime}</p>
//                   <p>Fee: ${selectedDoctor.consultationFee}</p>
//                 </div>
//                 <Button className="w-full mt-4" onClick={handleBookAppointment}>
//                   Confirm Booking
//                 </Button>
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       ) : (
//         <div className="grid gap-4">
//           {filteredDoctors.map((doctor) => (
//             <Card key={doctor.id} className="hover:shadow-md transition-shadow cursor-pointer">
//               <CardHeader>
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <CardTitle className="text-lg">{doctor.name}</CardTitle>
//                     <CardDescription>{doctor.specialization}</CardDescription>
//                   </div>
//                   <div className="text-right">
//                     <div className="flex items-center space-x-1 mb-1">
//                       <Star className="w-4 h-4 text-yellow-500 fill-current" />
//                       <span className="text-sm font-medium">{doctor.rating}</span>
//                     </div>
//                     <Badge variant="secondary">${doctor.consultationFee}</Badge>
//                   </div>
//                 </div>
//               </CardHeader>
//               <CardContent>
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-4 text-sm text-gray-600">
//                     <span>{doctor.experience} years experience</span>
//                     <span>•</span>
//                     <span>{getAvailableSlots(doctor).length} slots available</span>
//                   </div>
//                   <Button onClick={() => setSelectedDoctor(doctor)}>
//                     View Schedule
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       )}

//       {filteredDoctors.length === 0 && (searchQuery || selectedSpecialization !== 'All') && (
//         <Card>
//           <CardContent className="flex flex-col items-center justify-center py-12">
//             <Search className="w-12 h-12 text-gray-400 mb-4" />
//             <h3 className="text-lg font-medium text-gray-900 mb-2">No doctors found</h3>
//             <p className="text-gray-500 text-center">Try adjusting your search or filter criteria.</p>
//           </CardContent>
//         </Card>
//       )}
//     </div>
//   );
// };

// export default DoctorSearch;


import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Star, Calendar, Clock, DollarSign } from 'lucide-react';
import { demoDoctors, type Doctor, type AvailabilitySlot } from '@/data/demoData';
import { useToast } from '@/hooks/use-toast';
import { getCurrentUser } from "@/data/auth"; // 

const DoctorSearch = () => {
  const currentUser = getCurrentUser(); // 
  const [doctors, setDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<AvailabilitySlot | null>(null);
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>('All');
  const { toast } = useToast();
  // Fetch doctors from backend
   useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/patientDashboard/findDoctors');
        setDoctors(res.data);
      } catch (error) {
        setDoctors([]);
      }
    };
    fetchDoctors();
  }, []);

  // Get all unique specializations from fetched doctors
  const specializations = ['All', ...new Set(doctors.map(doc => doc.specialization))];

  // Filter doctors by search and specialization
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialization =
      selectedSpecialization === 'All' || doctor.specialization === selectedSpecialization;
    return matchesSearch && matchesSpecialization;
  });


  // const filteredDoctors = demoDoctors.filter(doctor => {
  //   const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase());
    
  //   const matchesSpecialization = selectedSpecialization === 'All' || 
  //     doctor.specialization === selectedSpecialization;
    
  //   return matchesSearch && matchesSpecialization;
  // });

  const handleBookAppointment = async () => {
    if (selectedDoctor && selectedSlot && currentUser?.id) {
      try {
        await axios.put("http://localhost:3000/api/patientDashboard/findDoctors", {
          slot_id: selectedSlot.id,
          patient_id: currentUser.id,
          // Optionally add symptoms/notes here
        });
        toast({
          title: "Appointment Booked!",
          description: `Your appointment with ${selectedDoctor.name} has been scheduled for ${selectedSlot.date} at ${selectedSlot.startTime}.`,
        });
        setSelectedDoctor(null);
        setSelectedSlot(null);
      } catch (error: any) {
        console.log(error);
        toast({
          title: "Booking Failed",
          description: error?.response?.data?.error || "Could not book the slot.",
          variant: "destructive",
        });
      }
    }
  };

  // const handleBookAppointment = () => {
  //   if (selectedDoctor && selectedSlot) {
  //     toast({
  //       title: "Appointment Booked!",
  //       description: `Your appointment with ${selectedDoctor.name} has been scheduled for ${selectedSlot.date} at ${selectedSlot.startTime}.`,
  //     });
  //     setSelectedDoctor(null);
  //     setSelectedSlot(null);
  //   }
  // };

  const getAvailableSlots = (doctor: Doctor) => {
    return doctor.availability.filter(slot => !slot.isBooked);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Find Doctors</h2>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search by doctor name or specialization..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-700">Filter by Specialization</h3>
          <div className="flex flex-wrap gap-2">
            {specializations.map((specialization) => (
              <Button
                key={specialization}
                variant={selectedSpecialization === specialization ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedSpecialization(specialization)}
                className="text-xs"
              >
                {specialization}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {selectedDoctor ? (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">{selectedDoctor.name}</CardTitle>
                <CardDescription>{selectedDoctor.specialization}</CardDescription>
              </div>
              <Button variant="outline" onClick={() => setSelectedDoctor(null)}>
                Back to Search
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="text-sm">{selectedDoctor.rating} rating</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-blue-500" />
                <span className="text-sm">{selectedDoctor.experience} years experience</span>
              </div>
              <div className="flex items-center space-x-2">
                <DollarSign className="w-4 h-4 text-green-500" />
                <span className="text-sm">${selectedDoctor.consultationFee} consultation</span>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-3">Available Time Slots</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {getAvailableSlots(selectedDoctor).map((slot) => (
                  <Card
                    key={slot.id}
                    className={`cursor-pointer transition-colors ${
                      selectedSlot?.id === slot.id
                        ? 'border-blue-500 bg-blue-150'
                        : 'hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedSlot(slot)}
                  >
                    <CardContent className="p-4">
                      <div className="text-center">
                        <div className="font-medium">{new Date(slot.date).toLocaleDateString()}</div>
                        <div className="text-sm text-gray-600 flex items-center justify-center mt-1">
                          <Clock className="w-3 h-3 mr-1" />
                          {slot.startTime} - {slot.endTime}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              {getAvailableSlots(selectedDoctor).length === 0 && (
                <p className="text-gray-500 text-center py-4">No available slots at the moment.</p>
              )}
            </div>

            {selectedSlot && (
              <div className="bg-blue-150 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Booking Summary</h4>
                <div className="space-y-1 text-sm text-blue-800">
                  <p>Doctor: {selectedDoctor.name}</p>
                  <p>Specialization: {selectedDoctor.specialization}</p>
                  <p>Date: {new Date(selectedSlot.date).toLocaleDateString()}</p>
                  <p>Time: {selectedSlot.startTime} - {selectedSlot.endTime}</p>
                  <p>Fee: ${selectedDoctor.consultationFee}</p>
                </div>
                <Button className="w-full mt-4" onClick={handleBookAppointment}>
                  Confirm Booking
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredDoctors.map((doctor) => (
            <Card key={doctor.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{doctor.name}</CardTitle>
                    <CardDescription>{doctor.specialization}</CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 mb-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{doctor.rating}</span>
                    </div>
                    <Badge variant="secondary">${doctor.consultationFee}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>{doctor.experience} years experience</span>
                    <span>•</span>
                    <span>{getAvailableSlots(doctor).length} slots available</span>
                  </div>
                  <Button onClick={() => setSelectedDoctor(doctor)}>
                    View Schedule
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {filteredDoctors.length === 0 && (searchQuery || selectedSpecialization !== 'All') && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Search className="w-12 h-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No doctors found</h3>
            <p className="text-gray-500 text-center">Try adjusting your search or filter criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DoctorSearch;
