
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Edit, Trash2, FolderTree, Tag } from "lucide-react";

export const CategoryManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Datos de ejemplo - después conectaremos con Supabase
  const categories = [
    {
      id: 1,
      name: "Acceso",
      description: "Problemas relacionados con el acceso al sistema",
      subcategories: [
        { id: 1, name: "Login", ticketCount: 15 },
        { id: 2, name: "Permisos", ticketCount: 8 },
        { id: 3, name: "Bloqueo de cuenta", ticketCount: 3 }
      ],
      ticketCount: 26,
      color: "red"
    },
    {
      id: 2,
      name: "Facturación",
      description: "Consultas y problemas de facturación",
      subcategories: [
        { id: 4, name: "Generación", ticketCount: 12 },
        { id: 5, name: "Errores", ticketCount: 5 },
        { id: 6, name: "Modificaciones", ticketCount: 7 }
      ],
      ticketCount: 24,
      color: "blue"
    },
    {
      id: 3,
      name: "Técnico",
      description: "Problemas técnicos del sistema",
      subcategories: [
        { id: 7, name: "Error de sistema", ticketCount: 20 },
        { id: 8, name: "Rendimiento", ticketCount: 6 },
        { id: 9, name: "Funcionalidad", ticketCount: 9 }
      ],
      ticketCount: 35,
      color: "orange"
    },
    {
      id: 4,
      name: "Consulta",
      description: "Consultas generales y dudas",
      subcategories: [
        { id: 10, name: "Funcionalidades", ticketCount: 18 },
        { id: 11, name: "Procedimientos", ticketCount: 10 },
        { id: 12, name: "General", ticketCount: 14 }
      ],
      ticketCount: 42,
      color: "green"
    }
  ];

  const getCategoryColor = (color: string) => {
    switch (color) {
      case "red": return "bg-red-100 text-red-800 border-red-200";
      case "blue": return "bg-blue-100 text-blue-800 border-blue-200";
      case "orange": return "bg-orange-100 text-orange-800 border-orange-200";
      case "green": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-xl font-semibold">Gestión de Categorías</h3>
          <p className="text-gray-600">Administra las categorías y subcategorías de tickets</p>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Nueva Categoría</span>
        </Button>
      </div>

      {/* Búsqueda */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar categorías..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <FolderTree className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Total Categorías</p>
                <p className="text-2xl font-bold">{categories.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Tag className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium">Subcategorías</p>
                <p className="text-2xl font-bold">
                  {categories.reduce((total, cat) => total + cat.subcategories.length, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Tag className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium">Total Tickets</p>
                <p className="text-2xl font-bold">
                  {categories.reduce((total, cat) => total + cat.ticketCount, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de categorías */}
      <div className="space-y-4">
        {filteredCategories.map((category) => (
          <Card key={category.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                    <Badge className={getCategoryColor(category.color)}>
                      {category.ticketCount} tickets
                    </Badge>
                  </div>
                  <CardDescription className="mt-2">
                    {category.description}
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <h4 className="font-medium text-sm text-gray-700">Subcategorías:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {category.subcategories.map((subcategory) => (
                    <div
                      key={subcategory.id}
                      className="flex justify-between items-center p-3 border rounded-lg bg-gray-50"
                    >
                      <span className="text-sm font-medium">{subcategory.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {subcategory.ticketCount}
                      </Badge>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end mt-4">
                  <Button variant="outline" size="sm" className="flex items-center space-x-2">
                    <Plus className="w-4 h-4" />
                    <span>Agregar Subcategoría</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
