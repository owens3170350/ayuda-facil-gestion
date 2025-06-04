
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

export interface Ticket {
  id: string;
  ticket_number: string;
  title: string;
  description?: string;
  status: 'open' | 'in_progress' | 'pending' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category_id?: string;
  subcategory_id?: string;
  client_id?: string;
  assigned_to?: string;
  created_at: string;
  updated_at: string;
  resolved_at?: string;
  due_date?: string;
  categories?: {
    name: string;
    color: string;
  } | null;
  profiles?: {
    full_name: string;
    email: string;
  } | null;
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
    if (!user) return;

    try {
      let query = supabase
        .from('tickets')
        .select(`
          *,
          categories (name, color),
          profiles (full_name, email)
        `)
        .order('created_at', { ascending: false });

      // Si es cliente, solo mostrar sus tickets
      if (userRole === 'client') {
        query = query.eq('client_id', user.id);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching tickets:', error);
        toast.error('Error al cargar tickets');
        return;
      }

      // Transformar los datos para que coincidan con nuestro tipo Ticket
      const transformedTickets: Ticket[] = (data || []).map(ticket => ({
        ...ticket,
        categories: ticket.categories as { name: string; color: string } | null,
        profiles: ticket.profiles as { full_name: string; email: string } | null,
      }));

      setTickets(transformedTickets);
    } catch (error) {
      console.error('Error fetching tickets:', error);
      toast.error('Error al cargar tickets');
    } finally {
      setLoading(false);
    }
  };

  const createTicket = async (ticketData: CreateTicketData) => {
    if (!user) {
      toast.error('Debe estar autenticado para crear tickets');
      return { error: 'Not authenticated' };
    }

    try {
      const insertData = {
        title: ticketData.title,
        description: ticketData.description,
        category_id: ticketData.category_id,
        subcategory_id: ticketData.subcategory_id,
        priority: ticketData.priority,
        client_id: user.id,
        ticket_number: '', // Se auto-genera con el trigger
      };

      const { data, error } = await supabase
        .from('tickets')
        .insert(insertData)
        .select()
        .single();

      if (error) {
        console.error('Error creating ticket:', error);
        toast.error('Error al crear ticket: ' + error.message);
        return { error };
      }

      toast.success('Ticket creado exitosamente');
      await fetchTickets(); // Recargar lista
      return { error: null, data };
    } catch (error: any) {
      console.error('Error creating ticket:', error);
      toast.error('Error al crear ticket');
      return { error };
    }
  };

  const updateTicketStatus = async (ticketId: string, status: Ticket['status']) => {
    try {
      const { error } = await supabase
        .from('tickets')
        .update({ 
          status,
          resolved_at: status === 'resolved' ? new Date().toISOString() : null
        })
        .eq('id', ticketId);

      if (error) {
        console.error('Error updating ticket:', error);
        toast.error('Error al actualizar ticket');
        return;
      }

      toast.success('Estado del ticket actualizado');
      await fetchTickets(); // Recargar lista
    } catch (error) {
      console.error('Error updating ticket:', error);
      toast.error('Error al actualizar ticket');
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
  };
};
