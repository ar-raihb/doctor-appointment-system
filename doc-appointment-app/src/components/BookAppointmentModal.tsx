
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { demoDoctors } from '@/data/demoData';

interface BookAppointmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const BookAppointmentModal = ({ open, onOpenChange }: BookAppointmentModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    doctorId: '',
    date: '',
    time: '',
    symptoms: '',
    notes: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.doctorId || !formData.date || !formData.time) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Appointment Booked",
      description: "Your appointment request has been sent. You will receive a confirmation soon.",
    });
    
    // Reset form
    setFormData({
      doctorId: '',
      date: '',
      time: '',
      symptoms: '',
      notes: ''
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Book New Appointment</DialogTitle>
          <DialogDescription>
            Fill in the details to book a new appointment
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="doctor">Doctor *</Label>
            <Select value={formData.doctorId} onValueChange={(value) => handleInputChange('doctorId', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a doctor" />
              </SelectTrigger>
              <SelectContent>
                {demoDoctors.map(doctor => (
                  <SelectItem key={doctor.id} value={doctor.id}>
                    Dr. {doctor.name} - {doctor.specialization}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time *</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => handleInputChange('time', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="symptoms">Symptoms</Label>
            <Textarea
              id="symptoms"
              placeholder="Describe your symptoms..."
              value={formData.symptoms}
              onChange={(e) => handleInputChange('symptoms', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              placeholder="Any additional information..."
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Book Appointment
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookAppointmentModal;
