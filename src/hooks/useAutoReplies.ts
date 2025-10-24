import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { autoReplyService } from '@/services/autoReplyService';
import {
  CreateAutoReplyDto,
  UpdateAutoReplyDto,
  UpdatePriorityDto,
  BulkUpdatePriorityDto,
  AutoReplySearchParams,
} from '@/types/autoReply';

// Query keys
export const autoReplyKeys = {
  all: ['autoReplies'] as const,
  lists: () => [...autoReplyKeys.all, 'list'] as const,
  list: (params?: AutoReplySearchParams) => [...autoReplyKeys.lists(), params] as const,
  details: () => [...autoReplyKeys.all, 'detail'] as const,
  detail: (id: string) => [...autoReplyKeys.details(), id] as const,
  query: (text: string) => [...autoReplyKeys.all, 'query', text] as const,
};

// Get all auto-replies with pagination
export function useAutoReplies(params?: AutoReplySearchParams) {
  return useQuery({
    queryKey: autoReplyKeys.list(params),
    queryFn: () => autoReplyService.getAll(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get auto-reply by ID
export function useAutoReply(id: string) {
  return useQuery({
    queryKey: autoReplyKeys.detail(id),
    queryFn: () => autoReplyService.getById(id),
    enabled: !!id,
  });
}

// Query auto-reply (search for matching keyword)
export function useQueryAutoReply(text: string) {
  return useQuery({
    queryKey: autoReplyKeys.query(text),
    queryFn: () => autoReplyService.query({ text }),
    enabled: !!text,
    staleTime: 0, // Always fresh for real-time search
  });
}

// Create auto-reply mutation
export function useCreateAutoReply() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateAutoReplyDto) => autoReplyService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: autoReplyKeys.lists() });
    },
  });
}

// Update auto-reply mutation
export function useUpdateAutoReply() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateAutoReplyDto }) =>
      autoReplyService.update(id, data),
    onSuccess: (response, variables) => {
      queryClient.setQueryData(autoReplyKeys.detail(variables.id), response);
      queryClient.invalidateQueries({ queryKey: autoReplyKeys.lists() });
    },
  });
}

// Update priority mutation (single item)
export function useUpdatePriority() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePriorityDto }) =>
      autoReplyService.updatePriority(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: autoReplyKeys.lists() });
    },
  });
}

// Bulk update priority mutation (multiple items - optimized)
export function useBulkUpdatePriority() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: BulkUpdatePriorityDto) => autoReplyService.bulkUpdatePriority(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: autoReplyKeys.lists() });
    },
  });
}

// Delete auto-reply mutation
export function useDeleteAutoReply() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => autoReplyService.delete(id),
    onSuccess: (_, id) => {
      queryClient.removeQueries({ queryKey: autoReplyKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: autoReplyKeys.lists() });
    },
  });
}

