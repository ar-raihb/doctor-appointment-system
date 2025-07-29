
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Pill, User, Calendar, Download } from 'lucide-react';
import { demoPrescriptions, demoDoctors, currentPatient } from '@/data/demoData';
import ContactDoctorModal from './ContactDoctorModal';
import { downloadPrescriptionPDF } from '@/utils/pdfGenerator';
import { useToast } from '@/hooks/use-toast';

const PatientPrescriptions = () => {
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const { toast } = useToast();

  const patientPrescriptions = demoPrescriptions.filter(
    prescription => prescription.patientId === currentPatient.id
  );

  const getDoctorInfo = (doctorId: string) => {
    return demoDoctors.find(doctor => doctor.id === doctorId);
  };

  const handleContactDoctor = (doctorId: string) => {
    const doctor = getDoctorInfo(doctorId);
    setSelectedDoctor(doctor);
    setContactModalOpen(true);
  };

  const handleDownloadPDF = (prescription: any) => {
    const doctor = getDoctorInfo(prescription.doctorId);
    const doctorName = doctor ? doctor.name : 'Unknown Doctor';
    
    try {
      downloadPrescriptionPDF(prescription, doctorName);
      toast({
        title: "PDF Downloaded",
        description: "Your prescription has been downloaded successfully.",
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "There was an error downloading the prescription.",
        variant: "destructive",
      });
    }
  };

  if (patientPrescriptions.length === 0) {
    return (
      <Card className="card-glass border-border/50">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Pill className="w-12 h-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No prescriptions</h3>
          <p className="text-muted-foreground text-center">You don't have any prescriptions yet.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">My Prescriptions</h2>
      </div>

      <div className="grid gap-6">
        {patientPrescriptions.map((prescription) => {
          const doctor = getDoctorInfo(prescription.doctorId);
          return (
            <Card key={prescription.id} className="card-glass border-border/50 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg text-card-foreground">Prescribed by {doctor?.name}</CardTitle>
                      <CardDescription className="text-muted-foreground">{doctor?.specialization}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(prescription.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-card-foreground mb-2">Diagnosis</h4>
                  <p className="text-muted-foreground">{prescription.diagnosis}</p>
                </div>

                <div>
                  <h4 className="font-medium text-card-foreground mb-3">Medications</h4>
                  <div className="space-y-3">
                    {prescription.medications.map((medication, index) => (
                      <div key={index} className="bg-muted/30 backdrop-blur-sm rounded-lg p-3 border border-border/30">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium text-card-foreground">{medication.name}</h5>
                          <Badge variant="secondary">{medication.dosage}</Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                          <span><strong>Frequency:</strong> {medication.frequency}</span>
                          <span><strong>Duration:</strong> {medication.duration}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-card-foreground mb-2">Instructions</h4>
                  <p className="text-muted-foreground">{prescription.instructions}</p>
                </div>

                <div className="flex justify-end space-x-2 pt-4 border-t border-border/30">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDownloadPDF(prescription)}
                    className="btn-glass-outline flex items-center space-x-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download PDF</span>
                  </Button>
                  <Button 
                    size="sm"
                    onClick={() => handleContactDoctor(prescription.doctorId)}
                    className="btn-glass"
                  >
                    Contact Doctor
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <ContactDoctorModal
        open={contactModalOpen}
        onOpenChange={setContactModalOpen}
        doctor={selectedDoctor}
      />
    </div>
  );
};

export default PatientPrescriptions;
