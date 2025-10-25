import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { trackingService } from '@/services/trackingService';
import { QueryTrackingDto, CreateTrackingDto } from '@/types/tracking';

export const useTracking = (params?: QueryTrackingDto) => {
  return useQuery({
    queryKey: ['tracking', params],
    queryFn: () => trackingService.getAll(params),
    staleTime: 30000, // 30 seconds
  });
};

export const useTrackingStats = () => {
  return useQuery({
    queryKey: ['tracking-stats'],
    queryFn: () => trackingService.getStats(),
    staleTime: 60000, // 1 minute
  });
};

export const useUserHistory = (userId: number, limit: number = 20) => {
  return useQuery({
    queryKey: ['user-history', userId, limit],
    queryFn: () => trackingService.getUserHistory(userId, limit),
    enabled: !!userId,
  });
};

export const useFontDownloadCount = (fontId: string) => {
  return useQuery({
    queryKey: ['font-download-count', fontId],
    queryFn: () => trackingService.getFontDownloadCount(fontId),
    enabled: !!fontId,
  });
};

export const useTrackDownload = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateTrackingDto) => trackingService.trackDownload(data),
    onSuccess: () => {
      // Invalidate tracking queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['tracking'] });
      queryClient.invalidateQueries({ queryKey: ['tracking-stats'] });
    },
  });
};

export const useTrackingDetail = (id: string) => {
  return useQuery({
    queryKey: ['tracking-detail', id],
    queryFn: () => trackingService.getDetail(id),
    enabled: !!id,
    staleTime: 30000, // 30 seconds
  });
};
