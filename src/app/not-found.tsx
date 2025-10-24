import Link from 'next/link';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-blue-600">
            404
          </h1>
          <div className="mx-auto w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center mt-4">
            <Search size={64} className="text-blue-600" />
          </div>
        </div>

        {/* Error Message */}
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Trang không tồn tại
        </h2>
        <p className="text-gray-600 mb-8">
          Xin lỗi, chúng tôi không thể tìm thấy trang bạn đang tìm kiếm.
          <br />
          Có thể trang đã bị xóa hoặc URL không chính xác.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <Home size={20} />
            Về trang chủ
          </Link>
          <Link
            href="/auto-reply"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
          >
            Auto-Reply
          </Link>
        </div>

        {/* Quick Links */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-3">Trang phổ biến:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Link href="/" className="text-sm text-blue-600 hover:underline">
              Quản lý Fonts
            </Link>
            <span className="text-gray-400">•</span>
            <Link href="/auto-reply" className="text-sm text-blue-600 hover:underline">
              Auto-Reply
            </Link>
            <span className="text-gray-400">•</span>
            <Link href="/auto-reply/test" className="text-sm text-blue-600 hover:underline">
              Test Auto-Reply
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

