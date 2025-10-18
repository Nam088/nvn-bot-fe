export interface FontDto {
  id: string;
  name: string;
  fileUrl: string[];
  images: string[];
  isSupportVietnamese: boolean;
  isVip: boolean;
  isActive: boolean;
  tags: string[];
  thumbnail: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateFontDto {
  name: string;
  fileUrl?: string[];
  images?: string[];
  isSupportVietnamese?: boolean;
  isVip?: boolean;
  isActive?: boolean;
  tags?: string[];
  thumbnail?: string;
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
    limit: number;
    page: number;
    total: number;
    totalPages: number;
    currentPageSize: number;
    endItem: number;
    firstPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    lastPage: number;
    offset: number;
    startItem: number;
  };
  statusCode: number;
}

export interface SearchParams {
  q?: string;
  tags?: string[];
  isSupportVietnamese?: boolean;
  status?: 'active' | 'all' | 'inactive';
  page?: number;
  limit?: number;
}

export interface DeleteManyFontsDto {
  ids: string[];
}

export interface DeleteManyResultItemDto {
  id: string;
  deleted: boolean;
}

export interface DeleteManyResultDto {
  deleted: number;
  failed: number;
  results: DeleteManyResultItemDto[];
}

export interface UpdateManyFontsDto {
  ids: string[];
  isSupportVietnamese?: boolean;
  isVip?: boolean;
  isActive?: boolean;
}

export interface UpdateManyResultItemDto {
  id: string;
  message: string;
  updated: boolean;
}

export interface UpdateManyResultDto {
  updated: number;
  failed: number;
  results: UpdateManyResultItemDto[];
}
