
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, UserIcon, TagIcon } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Ticket } from "@/hooks/useTickets";
import { useAuth } from "@/hooks/useAuth";

interface TicketCardProps {
  ticket: Ticket;
  onUpdateStatus: (ticketId: string, status: Ticket['status']) => void;
}

const statusLabels = {
  open: 'Abierto',
  in_progress: 'En Progreso',
  pending: 'Pendiente',
  resolved: 'Resuelto',
  closed: 'Cerrado'
};

const priorityLabels = {
  low: 'Baja',
  medium: 'Media',
  high: 'Alta',
  urgent: 'Urgente'
};

const statusColors = {
  open: 'bg-blue-100 text-blue-800',
  in_progress: 'bg-yellow-100 text-yellow-800',
  pending: 'bg-orange-100 text-orange-800',
  resolved: 'bg-green-100 text-green-800',
  closed: 'bg-gray-100 text-gray-800'
};

const priorityColors = {
  low: 'bg-gray-100 text-gray-800',
  medium: 'bg-blue-100 text-blue-800',
  high: 'bg-orange-100 text-orange-800',
  urgent: 'bg-red-100 text-red-800'
};

export const TicketCard = ({ ticket, onUpdateStatus }: TicketCardProps) => {
  const { userRole } = useAuth();

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{ticket.ticket_number}</CardTitle>
            <h3 className="font-semibold text-gray-900 mt-1">{ticket.title}</h3>
          </div>
          <div className="flex gap-2">
            <Badge className={statusColors[ticket.status]}>
              {statusLabels[ticket.status]}
            </Badge>
            <Badge className={priorityColors[ticket.priority]}>
              {priorityLabels[ticket.priority]}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {ticket.description && (
          <p className="text-gray-600 text-sm">{ticket.description}</p>
        )}
        
        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <CalendarIcon className="w-4 h-4" />
            <span>{format(new Date(ticket.created_at), 'PPP', { locale: es })}</span>
          </div>
          
          {ticket.profiles && (
            <div className="flex items-center gap-1">
              <UserIcon className="w-4 h-4" />
              <span>{ticket.profiles.full_name || ticket.profiles.email}</span>
            </div>
          )}
          
          {ticket.categories && (
            <div className="flex items-center gap-1">
              <TagIcon className="w-4 h-4" />
              <span>{ticket.categories.name}</span>
            </div>
          )}
        </div>

        {userRole === 'admin' && (
          <div className="border-t pt-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Estado:</span>
              <Select
                value={ticket.status}
                onValueChange={(value: Ticket['status']) => onUpdateStatus(ticket.id, value)}
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
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
