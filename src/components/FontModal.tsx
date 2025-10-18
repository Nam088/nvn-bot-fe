'use client';

import { FontDto } from '@/types/font';
import { X, ExternalLink } from 'lucide-react';
import Image from 'next/image';

interface FontModalProps {
  font: FontDto;
  onClose: () => void;
}

export default function FontModal({ font, onClose }: FontModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-blue-200">
          <h2 className="text-2xl font-semibold text-blue-900">{font.name}</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Thumbnail */}
          {font.thumbnail && (
            <div>
              <h3 className="text-lg font-medium text-blue-900 mb-3">Thumbnail</h3>
              <Image
                src={font.thumbnail}
                alt={font.name}
                width={400}
                height={192}
                className="w-full max-w-md h-48 object-cover rounded-lg border border-blue-200"
              />
            </div>
          )}

          {/* Images */}
          {font.images && font.images.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-blue-900 mb-3">Hình ảnh</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {font.images.map((image, index) => (
                  <Image
                    key={index}
                    src={image}
                    alt={`${font.name} ${index + 1}`}
                    width={300}
                    height={128}
                    className="w-full h-32 object-cover rounded-lg border border-blue-200"
                  />
                ))}
              </div>
            </div>
          )}

          {/* File URLs */}
          {font.fileUrl && font.fileUrl.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-blue-900 mb-3">File URLs</h3>
              <div className="space-y-2">
                {font.fileUrl.map((url, index) => (
                  <div key={index} className="flex items-center gap-2 bg-blue-50 p-3 rounded-lg">
                    <span className="flex-1 text-sm text-blue-800 break-all">{url}</span>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded-md transition-colors"
                      title="Mở link"
                    >
                      <ExternalLink size={16} />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {font.tags && font.tags.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-blue-900 mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {font.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 text-sm px-3 py-1.5 rounded-full border border-blue-200 font-medium inline-flex items-center whitespace-nowrap min-h-[28px]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Properties */}
          <div>
            <h3 className="text-lg font-medium text-blue-900 mb-3">Thuộc tính</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-medium text-blue-900">Hỗ trợ Tiếng Việt:</span>
                  <span className={`px-3 py-1.5 rounded-full text-xs font-medium inline-flex items-center whitespace-nowrap min-h-[24px] ${
                    font.isSupportVietnamese 
                      ? 'bg-green-100 text-green-800 border border-green-200' 
                      : 'bg-red-100 text-red-800 border border-red-200'
                  }`}>
                    {font.isSupportVietnamese ? 'Có' : 'Không'}
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-medium text-blue-900">Font VIP:</span>
                  <span className={`px-3 py-1.5 rounded-full text-xs font-medium inline-flex items-center whitespace-nowrap min-h-[24px] ${
                    font.isVip 
                      ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' 
                      : 'bg-gray-100 text-gray-800 border border-gray-200'
                  }`}>
                    {font.isVip ? 'Có' : 'Không'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-blue-900">Trạng thái:</span>
                  <span className={`px-3 py-1.5 rounded-full text-xs font-medium inline-flex items-center whitespace-nowrap min-h-[24px] ${
                    font.isActive 
                      ? 'bg-green-100 text-green-800 border border-green-200' 
                      : 'bg-red-100 text-red-800 border border-red-200'
                  }`}>
                    {font.isActive ? 'Hoạt động' : 'Không hoạt động'}
                  </span>
                </div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-sm text-blue-800">
                  <p><span className="font-medium">Tạo:</span> {new Date(font.createdAt).toLocaleString('vi-VN')}</p>
                  <p><span className="font-medium">Cập nhật:</span> {new Date(font.updatedAt).toLocaleString('vi-VN')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-blue-200">
          <button
            onClick={onClose}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
