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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Clock, Plus, Edit } from "lucide-react";
import { getCurrentUser } from "@/data/auth";
import { useToast } from "@/hooks/use-toast";
import EditScheduleModal from "./EditScheduleModal";
import axios from "axios";

const DoctorSchedule = () => {
  const [showAddSlotDialog, setShowAddSlotDialog] = useState(false);
  const [showEditSlotModal, setShowEditSlotModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<any>(null);
  const [newSlot, setNewSlot] = useState({
    date: "",
    startTime: "",
    endTime: "",
  });
  const [availabilitySlots, setAvailabilitySlots] = useState<any[]>([]);
  const { toast } = useToast();
  const currentUser = getCurrentUser();

  // Fetch slots from backend using axios
  useEffect(() => {
    const fetchSlots = async () => {
      if (!currentUser?.id) return;
      try {
        const res = await axios.get(
          `http://localhost:3000/api/doctorDashboard/mySchedule?doctor_id=${currentUser.id}`
        );
        // Map backend fields to UI fields
        const mapped = res.data.map((slot: any) => ({
          id: slot.id,
          date: slot.date,
          startTime: slot.start_time,
          endTime: slot.end_time,
          isBooked: !!slot.patient_id && slot.status !== "available",
        }));
        setAvailabilitySlots(mapped);
      } catch {
        setAvailabilitySlots([]);
      }
    };
    fetchSlots();
  }, [currentUser?.id]);

  const handleAddSlot = async () => {
    if (newSlot.date && newSlot.startTime && newSlot.endTime) {
      try {
        const res = await axios.post(
          "http://localhost:3000/api/doctorDashboard/mySchedule",
          {
            doctor_id: currentUser.id,
            date: newSlot.date,
            start_time: newSlot.startTime,
            end_time: newSlot.endTime,
          }
        );
        setAvailabilitySlots((prev) => [
          ...prev,
          {
            id: res.data.id,
            date: res.data.date,
            startTime: res.data.start_time,
            endTime: res.data.end_time,
            isBooked: !!res.data.patient_id && res.data.status !== "available",
          },
        ]);
        toast({
          title: "Time Slot Added",
          description: `New availability slot added for ${newSlot.date} from ${newSlot.startTime} to ${newSlot.endTime}.`,
        });
        setShowAddSlotDialog(false);
        setNewSlot({ date: "", startTime: "", endTime: "" });
      } catch {
        toast({ title: "Failed to add slot", variant: "destructive" });
      }
    }
  };

  // Called after a slot is edited in the modal
  const handleSlotUpdated = (updatedSlot: any) => {
    setAvailabilitySlots((prev) =>
      prev.map((slot) =>
        slot.id === updatedSlot.id ? updatedSlot : slot
      )
    );
  };

  // Called after a slot is deleted in the modal
  const handleSlotDeleted = (slotId: string) => {
    setAvailabilitySlots((prev) => prev.filter((slot) => slot.id !== slotId));
  };

  const handleEditSlot = (slot: any) => {
    setSelectedSlot(slot);
    setShowEditSlotModal(true);
  };

  const groupSlotsByDate = () => {
    const grouped: { [key: string]: any[] } = {};
    availabilitySlots.forEach((slot) => {
      if (!grouped[slot.date]) {
        grouped[slot.date] = [];
      }
      grouped[slot.date].push(slot);
    });
    return grouped;
  };

  const groupedSlots = groupSlotsByDate();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">My Schedule</h2>
        <Button onClick={() => setShowAddSlotDialog(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Time Slot
        </Button>
      </div>

      <div className="grid gap-6">
        {Object.keys(groupedSlots).length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Calendar className="w-12 h-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No schedule set
              </h3>
              <p className="text-gray-500 text-center">
                Add your first time slot to start accepting appointments.
              </p>
            </CardContent>
          </Card>
        ) : (
          Object.entries(groupedSlots)
            .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
            .map(([date, slots]) => (
              <Card key={date}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5" />
                    <span>
                      {new Date(date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </CardTitle>
                  <CardDescription>
                    {slots.length} time slot{slots.length !== 1 ? "s" : ""} available
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {slots.map((slot) => (
                      <div
                        key={slot.id}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span className="text-sm font-medium">
                            {slot.startTime} - {slot.endTime}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant={slot.isBooked ? "secondary" : "default"}
                          >
                            {slot.isBooked ? "Booked" : "Available"}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditSlot(slot)}
                          >
                            <Edit className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Schedule Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {availabilitySlots.length}
              </div>
              <div className="text-sm text-blue-600">Total Slots</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {availabilitySlots.filter((slot) => slot.isBooked).length}
              </div>
              <div className="text-sm text-green-600">Booked Slots</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">
                {availabilitySlots.filter((slot) => !slot.isBooked).length}
              </div>
              <div className="text-sm text-yellow-600">Available Slots</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showAddSlotDialog} onOpenChange={setShowAddSlotDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Time Slot</DialogTitle>
            <DialogDescription>
              Create a new availability slot for patients to book appointments.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={newSlot.date}
                onChange={(e) =>
                  setNewSlot((prev) => ({ ...prev, date: e.target.value }))
                }
                min={new Date().toISOString().split("T")[0]}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="startTime">Start Time</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={newSlot.startTime}
                  onChange={(e) =>
                    setNewSlot((prev) => ({
                      ...prev,
                      startTime: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="endTime">End Time</Label>
                <Input
                  id="endTime"
                  type="time"
                  value={newSlot.endTime}
                  onChange={(e) =>
                    setNewSlot((prev) => ({ ...prev, endTime: e.target.value }))
                  }
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowAddSlotDialog(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleAddSlot}>Add Slot</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <EditScheduleModal
        open={showEditSlotModal}
        onOpenChange={setShowEditSlotModal}
        slot={selectedSlot}
        onSlotUpdated={handleSlotUpdated}
        onSlotDeleted={handleSlotDeleted}
      />
    </div>
  );
};

export default DoctorSchedule;


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
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Calendar, Clock, Plus, Edit } from "lucide-react";
// import { currentDoctor } from "@/data/demoData";
// import { useToast } from "@/hooks/use-toast";
// import EditScheduleModal from "./EditScheduleModal";

// const DoctorSchedule = () => {
//   const [showAddSlotDialog, setShowAddSlotDialog] = useState(false);
//   const [showEditSlotModal, setShowEditSlotModal] = useState(false);
//   const [selectedSlot, setSelectedSlot] = useState<any>(null);
//   const [newSlot, setNewSlot] = useState({
//     date: "",
//     startTime: "",
//     endTime: "",
//   });
//   const { toast } = useToast();

//   const availabilitySlots = currentDoctor.availability;

//   const handleAddSlot = () => {
//     if (newSlot.date && newSlot.startTime && newSlot.endTime) {
//       toast({
//         title: "Time Slot Added",
//         description: `New availability slot added for ${newSlot.date} from ${newSlot.startTime} to ${newSlot.endTime}.`,
//       });
//       setShowAddSlotDialog(false);
//       setNewSlot({ date: "", startTime: "", endTime: "" });
//     }
//   };

//   const handleEditSlot = (slot: any) => {
//     setSelectedSlot(slot);
//     setShowEditSlotModal(true);
//   };

//   const groupSlotsByDate = () => {
//     const grouped: { [key: string]: any[] } = {};
//     availabilitySlots.forEach((slot) => {
//       if (!grouped[slot.date]) {
//         grouped[slot.date] = [];
//       }
//       grouped[slot.date].push(slot);
//     });
//     return grouped;
//   };

//   const groupedSlots = groupSlotsByDate();

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h2 className="text-2xl font-bold text-gray-900">My Schedule</h2>
//         <Button onClick={() => setShowAddSlotDialog(true)}>
//           <Plus className="w-4 h-4 mr-2" />
//           Add Time Slot
//         </Button>
//       </div>

//       <div className="grid gap-6">
//         {Object.keys(groupedSlots).length === 0 ? (
//           <Card>
//             <CardContent className="flex flex-col items-center justify-center py-12">
//               <Calendar className="w-12 h-12 text-gray-400 mb-4" />
//               <h3 className="text-lg font-medium text-gray-900 mb-2">
//                 No schedule set
//               </h3>
//               <p className="text-gray-500 text-center">
//                 Add your first time slot to start accepting appointments.
//               </p>
//             </CardContent>
//           </Card>
//         ) : (
//           Object.entries(groupedSlots)
//             .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
//             .map(([date, slots]) => (
//               <Card key={date}>
//                 <CardHeader>
//                   <CardTitle className="flex items-center space-x-2">
//                     <Calendar className="w-5 h-5" />
//                     <span>
//                       {new Date(date).toLocaleDateString("en-US", {
//                         weekday: "long",
//                         year: "numeric",
//                         month: "long",
//                         day: "numeric",
//                       })}
//                     </span>
//                   </CardTitle>
//                   <CardDescription>
//                     {slots.length} time slot{slots.length !== 1 ? "s" : ""}{" "}
//                     available
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
//                     {slots.map((slot) => (
//                       <div
//                         key={slot.id}
//                         className="flex items-center justify-between p-3 border rounded-lg"
//                       >
//                         <div className="flex items-center space-x-2">
//                           <Clock className="w-4 h-4 text-gray-500" />
//                           <span className="text-sm font-medium">
//                             {slot.startTime} - {slot.endTime}
//                           </span>
//                         </div>
//                         <div className="flex items-center space-x-2">
//                           <Badge
//                             variant={slot.isBooked ? "secondary" : "default"}
//                           >
//                             {slot.isBooked ? "Booked" : "Available"}
//                           </Badge>
//                           <Button
//                             variant="ghost"
//                             size="sm"
//                             onClick={() => handleEditSlot(slot)}
//                           >
//                             <Edit className="w-3 h-3" />
//                           </Button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>
//             ))
//         )}
//       </div>

//       <Card>
//         <CardHeader>
//           <CardTitle>Schedule Statistics</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div className="text-center p-4 bg-blue-50 rounded-lg">
//               <div className="text-2xl font-bold text-blue-600">
//                 {availabilitySlots.length}
//               </div>
//               <div className="text-sm text-blue-600">Total Slots</div>
//             </div>
//             <div className="text-center p-4 bg-green-50 rounded-lg">
//               <div className="text-2xl font-bold text-green-600">
//                 {availabilitySlots.filter((slot) => slot.isBooked).length}
//               </div>
//               <div className="text-sm text-green-600">Booked Slots</div>
//             </div>
//             <div className="text-center p-4 bg-yellow-50 rounded-lg">
//               <div className="text-2xl font-bold text-yellow-600">
//                 {availabilitySlots.filter((slot) => !slot.isBooked).length}
//               </div>
//               <div className="text-sm text-yellow-600">Available Slots</div>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       <Dialog open={showAddSlotDialog} onOpenChange={setShowAddSlotDialog}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Add New Time Slot</DialogTitle>
//             <DialogDescription>
//               Create a new availability slot for patients to book appointments.
//             </DialogDescription>
//           </DialogHeader>

//           <div className="space-y-4">
//             <div>
//               <Label htmlFor="date">Date</Label>
//               <Input
//                 id="date"
//                 type="date"
//                 value={newSlot.date}
//                 onChange={(e) =>
//                   setNewSlot((prev) => ({ ...prev, date: e.target.value }))
//                 }
//                 min={new Date().toISOString().split("T")[0]}
//               />
//             </div>

//             <div className="grid grid-cols-2 gap-3">
//               <div>
//                 <Label htmlFor="startTime">Start Time</Label>
//                 <Input
//                   id="startTime"
//                   type="time"
//                   value={newSlot.startTime}
//                   onChange={(e) =>
//                     setNewSlot((prev) => ({
//                       ...prev,
//                       startTime: e.target.value,
//                     }))
//                   }
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="endTime">End Time</Label>
//                 <Input
//                   id="endTime"
//                   type="time"
//                   value={newSlot.endTime}
//                   onChange={(e) =>
//                     setNewSlot((prev) => ({ ...prev, endTime: e.target.value }))
//                   }
//                 />
//               </div>
//             </div>
//           </div>

//           <DialogFooter>
//             <Button
//               variant="outline"
//               onClick={() => setShowAddSlotDialog(false)}
//             >
//               Cancel
//             </Button>
//             <Button onClick={handleAddSlot}>Add Slot</Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>

//       <EditScheduleModal
//         open={showEditSlotModal}
//         onOpenChange={setShowEditSlotModal}
//         slot={selectedSlot}
//       />
//     </div>
//   );
// };

// export default DoctorSchedule;
