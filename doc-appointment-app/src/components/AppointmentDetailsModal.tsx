import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, MapPin } from "lucide-react";

interface AppointmentDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  appointment: any;
  doctor: any;
}

const AppointmentDetailsModal = ({
  open,
  onOpenChange,
  appointment,
  doctor,
}: AppointmentDetailsModalProps) => {
  if (!appointment || !doctor) return null;

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
        return "bg-gray-800 text-gray-800";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Appointment Details</DialogTitle>
          <DialogDescription>
            Complete information about your appointment
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
            <div className="flex items-center space-x-3">
              <User className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium">{doctor.name}</p>
                <p className="text-sm text-gray-600">{doctor.specialization}</p>
              </div>
            </div>
            <Badge className={getStatusColor(appointment.status)}>
              {appointment.status.charAt(0).toUpperCase() +
                appointment.status.slice(1)}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center space-x-2 p-3 bg-gray-800 rounded-lg">
              <Calendar className="w-4 h-4 text-gray-600" />
              <div>
                <p className="text-xs text-gray-500">Date</p>
                <p className="text-sm font-medium">
                  {new Date(appointment.date).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 p-3 bg-gray-800 rounded-lg">
              <Clock className="w-4 h-4 text-gray-600" />
              <div>
                <p className="text-xs text-gray-500">Time</p>
                <p className="text-sm font-medium">{appointment.start_time + " - " +  appointment.end_time}</p>
              </div>
            </div>
          </div>

          <div className="flex items-start space-x-2 p-3 bg-gray-800 rounded-lg">
            <MapPin className="w-4 h-4 text-gray-600 mt-1" />
            <div>
              <p className="text-xs text-gray-500">Location</p>
              <p className="text-sm font-medium">{"TRK Memorial Hospital, 42/A, ZR Road, Dhaka"}</p>
            </div>
          </div>

          {appointment.symptoms && (
            <div className="p-3 bg-gray-800 rounded-lg">
              <p className="text-xs text-gray-500 mb-1">Symptoms</p>
              <p className="text-sm">{appointment.symptoms}</p>
            </div>
          )}

          {appointment.notes && (
            <div className="p-3 bg-gray-800 rounded-lg">
              <p className="text-xs text-gray-500 mb-1">Notes</p>
              <p className="text-sm">{appointment.notes}</p>
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentDetailsModal;
