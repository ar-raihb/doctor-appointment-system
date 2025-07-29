
import axios from 'axios';
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface EditScheduleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  slot: any;
  onSlotUpdated: (slot: any) => void; 
  onSlotDeleted: (slotId: string) => void; 
}

const EditScheduleModal = ({ open, onOpenChange, slot, onSlotUpdated, onSlotDeleted }: EditScheduleModalProps) => {
  const { toast } = useToast();
  const [editData, setEditData] = useState({
    date: slot?.date || '',
    startTime: slot?.startTime || '',
    endTime: slot?.endTime || ''
  });

  // const handleSave = () => {
  //   if (editData.date && editData.startTime && editData.endTime) {
  //     toast({
  //       title: "Schedule Updated",
  //       description: `Time slot updated for ${editData.date} from ${editData.startTime} to ${editData.endTime}.`,
  //     });
  //     onOpenChange(false);
  //   }
  // };

  // const handleDelete = () => {
  //   toast({
  //     title: "Schedule Deleted",
  //     description: "The time slot has been deleted successfully.",
  //   });
  //   onOpenChange(false);
  // };

  const handleSave = async () => {
    if (editData.date && editData.startTime && editData.endTime) {
      try {
        const res = await axios.put("http://localhost:3000/api/doctorDashboard/mySchedule", {
          id: slot.id,
          date: editData.date,
          start_time: editData.startTime,
          end_time: editData.endTime,
        });
        onSlotUpdated({
          ...slot,
          date: res.data.date,
          startTime: res.data.start_time,
          endTime: res.data.end_time,
        });
        toast({
          title: "Schedule Updated",
          description: `Time slot updated for ${editData.date} from ${editData.startTime} to ${editData.endTime}.`,
        });
        onOpenChange(false);
      } catch {
        toast({
          title: "Update Failed",
          description: "Could not update the slot. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete("http://localhost:3000/api/doctorDashboard/mySchedule", {
        data: { id: slot.id },
      });
      onSlotDeleted(slot.id);
      toast({
        title: "Schedule Deleted",
        description: "The time slot has been deleted successfully.",
      });
      onOpenChange(false);
    } catch {
      toast({
        title: "Delete Failed",
        description: "Could not delete the slot. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!slot) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Schedule</DialogTitle>
          <DialogDescription>
            Modify or delete this time slot
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="edit-date">Date</Label>
            <Input
              id="edit-date"
              type="date"
              value={editData.date}
              onChange={(e) => setEditData(prev => ({ ...prev, date: e.target.value }))}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="edit-startTime">Start Time</Label>
              <Input
                id="edit-startTime"
                type="time"
                value={editData.startTime}
                onChange={(e) => setEditData(prev => ({ ...prev, startTime: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="edit-endTime">End Time</Label>
              <Input
                id="edit-endTime"
                type="time"
                value={editData.endTime}
                onChange={(e) => setEditData(prev => ({ ...prev, endTime: e.target.value }))}
              />
            </div>
          </div>

          {slot.isBooked && (
            <div className="p-3 bg-yellow-150 border border-yellow-500 rounded-lg">
              <p className="text-sm text-yellow-700">
                <strong>Note:</strong> This slot is already booked. Changes may affect the patient's appointment.
              </p>
            </div>
          )}
        </div>

        <DialogFooter className="flex justify-between">
          <Button variant="destructive" onClick={handleDelete}>
            Delete Slot
          </Button>
          <div className="space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditScheduleModal;
