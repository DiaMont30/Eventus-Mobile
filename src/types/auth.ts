export interface LoginRequestDTO {
  email: string;
  senha: string;
}

export interface RegisterRequestDTO {
  nome: string;
  email: string;
  senha: string;
}

export interface TokenResponseDTO {
  token: string;
}

export interface AdministradorResponseDTO {
  id: number;
  nome: string;
  email: string;
}