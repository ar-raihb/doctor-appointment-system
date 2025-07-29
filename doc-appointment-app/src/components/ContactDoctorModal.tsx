import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin } from "lucide-react";

interface ContactDoctorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  doctor: {
    id: string;
    name: string;
    specialization: string;
    phone: string;
    email: string;
    address: string;
  } | null;
}

const ContactDoctorModal = ({
  open,
  onOpenChange,
  doctor,
}: ContactDoctorModalProps) => {
  if (!doctor) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Contact Dr. {doctor.name}</DialogTitle>
          <DialogDescription>{doctor.specialization}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center space-x-3 p-3 bg-gray-100 rounded-lg">
            <Phone className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-sm font-medium text-gray-900">Phone</p>
              <p className="text-sm text-gray-600">{doctor.phone}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-gray-100 rounded-lg">
            <Mail className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-sm font-medium text-gray-900">Email</p>
              <p className="text-sm text-gray-600">{doctor.email}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-gray-100 rounded-lg">
            <MapPin className="w-5 h-5 text-red-600" />
            <div>
              <p className="text-sm font-medium text-gray-900">Address</p>
              <p className="text-sm text-gray-600">{doctor.address}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button onClick={() => window.open(`tel:${doctor.phone}`)}>
            Call Now
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactDoctorModal;
