'use client';

import { FontDto } from '@/types/font';
import { X, AlertTriangle, Trash2 } from 'lucide-react';

interface BulkDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (ids: string[]) => void;
  selectedFonts: FontDto[];
  isLoading?: boolean;
}

export default function BulkDeleteModal({
  isOpen,
  onClose,
  onConfirm,
  selectedFonts,
  isLoading = false,
}: BulkDeleteModalProps) {
  if (!isOpen) return null;

  const handleConfirm = () => {
    const ids = selectedFonts.map(font => font.id);
    onConfirm(ids);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b border-red-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-full">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Xóa nhiều Font</h2>
          </div>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <p className="text-gray-600 mb-4">
            Bạn có chắc chắn muốn xóa <span className="font-semibold text-red-600">{selectedFonts.length}</span> font đã chọn?
          </p>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <span className="text-sm font-medium text-red-800">Cảnh báo</span>
            </div>
            <p className="text-sm text-red-700">
              Hành động này không thể hoàn tác. Tất cả font đã chọn sẽ bị xóa vĩnh viễn.
            </p>
          </div>

          <div className="max-h-32 overflow-y-auto mb-6">
            <div className="space-y-2">
              {selectedFonts.map((font) => (
                <div key={font.id} className="flex items-center gap-2 bg-gray-50 p-2 rounded-md">
                  <div className="flex-1">
                    <span className="text-sm font-medium text-gray-900">{font.name}</span>
                    {font.isVip && (
                      <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        VIP
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={handleConfirm}
              disabled={isLoading}
              className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Đang xóa...
                </>
              ) : (
                <>
                  <Trash2 size={16} />
                  Xóa {selectedFonts.length} font
                </>
              )}
            </button>
            <button
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 disabled:opacity-50 transition-colors"
            >
              Hủy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
