
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Search, Star, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { demoDoctors } from '@/data/doctors';

const Guest = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('');

  const specializations = Array.from(new Set(demoDoctors.map(doctor => doctor.specialization)));

  const filteredDoctors = demoDoctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialization = !selectedSpecialization || doctor.specialization === selectedSpecialization;
    return matchesSearch && matchesSpecialization;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <div className="nav-glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/')}
                className="btn-glass-outline flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </Button>
              <h1 className="text-xl font-semibold text-card-foreground">Browse Doctors</h1>
            </div>
            <Button 
              onClick={() => navigate('/register')}
              className="btn-glass"
            >
              Sign Up to Book
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">Find Healthcare Professionals</h1>
          <p className="text-lg text-muted-foreground">
            Browse our network of qualified doctors and specialists
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="card-glass mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search doctors by name or specialization..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="glass-input pl-10"
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedSpecialization === '' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedSpecialization('')}
                  className={selectedSpecialization === '' ? 'btn-glass' : 'btn-glass-outline'}
                >
                  All Specializations
                </Button>
                {specializations.map((spec) => (
                  <Button
                    key={spec}
                    variant={selectedSpecialization === spec ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedSpecialization(spec)}
                    className={selectedSpecialization === spec ? 'btn-glass' : 'btn-glass-outline'}
                  >
                    {spec}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <Card key={doctor.id} className="card-glass hover-scale">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-semibold text-lg">
                      {doctor.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <CardTitle className="text-lg text-card-foreground">{doctor.name}</CardTitle>
                    <CardDescription className="text-muted-foreground">{doctor.specialization}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>{doctor.rating} • {doctor.experience} years experience</span>
                </div>

                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>Available today</span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border/30">
                  <div>
                    <span className="text-sm text-muted-foreground">Consultation Fee</span>
                    <p className="font-semibold text-card-foreground">${doctor.consultationFee}</p>
                  </div>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    Available
                  </Badge>
                </div>

                <Button 
                  className="w-full btn-glass"
                  onClick={() => navigate('/register')}
                >
                  Sign Up to Book
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <Card className="card-glass">
            <CardContent className="text-center py-12">
              <p className="text-muted-foreground">No doctors found matching your search criteria.</p>
            </CardContent>
          </Card>
        )}

        {/* CTA Section */}
        <Card className="card-glass mt-12 glow-hover">
          <CardContent className="text-center py-12">
            <h2 className="text-2xl font-bold text-card-foreground mb-4">
              Ready to Book an Appointment?
            </h2>
            <p className="text-muted-foreground mb-6">
              Sign up for free to book appointments and manage your health records
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => navigate('/register')}
                className="btn-glass"
              >
                Create Account
              </Button>
              <Button 
                variant="outline"
                size="lg"
                onClick={() => navigate('/login')}
                className="btn-glass-outline"
              >
                Sign In
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Guest;
