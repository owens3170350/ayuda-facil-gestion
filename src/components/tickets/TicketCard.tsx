
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Ticket } from "@/hooks/useTickets";
import { useAuth } from "@/hooks/useAuth";

interface TicketCardProps {
  ticket: Ticket;
  onUpdateStatus: (ticketId: string, status: Ticket['status']) => void;
}

export const TicketCard = ({ ticket, onUpdateStatus }: TicketCardProps) => {
  const { userRole } = useAuth();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open": return "bg-red-100 text-red-800 border-red-200";
      case "in_progress": return "bg-blue-100 text-blue-800 border-blue-200";
      case "pending": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "resolved": return "bg-green-100 text-green-800 border-green-200";
      case "closed": return "bg-gray-100 text-gray-800 border-gray-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent": return "bg-red-500 text-white";
      case "high": return "bg-red-100 text-red-800 border-red-200";
      case "medium": return "bg-orange-100 text-orange-800 border-orange-200";
      case "low": return "bg-blue-100 text-blue-800 border-blue-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
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
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
          <div className="flex-1">
            <CardTitle className="text-lg">
              #{ticket.ticket_number} - {ticket.title}
            </CardTitle>
            <p className="text-sm text-gray-600 mt-2">
              {ticket.description}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge className={getStatusColor(ticket.status)}>
              {getStatusText(ticket.status)}
            </Badge>
            <Badge className={getPriorityColor(ticket.priority)}>
              {getPriorityText(ticket.priority)}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm mb-4">
          <div>
            <span className="font-medium text-gray-700">Categoría:</span>
            <p className="text-gray-600">
              {ticket.categories?.name} / {ticket.subcategories?.name}
            </p>
          </div>
          <div>
            <span className="font-medium text-gray-700">Creado por:</span>
            <p className="text-gray-600">{ticket.profiles?.full_name || ticket.profiles?.email}</p>
          </div>
          {userRole === "admin" && ticket.assigned_user && (
            <div>
              <span className="font-medium text-gray-700">Asignado a:</span>
              <p className="text-gray-600">{ticket.assigned_user.full_name || ticket.assigned_user.email}</p>
            </div>
          )}
          <div>
            <span className="font-medium text-gray-700">Creado:</span>
            <p className="text-gray-600">
              {new Date(ticket.created_at).toLocaleDateString('es-ES')}
            </p>
          </div>
        </div>
        
        {userRole === "admin" && (
          <div className="flex flex-wrap gap-2 mt-4">
            <Select 
              value={ticket.status} 
              onValueChange={(status: Ticket['status']) => onUpdateStatus(ticket.id, status)}
            >
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="open">Abierto</SelectItem>
                <SelectItem value="in_progress">En Progreso</SelectItem>
                <SelectItem value="pending">Pendiente</SelectItem>
                <SelectItem value="resolved">Resuelto</SelectItem>
                <SelectItem value="closed">Cerrado</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              Ver Detalles
            </Button>
            <Button variant="outline" size="sm">
              Asignar
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
