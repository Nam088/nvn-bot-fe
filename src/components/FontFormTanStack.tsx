'use client';

import { useForm } from '@tanstack/react-form';
import { CreateFontDto, FontDto } from '@/types/font';
import { X, Plus } from 'lucide-react';

interface FontFormTanStackProps {
  font?: FontDto;
  onSubmit: (font: CreateFontDto) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function FontFormTanStack({ font, onSubmit, onCancel, isLoading }: FontFormTanStackProps) {
  const form = useForm({
    defaultValues: {
      name: font?.name || '',
      description: font?.description || '',
      fileUrl: font?.fileUrl || [],
      images: font?.images || [],
      isSupportVietnamese: font?.isSupportVietnamese || false,
      isVip: font?.isVip || false,
      isActive: font?.isActive || true,
      tags: font?.tags || [],
      thumbnail: font?.thumbnail || '',
      newTag: '',
      newFileUrl: '',
      newImage: '',
    } as CreateFontDto & { newTag: string; newFileUrl: string; newImage: string },
    onSubmit: async ({ value }) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { newTag, newFileUrl, newImage, ...fontData } = value;
      onSubmit(fontData);
    },
  });

  const addTag = () => {
    const newTag = form.getFieldValue('newTag');
    const tags = form.getFieldValue('tags') || [];
    if (newTag && !tags.includes(newTag)) {
      form.setFieldValue('tags', [...tags, newTag]);
      form.setFieldValue('newTag', '');
    }
  };

  const removeTag = (tagToRemove: string) => {
    const tags = form.getFieldValue('tags') || [];
    form.setFieldValue('tags', tags.filter((tag: string) => tag !== tagToRemove));
  };

  const addFileUrl = () => {
    const newFileUrl = form.getFieldValue('newFileUrl');
    const fileUrls = form.getFieldValue('fileUrl') || [];
    if (newFileUrl && !fileUrls.includes(newFileUrl)) {
      form.setFieldValue('fileUrl', [...fileUrls, newFileUrl]);
      form.setFieldValue('newFileUrl', '');
    }
  };

  const removeFileUrl = (urlToRemove: string) => {
    const fileUrls = form.getFieldValue('fileUrl') || [];
    form.setFieldValue('fileUrl', fileUrls.filter((url: string) => url !== urlToRemove));
  };

  const addImage = () => {
    const newImage = form.getFieldValue('newImage');
    const images = form.getFieldValue('images') || [];
    if (newImage && !images.includes(newImage)) {
      form.setFieldValue('images', [...images, newImage]);
      form.setFieldValue('newImage', '');
    }
  };

  const removeImage = (imageToRemove: string) => {
    const images = form.getFieldValue('images') || [];
    form.setFieldValue('images', images.filter((image: string) => image !== imageToRemove));
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

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="p-6 space-y-4"
        >
          {/* Name Field */}
          <form.Field
            name="name"
            validators={{
              onChange: ({ value }) =>
                !value ? 'Tên font là bắt buộc' : undefined,
            }}
          >
            {(field) => (
              <div>
                <label className="block text-sm font-medium text-blue-900 mb-2">
                  Tên Font *
                </label>
                <input
                  type="text"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {field.state.meta.errors.length > 0 && (
                  <p className="text-red-600 text-sm mt-1">{field.state.meta.errors[0]}</p>
                )}
              </div>
            )}
          </form.Field>

          {/* Description Field */}
          <form.Field name="description">
            {(field) => (
              <div>
                <label className="block text-sm font-medium text-blue-900 mb-2">
                  Mô tả
                </label>
                <textarea
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="Mô tả về font chữ..."
                />
              </div>
            )}
          </form.Field>

          {/* Thumbnail Field */}
          <form.Field name="thumbnail">
            {(field) => (
              <div>
                <label className="block text-sm font-medium text-blue-900 mb-2">
                  Thumbnail
                </label>
                <input
                  type="url"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://example.com/thumbnail.png"
                />
              </div>
            )}
          </form.Field>

          {/* File URLs */}
          <div>
            <label className="block text-sm font-medium text-blue-900 mb-2">
              File URLs
            </label>
            <form.Field name="newFileUrl">
              {(field) => (
                <div className="flex gap-2 mb-2">
                  <input
                    type="url"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="flex-1 px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://example.com/font.woff2"
                  />
                  <button
                    type="button"
                    onClick={addFileUrl}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              )}
            </form.Field>
            <form.Field name="fileUrl">
              {(field) => (
                <div className="space-y-1">
                  {(field.state.value || []).map((url: string, index: number) => (
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
              )}
            </form.Field>
          </div>

          {/* Images */}
          <div>
            <label className="block text-sm font-medium text-blue-900 mb-2">
              Images
            </label>
            <form.Field name="newImage">
              {(field) => (
                <div className="flex gap-2 mb-2">
                  <input
                    type="url"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="flex-1 px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://example.com/image.png"
                  />
                  <button
                    type="button"
                    onClick={addImage}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              )}
            </form.Field>
            <form.Field name="images">
              {(field) => (
                <div className="space-y-1">
                  {(field.state.value || []).map((image: string, index: number) => (
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
              )}
            </form.Field>
          </div>

          {/* Tags */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <label className="block text-sm font-medium text-gray-900 mb-3">
              Tags
            </label>
            <form.Field name="newTag">
              {(field) => (
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    placeholder="Nhập tag mới (ví dụ: sans, serif, display...)"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-1"
                  >
                    <Plus size={16} />
                    Thêm
                  </button>
                </div>
              )}
            </form.Field>
            <form.Field name="tags">
              {(field) => (
                <div className="min-h-[40px] p-3 bg-white border border-gray-200 rounded-md">
                  {(field.state.value || []).length === 0 ? (
                    <p className="text-gray-500 text-sm italic">Chưa có tag nào. Hãy thêm tag đầu tiên!</p>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {(field.state.value || []).map((tag: string, index: number) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full border border-blue-200"
                        >
                          <span className="font-medium">{tag}</span>
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="text-blue-600 hover:text-blue-800 hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                            title="Xóa tag"
                          >
                            <X size={12} />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </form.Field>
          </div>

          {/* Toggle Switches */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <form.Field name="isSupportVietnamese">
              {(field) => (
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200 min-h-[80px]">
                  <div className="flex-1 pr-4">
                    <label htmlFor="isSupportVietnamese" className="text-sm font-medium text-blue-900">
                      Hỗ trợ Tiếng Việt
                    </label>
                    <p className="text-xs text-blue-600 mt-1">Font có hỗ trợ ký tự tiếng Việt</p>
                  </div>
                  <div className="flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => field.handleChange(!field.state.value)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                        field.state.value ? 'bg-green-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform ${
                          field.state.value ? 'translate-x-6' : 'translate-x-0.5'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              )}
            </form.Field>
            <form.Field name="isVip">
              {(field) => (
                <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200 min-h-[80px]">
                  <div className="flex-1 pr-4">
                    <label htmlFor="isVip" className="text-sm font-medium text-yellow-900">
                      Font VIP
                    </label>
                    <p className="text-xs text-yellow-600 mt-1">Font cao cấp, đặc biệt</p>
                  </div>
                  <div className="flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => field.handleChange(!field.state.value)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 ${
                        field.state.value ? 'bg-yellow-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform ${
                          field.state.value ? 'translate-x-6' : 'translate-x-0.5'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              )}
            </form.Field>
            <form.Field name="isActive">
              {(field) => (
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200 min-h-[80px]">
                  <div className="flex-1 pr-4">
                    <label htmlFor="isActive" className="text-sm font-medium text-green-900">
                      Font hoạt động
                    </label>
                    <p className="text-xs text-green-600 mt-1">Font có thể sử dụng</p>
                  </div>
                  <div className="flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => field.handleChange(!field.state.value)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
                        field.state.value ? 'bg-green-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform ${
                          field.state.value ? 'translate-x-6' : 'translate-x-0.5'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              )}
            </form.Field>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={isLoading || !form.state.canSubmit}
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
