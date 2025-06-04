
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Clock, CheckCircle, AlertTriangle } from "lucide-react";
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

  const openTickets = tickets.filter(t => t.status === 'open').length;
  const inProgressTickets = tickets.filter(t => t.status === 'in_progress').length;
  const resolvedTickets = tickets.filter(t => t.status === 'resolved').length;
  const urgentTickets = tickets.filter(t => t.priority === 'urgent').length;

  const stats = [
    {
      title: "Tickets Abiertos",
      value: openTickets,
      icon: Clock,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "En Progreso",
      value: inProgressTickets,
      icon: BarChart3,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100"
    },
    {
      title: "Resueltos",
      value: resolvedTickets,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      title: "Urgentes",
      value: urgentTickets,
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-100"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-600">
          {userRole === "admin" 
            ? "Vista general del sistema de tickets" 
            : "Resumen de tus tickets"
          }
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-full ${stat.bgColor}`}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Resumen Rápido</CardTitle>
          <CardDescription>
            Estadísticas generales del sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Total de tickets:</span>
              <span className="font-semibold">{tickets.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Tickets pendientes:</span>
              <span className="font-semibold">{openTickets + inProgressTickets}</span>
            </div>
            <div className="flex justify-between">
              <span>Tasa de resolución:</span>
              <span className="font-semibold">
                {tickets.length > 0 
                  ? Math.round((resolvedTickets / tickets.length) * 100) 
                  : 0}%
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
