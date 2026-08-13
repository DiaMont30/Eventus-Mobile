import { apiPrivate } from "./api";

export interface EventoRequest {
  nome: string;
  data: string; 
  localizacao: string;
  imagem?: string;
  adminId: number;
}

export interface EventoResponse {
  id: number;
  nome: string;
  data: string;
  localizacao: string;
  imagem: string;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

export const eventoService = {
  async listarTodos(page = 0, size = 10): Promise<PageResponse<EventoResponse>> {
    const response = await apiPrivate.get<PageResponse<EventoResponse>>(`/api/eventos?page=${page}&size=${size}`);
    return response.data;
  },

  async listarPorAdmin(adminId: number, page = 0, size = 10): Promise<PageResponse<EventoResponse>> {
    const response = await apiPrivate.get<PageResponse<EventoResponse>>(`/api/eventos/admin/${adminId}?page=${page}&size=${size}`);
    return response.data;
  },

  async cadastrar(data: EventoRequest): Promise<EventoResponse> {
    const response = await apiPrivate.post<EventoResponse>('/api/eventos', data);
    return response.data;
  },

  async atualizar(id: number, data: Partial<EventoRequest>): Promise<EventoResponse> {
    const response = await apiPrivate.patch<EventoResponse>(`/api/eventos/${id}`, data);
    return response.data;
  },

  async excluir(id: number): Promise<void> {
    await apiPrivate.delete(`/api/eventos/${id}`);
  }
};