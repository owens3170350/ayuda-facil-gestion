
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TicketIcon, Users, BarChart3, Settings, Plus } from "lucide-react";
import { LoginForm } from "@/components/auth/LoginForm";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { TicketList } from "@/components/tickets/TicketList";
import { AdminPanel } from "@/components/admin/AdminPanel";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<"admin" | "client">("client");
  const [activeSection, setActiveSection] = useState("dashboard");

  // Simulación de login - después conectaremos con Supabase Auth
  const handleLogin = (email: string, password: string, role: "admin" | "client") => {
    console.log("Login attempt:", { email, role });
    setIsLoggedIn(true);
    setUserRole(role);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole("client");
    setActiveSection("dashboard");
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
              <TicketIcon className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">HelpDesk Pro</h1>
            <p className="text-gray-600">Sistema de Gestión de Tickets</p>
          </div>
          <LoginForm onLogin={handleLogin} />
        </div>
      </div>
    );
  }

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3, roles: ["admin", "client"] },
    { id: "tickets", label: "Tickets", icon: TicketIcon, roles: ["admin", "client"] },
    { id: "admin", label: "Administración", icon: Settings, roles: ["admin"] },
  ];

  const visibleNavItems = navigationItems.filter(item => 
    item.roles.includes(userRole)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="inline-flex items-center justify-center w-8 h-8 bg-blue-600 rounded">
                <TicketIcon className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">HelpDesk Pro</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                {userRole === "admin" ? "Administrador" : "Cliente"}
              </span>
              <Button variant="outline" onClick={handleLogout}>
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <Tabs value={activeSection} onValueChange={setActiveSection} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:grid-cols-none lg:inline-flex">
            {visibleNavItems.map((item) => (
              <TabsTrigger key={item.id} value={item.id} className="flex items-center space-x-2">
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Dashboard */}
          <TabsContent value="dashboard" className="space-y-6">
            <Dashboard userRole={userRole} />
          </TabsContent>

          {/* Tickets */}
          <TabsContent value="tickets" className="space-y-6">
            <TicketList userRole={userRole} />
          </TabsContent>

          {/* Admin Panel */}
          {userRole === "admin" && (
            <TabsContent value="admin" className="space-y-6">
              <AdminPanel />
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
