'use client';

import { AutoReplyDto } from '@/types/autoReply';
import { AlertTriangle, X, Trash2 } from 'lucide-react';

interface AutoReplyDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  autoReply: AutoReplyDto | null;
  isLoading?: boolean;
}

export default function AutoReplyDeleteModal({
  isOpen,
  onClose,
  onConfirm,
  autoReply,
  isLoading,
}: AutoReplyDeleteModalProps) {
  if (!isOpen || !autoReply) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="bg-red-600 px-6 py-4 flex items-center justify-between rounded-t-lg">
          <div className="flex items-center gap-3">
            <AlertTriangle size={24} className="text-white" />
            <h2 className="text-xl font-bold text-white">Xác nhận xóa</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-full p-1 transition-colors"
            disabled={isLoading}
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-700 mb-4">
            Bạn có chắc chắn muốn xóa auto-reply này?
          </p>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <div className="space-y-2">
              <div>
                <span className="text-xs font-medium text-red-800 uppercase">Tin nhắn:</span>
                <p className="text-sm text-gray-900 mt-1 line-clamp-2">{autoReply.message}</p>
              </div>
              <div>
                <span className="text-xs font-medium text-red-800 uppercase">Keywords:</span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {autoReply.keywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full border border-red-300"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <p className="text-sm text-red-600 font-medium">
            ⚠️ Hành động này không thể hoàn tác!
          </p>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex items-center justify-end gap-3 border-t border-gray-200 rounded-b-lg">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
            disabled={isLoading}
          >
            Hủy
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Đang xóa...
              </>
            ) : (
              <>
                <Trash2 size={16} />
                Xóa
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

