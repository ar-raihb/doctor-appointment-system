import React, {useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar, Clock, User, Plus, Trash2 } from 'lucide-react';
import { getCurrentUser } from '@/data/auth';
import { demoAppointments, demoPatients, currentDoctor } from '@/data/demoData';
import { useToast } from '@/hooks/use-toast';
import PatientHistoryModal from './PatientHistoryModal';
import axios from 'axios';

const DoctorAppointments = () => {
  //
  const [appointments, setAppointments] = useState<any[]>([]);
  const currentUser = getCurrentUser();
  const { toast } = useToast();
  useEffect(() => {
    const fetchAppointments = async () => {
      if (!currentUser?.id) return;
      try {
        const res = await fetch(
          `http://localhost:3000/api/doctorDashboard/patientAppointments?doctor_id=${currentUser.id}`
        );
        const data = await res.json();
        setAppointments(data);
      } catch {
        setAppointments([]);
      }
    };
    fetchAppointments();
  }, [currentUser?.id]);
  
  //

  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [showPrescriptionDialog, setShowPrescriptionDialog] = useState(false);
  const [showPatientHistoryModal, setShowPatientHistoryModal] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [selectedPatientName, setSelectedPatientName] = useState<string | null>(null);
  const [prescriptionData, setPrescriptionData] = useState({
    diagnosis: '',
    medications: [{ name: '', dosage: '', frequency: '', duration: '' }],
    instructions: ''
  });
  // const { toast } = useToast();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPatientInfo = (patientId: string) => {
    return demoPatients.find(patient => patient.id === patientId);
  };

const handleConfirmAppointment = async (appointmentId: string) => {
  try {
    await axios.put("http://localhost:3000/api/doctorDashboard/patientAppointments", {
      id: appointmentId,
      status: "confirmed",
    });
    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === appointmentId ? { ...apt, status: "confirmed" } : apt
      )
    );
    toast({
      title: "Appointment Confirmed",
      description: "The appointment has been confirmed successfully.",
      variant: "destructive",
    });
  } catch {
    toast({
      title: "Error",
      description: "Failed to confirm appointment.",
      variant: "destructive",
    });
  }
};
  const handleViewPatientHistory = (patientId: string) => {
    const patient = getPatientInfo(patientId);
    setSelectedPatientId(patientId);
    setSelectedPatientName(patient?.name || null);
    setShowPatientHistoryModal(true);
  };

  const handleAddMedication = () => {
    setPrescriptionData(prev => ({
      ...prev,
      medications: [...prev.medications, { name: '', dosage: '', frequency: '', duration: '' }]
    }));
  };

  const handleRemoveMedication = (index: number) => {
    setPrescriptionData(prev => ({
      ...prev,
      medications: prev.medications.filter((_, i) => i !== index)
    }));
  };

  const handleMedicationChange = (index: number, field: string, value: string) => {
    setPrescriptionData(prev => ({
      ...prev,
      medications: prev.medications.map((med, i) => 
        i === index ? { ...med, [field]: value } : med
      )
    }));
  };

  const handleSendPrescription = () => {
    toast({
      title: "Prescription Sent",
      description: "The prescription has been sent to the patient successfully.",
    });
    setShowPrescriptionDialog(false);
    setPrescriptionData({
      diagnosis: '',
      medications: [{ name: '', dosage: '', frequency: '', duration: '' }],
      instructions: ''
    });
  };

  if (appointments.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Calendar className="w-12 h-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments scheduled</h3>
          <p className="text-gray-500 text-center">You don't have any appointments with patients yet.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Patient Appointments</h2>
      </div>

      <div className="grid gap-4">
        {appointments.map((appointment) => {
          const patient = getPatientInfo(appointment.patient_id);
          return (
            <Card key={appointment.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{appointment.patient_first_name} {appointment.patient_last_name}</CardTitle>
                      <CardDescription>
                        {appointment.patient_age} years old • {appointment.patient_gender} • {appointment.patient_blood_group}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge className={getStatusColor(appointment.status)}>
                    {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(appointment.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{appointment.start_time + " - " + appointment.end_time}</span>
                  </div>
                </div>

                {appointment.symptoms && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-600">
                      <strong>Patient Symptoms:</strong> {appointment.symptoms}
                    </p>
                  </div>
                )}

                {appointment.notes && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-600">
                      <strong>Notes:</strong> {appointment.notes}
                    </p>
                  </div>
                )}

                <div className="flex justify-end space-x-2">
                  {appointment.status === 'pending' && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleConfirmAppointment(appointment.id)}
                    >
                      Confirm
                    </Button>
                  )}
                  {(appointment.status === 'confirmed' || appointment.status === 'completed') && (
                    <Button 
                      size="sm"
                      // onClick={() => {
                      //   setSelectedAppointment(appointment);
                      //   setShowPrescriptionDialog(true);
                      // }}
                    >
                      Send Prescription
                    </Button>
                  )}
                  <Button 
                    variant="outline" 
                    size="sm"
                    // onClick={() => handleViewPatientHistory(appointment.patientId)}
                  >
                    View Patient History
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Dialog open={showPrescriptionDialog} onOpenChange={setShowPrescriptionDialog}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create Prescription</DialogTitle>
            <DialogDescription>
              Create a prescription for {getPatientInfo(selectedAppointment?.patientId)?.name}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div>
              <Label htmlFor="diagnosis">Diagnosis</Label>
              <Textarea
                id="diagnosis"
                placeholder="Enter diagnosis..."
                value={prescriptionData.diagnosis}
                onChange={(e) => setPrescriptionData(prev => ({ ...prev, diagnosis: e.target.value }))}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <Label>Medications</Label>
                <Button type="button" variant="outline" size="sm" onClick={handleAddMedication}>
                  <Plus className="w-4 h-4 mr-1" />
                  Add Medication
                </Button>
              </div>
              
              <div className="space-y-4">
                {prescriptionData.medications.map((medication, index) => (
                  <Card key={index}>
                    <CardContent className="pt-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium">Medication {index + 1}</h4>
                        {prescriptionData.medications.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => handleRemoveMedication(index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label>Medication Name</Label>
                          <Input
                            placeholder="e.g., Paracetamol"
                            value={medication.name}
                            onChange={(e) => handleMedicationChange(index, 'name', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label>Dosage</Label>
                          <Input
                            placeholder="e.g., 500mg"
                            value={medication.dosage}
                            onChange={(e) => handleMedicationChange(index, 'dosage', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label>Frequency</Label>
                          <Input
                            placeholder="e.g., Twice daily"
                            value={medication.frequency}
                            onChange={(e) => handleMedicationChange(index, 'frequency', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label>Duration</Label>
                          <Input
                            placeholder="e.g., 7 days"
                            value={medication.duration}
                            onChange={(e) => handleMedicationChange(index, 'duration', e.target.value)}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="instructions">Instructions</Label>
              <Textarea
                id="instructions"
                placeholder="Enter special instructions for the patient..."
                value={prescriptionData.instructions}
                onChange={(e) => setPrescriptionData(prev => ({ ...prev, instructions: e.target.value }))}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPrescriptionDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSendPrescription}>
              Send Prescription
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <PatientHistoryModal
        open={showPatientHistoryModal}
        onOpenChange={setShowPatientHistoryModal}
        patientId={selectedPatientId}
        patientName={selectedPatientName}
      />
    </div>
  );
};

export default DoctorAppointments;




// import React, { useState } from 'react';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';
// import { Textarea } from '@/components/ui/textarea';
// import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Calendar, Clock, User, Plus, Trash2 } from 'lucide-react';
// import { demoAppointments, demoPatients, currentDoctor } from '@/data/demoData';
// import { useToast } from '@/hooks/use-toast';
// import PatientHistoryModal from './PatientHistoryModal';

// const DoctorAppointments = () => {
//   const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
//   const [showPrescriptionDialog, setShowPrescriptionDialog] = useState(false);
//   const [showPatientHistoryModal, setShowPatientHistoryModal] = useState(false);
//   const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
//   const [selectedPatientName, setSelectedPatientName] = useState<string | null>(null);
//   const [prescriptionData, setPrescriptionData] = useState({
//     diagnosis: '',
//     medications: [{ name: '', dosage: '', frequency: '', duration: '' }],
//     instructions: ''
//   });
//   const { toast } = useToast();

//   const doctorAppointments = demoAppointments.filter(
//     appointment => appointment.doctorId === currentDoctor.id
//   );

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'confirmed': return 'bg-blue-100 text-blue-800';
//       case 'completed': return 'bg-green-100 text-green-800';
//       case 'pending': return 'bg-yellow-100 text-yellow-800';
//       case 'cancelled': return 'bg-red-100 text-red-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const getPatientInfo = (patientId: string) => {
//     return demoPatients.find(patient => patient.id === patientId);
//   };

//   const handleConfirmAppointment = (appointmentId: string) => {
//     toast({
//       title: "Appointment Confirmed",
//       description: "The appointment has been confirmed successfully.",
//     });
//   };

//   const handleViewPatientHistory = (patientId: string) => {
//     const patient = getPatientInfo(patientId);
//     setSelectedPatientId(patientId);
//     setSelectedPatientName(patient?.name || null);
//     setShowPatientHistoryModal(true);
//   };

//   const handleAddMedication = () => {
//     setPrescriptionData(prev => ({
//       ...prev,
//       medications: [...prev.medications, { name: '', dosage: '', frequency: '', duration: '' }]
//     }));
//   };

//   const handleRemoveMedication = (index: number) => {
//     setPrescriptionData(prev => ({
//       ...prev,
//       medications: prev.medications.filter((_, i) => i !== index)
//     }));
//   };

//   const handleMedicationChange = (index: number, field: string, value: string) => {
//     setPrescriptionData(prev => ({
//       ...prev,
//       medications: prev.medications.map((med, i) => 
//         i === index ? { ...med, [field]: value } : med
//       )
//     }));
//   };

//   const handleSendPrescription = () => {
//     toast({
//       title: "Prescription Sent",
//       description: "The prescription has been sent to the patient successfully.",
//     });
//     setShowPrescriptionDialog(false);
//     setPrescriptionData({
//       diagnosis: '',
//       medications: [{ name: '', dosage: '', frequency: '', duration: '' }],
//       instructions: ''
//     });
//   };

//   if (doctorAppointments.length === 0) {
//     return (
//       <Card>
//         <CardContent className="flex flex-col items-center justify-center py-12">
//           <Calendar className="w-12 h-12 text-gray-400 mb-4" />
//           <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments scheduled</h3>
//           <p className="text-gray-500 text-center">You don't have any appointments with patients yet.</p>
//         </CardContent>
//       </Card>
//     );
//   }

//   return (
//     <div className="space-y-4">
//       <div className="flex items-center justify-between">
//         <h2 className="text-2xl font-bold text-gray-900">Patient Appointments</h2>
//       </div>

//       <div className="grid gap-4">
//         {doctorAppointments.map((appointment) => {
//           const patient = getPatientInfo(appointment.patientId);
//           return (
//             <Card key={appointment.id} className="hover:shadow-md transition-shadow">
//               <CardHeader>
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-3">
//                     <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
//                       <User className="w-5 h-5 text-blue-600" />
//                     </div>
//                     <div>
//                       <CardTitle className="text-lg">{patient?.name}</CardTitle>
//                       <CardDescription>
//                         {patient?.age} years old • {patient?.gender} • {patient?.bloodGroup}
//                       </CardDescription>
//                     </div>
//                   </div>
//                   <Badge className={getStatusColor(appointment.status)}>
//                     {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
//                   </Badge>
//                 </div>
//               </CardHeader>
//               <CardContent>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                   <div className="flex items-center space-x-2 text-sm text-gray-600">
//                     <Calendar className="w-4 h-4" />
//                     <span>{new Date(appointment.date).toLocaleDateString()}</span>
//                   </div>
//                   <div className="flex items-center space-x-2 text-sm text-gray-600">
//                     <Clock className="w-4 h-4" />
//                     <span>{appointment.time}</span>
//                   </div>
//                 </div>

//                 {appointment.symptoms && (
//                   <div className="mb-4">
//                     <p className="text-sm text-gray-600">
//                       <strong>Patient Symptoms:</strong> {appointment.symptoms}
//                     </p>
//                   </div>
//                 )}

//                 {appointment.notes && (
//                   <div className="mb-4">
//                     <p className="text-sm text-gray-600">
//                       <strong>Notes:</strong> {appointment.notes}
//                     </p>
//                   </div>
//                 )}

//                 <div className="flex justify-end space-x-2">
//                   {appointment.status === 'pending' && (
//                     <Button 
//                       variant="outline" 
//                       size="sm"
//                       onClick={() => handleConfirmAppointment(appointment.id)}
//                     >
//                       Confirm
//                     </Button>
//                   )}
//                   {(appointment.status === 'confirmed' || appointment.status === 'completed') && (
//                     <Button 
//                       size="sm"
//                       onClick={() => {
//                         setSelectedAppointment(appointment);
//                         setShowPrescriptionDialog(true);
//                       }}
//                     >
//                       Send Prescription
//                     </Button>
//                   )}
//                   <Button 
//                     variant="outline" 
//                     size="sm"
//                     onClick={() => handleViewPatientHistory(appointment.patientId)}
//                   >
//                     View Patient History
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           );
//         })}
//       </div>

//       <Dialog open={showPrescriptionDialog} onOpenChange={setShowPrescriptionDialog}>
//         <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
//           <DialogHeader>
//             <DialogTitle>Create Prescription</DialogTitle>
//             <DialogDescription>
//               Create a prescription for {getPatientInfo(selectedAppointment?.patientId)?.name}
//             </DialogDescription>
//           </DialogHeader>

//           <div className="space-y-6">
//             <div>
//               <Label htmlFor="diagnosis">Diagnosis</Label>
//               <Textarea
//                 id="diagnosis"
//                 placeholder="Enter diagnosis..."
//                 value={prescriptionData.diagnosis}
//                 onChange={(e) => setPrescriptionData(prev => ({ ...prev, diagnosis: e.target.value }))}
//               />
//             </div>

//             <div>
//               <div className="flex items-center justify-between mb-3">
//                 <Label>Medications</Label>
//                 <Button type="button" variant="outline" size="sm" onClick={handleAddMedication}>
//                   <Plus className="w-4 h-4 mr-1" />
//                   Add Medication
//                 </Button>
//               </div>
              
//               <div className="space-y-4">
//                 {prescriptionData.medications.map((medication, index) => (
//                   <Card key={index}>
//                     <CardContent className="pt-4">
//                       <div className="flex items-center justify-between mb-3">
//                         <h4 className="font-medium">Medication {index + 1}</h4>
//                         {prescriptionData.medications.length > 1 && (
//                           <Button
//                             type="button"
//                             variant="outline"
//                             size="sm"
//                             onClick={() => handleRemoveMedication(index)}
//                             className="text-red-600 hover:text-red-700"
//                           >
//                             <Trash2 className="w-4 h-4" />
//                           </Button>
//                         )}
//                       </div>
//                       <div className="grid grid-cols-2 gap-3">
//                         <div>
//                           <Label>Medication Name</Label>
//                           <Input
//                             placeholder="e.g., Paracetamol"
//                             value={medication.name}
//                             onChange={(e) => handleMedicationChange(index, 'name', e.target.value)}
//                           />
//                         </div>
//                         <div>
//                           <Label>Dosage</Label>
//                           <Input
//                             placeholder="e.g., 500mg"
//                             value={medication.dosage}
//                             onChange={(e) => handleMedicationChange(index, 'dosage', e.target.value)}
//                           />
//                         </div>
//                         <div>
//                           <Label>Frequency</Label>
//                           <Input
//                             placeholder="e.g., Twice daily"
//                             value={medication.frequency}
//                             onChange={(e) => handleMedicationChange(index, 'frequency', e.target.value)}
//                           />
//                         </div>
//                         <div>
//                           <Label>Duration</Label>
//                           <Input
//                             placeholder="e.g., 7 days"
//                             value={medication.duration}
//                             onChange={(e) => handleMedicationChange(index, 'duration', e.target.value)}
//                           />
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             </div>

//             <div>
//               <Label htmlFor="instructions">Instructions</Label>
//               <Textarea
//                 id="instructions"
//                 placeholder="Enter special instructions for the patient..."
//                 value={prescriptionData.instructions}
//                 onChange={(e) => setPrescriptionData(prev => ({ ...prev, instructions: e.target.value }))}
//               />
//             </div>
//           </div>

//           <DialogFooter>
//             <Button variant="outline" onClick={() => setShowPrescriptionDialog(false)}>
//               Cancel
//             </Button>
//             <Button onClick={handleSendPrescription}>
//               Send Prescription
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>

//       <PatientHistoryModal
//         open={showPatientHistoryModal}
//         onOpenChange={setShowPatientHistoryModal}
//         patientId={selectedPatientId}
//         patientName={selectedPatientName}
//       />
//     </div>
//   );
// };

// export default DoctorAppointments;
