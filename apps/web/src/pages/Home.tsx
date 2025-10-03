import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Store, Star, Users, Shield, ArrowRight } from "lucide-react";
import { Link } from "react-router";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
              Store Rating System
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              A comprehensive platform for managing stores, collecting customer
              ratings, and building better business relationships.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <Button size="lg" className="w-full sm:w-auto">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Three Powerful Roles
          </h2>
          <p className="text-lg text-gray-600">
            Designed for different user types with specific needs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Admin Card */}
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-red-600" />
              </div>
              <CardTitle className="text-xl">Admin Dashboard</CardTitle>
              <CardDescription>
                Complete system oversight and management
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Manage all users and stores</li>
                <li>• View system analytics</li>
                <li>• Add new users and stores</li>
                <li>• Monitor platform activity</li>
              </ul>
            </CardContent>
          </Card>

          {/* Store Owner Card */}
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Store className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-xl">Store Owner</CardTitle>
              <CardDescription>
                Manage your store and customer feedback
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• View store performance</li>
                <li>• Monitor customer ratings</li>
                <li>• Track rating trends</li>
                <li>• Manage store information</li>
              </ul>
            </CardContent>
          </Card>

          {/* User Card */}
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-xl">Customer</CardTitle>
              <CardDescription>
                Discover and rate stores in your area
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Browse all available stores</li>
                <li>• Rate your experiences</li>
                <li>• Update your ratings</li>
                <li>• Find quality businesses</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Key Features Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Key Features
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need for a complete rating system
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="font-semibold mb-2">Rating System</h3>
              <p className="text-sm text-gray-600">
                5-star rating system for accurate feedback
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Store className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Store Management</h3>
              <p className="text-sm text-gray-600">
                Complete store profile and information management
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="font-semibold mb-2">User Roles</h3>
              <p className="text-sm text-gray-600">
                Different access levels for different user types
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Secure Access</h3>
              <p className="text-sm text-gray-600">
                JWT authentication and role-based security
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join our platform today and start building better relationships
            between stores and customers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto"
              >
                Create Account
              </Button>
            </Link>
            <Link to="/login">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-gray-900"
              >
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">
            © 2024 Store Rating System. Built as an assignment project.
          </p>
        </div>
      </footer>
    </div>
  );
}
