'use client';

import { useState } from 'react';
import { FontDto, CreateFontDto, SearchParams } from '@/types/font';
import { useFonts, useCreateFont, useUpdateFont, useDeleteFont, useBulkDeleteFonts, useBulkUpdateFonts } from '@/hooks/useFonts';
import FontTable from '@/components/FontTable';
import FontFormTanStack from '@/components/FontFormTanStack';
import FontModal from '@/components/FontModal';
import DeleteConfirmModal from '@/components/DeleteConfirmModal';
import BulkDeleteModal from '@/components/BulkDeleteModal';
import BulkUpdateModal from '@/components/BulkUpdateModal';
import { Plus, Search, Filter, Grid, List, Edit, Trash2, Eye, X } from 'lucide-react';
import { toast } from 'react-toastify';
import Image from 'next/image';

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [editingFont, setEditingFont] = useState<FontDto | undefined>();
  const [viewingFont, setViewingFont] = useState<FontDto | undefined>();
  const [searchParams, setSearchParams] = useState<SearchParams>({
    page: 1,
    limit: 20,
    status: 'all',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [isSupportVietnamese, setIsSupportVietnamese] = useState<boolean | undefined>();
  const [status, setStatus] = useState<'active' | 'all' | 'inactive'>('all');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    font: FontDto | null;
  }>({ isOpen: false, font: null });
  const [bulkDeleteModal, setBulkDeleteModal] = useState<{
    isOpen: boolean;
    fonts: FontDto[];
  }>({ isOpen: false, fonts: [] });
  const [bulkUpdateModal, setBulkUpdateModal] = useState<{
    isOpen: boolean;
    fonts: FontDto[];
  }>({ isOpen: false, fonts: [] });

  // TanStack Query hooks
  const { data: fontsResponse, isLoading, error } = useFonts(searchParams);
  const createFontMutation = useCreateFont();
  const updateFontMutation = useUpdateFont();
  const deleteFontMutation = useDeleteFont();
  const bulkDeleteFontsMutation = useBulkDeleteFonts();
  const bulkUpdateFontsMutation = useBulkUpdateFonts();

  const fonts = fontsResponse?.data || [];

  // Handle search
  const handleSearch = () => {
    setSearchParams({
      ...searchParams,
      q: searchQuery || undefined,
      isSupportVietnamese,
      status,
      page: 1,
    });
    
    if (searchQuery || isSupportVietnamese !== undefined || status !== 'all') {
      toast.info('Đang tìm kiếm...');
    }
  };

  // Handle clear filters
  const handleClearFilters = () => {
    setSearchQuery('');
    setIsSupportVietnamese(undefined);
    setStatus('all');
    setSearchParams({
      page: 1,
      limit: 20,
      status: 'all',
    });
    toast.info('Đã xóa bộ lọc');
  };

  // Handle form submission
  const handleFormSubmit = async (fontData: CreateFontDto) => {
    try {
      if (editingFont) {
        await updateFontMutation.mutateAsync({ id: editingFont.id, font: fontData });
        toast.success('Cập nhật font thành công!');
      } else {
        await createFontMutation.mutateAsync(fontData);
        toast.success('Tạo font mới thành công!');
      }
      setShowForm(false);
      setEditingFont(undefined);
    } catch (err) {
      console.error('Error saving font:', err);
      toast.error('Có lỗi xảy ra khi lưu font');
    }
  };

  // Handle delete
  const handleDelete = (font: FontDto) => {
    setDeleteModal({ isOpen: true, font });
  };

  const confirmDelete = async () => {
    if (!deleteModal.font) return;
    
    try {
      await deleteFontMutation.mutateAsync(deleteModal.font.id);
      toast.success(`Đã xóa font "${deleteModal.font.name}" thành công!`);
      setDeleteModal({ isOpen: false, font: null });
    } catch (err) {
      console.error('Error deleting font:', err);
      toast.error('Có lỗi xảy ra khi xóa font');
    }
  };

  // Handle bulk delete
  const handleBulkDelete = (fonts: FontDto[]) => {
    setBulkDeleteModal({ isOpen: true, fonts });
  };

  const confirmBulkDelete = async () => {
    if (bulkDeleteModal.fonts.length === 0) return;
    
    try {
      const ids = bulkDeleteModal.fonts.map(font => font.id);
      const result = await bulkDeleteFontsMutation.mutateAsync(ids);
      
      if (result.data) {
        toast.success(`Đã xóa thành công ${result.data.deleted} font!`);
        if (result.data.failed > 0) {
          toast.warning(`${result.data.failed} font không thể xóa được.`);
        }
      }
      
      setBulkDeleteModal({ isOpen: false, fonts: [] });
    } catch (err) {
      console.error('Error bulk deleting fonts:', err);
      toast.error('Có lỗi xảy ra khi xóa nhiều font');
    }
  };

  // Handle bulk update
  const handleBulkUpdate = (fonts: FontDto[]) => {
    setBulkUpdateModal({ isOpen: true, fonts });
  };

  const confirmBulkUpdate = async (updateData: { ids: string[]; isSupportVietnamese?: boolean; isVip?: boolean; isActive?: boolean }) => {
    try {
      const result = await bulkUpdateFontsMutation.mutateAsync(updateData);
      
      if (result.data) {
        toast.success(`Đã cập nhật thành công ${result.data.updated} font!`);
        if (result.data.failed > 0) {
          toast.warning(`${result.data.failed} font không thể cập nhật được.`);
        }
      }
      
      setBulkUpdateModal({ isOpen: false, fonts: [] });
    } catch (err) {
      console.error('Error bulk updating fonts:', err);
      toast.error('Có lỗi xảy ra khi cập nhật nhiều font');
    }
  };

  // Handle edit
  const handleEdit = (font: FontDto) => {
    setEditingFont(font);
    setShowForm(true);
  };

  // Handle view
  const handleView = (font: FontDto) => {
    setViewingFont(font);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-blue-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-900">NVN Font Manager</h1>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus size={20} />
              Thêm Font
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-blue-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Tìm kiếm font..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter size={20} className="text-gray-400" />
                <select
                  value={isSupportVietnamese === undefined ? '' : isSupportVietnamese.toString()}
                  onChange={(e) => setIsSupportVietnamese(
                    e.target.value === '' ? undefined : e.target.value === 'true'
                  )}
                  className="px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Tất cả</option>
                  <option value="true">Hỗ trợ Tiếng Việt</option>
                  <option value="false">Không hỗ trợ Tiếng Việt</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as 'active' | 'all' | 'inactive')}
                  className="px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">Tất cả trạng thái</option>
                  <option value="active">Đang hoạt động</option>
                  <option value="inactive">Không hoạt động</option>
                </select>
              </div>
              <button
                onClick={handleSearch}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Tìm kiếm
              </button>
              <button
                onClick={handleClearFilters}
                className="flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                title="Xóa bộ lọc"
              >
                <X size={16} />
                Xóa bộ lọc
              </button>
            </div>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Chế độ xem:</span>
            <div className="flex bg-white border border-blue-200 rounded-lg p-1">
              <button
                onClick={() => {
                  setViewMode('table');
                  toast.info('Chuyển sang chế độ xem bảng');
                }}
                className={`flex items-center gap-2 px-3 py-1 rounded-md text-sm transition-colors ${
                  viewMode === 'table' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-600 hover:bg-blue-50'
                }`}
              >
                <List size={16} />
                Bảng
              </button>
              <button
                onClick={() => {
                  setViewMode('grid');
                  toast.info('Chuyển sang chế độ xem lưới');
                }}
                className={`flex items-center gap-2 px-3 py-1 rounded-md text-sm transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-600 hover:bg-blue-50'
                }`}
              >
                <Grid size={16} />
                Lưới
              </button>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            {fontsResponse?.paging && (
              <span>
                Tổng: {fontsResponse.paging.total} font
                {fontsResponse.paging.totalPages > 1 && (
                  <span> - Trang {fontsResponse.paging.page}/{fontsResponse.paging.totalPages}</span>
                )}
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-blue-600">Đang tải...</p>
            </div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-600">Không thể tải danh sách font</p>
            <button
              onClick={() => {
                window.location.reload();
                toast.info('Đang tải lại trang...');
              }}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Thử lại
            </button>
          </div>
        ) : fonts.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-blue-200 p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Search size={48} className="mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy font nào</h3>
            <p className="text-gray-500 mb-6">Hãy thử thay đổi từ khóa tìm kiếm hoặc thêm font mới.</p>
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Thêm Font đầu tiên
            </button>
          </div>
        ) : viewMode === 'table' ? (
          <FontTable
            data={fonts}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
            onBulkDelete={handleBulkDelete}
            onBulkUpdate={handleBulkUpdate}
            isLoading={isLoading}
            pagination={fontsResponse?.paging}
            onPageChange={(page) => setSearchParams({ ...searchParams, page })}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {fonts.map((font) => (
              <div key={font.id} className="bg-white border border-blue-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-blue-900 mb-1">{font.name}</h3>
                      <div className="flex items-center gap-1.5 mb-2">
                        {font.isVip && (
                          <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1.5 rounded-full border border-blue-200 font-medium inline-flex items-center whitespace-nowrap min-h-[24px]">
                            VIP
                          </span>
                        )}
                        {font.isSupportVietnamese && (
                          <span className="bg-green-100 text-green-800 text-xs px-3 py-1.5 rounded-full border border-green-200 font-medium inline-flex items-center whitespace-nowrap min-h-[24px]">
                            Tiếng Việt
                          </span>
                        )}
                        {!font.isActive && (
                          <span className="bg-red-100 text-red-800 text-xs px-3 py-1.5 rounded-full border border-red-200 font-medium inline-flex items-center whitespace-nowrap min-h-[24px]">
                            Không hoạt động
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleView(font)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                        title="Xem chi tiết"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => handleEdit(font)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                        title="Chỉnh sửa"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(font)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        title="Xóa"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  {font.thumbnail && (
                    <div className="mb-3">
                      <Image
                        src={font.thumbnail}
                        alt={font.name}
                        width={300}
                        height={128}
                        className="w-full h-32 object-cover rounded-md border border-blue-100"
                      />
                    </div>
                  )}

                  {font.tags && font.tags.length > 0 && (
                    <div className="mb-3">
                      <div className="flex flex-wrap gap-1.5">
                        {font.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="bg-blue-100 text-blue-800 text-xs px-3 py-1.5 rounded-full border border-blue-200 font-medium inline-flex items-center whitespace-nowrap min-h-[24px]"
                          >
                            {tag}
                          </span>
                        ))}
                        {font.tags.length > 3 && (
                          <span 
                            className="bg-gray-100 text-gray-600 text-xs px-3 py-1.5 rounded-full border border-gray-200 font-medium inline-flex items-center whitespace-nowrap min-h-[24px]"
                            title={`${font.tags.slice(3).join(', ')}`}
                          >
                            +{font.tags.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="text-sm text-gray-600">
                    <p>Tạo: {new Date(font.createdAt).toLocaleDateString('vi-VN')}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modals */}
      {showForm && (
        <FontFormTanStack
          font={editingFont}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingFont(undefined);
          }}
          isLoading={createFontMutation.isPending || updateFontMutation.isPending}
        />
      )}

      {viewingFont && (
        <FontModal
          font={viewingFont}
          onClose={() => setViewingFont(undefined)}
        />
      )}

      <DeleteConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, font: null })}
        onConfirm={confirmDelete}
        title="Xóa Font"
        message={`Bạn có chắc chắn muốn xóa font "${deleteModal.font?.name}"? Hành động này không thể hoàn tác.`}
        isLoading={deleteFontMutation.isPending}
      />

      <BulkDeleteModal
        isOpen={bulkDeleteModal.isOpen}
        onClose={() => setBulkDeleteModal({ isOpen: false, fonts: [] })}
        onConfirm={confirmBulkDelete}
        selectedFonts={bulkDeleteModal.fonts}
        isLoading={bulkDeleteFontsMutation.isPending}
      />

      <BulkUpdateModal
        isOpen={bulkUpdateModal.isOpen}
        onClose={() => setBulkUpdateModal({ isOpen: false, fonts: [] })}
        onConfirm={confirmBulkUpdate}
        selectedFonts={bulkUpdateModal.fonts}
        isLoading={bulkUpdateFontsMutation.isPending}
      />
    </div>
  );
}