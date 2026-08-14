import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { eventoService } from '../services/eventoService';
import {  EventoRequestDTO, EventoResponseDTO } from '../types/evento';
import { EventItem } from '../components/cards/EventCard';

export function useEvents() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchEvents = useCallback(async () => {
    try {
      setIsLoading(true);
      const adminIdStr = await AsyncStorage.getItem("eventus_admin_id");

      const currentPage = 0;
      const pageSize = 15;
      
      const pageData = adminIdStr 
        ? await eventoService.listarPorAdmin(Number(adminIdStr), currentPage, pageSize) 
        : await eventoService.listarTodos(currentPage, pageSize);

      const formatted: EventItem[] = pageData.content.map((ev: EventoResponseDTO) => ({
        id: ev.id,
        title: ev.nome,
        date: ev.data ? ev.data.split("T")[0] : "",
        location: ev.localizacao,
        image: ev.imagem || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=500&fit=crop&auto=format",
      }));
      
      setEvents(formatted);
    } catch (error) {
      console.error("Erro ao buscar eventos:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const addEvent = useCallback(async (newEvent: Omit<EventItem, "id">) => {
    const adminIdStr = await AsyncStorage.getItem("eventus_admin_id");
    const adminId = Number(adminIdStr);
    
    await eventoService.cadastrar({
      nome: newEvent.title,
      data: newEvent.date.includes("T") ? newEvent.date : `${newEvent.date}T10:00:00`,
      localizacao: newEvent.location,
      imagem: newEvent.image,
      adminId: adminId,
    });

    await fetchEvents();
  }, [fetchEvents]);

  const updateEvent = useCallback(async (id: number | string, updates: Partial<EventItem>) => {
    const patchData: Partial<EventoRequestDTO> = {};

    if (updates.date) {
      patchData.data = updates.date.includes("T") ? updates.date : `${updates.date}T10:00:00`;
    }
    if (updates.location) {
      patchData.localizacao = updates.location;
    }

    await eventoService.atualizar(Number(id), patchData);
    await fetchEvents();
  }, [fetchEvents]);

  const deleteEvent = useCallback(async (id: number | string) => {
    await eventoService.excluir(Number(id));
    setEvents((prev) => prev.filter((e) => e.id !== id));
  }, []);

  return { events, isLoading, addEvent, updateEvent, deleteEvent, refresh: fetchEvents };
}