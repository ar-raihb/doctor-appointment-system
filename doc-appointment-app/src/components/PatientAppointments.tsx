import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User } from "lucide-react";
import AppointmentDetailsModal from "./AppointmentDetailsModal";
import BookAppointmentModal from "./BookAppointmentModal";
import { useToast } from "@/hooks/use-toast";
import { getCurrentUser } from "@/data/auth";
import axios from "axios";

const PatientAppointments = () => {
  const { toast } = useToast();
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);

  const currentUser = getCurrentUser();

  // Fetch appointments for the logged-in patient
  useEffect(() => {
    const fetchAppointments = async () => {
      if (!currentUser?.id) return;
      try {
        const res = await axios.get(
          `http://localhost:3000/api/patientDashboard/myAppointments?patient_id=${currentUser.id}`
        );
        setAppointments(res.data);
      } catch (error) {
        setAppointments([]);
      }
    }; 
    fetchAppointments();
  }, [currentUser?.id]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleViewDetails = (appointment: any) => {
    setSelectedAppointment(appointment);
    setSelectedDoctor({
      name: `Dr. ${appointment.doctor_first_name} ${appointment.doctor_last_name}`,
      specialization: appointment.specialization,
    });
    setDetailsModalOpen(true);
  };

  const handleCancelAppointment = async (appointmentId: string) => {
    // call backend to cancel appointment
    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === appointmentId ? { ...apt, status: "cancelled" } : apt
      )
    );
    toast({
      title: "Appointment Cancelled",
      description: "Your appointment has been cancelled successfully.",
    });
  };

  const handleRescheduleAppointment = (appointmentId: string) => {
    toast({
      title: "Reschedule Request Sent",
      description:
        "Your reschedule request has been sent to the doctor. You will be notified once confirmed.",
    });
  };

  const handleBookNewAppointment = () => {
    setBookingModalOpen(true);
  };

  if (appointments.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">
            My Appointments
          </h2>
          <Button onClick={handleBookNewAppointment} className="btn-glass">
            Book New Appointment
          </Button>
        </div>

        <Card className="card-glass border-border/50">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Calendar className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              No appointments scheduled
            </h3>
            <p className="text-muted-foreground text-center">
              You don't have any appointments yet. Book your first appointment
              with a doctor.
            </p>
          </CardContent>
        </Card>

        <BookAppointmentModal
          open={bookingModalOpen}
          onOpenChange={setBookingModalOpen}
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">My Appointments</h2>
        <Button onClick={handleBookNewAppointment} className="btn-glass">
          Book New Appointment
        </Button>
      </div>

      <div className="grid gap-4">
        {appointments.map((appointment) => (
          <Card
            key={appointment.id}
            className="card-glass border-border/50 hover:shadow-xl transition-all duration-300"
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-card-foreground">
                      Dr. {appointment.doctor_first_name} {appointment.doctor_last_name}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {appointment.specialization}
                    </CardDescription>
                  </div>
                </div>
                <Badge className={getStatusColor(appointment.status)}>
                  {appointment.status.charAt(0).toUpperCase() +
                    appointment.status.slice(1)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(appointment.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{appointment.start_time + " - " + appointment.end_time}</span>
                </div>
              </div>
              {appointment.symptoms && (
                <div className="mt-3">
                  <p className="text-sm text-card-foreground">
                    <strong>Symptoms:</strong> {appointment.symptoms}
                  </p>
                </div>
              )}
              {appointment.notes && (
                <div className="mt-2">
                  <p className="text-sm text-card-foreground">
                    <strong>Notes:</strong> {appointment.notes}
                  </p>
                </div>
              )}
              <div className="flex justify-end mt-4 space-x-2">
                {appointment.status === "pending" && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCancelAppointment(appointment.id)}
                    className="btn-glass-outline"
                  >
                    Cancel
                  </Button>
                )}
                {appointment.status === "completed" && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleRescheduleAppointment(appointment.id)
                    }
                    className="btn-glass-outline"
                  >
                    Reschedule
                  </Button>
                )}
                <Button
                  size="sm"
                  onClick={() => handleViewDetails(appointment)}
                  className="btn-glass"
                >
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <AppointmentDetailsModal
        open={detailsModalOpen}
        onOpenChange={setDetailsModalOpen}
        appointment={selectedAppointment}
        doctor={selectedDoctor}
      />

      <BookAppointmentModal
        open={bookingModalOpen}
        onOpenChange={setBookingModalOpen}
      />
    </div>
  );
};

export default PatientAppointments;


// import React, { useState } from "react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Calendar, Clock, User } from "lucide-react";
// import { demoAppointments, demoDoctors, currentPatient } from "@/data/demoData";
// import AppointmentDetailsModal from "./AppointmentDetailsModal";
// import BookAppointmentModal from "./BookAppointmentModal";
// import { useToast } from "@/hooks/use-toast";

// const PatientAppointments = () => {
//   const { toast } = useToast();
//   const [detailsModalOpen, setDetailsModalOpen] = useState(false);
//   const [bookingModalOpen, setBookingModalOpen] = useState(false);
//   const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
//   const [appointments, setAppointments] = useState(demoAppointments);
//   const [selectedAppointment, setSelectedAppointment] = useState<any>(null);

//   const patientAppointments = appointments.filter(
//     (appointment) => appointment.patientId === currentPatient.id
//   );

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "confirmed":
//         return "bg-blue-100 text-blue-800";
//       case "completed":
//         return "bg-green-100 text-green-800";
//       case "pending":
//         return "bg-yellow-100 text-yellow-800";
//       case "cancelled":
//         return "bg-red-100 text-red-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   const getDoctorInfo = (doctorId: string) => {
//     return demoDoctors.find((doctor) => doctor.id === doctorId);
//   };

//   const handleViewDetails = (appointment: any) => {
//     const doctor = getDoctorInfo(appointment.doctorId);
//     setSelectedAppointment(appointment);
//     setSelectedDoctor(doctor);
//     setDetailsModalOpen(true);
//   };

//   const handleCancelAppointment = (appointmentId: string) => {
//     setAppointments((prev) =>
//       prev.map((apt) =>
//         apt.id === appointmentId ? { ...apt, status: "cancelled" } : apt
//       )
//     );
//     toast({
//       title: "Appointment Cancelled",
//       description: "Your appointment has been cancelled successfully.",
//     });
//   };

//   const handleRescheduleAppointment = (appointmentId: string) => {
//     toast({
//       title: "Reschedule Request Sent",
//       description:
//         "Your reschedule request has been sent to the doctor. You will be notified once confirmed.",
//     });
//   };

//   const handleBookNewAppointment = () => {
//     setBookingModalOpen(true);
//   };

//   if (patientAppointments.length === 0) {
//     return (
//       <div className="space-y-4">
//         <div className="flex items-center justify-between">
//           <h2 className="text-2xl font-bold text-foreground">
//             My Appointments
//           </h2>
//           <Button onClick={handleBookNewAppointment} className="btn-glass">
//             Book New Appointment
//           </Button>
//         </div>

//         <Card className="card-glass border-border/50">
//           <CardContent className="flex flex-col items-center justify-center py-12">
//             <Calendar className="w-12 h-12 text-muted-foreground mb-4" />
//             <h3 className="text-lg font-medium text-foreground mb-2">
//               No appointments scheduled
//             </h3>
//             <p className="text-muted-foreground text-center">
//               You don't have any appointments yet. Book your first appointment
//               with a doctor.
//             </p>
//           </CardContent>
//         </Card>

//         <BookAppointmentModal
//           open={bookingModalOpen}
//           onOpenChange={setBookingModalOpen}
//         />
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-4">
//       <div className="flex items-center justify-between">
//         <h2 className="text-2xl font-bold text-foreground">My Appointments</h2>
//         <Button onClick={handleBookNewAppointment} className="btn-glass">
//           Book New Appointment
//         </Button>
//       </div>

//       <div className="grid gap-4">
//         {patientAppointments.map((appointment) => {
//           const doctor = getDoctorInfo(appointment.doctorId);
//           return (
//             <Card
//               key={appointment.id}
//               className="card-glass border-border/50 hover:shadow-xl transition-all duration-300"
//             >
//               <CardHeader>
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-3">
//                     <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
//                       <User className="w-5 h-5 text-primary" />
//                     </div>
//                     <div>
//                       <CardTitle className="text-lg text-card-foreground">
//                         {doctor?.name}
//                       </CardTitle>
//                       <CardDescription className="text-muted-foreground">
//                         {doctor?.specialization}
//                       </CardDescription>
//                     </div>
//                   </div>
//                   <Badge className={getStatusColor(appointment.status)}>
//                     {appointment.status.charAt(0).toUpperCase() +
//                       appointment.status.slice(1)}
//                   </Badge>
//                 </div>
//               </CardHeader>
//               <CardContent>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="flex items-center space-x-2 text-sm text-muted-foreground">
//                     <Calendar className="w-4 h-4" />
//                     <span>
//                       {new Date(appointment.date).toLocaleDateString()}
//                     </span>
//                   </div>
//                   <div className="flex items-center space-x-2 text-sm text-muted-foreground">
//                     <Clock className="w-4 h-4" />
//                     <span>{appointment.time}</span>
//                   </div>
//                 </div>
//                 {appointment.symptoms && (
//                   <div className="mt-3">
//                     <p className="text-sm text-card-foreground">
//                       <strong>Symptoms:</strong> {appointment.symptoms}
//                     </p>
//                   </div>
//                 )}
//                 {appointment.notes && (
//                   <div className="mt-2">
//                     <p className="text-sm text-card-foreground">
//                       <strong>Notes:</strong> {appointment.notes}
//                     </p>
//                   </div>
//                 )}
//                 <div className="flex justify-end mt-4 space-x-2">
//                   {appointment.status === "pending" && (
//                     <Button
//                       variant="outline"
//                       size="sm"
//                       onClick={() => handleCancelAppointment(appointment.id)}
//                       className="btn-glass-outline"
//                     >
//                       Cancel
//                     </Button>
//                   )}
//                   {appointment.status === "completed" && (
//                     <Button
//                       variant="outline"
//                       size="sm"
//                       onClick={() =>
//                         handleRescheduleAppointment(appointment.id)
//                       }
//                       className="btn-glass-outline"
//                     >
//                       Reschedule
//                     </Button>
//                   )}
//                   <Button
//                     size="sm"
//                     onClick={() => handleViewDetails(appointment)}
//                     className="btn-glass"
//                   >
//                     View Details
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           );
//         })}
//       </div>

//       <AppointmentDetailsModal
//         open={detailsModalOpen}
//         onOpenChange={setDetailsModalOpen}
//         appointment={selectedAppointment}
//         doctor={selectedDoctor}
//       />

//       <BookAppointmentModal
//         open={bookingModalOpen}
//         onOpenChange={setBookingModalOpen}
//       />
//     </div>
//   );
// };

// export default PatientAppointments;
