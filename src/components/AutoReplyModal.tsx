'use client';

import { useState, useEffect } from 'react';
import { AutoReplyDto, CreateAutoReplyDto } from '@/types/autoReply';
import { X, Plus, Trash2, MessageSquare, Key, Hash, ToggleLeft, Star } from 'lucide-react';

interface AutoReplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateAutoReplyDto) => void;
  autoReply?: AutoReplyDto | null;
  isLoading?: boolean;
}

export default function AutoReplyModal({
  isOpen,
  onClose,
  onSubmit,
  autoReply,
  isLoading,
}: AutoReplyModalProps) {
  const [message, setMessage] = useState('');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [keywordInput, setKeywordInput] = useState('');
  const [priority, setPriority] = useState(10);
  const [isDefault, setIsDefault] = useState(false);
  const [isActive, setIsActive] = useState(true);

  const isEdit = !!autoReply;

  useEffect(() => {
    if (autoReply) {
      setMessage(autoReply.message);
      setKeywords(autoReply.keywords);
      setPriority(autoReply.priority);
      setIsDefault(autoReply.isDefault);
      setIsActive(autoReply.isActive);
    } else {
      resetForm();
    }
  }, [autoReply]);

  const resetForm = () => {
    setMessage('');
    setKeywords([]);
    setKeywordInput('');
    setPriority(10);
    setIsDefault(false);
    setIsActive(true);
  };

  const handleAddKeyword = () => {
    const trimmedKeyword = keywordInput.trim();
    if (trimmedKeyword && !keywords.includes(trimmedKeyword)) {
      setKeywords([...keywords, trimmedKeyword]);
      setKeywordInput('');
    }
  };

  const handleRemoveKeyword = (index: number) => {
    setKeywords(keywords.filter((_, i) => i !== index));
  };

  const handleKeywordInputKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddKeyword();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim() || keywords.length === 0) {
      return;
    }

    const data: CreateAutoReplyDto = {
      message: message.trim(),
      keywords,
      priority,
      isDefault,
      isActive,
    };

    onSubmit(data);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MessageSquare size={24} className="text-white" />
            <h2 className="text-xl font-bold text-white">
              {isEdit ? 'Chỉnh sửa Auto-Reply' : 'Tạo Auto-Reply mới'}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="text-white hover:bg-white/20 rounded-full p-1 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="p-6 space-y-6">
            {/* Message */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <MessageSquare size={16} className="text-blue-600" />
                Tin nhắn trả lời
                <span className="text-red-500">*</span>
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={4}
                placeholder="Nhập tin nhắn sẽ tự động trả lời..."
                required
                maxLength={1000}
              />
              <div className="text-xs text-gray-500 mt-1 text-right">
                {message.length}/1000 ký tự
              </div>
            </div>

            {/* Keywords */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Key size={16} className="text-purple-600" />
                Keywords (từ khóa kích hoạt)
                <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  onKeyPress={handleKeywordInputKeyPress}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Nhập từ khóa và nhấn Enter hoặc nút Thêm"
                />
                <button
                  type="button"
                  onClick={handleAddKeyword}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
                >
                  <Plus size={16} />
                  Thêm
                </button>
              </div>
              
              {/* Keywords List */}
              {keywords.length > 0 && (
                <div className="mt-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex flex-wrap gap-2">
                    {keywords.map((keyword, index) => (
                      <div
                        key={index}
                        className="bg-purple-100 text-purple-800 px-3 py-1.5 rounded-full border border-purple-300 flex items-center gap-2 group"
                      >
                        <span className="text-sm font-medium">{keyword}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveKeyword(index)}
                          className="text-purple-600 hover:text-purple-800 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-purple-600 mt-2">
                    {keywords.length} từ khóa đã thêm
                  </p>
                </div>
              )}
              {keywords.length === 0 && (
                <p className="text-xs text-red-500 mt-2">
                  Vui lòng thêm ít nhất 1 từ khóa
                </p>
              )}
            </div>

            {/* Priority */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Hash size={16} className="text-blue-600" />
                Priority (ưu tiên)
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  value={priority}
                  onChange={(e) => setPriority(Number(e.target.value))}
                  className="w-32 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min={0}
                  max={999}
                />
                <span className="text-sm text-gray-600">
                  Số nhỏ hơn = ưu tiên cao hơn (0-999)
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                💡 1-10: Câu hỏi phổ biến | 11-50: Tính năng cụ thể | 51-100: Ít phổ biến | 999: Default
              </p>
            </div>

            {/* Switches */}
            <div className="grid grid-cols-2 gap-4">
              {/* Is Default */}
              <div className="p-4 border border-gray-300 rounded-lg hover:border-amber-400 transition-colors">
                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Star size={16} className="text-amber-600" />
                    <div>
                      <div className="text-sm font-medium text-gray-700">Default Reply</div>
                      <div className="text-xs text-gray-500">Trả lời khi không match</div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={isDefault}
                    onChange={(e) => setIsDefault(e.target.checked)}
                    className="w-5 h-5 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                  />
                </label>
              </div>

              {/* Is Active */}
              <div className="p-4 border border-gray-300 rounded-lg hover:border-green-400 transition-colors">
                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-2">
                    <ToggleLeft size={16} className="text-green-600" />
                    <div>
                      <div className="text-sm font-medium text-gray-700">Trạng thái</div>
                      <div className="text-xs text-gray-500">Bật/tắt auto-reply</div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 flex items-center justify-end gap-3 border-t border-gray-200">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
              disabled={isLoading}
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              disabled={isLoading || !message.trim() || keywords.length === 0}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Đang xử lý...
                </>
              ) : (
                <>
                  {isEdit ? 'Cập nhật' : 'Tạo mới'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

