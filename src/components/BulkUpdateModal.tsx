'use client';

import { FontDto } from '@/types/font';
import { X, Edit } from 'lucide-react';
import { useState } from 'react';

interface BulkUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (updateData: { ids: string[]; isSupportVietnamese?: boolean; isVip?: boolean; isActive?: boolean }) => void;
  selectedFonts: FontDto[];
  isLoading?: boolean;
}

export default function BulkUpdateModal({
  isOpen,
  onClose,
  onConfirm,
  selectedFonts,
  isLoading = false,
}: BulkUpdateModalProps) {
  const [isSupportVietnamese, setIsSupportVietnamese] = useState<boolean | undefined>();
  const [isVip, setIsVip] = useState<boolean | undefined>();
  const [isActive, setIsActive] = useState<boolean | undefined>();

  if (!isOpen) return null;

  const handleConfirm = () => {
    const updateData: { ids: string[]; isSupportVietnamese?: boolean; isVip?: boolean; isActive?: boolean } = {
      ids: selectedFonts.map(font => font.id),
    };

    if (isSupportVietnamese !== undefined) {
      updateData.isSupportVietnamese = isSupportVietnamese;
    }
    if (isVip !== undefined) {
      updateData.isVip = isVip;
    }
    if (isActive !== undefined) {
      updateData.isActive = isActive;
    }

    onConfirm(updateData);
  };

  const hasChanges = isSupportVietnamese !== undefined || isVip !== undefined || isActive !== undefined;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b border-blue-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-full">
              <Edit className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Cập nhật nhiều Font</h2>
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
            Cập nhật <span className="font-semibold text-blue-600">{selectedFonts.length}</span> font đã chọn:
          </p>
          
          <div className="space-y-4 mb-6">
            {/* Hỗ trợ Tiếng Việt */}
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="text-sm font-medium text-blue-900">Hỗ trợ Tiếng Việt</h4>
                  <p className="text-xs text-blue-600">Font có hỗ trợ ký tự tiếng Việt</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsSupportVietnamese(true)}
                    className={`px-3 py-1 text-xs rounded-md transition-colors ${
                      isSupportVietnamese === true
                        ? 'bg-green-100 text-green-800 border border-green-300'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Có
                  </button>
                  <button
                    onClick={() => setIsSupportVietnamese(false)}
                    className={`px-3 py-1 text-xs rounded-md transition-colors ${
                      isSupportVietnamese === false
                        ? 'bg-red-100 text-red-800 border border-red-300'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Không
                  </button>
                  <button
                    onClick={() => setIsSupportVietnamese(undefined)}
                    className={`px-3 py-1 text-xs rounded-md transition-colors ${
                      isSupportVietnamese === undefined
                        ? 'bg-blue-100 text-blue-800 border border-blue-300'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Không đổi
                  </button>
                </div>
              </div>
            </div>

            {/* Font VIP */}
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="text-sm font-medium text-yellow-900">Font VIP</h4>
                  <p className="text-xs text-yellow-600">Font cao cấp, đặc biệt</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsVip(true)}
                    className={`px-3 py-1 text-xs rounded-md transition-colors ${
                      isVip === true
                        ? 'bg-yellow-100 text-yellow-800 border border-yellow-300'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Có
                  </button>
                  <button
                    onClick={() => setIsVip(false)}
                    className={`px-3 py-1 text-xs rounded-md transition-colors ${
                      isVip === false
                        ? 'bg-gray-100 text-gray-800 border border-gray-300'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Không
                  </button>
                  <button
                    onClick={() => setIsVip(undefined)}
                    className={`px-3 py-1 text-xs rounded-md transition-colors ${
                      isVip === undefined
                        ? 'bg-blue-100 text-blue-800 border border-blue-300'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Không đổi
                  </button>
                </div>
              </div>
            </div>

            {/* Trạng thái hoạt động */}
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="text-sm font-medium text-green-900">Trạng thái hoạt động</h4>
                  <p className="text-xs text-green-600">Font có thể sử dụng</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsActive(true)}
                    className={`px-3 py-1 text-xs rounded-md transition-colors ${
                      isActive === true
                        ? 'bg-green-100 text-green-800 border border-green-300'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Hoạt động
                  </button>
                  <button
                    onClick={() => setIsActive(false)}
                    className={`px-3 py-1 text-xs rounded-md transition-colors ${
                      isActive === false
                        ? 'bg-red-100 text-red-800 border border-red-300'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Không hoạt động
                  </button>
                  <button
                    onClick={() => setIsActive(undefined)}
                    className={`px-3 py-1 text-xs rounded-md transition-colors ${
                      isActive === undefined
                        ? 'bg-blue-100 text-blue-800 border border-blue-300'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Không đổi
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="max-h-32 overflow-y-auto mb-6">
            <div className="space-y-2">
              {selectedFonts.map((font) => (
                <div key={font.id} className="flex items-center gap-2 bg-blue-50 p-2 rounded-md">
                  <div className="flex-1">
                    <span className="text-sm font-medium text-blue-900">{font.name}</span>
                    <div className="flex gap-1 mt-1">
                      {font.isVip && (
                        <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                          VIP
                        </span>
                      )}
                      {font.isSupportVietnamese && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          Tiếng Việt
                        </span>
                      )}
                      {!font.isActive && (
                        <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                          Không hoạt động
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={handleConfirm}
              disabled={isLoading || !hasChanges}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Đang cập nhật...
                </>
              ) : (
                <>
                  <Edit size={16} />
                  Cập nhật {selectedFonts.length} font
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
