'use client';

import { FontDto } from '@/types/font';
import { Edit, Trash2, Eye } from 'lucide-react';
import Image from 'next/image';

interface FontCardProps {
  font: FontDto;
  onEdit: (font: FontDto) => void;
  onDelete: (id: string) => void;
  onView: (font: FontDto) => void;
}

export default function FontCard({ font, onEdit, onDelete, onView }: FontCardProps) {
  return (
    <div className="bg-white border border-blue-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-blue-900 mb-1">{font.name}</h3>
            <div className="flex items-center gap-2 mb-2">
              {font.isVip && (
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  VIP
                </span>
              )}
              {font.isSupportVietnamese && (
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  Tiếng Việt
                </span>
              )}
            </div>
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => onView(font)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
              title="Xem chi tiết"
            >
              <Eye size={16} />
            </button>
            <button
              onClick={() => onEdit(font)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
              title="Chỉnh sửa"
            >
              <Edit size={16} />
            </button>
            <button
              onClick={() => onDelete(font.id)}
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
            <div className="flex flex-wrap gap-1">
              {font.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="text-sm text-gray-600">
          <p>Tạo: {new Date(font.createdAt).toLocaleDateString('vi-VN')}</p>
          <p>Cập nhật: {new Date(font.updatedAt).toLocaleDateString('vi-VN')}</p>
        </div>
      </div>
    </div>
  );
}
