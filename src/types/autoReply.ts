export interface AutoReplyDto {
  id: string;
  message: string;
  keywords: string[];
  priority: number;
  isDefault: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAutoReplyDto {
  message: string;
  keywords: string[];
  priority?: number;
  isDefault?: boolean;
  isActive?: boolean;
}

export interface UpdateAutoReplyDto {
  message?: string;
  keywords?: string[];
  priority?: number;
  isDefault?: boolean;
  isActive?: boolean;
}

export interface AutoReplyQueryDto {
  text: string;
}

export interface AutoReplyQueryResponseDto {
  matched: boolean;
  matchedKeyword?: string;
  message: string;
  autoReplyId?: string;
}

export interface UpdatePriorityDto {
  priority: number;
}

export interface BulkUpdatePriorityDto {
  updates: {
    id: string;
    priority: number;
  }[];
}

export interface BulkUpdatePriorityResultItemDto {
  id: string;
  priority: number;
  success: boolean;
}

export interface BulkUpdatePriorityResultDto {
  updated: number;
  failed: number;
  results: BulkUpdatePriorityResultItemDto[];
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  statusCode: number;
}

export interface ApiPaginatedResponse<T> {
  data: T[];
  message: string;
  paging: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  statusCode: number;
}

export interface AutoReplySearchParams {
  page?: number;
  limit?: number;
}

