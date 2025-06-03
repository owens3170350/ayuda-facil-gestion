
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TicketIcon, BarChart3, Settings } from "lucide-react";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { TicketList } from "@/components/tickets/TicketList";
import { AdminPanel } from "@/components/admin/AdminPanel";
import { AuthPage } from "@/components/auth/AuthPage";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

const Index = () => {
  const { user, userRole, loading, signOut } = useAuth();
  const [activeSection, setActiveSection] = useState("dashboard");

  // Redirect logic
  useEffect(() => {
    if (!loading && !user) {
      // User is not authenticated, show auth page
    }
  }, [user, loading]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Cargando...</div>
      </div>
    );
  }

  if (!user) {
    return <AuthPage />;
  }

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3, roles: ["admin", "client"] },
    { id: "tickets", label: "Tickets", icon: TicketIcon, roles: ["admin", "client"] },
    { id: "admin", label: "Administración", icon: Settings, roles: ["admin"] },
  ];

  const visibleNavItems = navigationItems.filter(item => 
    item.roles.includes(userRole || 'client')
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
              <Button variant="outline" onClick={signOut}>
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
            <Dashboard />
          </TabsContent>

          {/* Tickets */}
          <TabsContent value="tickets" className="space-y-6">
            <TicketList />
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
