'use client';

import { useState } from 'react';
import { CreateFontDto, FontDto } from '@/types/font';
import { X } from 'lucide-react';

interface FontFormProps {
  font?: FontDto;
  onSubmit: (font: CreateFontDto) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function FontForm({ font, onSubmit, onCancel, isLoading }: FontFormProps) {
  const [formData, setFormData] = useState<CreateFontDto>({
    name: font?.name || '',
    fileUrl: font?.fileUrl || [],
    images: font?.images || [],
    isSupportVietnamese: font?.isSupportVietnamese || false,
    isVip: font?.isVip || false,
    tags: font?.tags || [],
    thumbnail: font?.thumbnail || '',
  });

  const [newTag, setNewTag] = useState('');
  const [newFileUrl, setNewFileUrl] = useState('');
  const [newImage, setNewImage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags?.includes(newTag.trim())) {
      setFormData({
        ...formData,
        tags: [...(formData.tags || []), newTag.trim()],
      });
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags?.filter(tag => tag !== tagToRemove) || [],
    });
  };

  const addFileUrl = () => {
    if (newFileUrl.trim() && !formData.fileUrl?.includes(newFileUrl.trim())) {
      setFormData({
        ...formData,
        fileUrl: [...(formData.fileUrl || []), newFileUrl.trim()],
      });
      setNewFileUrl('');
    }
  };

  const removeFileUrl = (urlToRemove: string) => {
    setFormData({
      ...formData,
      fileUrl: formData.fileUrl?.filter(url => url !== urlToRemove) || [],
    });
  };

  const addImage = () => {
    if (newImage.trim() && !formData.images?.includes(newImage.trim())) {
      setFormData({
        ...formData,
        images: [...(formData.images || []), newImage.trim()],
      });
      setNewImage('');
    }
  };

  const removeImage = (imageToRemove: string) => {
    setFormData({
      ...formData,
      images: formData.images?.filter(image => image !== imageToRemove) || [],
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-blue-200">
          <h2 className="text-xl font-semibold text-blue-900">
            {font ? 'Chỉnh sửa Font' : 'Thêm Font mới'}
          </h2>
          <button
            onClick={onCancel}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-blue-900 mb-2">
              Tên Font *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-900 mb-2">
              Thumbnail
            </label>
            <input
              type="url"
              value={formData.thumbnail}
              onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
              className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://example.com/thumbnail.png"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-900 mb-2">
              File URLs
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="url"
                value={newFileUrl}
                onChange={(e) => setNewFileUrl(e.target.value)}
                className="flex-1 px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://example.com/font.woff2"
              />
              <button
                type="button"
                onClick={addFileUrl}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Thêm
              </button>
            </div>
            <div className="space-y-1">
              {formData.fileUrl?.map((url, index) => (
                <div key={index} className="flex items-center gap-2 bg-blue-50 p-2 rounded-md">
                  <span className="flex-1 text-sm text-blue-800 truncate">{url}</span>
                  <button
                    type="button"
                    onClick={() => removeFileUrl(url)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-900 mb-2">
              Images
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="url"
                value={newImage}
                onChange={(e) => setNewImage(e.target.value)}
                className="flex-1 px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://example.com/image.png"
              />
              <button
                type="button"
                onClick={addImage}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Thêm
              </button>
            </div>
            <div className="space-y-1">
              {formData.images?.map((image, index) => (
                <div key={index} className="flex items-center gap-2 bg-blue-50 p-2 rounded-md">
                  <span className="flex-1 text-sm text-blue-800 truncate">{image}</span>
                  <button
                    type="button"
                    onClick={() => removeImage(image)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-900 mb-2">
              Tags
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                className="flex-1 px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="sans, serif, display..."
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              />
              <button
                type="button"
                onClick={addTag}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Thêm
              </button>
            </div>
            <div className="flex flex-wrap gap-1">
              {formData.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-md"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isSupportVietnamese"
                checked={formData.isSupportVietnamese}
                onChange={(e) => setFormData({ ...formData, isSupportVietnamese: e.target.checked })}
                className="w-4 h-4 text-blue-600 border-blue-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="isSupportVietnamese" className="ml-2 text-sm text-blue-900">
                Hỗ trợ Tiếng Việt
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isVip"
                checked={formData.isVip}
                onChange={(e) => setFormData({ ...formData, isVip: e.target.checked })}
                className="w-4 h-4 text-blue-600 border-blue-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="isVip" className="ml-2 text-sm text-blue-900">
                Font VIP
              </label>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Đang xử lý...' : (font ? 'Cập nhật' : 'Tạo mới')}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
