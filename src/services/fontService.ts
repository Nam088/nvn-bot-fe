import axios from 'axios';
import { FontDto, CreateFontDto, ApiResponse, ApiPaginatedResponse, SearchParams, DeleteManyResultDto, UpdateManyFontsDto, UpdateManyResultDto } from '@/types/font';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3012/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fontService = {
  // Get all fonts
  getAll: async (): Promise<ApiResponse<FontDto>[]> => {
    const response = await api.get('/fonts');
    return response.data;
  },

  // Get font by ID
  getById: async (id: string): Promise<ApiResponse<FontDto>> => {
    const response = await api.get(`/fonts/${id}`);
    return response.data;
  },

  // Search fonts
  search: async (params: SearchParams): Promise<ApiPaginatedResponse<FontDto>> => {
    const response = await api.get('/fonts/search', { params });
    return response.data;
  },

  // Create font
  create: async (font: CreateFontDto): Promise<ApiResponse<FontDto>> => {
    const response = await api.post('/fonts', font);
    return response.data;
  },

  // Update font
  update: async (id: string, font: Partial<CreateFontDto>): Promise<ApiResponse<FontDto>> => {
    const response = await api.patch(`/fonts/${id}`, font);
    return response.data;
  },

  // Delete font
  delete: async (id: string): Promise<void> => {
    await api.delete(`/fonts/${id}`);
  },

  // Bulk delete fonts
  deleteMany: async (ids: string[]): Promise<ApiResponse<DeleteManyResultDto>> => {
    const response = await api.delete('/fonts/bulk', {
      data: { ids }
    });
    return response.data;
  },

  // Bulk update fonts
  updateMany: async (updateData: UpdateManyFontsDto): Promise<ApiResponse<UpdateManyResultDto>> => {
    const response = await api.patch('/fonts/bulk', updateData);
    return response.data;
  },
};
