import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Pill, FileText } from "lucide-react";
import { demoAppointments, demoPrescriptions } from "@/data/demoData";

interface PatientHistoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patientId: string | null;
  patientName: string | null;
}

const PatientHistoryModal = ({
  open,
  onOpenChange,
  patientId,
  patientName,
}: PatientHistoryModalProps) => {
  if (!patientId) return null;

  const patientAppointments = demoAppointments.filter(
    (appointment) => appointment.patientId === patientId
  );

  const patientPrescriptions = demoPrescriptions.filter(
    (prescription) => prescription.patientId === patientId
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Patient History - {patientName}</DialogTitle>
          <DialogDescription>
            Complete medical history and records
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Appointments History */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Appointment History
            </h3>
            {patientAppointments.length === 0 ? (
              <p className="text-gray-500">No appointment history found.</p>
            ) : (
              <div className="space-y-2">
                {patientAppointments.map((appointment) => (
                  <Card key={appointment.id}>
                    <CardContent className="pt-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">
                            {new Date(appointment.date).toLocaleDateString()}
                          </p>
                          <p className="text-sm text-gray-600">
                            {appointment.time}
                          </p>
                          {appointment.symptoms && (
                            <p className="text-sm mt-1">
                              <strong>Symptoms:</strong> {appointment.symptoms}
                            </p>
                          )}
                        </div>
                        <Badge
                          variant={
                            appointment.status === "completed"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {appointment.status}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Prescriptions History */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Pill className="w-5 h-5 mr-2" />
              Prescription History
            </h3>
            {patientPrescriptions.length === 0 ? (
              <p className="text-gray-500">No prescription history found.</p>
            ) : (
              <div className="space-y-3">
                {patientPrescriptions.map((prescription) => (
                  <Card key={prescription.id}>
                    <CardHeader>
                      <CardTitle className="text-base">
                        {prescription.diagnosis}
                      </CardTitle>
                      <CardDescription>
                        {new Date(prescription.createdAt).toLocaleDateString()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {prescription.medications.map((medication, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center p-2 bg-gray-100 rounded"
                          >
                            <span className="font-medium">
                              {medication.name}
                            </span>
                            <span className="text-sm text-gray-600">
                              {medication.dosage} - {medication.frequency}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PatientHistoryModal;
