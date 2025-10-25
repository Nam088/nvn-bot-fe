import axios from 'axios';
import { 
  DownloadTracking, 
  CreateTrackingDto, 
  QueryTrackingDto, 
  TrackingStatsDto, 
  TrackingResponse, 
  FontDownloadCount,
  TrackingDetail
} from '@/types/tracking';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3012/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const trackingService = {
  // Track a download
  trackDownload: async (data: CreateTrackingDto): Promise<DownloadTracking> => {
    const response = await api.post('/tracking', data);
    return response.data;
  },

  // Get all tracking records with filters
  getAll: async (params?: QueryTrackingDto): Promise<TrackingResponse> => {
    const response = await api.get('/tracking', { params });
    return response.data;
  },

  // Get tracking statistics
  getStats: async (): Promise<TrackingStatsDto> => {
    const response = await api.get('/tracking/stats');
    return response.data;
  },

  // Get user download history
  getUserHistory: async (userId: number, limit: number = 20): Promise<DownloadTracking[]> => {
    const response = await api.get(`/tracking/user/${userId}`, { 
      params: { limit } 
    });
    return response.data;
  },

  // Get font download count
  getFontDownloadCount: async (fontId: string): Promise<FontDownloadCount> => {
    const response = await api.get(`/tracking/font/${fontId}/count`);
    return response.data;
  },

  // Get tracking detail with font information
  getDetail: async (id: string): Promise<TrackingDetail> => {
    const response = await api.get(`/tracking/${id}`);
    return response.data;
  },
};
