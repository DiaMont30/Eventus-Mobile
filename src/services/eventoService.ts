import { EventoRequestDTO, EventoResponseDTO, PageResponseDTO } from "../types/evento";
import { apiPrivate } from "./api";

export const eventoService = {
  async listarTodos(page = 0, size = 10): Promise<PageResponseDTO<EventoResponseDTO>> {
    const response = await apiPrivate.get<PageResponseDTO<EventoResponseDTO>>(`/api/eventos?page=${page}&size=${size}`);
    return response.data;
  },

  async listarPorAdmin(adminId: number, page = 0, size = 10): Promise<PageResponseDTO<EventoResponseDTO>> {
    const response = await apiPrivate.get<PageResponseDTO<EventoResponseDTO>>(`/api/eventos/admin/${adminId}?page=${page}&size=${size}`);
    return response.data;
  },


  async cadastrar(data: EventoRequestDTO): Promise<EventoResponseDTO> {
    const response = await apiPrivate.post<EventoResponseDTO>('/api/eventos', data);
    return response.data;
  },

  async atualizar(id: number, data: Partial<EventoRequestDTO>): Promise<EventoResponseDTO> {
    const response = await apiPrivate.patch<EventoResponseDTO>(`/api/eventos/${id}`, data);
    return response.data;
  },

  async excluir(id: number): Promise<void> {
    await apiPrivate.delete(`/api/eventos/${id}`);
  }
};