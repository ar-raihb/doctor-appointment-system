import { Home, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import DoctorSchedule from "@/components/DoctorSchedule";
import { getCurrentUser, clearCurrentUser } from "@/data/auth";
import DoctorAppointments from "@/components/DoctorAppointments";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("appointments");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = getCurrentUser();
    if (user && user.role === "doctor") {
      setCurrentUser(user);
    } else {
      // Redirect to login if no user or not a doctor
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    clearCurrentUser();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate("/");
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

  return (
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
                  Doctor Portal
                </h1>
                <p className="text-sm text-muted-foreground">
                  Welcome,{" "}
                  {"Dr. " +
                    currentUser.first_name +
                    " " +
                    currentUser.last_name}
                </p>
              </div>
            </div>

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
          <TabsList className="grid w-full grid-cols-2 glass-card p-1 bg-card/60 backdrop-blur-md">
            <TabsTrigger
              value="appointments"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all duration-300"
            >
              Patient Appointments
            </TabsTrigger>
            <TabsTrigger
              value="schedule"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all duration-300"
            >
              My Schedule
            </TabsTrigger>
          </TabsList>

          <TabsContent value="appointments" className="space-y-6">
            <DoctorAppointments />
          </TabsContent>

          <TabsContent value="schedule" className="space-y-6">
            <DoctorSchedule />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DoctorDashboard;
