
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart3, TrendingUp, Clock, Users, CheckCircle, AlertTriangle } from "lucide-react";

export const AdminStatistics = () => {
  // Datos de ejemplo - después conectaremos con Supabase para datos reales
  const stats = {
    totalTickets: 127,
    resolvedTickets: 89,
    avgResolutionTime: "4.2 horas",
    customerSatisfaction: 94,
    activeUsers: 45,
    monthlyGrowth: 12.5,
    categoryStats: [
      { name: "Consulta", count: 42, percentage: 33 },
      { name: "Técnico", count: 35, percentage: 28 },
      { name: "Acceso", count: 26, percentage: 20 },
      { name: "Facturación", count: 24, percentage: 19 }
    ],
    priorityStats: [
      { name: "Alta", count: 15, color: "bg-red-500" },
      { name: "Media", count: 67, color: "bg-yellow-500" },
      { name: "Baja", count: 45, color: "bg-green-500" }
    ],
    monthlyData: [
      { month: "Ene", tickets: 45, resolved: 42 },
      { month: "Feb", tickets: 52, resolved: 48 },
      { month: "Mar", tickets: 38, resolved: 36 },
      { month: "Abr", tickets: 61, resolved: 55 },
      { month: "May", tickets: 49, resolved: 47 },
      { month: "Jun", tickets: 127, resolved: 89 }
    ]
  };

  const resolutionRate = Math.round((stats.resolvedTickets / stats.totalTickets) * 100);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold">Estadísticas del Sistema</h3>
        <p className="text-gray-600">Métricas y análisis de rendimiento del helpdesk</p>
      </div>

      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
            <BarChart3 className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTickets}</div>
            <p className="text-xs text-muted-foreground">
              +{stats.monthlyGrowth}% este mes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasa de Resolución</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{resolutionRate}%</div>
            <p className="text-xs text-muted-foreground">
              {stats.resolvedTickets} de {stats.totalTickets} resueltos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tiempo Promedio</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgResolutionTime}</div>
            <p className="text-xs text-muted-foreground">
              Tiempo de resolución
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Satisfacción</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.customerSatisfaction}%</div>
            <p className="text-xs text-muted-foreground">
              Satisfacción del cliente
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Distribución por categorías */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Tickets por Categoría</CardTitle>
            <CardDescription>Distribución de tickets por tipo</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {stats.categoryStats.map((category) => (
              <div key={category.name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{category.name}</span>
                  <span className="text-gray-600">{category.count} tickets</span>
                </div>
                <Progress value={category.percentage} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tickets por Prioridad</CardTitle>
            <CardDescription>Distribución según nivel de prioridad</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {stats.priorityStats.map((priority) => (
              <div key={priority.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${priority.color}`}></div>
                  <span className="font-medium">{priority.name}</span>
                </div>
                <div className="text-right">
                  <span className="font-bold">{priority.count}</span>
                  <span className="text-sm text-gray-600 ml-1">tickets</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Tendencias mensuales */}
      <Card>
        <CardHeader>
          <CardTitle>Tendencia Mensual</CardTitle>
          <CardDescription>Tickets creados vs resueltos por mes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats.monthlyData.map((month) => (
              <div key={month.month} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{month.month}</span>
                  <span className="text-gray-600">
                    {month.resolved}/{month.tickets} resueltos
                  </span>
                </div>
                <div className="flex space-x-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${(month.tickets / 70) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${(month.resolved / 70) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center space-x-6 mt-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Tickets Creados</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Tickets Resueltos</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
