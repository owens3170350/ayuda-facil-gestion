
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

export interface Ticket {
  id: string;
  ticket_number: string;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'pending' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category_id: string;
  subcategory_id: string;
  client_id: string;
  assigned_to?: string;
  created_at: string;
  updated_at: string;
  resolved_at?: string;
  due_date?: string;
  categories?: { name: string };
  subcategories?: { name: string };
  profiles?: { full_name: string; email: string };
  assigned_user?: { full_name: string; email: string };
}

export interface CreateTicketData {
  title: string;
  description: string;
  category_id: string;
  subcategory_id: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

export const useTickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, userRole } = useAuth();

  const fetchTickets = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('tickets')
        .select(`
          *,
          categories (name),
          subcategories (name),
          profiles!tickets_client_id_fkey (full_name, email),
          assigned_user:profiles!tickets_assigned_to_fkey (full_name, email)
        `)
        .order('created_at', { ascending: false });

      // Si no es admin, solo mostrar sus propios tickets
      if (userRole === 'client') {
        query = query.eq('client_id', user?.id);
      }

      const { data, error } = await query;

      if (error) {
        toast.error('Error al cargar tickets');
        console.error('Error fetching tickets:', error);
        return;
      }

      setTickets(data || []);
    } catch (error) {
      console.error('Error fetching tickets:', error);
      toast.error('Error al cargar tickets');
    } finally {
      setLoading(false);
    }
  };

  const createTicket = async (ticketData: CreateTicketData) => {
    try {
      if (!user) {
        toast.error('Debes estar autenticado para crear tickets');
        return { error: 'Not authenticated' };
      }

      const { data, error } = await supabase
        .from('tickets')
        .insert({
          ...ticketData,
          client_id: user.id,
        })
        .select()
        .single();

      if (error) {
        toast.error('Error al crear ticket');
        console.error('Error creating ticket:', error);
        return { error };
      }

      toast.success('Ticket creado exitosamente');
      fetchTickets(); // Recargar tickets
      return { data, error: null };
    } catch (error) {
      console.error('Error creating ticket:', error);
      toast.error('Error al crear ticket');
      return { error };
    }
  };

  const updateTicketStatus = async (ticketId: string, status: Ticket['status']) => {
    try {
      const updateData: any = { status };
      
      // Si se marca como resuelto, agregar timestamp
      if (status === 'resolved') {
        updateData.resolved_at = new Date().toISOString();
      }

      const { error } = await supabase
        .from('tickets')
        .update(updateData)
        .eq('id', ticketId);

      if (error) {
        toast.error('Error al actualizar ticket');
        console.error('Error updating ticket:', error);
        return { error };
      }

      toast.success('Ticket actualizado exitosamente');
      fetchTickets(); // Recargar tickets
      return { error: null };
    } catch (error) {
      console.error('Error updating ticket:', error);
      toast.error('Error al actualizar ticket');
      return { error };
    }
  };

  const assignTicket = async (ticketId: string, userId: string) => {
    try {
      const { error } = await supabase
        .from('tickets')
        .update({ assigned_to: userId })
        .eq('id', ticketId);

      if (error) {
        toast.error('Error al asignar ticket');
        console.error('Error assigning ticket:', error);
        return { error };
      }

      toast.success('Ticket asignado exitosamente');
      fetchTickets(); // Recargar tickets
      return { error: null };
    } catch (error) {
      console.error('Error assigning ticket:', error);
      toast.error('Error al asignar ticket');
      return { error };
    }
  };

  useEffect(() => {
    if (user) {
      fetchTickets();
    }
  }, [user, userRole]);

  return {
    tickets,
    loading,
    fetchTickets,
    createTicket,
    updateTicketStatus,
    assignTicket,
  };
};
