
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TicketIcon, Users, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { useTickets } from "@/hooks/useTickets";
import { useAuth } from "@/hooks/useAuth";

export const Dashboard = () => {
  const { tickets, loading } = useTickets();
  const { userRole } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-lg">Cargando estadísticas...</div>
      </div>
    );
  }

  const stats = {
    totalTickets: tickets.length,
    openTickets: tickets.filter(t => t.status === 'open').length,
    pendingTickets: tickets.filter(t => t.status === 'pending' || t.status === 'in_progress').length,
    resolvedTickets: tickets.filter(t => t.status === 'resolved').length,
  };

  const recentTickets = tickets.slice(0, 5);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open": return "bg-red-100 text-red-800";
      case "in_progress": return "bg-blue-100 text-blue-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "resolved": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent": return "bg-red-500 text-white";
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-orange-100 text-orange-800";
      case "low": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "open": return "Abierto";
      case "in_progress": return "En Progreso";
      case "pending": return "Pendiente";
      case "resolved": return "Resuelto";
      case "closed": return "Cerrado";
      default: return status;
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case "urgent": return "Urgente";
      case "high": return "Alta";
      case "medium": return "Media";
      case "low": return "Baja";
      default: return priority;
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
            <CardTitle className="text-sm font-medium">En Proceso</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingTickets}</div>
            <p className="text-xs text-gray-600">En progreso</p>
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
            {recentTickets.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No hay tickets para mostrar</p>
            ) : (
              recentTickets.map((ticket) => (
                <div key={ticket.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{ticket.title}</h4>
                    <p className="text-sm text-gray-600">
                      Ticket #{ticket.ticket_number} • {new Date(ticket.created_at).toLocaleDateString('es-ES')}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getPriorityColor(ticket.priority)}>
                      {getPriorityText(ticket.priority)}
                    </Badge>
                    <Badge className={getStatusColor(ticket.status)}>
                      {getStatusText(ticket.status)}
                    </Badge>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
