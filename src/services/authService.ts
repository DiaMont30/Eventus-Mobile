import { apiPrivate, apiPublic } from "./api";

export interface LoginPayload {
  email: string;
  senha: string;
}

export interface RegisterPayload {
  nome: string;
  email: string;
  senha: string;
}

export interface TokenResponse {
  token: string;
}

export interface AdministradorResponse {
  id: number;
  nome: string;
  email: string;
}

export const authService = {
  async login(credentials: LoginPayload): Promise<TokenResponse> {
    const response = await apiPublic.post<TokenResponse>('/api/auth/login', credentials);
    return response.data;
  },

  async register(data: RegisterPayload): Promise<AdministradorResponse> {
    const response = await apiPublic.post<AdministradorResponse>('/api/administradores/cadastrar', data);
    return response.data;
  },

  async getProfile(): Promise<AdministradorResponse> {
    const response = await apiPrivate.get<AdministradorResponse>('/api/administradores/me');
    return response.data;
  }
};