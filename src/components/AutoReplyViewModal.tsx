'use client';

import { AutoReplyDto } from '@/types/autoReply';
import { X, MessageSquare, Key, Hash, Star, ToggleLeft, Calendar, Clock, Flame, Zap, Pin, Target } from 'lucide-react';

interface AutoReplyViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  autoReply: AutoReplyDto | null;
}

export default function AutoReplyViewModal({
  isOpen,
  onClose,
  autoReply,
}: AutoReplyViewModalProps) {
  if (!isOpen || !autoReply) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MessageSquare size={24} className="text-white" />
            <h2 className="text-xl font-bold text-white">Chi tiết Auto-Reply</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-full p-1 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-140px)] p-6 space-y-6">
          {/* Message */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <MessageSquare size={16} className="text-blue-600" />
              Tin nhắn trả lời
            </label>
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-gray-900 whitespace-pre-wrap">{autoReply.message}</p>
            </div>
          </div>

          {/* Keywords */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Key size={16} className="text-purple-600" />
              Keywords ({autoReply.keywords.length})
            </label>
            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <div className="flex flex-wrap gap-2">
                {autoReply.keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="bg-purple-100 text-purple-800 px-3 py-1.5 rounded-full border border-purple-300 text-sm font-medium"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Priority */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Hash size={16} className="text-blue-600" />
              Priority
            </label>
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-mono font-bold text-blue-900">
                  {autoReply.priority}
                </span>
                <div className="text-sm text-gray-600 flex items-center gap-2">
                  {autoReply.priority <= 10 && (
                    <>
                      <Flame size={16} className="text-red-500" />
                      <span>Ưu tiên cao - Câu hỏi phổ biến</span>
                    </>
                  )}
                  {autoReply.priority > 10 && autoReply.priority <= 50 && (
                    <>
                      <Zap size={16} className="text-yellow-500" />
                      <span>Ưu tiên trung bình - Tính năng cụ thể</span>
                    </>
                  )}
                  {autoReply.priority > 50 && autoReply.priority < 999 && (
                    <>
                      <Pin size={16} className="text-blue-500" />
                      <span>Ưu tiên thấp - Ít phổ biến</span>
                    </>
                  )}
                  {autoReply.priority === 999 && (
                    <>
                      <Target size={16} className="text-green-500" />
                      <span>Default reply</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Status Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Is Default */}
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Star size={16} className="text-amber-600" />
                <span className="text-sm font-medium text-gray-700">Default Reply</span>
              </div>
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-2 ${
                  autoReply.isDefault
                    ? 'bg-amber-100 text-amber-800 border border-amber-300'
                    : 'bg-gray-100 text-gray-600 border border-gray-300'
                }`}
              >
                {autoReply.isDefault ? 'Có' : 'Không'}
              </span>
            </div>

            {/* Is Active */}
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <ToggleLeft size={16} className="text-green-600" />
                <span className="text-sm font-medium text-gray-700">Trạng thái</span>
              </div>
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-2 ${
                  autoReply.isActive
                    ? 'bg-green-100 text-green-800 border border-green-300'
                    : 'bg-red-100 text-red-800 border border-red-300'
                }`}
              >
                {autoReply.isActive ? 'Hoạt động' : 'Tắt'}
              </span>
            </div>
          </div>

          {/* Timestamps */}
          <div className="grid grid-cols-2 gap-4">
            {/* Created At */}
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Calendar size={16} className="text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Ngày tạo</span>
              </div>
              <p className="text-sm text-gray-900 mt-2">
                {new Date(autoReply.createdAt).toLocaleDateString('vi-VN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              <p className="text-xs text-gray-500">
                {new Date(autoReply.createdAt).toLocaleTimeString('vi-VN')}
              </p>
            </div>

            {/* Updated At */}
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Clock size={16} className="text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Cập nhật lần cuối</span>
              </div>
              <p className="text-sm text-gray-900 mt-2">
                {new Date(autoReply.updatedAt).toLocaleDateString('vi-VN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              <p className="text-xs text-gray-500">
                {new Date(autoReply.updatedAt).toLocaleTimeString('vi-VN')}
              </p>
            </div>
          </div>

          {/* ID */}
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase">ID</label>
            <p className="text-xs text-gray-400 font-mono mt-1 break-all">{autoReply.id}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex items-center justify-end border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}

