
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save, Settings, Mail, Bell, Shield } from "lucide-react";

export const SystemSettings = () => {
  const [settings, setSettings] = useState({
    // Configuración general
    siteName: "HelpDesk Pro",
    siteDescription: "Sistema de Gestión de Tickets",
    adminEmail: "admin@helpdesk.com",
    defaultLanguage: "es",
    
    // Configuración de tickets
    autoAssignment: true,
    allowClientCreation: true,
    requireApproval: false,
    maxAttachmentSize: "10",
    defaultPriority: "medium",
    
    // Notificaciones
    emailNotifications: true,
    clientNotifications: true,
    adminNotifications: true,
    escalationTime: "24",
    
    // Seguridad
    sessionTimeout: "30",
    passwordMinLength: "8",
    requireTwoFactor: false,
    allowGuestTickets: false
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    console.log("Guardando configuración:", settings);
    // Aquí conectaremos con Supabase para guardar la configuración
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold">Configuración del Sistema</h3>
        <p className="text-gray-600">Configura los parámetros generales del helpdesk</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Configuración General */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="w-5 h-5" />
              <span>Configuración General</span>
            </CardTitle>
            <CardDescription>Parámetros básicos del sistema</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="siteName">Nombre del Sistema</Label>
              <Input
                id="siteName"
                value={settings.siteName}
                onChange={(e) => handleSettingChange("siteName", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="siteDescription">Descripción</Label>
              <Textarea
                id="siteDescription"
                value={settings.siteDescription}
                onChange={(e) => handleSettingChange("siteDescription", e.target.value)}
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="adminEmail">Email del Administrador</Label>
              <Input
                id="adminEmail"
                type="email"
                value={settings.adminEmail}
                onChange={(e) => handleSettingChange("adminEmail", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="defaultLanguage">Idioma por Defecto</Label>
              <Select value={settings.defaultLanguage} onValueChange={(value) => handleSettingChange("defaultLanguage", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="pt">Português</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Configuración de Tickets */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Mail className="w-5 h-5" />
              <span>Configuración de Tickets</span>
            </CardTitle>
            <CardDescription>Parámetros para la gestión de tickets</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Asignación Automática</Label>
                <p className="text-sm text-gray-600">Asignar tickets automáticamente</p>
              </div>
              <Switch
                checked={settings.autoAssignment}
                onCheckedChange={(checked) => handleSettingChange("autoAssignment", checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Clientes Pueden Crear Tickets</Label>
                <p className="text-sm text-gray-600">Permitir que clientes creen tickets</p>
              </div>
              <Switch
                checked={settings.allowClientCreation}
                onCheckedChange={(checked) => handleSettingChange("allowClientCreation", checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Requiere Aprobación</Label>
                <p className="text-sm text-gray-600">Los tickets necesitan aprobación</p>
              </div>
              <Switch
                checked={settings.requireApproval}
                onCheckedChange={(checked) => handleSettingChange("requireApproval", checked)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="maxAttachmentSize">Tamaño Máximo de Archivos (MB)</Label>
              <Input
                id="maxAttachmentSize"
                type="number"
                value={settings.maxAttachmentSize}
                onChange={(e) => handleSettingChange("maxAttachmentSize", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="defaultPriority">Prioridad por Defecto</Label>
              <Select value={settings.defaultPriority} onValueChange={(value) => handleSettingChange("defaultPriority", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Baja</SelectItem>
                  <SelectItem value="medium">Media</SelectItem>
                  <SelectItem value="high">Alta</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Configuración de Notificaciones */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="w-5 h-5" />
              <span>Notificaciones</span>
            </CardTitle>
            <CardDescription>Configuración de alertas y notificaciones</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Notificaciones por Email</Label>
                <p className="text-sm text-gray-600">Enviar notificaciones por correo</p>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => handleSettingChange("emailNotifications", checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Notificar a Clientes</Label>
                <p className="text-sm text-gray-600">Notificar cambios a clientes</p>
              </div>
              <Switch
                checked={settings.clientNotifications}
                onCheckedChange={(checked) => handleSettingChange("clientNotifications", checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Notificar a Administradores</Label>
                <p className="text-sm text-gray-600">Notificar nuevos tickets a admins</p>
              </div>
              <Switch
                checked={settings.adminNotifications}
                onCheckedChange={(checked) => handleSettingChange("adminNotifications", checked)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="escalationTime">Tiempo de Escalamiento (horas)</Label>
              <Input
                id="escalationTime"
                type="number"
                value={settings.escalationTime}
                onChange={(e) => handleSettingChange("escalationTime", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Configuración de Seguridad */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span>Seguridad</span>
            </CardTitle>
            <CardDescription>Parámetros de seguridad del sistema</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sessionTimeout">Tiempo de Sesión (minutos)</Label>
              <Input
                id="sessionTimeout"
                type="number"
                value={settings.sessionTimeout}
                onChange={(e) => handleSettingChange("sessionTimeout", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="passwordMinLength">Longitud Mínima de Contraseña</Label>
              <Input
                id="passwordMinLength"
                type="number"
                value={settings.passwordMinLength}
                onChange={(e) => handleSettingChange("passwordMinLength", e.target.value)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Autenticación de Dos Factores</Label>
                <p className="text-sm text-gray-600">Requerir 2FA para acceso</p>
              </div>
              <Switch
                checked={settings.requireTwoFactor}
                onCheckedChange={(checked) => handleSettingChange("requireTwoFactor", checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Tickets de Invitados</Label>
                <p className="text-sm text-gray-600">Permitir tickets sin registro</p>
              </div>
              <Switch
                checked={settings.allowGuestTickets}
                onCheckedChange={(checked) => handleSettingChange("allowGuestTickets", checked)}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Botón de guardar */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="flex items-center space-x-2">
          <Save className="w-4 h-4" />
          <span>Guardar Configuración</span>
        </Button>
      </div>
    </div>
  );
};
