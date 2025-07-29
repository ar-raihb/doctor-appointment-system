import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { setCurrentUser, demoUsers } from "@/data/auth";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
    const [role, setRole] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if(!role){
      toast({
        title: "Login Failed",
        description:
          "Please select a role (Patient or Doctor) to proceed.",
        variant: "destructive",
      });
          setIsLoading(false);
          return
    }    
    // TODO: API call implementation
    // await new Promise((resolve) => setTimeout(resolve, 1000));

    // // Find user in demo users
    // const user = demoUsers.find(
    //   (u) => u.email === email && u.password === password
    // );


    // Use axios to call the backend API
    let user = null;
    try {
      console.log("Attempting to log in with:", { email, password, role });
      const response = await axios.post("http://localhost:3000/api/login", { email, password, role });
      user = response.data;
    } catch (error) {
      console.error("Login error:", error);
    } 
    
    if (user) {
      console.log("Login successful:", user);
      setCurrentUser(user);
      if (role === "patient") {
        toast({
          title: "Welcome back!",
          description: "You have been successfully logged in.",
        });
        navigate("/patient");
      } else if (role === "doctor") {
        toast({
          title: "Welcome back, Doctor!",
          description: "You have been successfully logged in.",
        });
        navigate("/doctor");
      }
    } else {
      toast({
        title: "Login Failed",
        description:
          "Invalid email or password. Please try again with correct credentials.",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="btn-glass-outline flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Button>
        </div>

        <Card className="card-glass">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-card-foreground">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Sign in to your MediCare account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-card-foreground">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="glass-input"
                />
              </div>


              <div className="space-y-2" >
                <Label htmlFor="role" className="text-card-foreground">Role</Label>
                <Select value={role} onValueChange={setRole} required>
                  <SelectTrigger className="glass-input">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="patient">Patient</SelectItem>
                    <SelectItem value="doctor">Doctor</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-card-foreground">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="glass-input pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>


              <Button
                type="submit"
                className="w-full btn-glass"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-muted/30 backdrop-blur-sm rounded-lg border border-border/30">
              <p className="text-sm text-muted-foreground mb-2 font-medium">
                Demo Accounts:
              </p>
              <div className="space-y-1 text-xs text-muted-foreground">
                <p>
                  <strong>Patient:</strong> patient@demo.com / patient123
                </p>
                <p>
                  <strong>Doctor:</strong> doctor@demo.com / doctor123
                </p>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Button
                  variant="link"
                  className="p-0 h-auto text-primary story-link"
                  onClick={() => navigate("/register")}
                >
                  Sign up
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
