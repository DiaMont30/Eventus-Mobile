import { AdministradorResponseDTO, LoginRequestDTO, RegisterRequestDTO, TokenResponseDTO } from "../types/auth";
import { apiPrivate, apiPublic } from "./api";

export const authService = {
  async login(credentials: LoginRequestDTO): Promise<TokenResponseDTO> {
    const response = await apiPublic.post<TokenResponseDTO>('/api/auth/login', credentials);
    return response.data;
  },

  async register(data: RegisterRequestDTO): Promise<AdministradorResponseDTO> {
    const response = await apiPublic.post<AdministradorResponseDTO>('/api/administradores/cadastrar', data);
    return response.data;
  },

  async getProfile(): Promise<AdministradorResponseDTO> {
    const response = await apiPrivate.get<AdministradorResponseDTO>('/api/administradores/me');
    return response.data;
  }
};