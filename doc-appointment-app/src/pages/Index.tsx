import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Users, Shield, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation with glass effect */}
      <div className="nav-glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary">MediCare</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate("/login")}
                className="btn-glass-outline"
              >
                Sign In
              </Button>
              <Button
                onClick={() => navigate("/register")}
                className="btn-glass"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Your Health, Our Priority
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Book appointments with trusted doctors, manage your health
              records, and access quality healthcare from the comfort of your
              home.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => navigate("/register")}
                className="btn-glass text-lg px-8 py-3 glow-hover"
              >
                Book Your Appointment
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate("/guest")}
                className="btn-glass-outline text-lg px-8 py-3"
              >
                Browse as Guest
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-muted/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Why Choose MediCare?
            </h2>
            <p className="text-lg text-muted-foreground">
              Experience healthcare like never before
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="card-glass text-center hover-scale">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl text-card-foreground">
                  Easy Booking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">
                  Schedule appointments with your preferred doctors in just a
                  few clicks
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="card-glass text-center hover-scale">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl text-card-foreground">
                  Expert Doctors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">
                  Connect with certified healthcare professionals across various
                  specializations
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="card-glass text-center hover-scale">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl text-card-foreground">
                  Secure & Private
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">
                  Your health data is protected with enterprise-grade security
                  measures
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="card-glass text-center hover-scale">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl text-card-foreground">
                  24/7 Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">
                  Round-the-clock customer support to assist you with any
                  queries
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <Card className="card-glass glow-hover">
            <CardContent className="py-12">
              <h2 className="text-3xl font-bold text-card-foreground mb-4">
                Ready to Take Control of Your Health?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join thousands of patients who trust MediCare for their
                healthcare needs
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={() => navigate("/register")}
                  className="btn-glass text-lg px-8 py-3"
                >
                  Start Today
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => navigate("/login")}
                  className="btn-glass-outline text-lg px-8 py-3"
                >
                  Sign In
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-card/50 backdrop-blur-md border-t border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-muted-foreground">
              © 2024 MediCare. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
