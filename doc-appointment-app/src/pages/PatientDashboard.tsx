import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { LogOut, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PatientAppointments from "@/components/PatientAppointments";
import PatientPrescriptions from "@/components/PatientPrescriptions";
import DoctorSearch from "@/components/DoctorSearch";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useToast } from "@/hooks/use-toast";
import { getCurrentUser, clearCurrentUser } from "@/data/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";

const PatientDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("appointments");
  const [currentUser, setCurrentUser] = useState(getCurrentUser());

  useEffect(() => {
    const user = getCurrentUser();
    if (user && user.role === "patient") {
      setCurrentUser(user);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    clearCurrentUser();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate("/login");
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  if (!currentUser) {
    return null;
  }

  const handleDeleteAccount = async () => {
    if (!currentUser?.id) return;
    try {
      await axios.delete("http://localhost:3000/api/patientDashboard", {
        data: { id: currentUser.id },
      });
      clearCurrentUser();
      toast({
        title: "Account Deleted",
        description: "Your account has been deleted.",
      });
      navigate("/login");
    } catch (error) {
      toast({
        title: "Delete Failed",
        description: "Could not delete your account. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <ProtectedRoute requiredRole="patient">
      <div className="min-h-screen bg-background">
        <div className="nav-glass">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/")}
                  className="btn-glass-outline flex items-center space-x-2"
                >
                  <Home className="w-4 h-4" />
                  <span>Home</span>
                </Button>
                <div>
                  <h1 className="text-xl font-semibold text-card-foreground">
                    Patient Portal
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Welcome,{" "}
                    {currentUser.first_name + " " + currentUser?.last_name}
                  </p>
                </div>
              </div>
              {/* <Button 
                variant="outline" 
                size="sm"
                onClick={handleLogout}
                className="btn-glass-outline flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </Button> */}
              <div className="flex items-center space-x-4">
                <Avatar
                  className="h-8 w-8 cursor-pointer hover:ring-2 hover:ring-primary transition-all"
                  onClick={() => navigate("/account")}
                >
                  <AvatarFallback className="text-sm font-bold uppercase text-black bg-white">
                    {getInitials(
                      currentUser.first_name + " " + currentUser.last_name
                    )}
                  </AvatarFallback>
                </Avatar>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="btn-glass-outline flex items-center space-x-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <TabsList className="grid w-full grid-cols-3 glass-card p-1 bg-card/60 backdrop-blur-md">
              <TabsTrigger
                value="appointments"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all duration-300"
              >
                My Appointments
              </TabsTrigger>
              <TabsTrigger
                // value="prescriptions"
                value=""
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all duration-300"
              >
                Prescriptions
              </TabsTrigger>
              <TabsTrigger
                value="search"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all duration-300"
              >
                Find Doctors
              </TabsTrigger>
            </TabsList>

            <TabsContent value="appointments" className="space-y-6">
              <PatientAppointments />
            </TabsContent>

            <TabsContent value="prescriptions" className="space-y-6">
              <PatientPrescriptions />
            </TabsContent>

            <TabsContent value="search" className="space-y-6">
              <DoctorSearch />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default PatientDashboard;

// import React, { useEffect, useState } from 'react';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { Button } from '@/components/ui/button';
// import { LogOut, Home } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import PatientAppointments from '@/components/PatientAppointments';
// import PatientPrescriptions from '@/components/PatientPrescriptions';
// import DoctorSearch from '@/components/DoctorSearch';
// import ProtectedRoute from '@/components/ProtectedRoute';
// import { useToast } from '@/hooks/use-toast';
// import { getCurrentUser, clearCurrentUser } from '@/data/auth';
// import axios from 'axios';

// const PatientDashboard = () => {
//   const navigate = useNavigate();
//   const { toast } = useToast();
//   const [activeTab, setActiveTab] = useState('');
//   const [currentUser, setCurrentUser] = useState(getCurrentUser());

//   const handleLogout = () => {
//     clearCurrentUser();
//     toast({
//       title: "Logged Out",
//       description: "You have been successfully logged out.",
//     });
//     navigate('/login');
//   };

//     const handleDeleteAccount = async () => {
//     if (!currentUser?.id) return;
//     try {
//       await axios.delete("http://localhost:3000/api/patientDashboard", { data: { id: currentUser.id } });
//       clearCurrentUser();
//       toast({
//         title: "Account Deleted",
//         description: "Your account has been deleted.",
//       });
//       navigate('/login');
//     } catch (error) {
//       toast({
//         title: "Delete Failed",
//         description: "Could not delete your account. Please try again.",
//         variant: "destructive",
//       });
//     }
//   };

//   const [editPhone, setEditPhone] = useState(currentUser?.phone || '');
//   async function handleUpdatePhone(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> {
//     event.preventDefault();
//     if (!currentUser?.id) return;
//     try {
//       await axios.put("http://localhost:3000/api/patientDashboard", {
//         id: currentUser.id,
//         phone: editPhone,
//       });
//       toast({
//         title: "Phone Updated",
//         description: "Your phone number has been updated.",
//       });
//       setCurrentUser({ ...currentUser, phone: editPhone });
//     } catch (error) {
//       toast({
//         title: "Update Failed",
//         description: "Could not update phone number. Please try again.",
//         variant: "destructive",
//       });
//     }
//   }

//   return (
//     <ProtectedRoute requiredRole="patient">
//       <div className="min-h-screen bg-background">
//         <div className="nav-glass">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="flex items-center justify-between h-16">
//               <div className="flex items-center space-x-4">
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   onClick={() => navigate('/')}
//                   className="btn-glass-outline flex items-center space-x-2"
//                 >
//                   <Home className="w-4 h-4" />
//                   <span>Home</span>
//                 </Button>
//                 <div>
//                   <h1 className="text-xl font-semibold text-card-foreground">Patient Portal</h1>
//                   <p className="text-sm text-muted-foreground">Welcome, {currentUser.first_name + " " + currentUser?.last_name}</p>
//                 </div>
//               </div>
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={handleLogout}
//                 className="btn-glass-outline flex items-center space-x-2"
//               >
//                 <LogOut className="w-4 h-4" />
//                 <span>Logout</span>
//               </Button>

// {/* --- DELETE ACCOUNT BUTTON  --- */}
//             <Button
//               variant="destructive"
//               size="sm"
//               onClick={handleDeleteAccount}
//               className="btn-glass-outline flex items-center space-x-2"
//             >
//               Delete Account
//             </Button>

// {/* --- DELETE ACCOUNT BUTTON  --- */}

//             </div>
//           </div>
//         </div>

//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
//             <TabsList className="grid w-full grid-cols-3 glass-card p-1 bg-card/60 backdrop-blur-md">
//               <TabsTrigger
//                 // value="appointments"
//                 value="appointments_"
//                 className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all duration-300"
//               >
//                 My Appointments
//               </TabsTrigger>
//               <TabsTrigger
//                 // value="prescriptions"
//                 value="_"
//                 className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all duration-300"
//               >
//                 Prescriptions
//               </TabsTrigger>
//               <TabsTrigger
//                 // value="search"
//                 value=""
//                 className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all duration-300"
//               >
//                 Find Doctors
//               </TabsTrigger>
//             </TabsList>

//             <TabsContent value="appointments" className="space-y-6">
//               <PatientAppointments />
//             </TabsContent>

//             <TabsContent value="prescriptions" className="space-y-6">
//               <PatientPrescriptions />
//             </TabsContent>

//             <TabsContent value="search" className="space-y-6">
//               <DoctorSearch />
//             </TabsContent>
//           </Tabs>
//         </div>
//          {
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//             <h2 className="text-xl font-semibold text-card-foreground">User Details</h2>
//             <pre className="bg-card p-4 rounded-lg text-sm text-muted-foreground">
//               {JSON.stringify(currentUser, null, 2)}
//             </pre>

//             <Button
//               variant="outline"
//               size="sm"
//               onClick={() => setCurrentUser(getCurrentUser())}
//               className="btn-glass-outline"
//             >
//               Refresh User Data
//             </Button>

//             <div className="flex items-center space-x-2 mt-4">
//               <input
//                 type="text"
//                 value={editPhone}
//                 onChange={e => setEditPhone(e.target.value)}
//                 className="bg-card border rounded px-3 py-2 text-sm"
//                 placeholder="Update phone number"
//               />
//               <Button
//                 variant="secondary"
//                 size="sm"
//                 onClick={handleUpdatePhone}
//               >
//                 Update
//               </Button>
//             </div>

//           </div>
//         }
//       </div>
//     </ProtectedRoute>
//   );
// };

// export default PatientDashboard;
