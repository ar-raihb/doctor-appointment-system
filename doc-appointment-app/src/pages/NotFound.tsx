
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="card-glass max-w-md w-full text-center">
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-foreground mb-2">404</CardTitle>
          <p className="text-xl text-muted-foreground">Oops! Page not found</p>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Button 
            onClick={() => window.location.href = '/'}
            className="btn-glass flex items-center space-x-2"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
