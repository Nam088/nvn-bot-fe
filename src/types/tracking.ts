export interface DownloadTracking {
  id: string;
  userId: number;
  username: string | null;
  firstName: string;
  lastName: string | null;
  displayName: string;
  fontId: string;
  fontName: string;
  chatId: number | null;
  chatTitle: string | null;
  createdAt: string;
}

export interface CreateTrackingDto {
  userId: number;
  username?: string;
  firstName: string;
  lastName?: string;
  displayName: string;
  fontId: string;
  fontName: string;
  chatId?: number;
  chatTitle?: string;
}

export interface QueryTrackingDto {
  userId?: number;
  fontId?: string;
  username?: string;
  page?: number;
  limit?: number;
  startDate?: string;
  endDate?: string;
}

export interface TopFontDto {
  fontId: string;
  fontName: string;
  downloadCount: number;
}

export interface TopUserDto {
  userId: number;
  displayName: string;
  username: string | null;
  downloadCount: number;
}

export interface DailyStatsDto {
  date: string;
  count: number;
}

export interface TrackingStatsDto {
  totalDownloads: number;
  uniqueUsers: number;
  uniqueFonts: number;
  topFonts: TopFontDto[];
  topUsers: TopUserDto[];
  dailyStats: DailyStatsDto[];
}

export interface TrackingResponse {
  data: DownloadTracking[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface FontDownloadCount {
  fontId: string;
  count: number;
}

export interface FontInfo {
  id: string;
  name: string;
  thumbnail: string | null;
  images: string[];
  isVip: boolean;
  isSupportVietnamese: boolean;
  tags: string[];
  fileUrl: string[];
}

export interface TrackingDetail {
  id: string;
  userId: number;
  username: string | null;
  firstName: string;
  lastName: string | null;
  displayName: string;
  fontId: string;
  fontName: string;
  chatId: number | null;
  chatTitle: string | null;
  createdAt: string;
  font: FontInfo;
}
