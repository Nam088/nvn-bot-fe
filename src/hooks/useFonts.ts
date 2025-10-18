import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fontService } from '@/services/fontService';
import { CreateFontDto, SearchParams } from '@/types/font';

// Query keys
export const fontKeys = {
  all: ['fonts'] as const,
  lists: () => [...fontKeys.all, 'list'] as const,
  list: (params: SearchParams) => [...fontKeys.lists(), params] as const,
  details: () => [...fontKeys.all, 'detail'] as const,
  detail: (id: string) => [...fontKeys.details(), id] as const,
};

// Get all fonts
export function useFonts(params: SearchParams = {}) {
  return useQuery({
    queryKey: fontKeys.list(params),
    queryFn: () => fontService.search(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get font by ID
export function useFont(id: string) {
  return useQuery({
    queryKey: fontKeys.detail(id),
    queryFn: () => fontService.getById(id),
    enabled: !!id,
  });
}

// Create font mutation
export function useCreateFont() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (font: CreateFontDto) => fontService.create(font),
    onSuccess: () => {
      // Invalidate and refetch fonts list
      queryClient.invalidateQueries({ queryKey: fontKeys.lists() });
    },
  });
}

// Update font mutation
export function useUpdateFont() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, font }: { id: string; font: Partial<CreateFontDto> }) =>
      fontService.update(id, font),
    onSuccess: (data, variables) => {
      // Update the specific font in cache
      queryClient.setQueryData(fontKeys.detail(variables.id), data);
      // Invalidate and refetch fonts list
      queryClient.invalidateQueries({ queryKey: fontKeys.lists() });
    },
  });
}

// Delete font mutation
export function useDeleteFont() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => fontService.delete(id),
    onSuccess: (_, id) => {
      // Remove the font from cache
      queryClient.removeQueries({ queryKey: fontKeys.detail(id) });
      // Invalidate and refetch fonts list
      queryClient.invalidateQueries({ queryKey: fontKeys.lists() });
    },
  });
}

// Bulk delete fonts mutation
export function useBulkDeleteFonts() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ids: string[]) => fontService.deleteMany(ids),
    onSuccess: (_, ids) => {
      // Remove deleted fonts from cache
      ids.forEach(id => {
        queryClient.removeQueries({ queryKey: fontKeys.detail(id) });
      });
      // Invalidate and refetch fonts list
      queryClient.invalidateQueries({ queryKey: fontKeys.lists() });
    },
  });
}

// Bulk update fonts mutation
export function useBulkUpdateFonts() {
  const queryClient = useQueryClient();

  return useMutation({
        mutationFn: (updateData: { ids: string[]; isSupportVietnamese?: boolean; isVip?: boolean; isActive?: boolean }) =>
          fontService.updateMany(updateData),
    onSuccess: (_, updateData) => {
      // Invalidate and refetch fonts list
      queryClient.invalidateQueries({ queryKey: fontKeys.lists() });
      // Also invalidate individual font details if they exist in cache
      updateData.ids.forEach(id => {
        queryClient.invalidateQueries({ queryKey: fontKeys.detail(id) });
      });
    },
  });
}
