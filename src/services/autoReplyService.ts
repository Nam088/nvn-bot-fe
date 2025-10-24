import axios from 'axios';
import {
  AutoReplyDto,
  CreateAutoReplyDto,
  UpdateAutoReplyDto,
  AutoReplyQueryDto,
  AutoReplyQueryResponseDto,
  UpdatePriorityDto,
  BulkUpdatePriorityDto,
  BulkUpdatePriorityResultDto,
  ApiResponse,
  ApiPaginatedResponse,
  AutoReplySearchParams,
} from '@/types/autoReply';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3012/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const autoReplyService = {
  // Query auto-reply (main feature)
  query: async (data: AutoReplyQueryDto): Promise<ApiResponse<AutoReplyQueryResponseDto>> => {
    const response = await api.post('/auto-reply/query', data);
    return response.data;
  },

  // List auto-replies with pagination
  getAll: async (params?: AutoReplySearchParams): Promise<ApiPaginatedResponse<AutoReplyDto>> => {
    const response = await api.get('/auto-reply', { params });
    return response.data;
  },

  // Get single auto-reply by ID
  getById: async (id: string): Promise<ApiResponse<AutoReplyDto>> => {
    const response = await api.get(`/auto-reply/${id}`);
    return response.data;
  },

  // Create auto-reply
  create: async (data: CreateAutoReplyDto): Promise<ApiResponse<AutoReplyDto>> => {
    const response = await api.post('/auto-reply', data);
    return response.data;
  },

  // Update auto-reply (partial update)
  update: async (id: string, data: UpdateAutoReplyDto): Promise<ApiResponse<AutoReplyDto>> => {
    const response = await api.patch(`/auto-reply/${id}`, data);
    return response.data;
  },

  // Update priority (for drag & drop)
  updatePriority: async (id: string, data: UpdatePriorityDto): Promise<ApiResponse<{ id: string; priority: number }>> => {
    const response = await api.patch(`/auto-reply/${id}/priority`, data);
    return response.data;
  },

  // Bulk update priority (for drag & drop multiple items)
  bulkUpdatePriority: async (data: BulkUpdatePriorityDto): Promise<ApiResponse<BulkUpdatePriorityResultDto>> => {
    const response = await api.patch('/auto-reply/bulk-priority', data);
    return response.data;
  },

  // Delete auto-reply
  delete: async (id: string): Promise<ApiResponse<{ deleted: boolean }>> => {
    const response = await api.delete(`/auto-reply/${id}`);
    return response.data;
  },
};

