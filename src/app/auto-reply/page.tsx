'use client';

import { useState, useEffect } from 'react';
import { Plus, RefreshCw, MessageSquare, Key, Star, Activity } from 'lucide-react';
import AutoReplyTable from '@/components/AutoReplyTable';
import AutoReplyModal from '@/components/AutoReplyModal';
import AutoReplyDeleteModal from '@/components/AutoReplyDeleteModal';
import AutoReplyViewModal from '@/components/AutoReplyViewModal';
import {
  useAutoReplies,
  useCreateAutoReply,
  useUpdateAutoReply,
  useDeleteAutoReply,
  useBulkUpdatePriority,
} from '@/hooks/useAutoReplies';
import { AutoReplyDto, CreateAutoReplyDto } from '@/types/autoReply';
import { toast } from 'react-toastify';

export default function AutoReplyPage() {
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedAutoReply, setSelectedAutoReply] = useState<AutoReplyDto | null>(null);

  // Queries and mutations
  const { data, isLoading, refetch } = useAutoReplies({ page, limit });
  const createMutation = useCreateAutoReply();
  const updateMutation = useUpdateAutoReply();
  const deleteMutation = useDeleteAutoReply();
  const bulkUpdatePriorityMutation = useBulkUpdatePriority();

  // Auto-refetch on mount
  useEffect(() => {
    refetch();
  }, [refetch]);

  // Handlers
  const handleCreate = () => {
    setSelectedAutoReply(null);
    setIsCreateModalOpen(true);
  };

  const handleEdit = (autoReply: AutoReplyDto) => {
    setSelectedAutoReply(autoReply);
    setIsEditModalOpen(true);
  };

  const handleDelete = (autoReply: AutoReplyDto) => {
    setSelectedAutoReply(autoReply);
    setIsDeleteModalOpen(true);
  };

  const handleView = (autoReply: AutoReplyDto) => {
    setSelectedAutoReply(autoReply);
    setIsViewModalOpen(true);
  };

  const handleCreateSubmit = async (formData: CreateAutoReplyDto) => {
    try {
      await createMutation.mutateAsync(formData);
      toast.success('Tạo auto-reply thành công!');
      setIsCreateModalOpen(false);
      refetch();
    } catch (error: unknown) {
      const errorMessage = error && typeof error === 'object' && 'response' in error 
        ? (error as { response?: { data?: { message?: string } } })?.response?.data?.message 
        : 'Tạo auto-reply thất bại!';
      toast.error(errorMessage);
    }
  };

  const handleUpdateSubmit = async (formData: CreateAutoReplyDto) => {
    if (!selectedAutoReply) return;

    try {
      await updateMutation.mutateAsync({
        id: selectedAutoReply.id,
        data: formData,
      });
      toast.success('Cập nhật auto-reply thành công!');
      setIsEditModalOpen(false);
      setSelectedAutoReply(null);
      refetch();
    } catch (error: unknown) {
      const errorMessage = error && typeof error === 'object' && 'response' in error 
        ? (error as { response?: { data?: { message?: string } } })?.response?.data?.message 
        : 'Cập nhật auto-reply thất bại!';
      toast.error(errorMessage);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedAutoReply) return;

    try {
      await deleteMutation.mutateAsync(selectedAutoReply.id);
      toast.success('Xóa auto-reply thành công!');
      setIsDeleteModalOpen(false);
      setSelectedAutoReply(null);
      refetch();
    } catch (error: unknown) {
      const errorMessage = error && typeof error === 'object' && 'response' in error 
        ? (error as { response?: { data?: { message?: string } } })?.response?.data?.message 
        : 'Xóa auto-reply thất bại!';
      toast.error(errorMessage);
    }
  };

  const handleReorder = async (updates: { id: string; priority: number }[]) => {
    try {
      await bulkUpdatePriorityMutation.mutateAsync({ updates });
      toast.success('Cập nhật priority thành công!');
      refetch();
    } catch (error: unknown) {
      const errorMessage = error && typeof error === 'object' && 'response' in error 
        ? (error as { response?: { data?: { message?: string } } })?.response?.data?.message 
        : 'Cập nhật priority thất bại!';
      toast.error(errorMessage);
      refetch(); // Refetch to restore original order
    }
  };

  const handleRefresh = () => {
    refetch();
    toast.info('Đã làm mới danh sách!');
  };

  const autoReplies = data?.data || [];
  const paging = data?.paging;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-blue-900">
                Auto-Reply Management
              </h1>
              <p className="text-gray-600 mt-2">
                Quản lý hệ thống trả lời tự động dựa trên keyword
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleRefresh}
                className="flex items-center gap-2 px-4 py-2 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium shadow-sm"
                disabled={isLoading}
              >
                <RefreshCw size={20} className={isLoading ? 'animate-spin' : ''} />
                Làm mới
              </button>
              <button
                onClick={handleCreate}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-lg"
              >
                <Plus size={20} />
                Tạo Auto-Reply
              </button>
            </div>
          </div>

          {/* Stats */}
          {paging && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg shadow-sm border border-blue-200 p-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <MessageSquare size={24} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Tổng Auto-Reply</p>
                    <p className="text-2xl font-bold text-blue-900">{paging.total}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-green-200 p-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Activity size={24} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Hoạt động</p>
                    <p className="text-2xl font-bold text-green-900">
                      {autoReplies.filter((ar) => ar.isActive).length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-purple-200 p-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Key size={24} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Tổng Keywords</p>
                    <p className="text-2xl font-bold text-purple-900">
                      {autoReplies.reduce((sum, ar) => sum + ar.keywords.length, 0)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-amber-200 p-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-amber-100 rounded-lg">
                    <Star size={24} className="text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Default Reply</p>
                    <p className="text-2xl font-bold text-amber-900">
                      {autoReplies.filter((ar) => ar.isDefault).length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Table */}
        <AutoReplyTable
          data={autoReplies}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
          onReorder={handleReorder}
          isLoading={isLoading}
        />

        {/* Pagination */}
        {paging && paging.totalPages > 1 && (
          <div className="mt-6 flex items-center justify-center gap-2">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page <= 1}
              className="px-4 py-2 bg-white border border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              Trước
            </button>
            <span className="px-4 py-2 text-gray-700">
              Trang {page} / {paging.totalPages}
            </span>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page >= paging.totalPages}
              className="px-4 py-2 bg-white border border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              Sau
            </button>
          </div>
        )}

        {/* Modals */}
        <AutoReplyModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreateSubmit}
          isLoading={createMutation.isPending}
        />

        <AutoReplyModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedAutoReply(null);
          }}
          onSubmit={handleUpdateSubmit}
          autoReply={selectedAutoReply}
          isLoading={updateMutation.isPending}
        />

        <AutoReplyDeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setSelectedAutoReply(null);
          }}
          onConfirm={handleDeleteConfirm}
          autoReply={selectedAutoReply}
          isLoading={deleteMutation.isPending}
        />

        <AutoReplyViewModal
          isOpen={isViewModalOpen}
          onClose={() => {
            setIsViewModalOpen(false);
            setSelectedAutoReply(null);
          }}
          autoReply={selectedAutoReply}
        />
      </div>
    </div>
  );
}

