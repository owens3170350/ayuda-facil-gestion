
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserIcon, ShieldIcon } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState<"admin" | "client">("client");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        await signUp(email, password, fullName, role);
      } else {
        await signIn(email, password);
      }
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setFullName("");
    setRole("client");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            {isSignUp ? "Crear Cuenta" : "Iniciar Sesión"}
          </CardTitle>
          <CardDescription className="text-center">
            {isSignUp 
              ? "Completa los datos para crear tu cuenta" 
              : "Ingresa tus credenciales para acceder"
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={role} onValueChange={(value) => setRole(value as "admin" | "client")}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="client" className="flex items-center space-x-2">
                <UserIcon className="w-4 h-4" />
                <span>Cliente</span>
              </TabsTrigger>
              <TabsTrigger value="admin" className="flex items-center space-x-2">
                <ShieldIcon className="w-4 h-4" />
                <span>Admin</span>
              </TabsTrigger>
            </TabsList>

            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="fullName">Nombre Completo</Label>
                  <Input
                    id="fullName"
                    placeholder="Tu nombre completo"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <Button type="submit" className="w-full" disabled={loading}>
                {loading 
                  ? "Procesando..." 
                  : isSignUp 
                    ? `Crear cuenta como ${role === 'admin' ? 'Administrador' : 'Cliente'}`
                    : `Acceder como ${role === 'admin' ? 'Administrador' : 'Cliente'}`
                }
              </Button>
            </form>

            <div className="mt-6 text-center space-y-2">
              <Button 
                variant="link" 
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  resetForm();
                }}
              >
                {isSignUp 
                  ? "¿Ya tienes cuenta? Inicia sesión" 
                  : "¿No tienes cuenta? Regístrate"
                }
              </Button>
              
              {!isSignUp && (
                <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                  <p><strong>Credenciales de prueba:</strong></p>
                  <p>Cliente: cliente@test.com / 123456</p>
                  <p>Admin: admin@test.com / admin123</p>
                </div>
              )}
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
