export interface EventoRequestDTO {
  nome: string;
  data: string;
  localizacao: string;
  imagem?: string;
  adminId: number;
}

export interface EventoResponseDTO {
  id: number;
  nome: string;
  data: string;
  localizacao: string;
  imagem: string;
}

export interface PageResponseDTO<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

export interface EventItem {
  id: number | string;
  title: string;
  date: string;
  location: string;
  image: string;
}

export interface EventFormData {
  nome: string;
  data: string;
  localizacao: string;
  imagem?: string;
}
