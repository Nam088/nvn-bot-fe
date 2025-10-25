'use client';

import { DownloadTracking } from '@/types/tracking';
import { useTrackingDetail } from '@/hooks/useTracking';
import { X, User, Calendar, MessageSquare, Download, Tag, Crown, Globe } from 'lucide-react';
import Image from 'next/image';

interface TrackingViewModalProps {
  tracking: DownloadTracking | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function TrackingViewModal({ tracking, isOpen, onClose }: TrackingViewModalProps) {
  const { data: trackingDetail, isLoading, error } = useTrackingDetail(tracking?.id || '');

  if (!isOpen || !tracking) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('vi-VN'),
      time: date.toLocaleTimeString('vi-VN'),
      full: date.toLocaleString('vi-VN'),
    };
  };

  const dateInfo = formatDate(tracking.createdAt);
  const fontInfo = trackingDetail?.font;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Download className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Download Details</h2>
              <p className="text-sm text-gray-500">Font: {tracking.fontName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Font Preview */}
          {fontInfo && (
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
              <div className="flex items-center space-x-4">
                {fontInfo.thumbnail && (
                  <div className="flex-shrink-0">
                    <Image
                      src={fontInfo.thumbnail}
                      alt={fontInfo.name}
                      width={120}
                      height={80}
                      className="rounded-lg border border-gray-200 shadow-sm"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">{fontInfo.name}</h3>
                  <div className="flex items-center space-x-2 mt-2">
                    {fontInfo.isVip && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        <Crown className="w-3 h-3 mr-1" />
                        VIP
                      </span>
                    )}
                    {fontInfo.isSupportVietnamese && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <Globe className="w-3 h-3 mr-1" />
                        Vietnamese
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* User Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-3">
              <User className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-medium text-gray-900">User Information</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Display Name</label>
                <p className="text-gray-900">{tracking.displayName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">User ID</label>
                <p className="text-gray-900">{tracking.userId}</p>
              </div>
              {tracking.username && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Username</label>
                  <p className="text-gray-900">@{tracking.username}</p>
                </div>
              )}
              <div>
                <label className="text-sm font-medium text-gray-500">First Name</label>
                <p className="text-gray-900">{tracking.firstName}</p>
              </div>
              {tracking.lastName && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Last Name</label>
                  <p className="text-gray-900">{tracking.lastName}</p>
                </div>
              )}
            </div>
          </div>

          {/* Download Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Calendar className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-medium text-gray-900">Download Information</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Download Date</label>
                <p className="text-gray-900">{dateInfo.date}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Download Time</label>
                <p className="text-gray-900">{dateInfo.time}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Font Name</label>
                <p className="text-gray-900">{tracking.fontName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Font ID</label>
                <p className="text-gray-900 font-mono text-sm">{tracking.fontId}</p>
              </div>
            </div>
          </div>

          {/* Chat Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-3">
              <MessageSquare className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-medium text-gray-900">Chat Information</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Chat Type</label>
                <p className="text-gray-900">
                  {tracking.chatTitle ? 'Group Chat' : 'Private Message'}
                </p>
              </div>
              {tracking.chatTitle && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Chat Title</label>
                  <p className="text-gray-900">{tracking.chatTitle}</p>
                </div>
              )}
              {tracking.chatId && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Chat ID</label>
                  <p className="text-gray-900 font-mono text-sm">{tracking.chatId}</p>
                </div>
              )}
            </div>
          </div>

          {/* Font Details */}
          {isLoading && (
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-3">
                <Download className="w-5 h-5 text-gray-600" />
                <h3 className="text-lg font-medium text-gray-900">Font Details</h3>
              </div>
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-gray-600">Loading font details...</span>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 text-red-500">⚠️</div>
                <p className="text-red-700">Failed to load font details</p>
              </div>
            </div>
          )}

          {fontInfo && !isLoading && !error && (
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-3">
                <Download className="w-5 h-5 text-gray-600" />
                <h3 className="text-lg font-medium text-gray-900">Font Details</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Font Name</label>
                  <p className="text-gray-900">{fontInfo.name}</p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-500">Status</label>
                  <div className="flex items-center space-x-2">
                    {fontInfo.isVip && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        <Crown className="w-3 h-3 mr-1" />
                        VIP
                      </span>
                    )}
                    {fontInfo.isSupportVietnamese && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <Globe className="w-3 h-3 mr-1" />
                        Vietnamese
                      </span>
                    )}
                  </div>
                </div>

                {fontInfo.tags && fontInfo.tags.length > 0 && (
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium text-gray-500">Tags</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {fontInfo.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {fontInfo.thumbnail && (
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium text-gray-500">Font Preview</label>
                    <div className="mt-2">
                      <Image
                        src={fontInfo.thumbnail}
                        alt={fontInfo.name}
                        width={300}
                        height={200}
                        className="rounded-lg border border-gray-200 w-full max-w-sm"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
