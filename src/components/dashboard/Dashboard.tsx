
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TicketIcon, Users, Clock, CheckCircle, AlertCircle, TrendingUp } from "lucide-react";

interface DashboardProps {
  userRole: "admin" | "client";
}

export const Dashboard = ({ userRole }: DashboardProps) => {
  // Datos de ejemplo - después conectaremos con Supabase
  const stats = {
    totalTickets: 156,
    openTickets: 23,
    pendingTickets: 8,
    resolvedTickets: 125,
    avgResponseTime: "2.5h",
    satisfaction: "94%"
  };

  const recentTickets = [
    { id: 1, title: "Problema con login", status: "open", priority: "high", created: "2024-01-15" },
    { id: 2, title: "Error en facturación", status: "pending", priority: "medium", created: "2024-01-14" },
    { id: 3, title: "Consulta general", status: "resolved", priority: "low", created: "2024-01-13" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open": return "bg-red-100 text-red-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "resolved": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-orange-100 text-orange-800";
      case "low": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          {userRole === "admin" ? "Panel de Administración" : "Mi Dashboard"}
        </h2>
        <p className="text-gray-600">
          {userRole === "admin" 
            ? "Resumen general del sistema de tickets" 
            : "Resumen de tus tickets y actividad reciente"
          }
        </p>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
            <TicketIcon className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTickets}</div>
            <p className="text-xs text-gray-600">
              {userRole === "admin" ? "En el sistema" : "Tus tickets"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Abiertos</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.openTickets}</div>
            <p className="text-xs text-gray-600">Requieren atención</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingTickets}</div>
            <p className="text-xs text-gray-600">En proceso</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resueltos</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.resolvedTickets}</div>
            <p className="text-xs text-gray-600">Completados</p>
          </CardContent>
        </Card>
      </div>

      {/* Métricas adicionales para admin */}
      {userRole === "admin" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tiempo de Respuesta Promedio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">{stats.avgResponseTime}</div>
              <p className="text-sm text-gray-600">Objetivo: menos de 4 horas</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Satisfacción del Cliente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{stats.satisfaction}</div>
              <p className="text-sm text-gray-600">Basado en encuestas recientes</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tickets recientes */}
      <Card>
        <CardHeader>
          <CardTitle>Tickets Recientes</CardTitle>
          <CardDescription>
            {userRole === "admin" 
              ? "Últimos tickets creados en el sistema" 
              : "Tus tickets más recientes"
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTickets.map((ticket) => (
              <div key={ticket.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium">{ticket.title}</h4>
                  <p className="text-sm text-gray-600">Ticket #{ticket.id} • {ticket.created}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getPriorityColor(ticket.priority)}>
                    {ticket.priority === "high" ? "Alta" : ticket.priority === "medium" ? "Media" : "Baja"}
                  </Badge>
                  <Badge className={getStatusColor(ticket.status)}>
                    {ticket.status === "open" ? "Abierto" : ticket.status === "pending" ? "Pendiente" : "Resuelto"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
