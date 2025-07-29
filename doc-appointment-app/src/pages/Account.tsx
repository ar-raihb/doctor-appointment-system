import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { getCurrentUser, type AuthUser } from "@/data/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowLeft,
  User,
  Phone,
  Mail,
  Calendar,
  Stethoscope,
  DollarSign,
  Star,
} from "lucide-react";

const Account = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
  }, []);

  const handleBack = () => {
    if (currentUser?.role === "doctor") {
      navigate("/doctor");
    } else {
      navigate("/patient");
    }
  };

  if (!currentUser) {
    return null;
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <div className="nav-glass">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
                className="btn-glass-outline flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Dashboard</span>
              </Button>
              <h1 className="text-xl font-semibold text-card-foreground">
                Account Details
              </h1>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="glass-card">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Avatar className="h-24 w-24">
                  <AvatarFallback className="text-2xl font-semibold">
                    {getInitials(
                      currentUser.first_name + " " + currentUser.last_name
                    )}
                  </AvatarFallback>
                </Avatar>
              </div>
              <CardTitle className="text-2xl">
                {currentUser.first_name}
              </CardTitle>
              <CardDescription className="text-lg capitalize">
                {currentUser.role}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-center space-x-3 p-4 rounded-lg bg-card/50">
                  <Mail className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Email
                    </p>
                    <p className="text-sm">{currentUser.email}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-4 rounded-lg bg-card/50">
                  <Phone className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Phone
                    </p>
                    <p className="text-sm">
                      {currentUser.phone || "Not provided"}
                    </p>
                  </div>
                </div>
              </div>

              {currentUser.role === "patient" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center space-x-2">
                    <User className="w-5 h-5" />
                    <span>Patient Information</span>
                  </h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    {currentUser.age && (
                      <div className="flex items-center space-x-3 p-4 rounded-lg bg-card/50">
                        <Calendar className="w-5 h-5 text-primary" />
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">
                            Age
                          </p>
                          <p className="text-sm">{currentUser.age} years</p>
                        </div>
                      </div>
                    )}

                    {currentUser.gender && (
                      <div className="flex items-center space-x-3 p-4 rounded-lg bg-card/50">
                        <User className="w-5 h-5 text-primary" />
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">
                            Gender
                          </p>
                          <p className="text-sm capitalize">
                            {currentUser.gender}
                          </p>
                        </div>
                      </div>
                    )}

                    {currentUser.bloodGroup && (
                      <div className="flex items-center space-x-3 p-4 rounded-lg bg-card/50">
                        <Stethoscope className="w-5 h-5 text-primary" />
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">
                            Blood Group
                          </p>
                          <p className="text-sm">{currentUser.bloodGroup}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {currentUser.role === "doctor" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center space-x-2">
                    <Stethoscope className="w-5 h-5" />
                    <span>Doctor Information</span>
                  </h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    {currentUser.specialization && (
                      <div className="flex items-center space-x-3 p-4 rounded-lg bg-card/50">
                        <Stethoscope className="w-5 h-5 text-primary" />
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">
                            Specialization
                          </p>
                          <p className="text-sm">
                            {currentUser.specialization}
                          </p>
                        </div>
                      </div>
                    )}

                    {currentUser.experience && (
                      <div className="flex items-center space-x-3 p-4 rounded-lg bg-card/50">
                        <Calendar className="w-5 h-5 text-primary" />
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">
                            Experience
                          </p>
                          <p className="text-sm">
                            {currentUser.experience} years
                          </p>
                        </div>
                      </div>
                    )}

                    {currentUser.rating && (
                      <div className="flex items-center space-x-3 p-4 rounded-lg bg-card/50">
                        <Star className="w-5 h-5 text-primary" />
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">
                            Rating
                          </p>
                          <p className="text-sm">{currentUser.rating}/5.0</p>
                        </div>
                      </div>
                    )}

                    {currentUser.consultationFee && (
                      <div className="flex items-center space-x-3 p-4 rounded-lg bg-card/50">
                        <DollarSign className="w-5 h-5 text-primary" />
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">
                            Consultation Fee
                          </p>
                          <p className="text-sm">
                            ${currentUser.consultationFee}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Account;
