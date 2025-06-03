
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Filter } from "lucide-react";
import { CreateTicketDialog } from "./CreateTicketDialog";

interface TicketListProps {
  userRole: "admin" | "client";
}

export const TicketList = ({ userRole }: TicketListProps) => {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  // Datos de ejemplo - después conectaremos con Supabase
  const tickets = [
    {
      id: 1,
      title: "Problema con login de usuario",
      description: "No puedo acceder a mi cuenta desde esta mañana",
      status: "open",
      priority: "high",
      category: "Acceso",
      subcategory: "Login",
      createdBy: "Juan Pérez",
      assignedTo: "María García",
      created: "2024-01-15T10:30:00",
      updated: "2024-01-15T11:00:00"
    },
    {
      id: 2,
      title: "Error en proceso de facturación",
      description: "El sistema no genera la factura correctamente",
      status: "pending",
      priority: "medium",
      category: "Facturación",
      subcategory: "Generación",
      createdBy: "Ana López",
      assignedTo: "Carlos Ruiz",
      created: "2024-01-14T15:20:00",
      updated: "2024-01-15T09:15:00"
    },
    {
      id: 3,
      title: "Consulta sobre funcionalidades",
      description: "¿Cómo puedo exportar mis datos a Excel?",
      status: "resolved",
      priority: "low",
      category: "Consulta",
      subcategory: "Funcionalidades",
      createdBy: "Pedro Martín",
      assignedTo: "Laura Sánchez",
      created: "2024-01-13T11:45:00",
      updated: "2024-01-14T16:30:00"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open": return "bg-red-100 text-red-800 border-red-200";
      case "pending": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "resolved": return "bg-green-100 text-green-800 border-green-200";
      case "closed": return "bg-gray-100 text-gray-800 border-gray-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800 border-red-200";
      case "medium": return "bg-orange-100 text-orange-800 border-orange-200";
      case "low": return "bg-blue-100 text-blue-800 border-blue-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "open": return "Abierto";
      case "pending": return "Pendiente";
      case "resolved": return "Resuelto";
      case "closed": return "Cerrado";
      default: return status;
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case "high": return "Alta";
      case "medium": return "Media";
      case "low": return "Baja";
      default: return priority;
    }
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || ticket.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestión de Tickets</h2>
          <p className="text-gray-600">
            {userRole === "admin" 
              ? "Administra todos los tickets del sistema" 
              : "Visualiza y crea tus tickets de soporte"
            }
          </p>
        </div>
        <Button onClick={() => setShowCreateDialog(true)} className="flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Nuevo Ticket</span>
        </Button>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filtros de Búsqueda</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar tickets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="open">Abierto</SelectItem>
                <SelectItem value="pending">Pendiente</SelectItem>
                <SelectItem value="resolved">Resuelto</SelectItem>
                <SelectItem value="closed">Cerrado</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Prioridad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las prioridades</SelectItem>
                <SelectItem value="high">Alta</SelectItem>
                <SelectItem value="medium">Media</SelectItem>
                <SelectItem value="low">Baja</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Tickets */}
      <div className="space-y-4">
        {filteredTickets.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-gray-500">No se encontraron tickets que coincidan con los filtros.</p>
            </CardContent>
          </Card>
        ) : (
          filteredTickets.map((ticket) => (
            <Card key={ticket.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-lg">
                      #{ticket.id} - {ticket.title}
                    </CardTitle>
                    <CardDescription className="mt-2">
                      {ticket.description}
                    </CardDescription>
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Categoría:</span>
                    <p className="text-gray-600">{ticket.category} / {ticket.subcategory}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Creado por:</span>
                    <p className="text-gray-600">{ticket.createdBy}</p>
                  </div>
                  {userRole === "admin" && (
                    <div>
                      <span className="font-medium text-gray-700">Asignado a:</span>
                      <p className="text-gray-600">{ticket.assignedTo}</p>
                    </div>
                  )}
                  <div>
                    <span className="font-medium text-gray-700">Creado:</span>
                    <p className="text-gray-600">
                      {new Date(ticket.created).toLocaleDateString('es-ES')}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button variant="outline" size="sm">
                    Ver Detalles
                  </Button>
                  {userRole === "admin" && (
                    <>
                      <Button variant="outline" size="sm">
                        Editar
                      </Button>
                      <Button variant="outline" size="sm">
                        Asignar
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <CreateTicketDialog 
        open={showCreateDialog} 
        onOpenChange={setShowCreateDialog}
        userRole={userRole}
      />
    </div>
  );
};
