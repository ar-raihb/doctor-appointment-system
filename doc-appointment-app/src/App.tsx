import Index from "./pages/Index";
import Login from "./pages/Login";
import Guest from "./pages/Guest";
import Account from "./pages/Account";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import { Toaster } from "@/components/ui/toaster";
import DoctorDashboard from "./pages/DoctorDashboard";
import PatientDashboard from "./pages/PatientDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Index />} /> */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/guest" element={<Guest />} />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route
            path="/patient"
            element={
              <ProtectedRoute requiredRole="patient">
                <PatientDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor"
            element={
              <ProtectedRoute requiredRole="doctor">
                <DoctorDashboard />
              </ProtectedRoute>
            }
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
