'use client';

import { useState } from 'react';
import { Search, MessageSquare, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { autoReplyService } from '@/services/autoReplyService';

interface SearchResult {
  query: string;
  timestamp: string;
  matched: boolean;
  matchedKeyword?: string;
  message: string;
  autoReplyId?: string;
}

export default function AutoReplyTestPage() {
  const [searchText, setSearchText] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [searchHistory, setSearchHistory] = useState<SearchResult[]>([]);

  const handleSearch = async () => {
    if (!searchText.trim()) return;

    setIsSearching(true);
    setSearchResult(null);

    try {
      const response = await autoReplyService.query({ text: searchText });
      const result = {
        query: searchText,
        timestamp: new Date().toISOString(),
        ...response.data,
      };
      
      setSearchResult(result);
      setSearchHistory([result, ...searchHistory.slice(0, 9)]); // Keep last 10
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isSearching) {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-blue-900 mb-2">
            Auto-Reply Testing
          </h1>
          <p className="text-gray-600">
            Test tính năng tìm kiếm và trả lời tự động dựa trên keyword
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Search Section */}
          <div className="space-y-6">
            {/* Search Box */}
            <div className="bg-white rounded-lg shadow-lg border border-blue-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Search size={24} className="text-blue-600" />
                Tìm kiếm Auto-Reply
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nhập text để tìm kiếm:
                  </label>
                  <input
                    type="text"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ví dụ: xin chào, giá cả, hỗ trợ..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={isSearching}
                  />
                </div>

                <button
                  onClick={handleSearch}
                  disabled={isSearching || !searchText.trim()}
                  className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center gap-2"
                >
                  {isSearching ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Đang tìm kiếm...
                    </>
                  ) : (
                    <>
                      <Search size={20} />
                      Tìm kiếm
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Current Result */}
            {searchResult && (
              <div className="bg-white rounded-lg shadow-lg border border-blue-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <MessageSquare size={24} className="text-purple-600" />
                  Kết quả
                </h2>

                <div className="space-y-4">
                  {/* Match Status */}
                  <div className="flex items-center gap-3 p-4 rounded-lg border-2 border-dashed">
                    {searchResult.matched ? (
                      <>
                        <CheckCircle size={32} className="text-green-600" />
                        <div>
                          <p className="font-bold text-green-900">Tìm thấy kết quả!</p>
                          <p className="text-sm text-gray-600">
                            Matched keyword: <span className="font-mono bg-purple-100 px-2 py-1 rounded text-purple-800">{searchResult.matchedKeyword}</span>
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <XCircle size={32} className="text-red-600" />
                        <div>
                          <p className="font-bold text-red-900">Không tìm thấy</p>
                          <p className="text-sm text-gray-600">Không có keyword nào khớp với text của bạn</p>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Query */}
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase mb-1 block">
                      Query của bạn:
                    </label>
                    <p className="p-3 bg-gray-50 rounded-lg text-gray-900 border border-gray-200">
                      {searchResult.query}
                    </p>
                  </div>

                  {/* Response Message */}
                  {searchResult.matched && searchResult.message && (
                    <div>
                      <label className="text-xs font-medium text-gray-500 uppercase mb-1 block">
                        Tin nhắn trả lời:
                      </label>
                      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-gray-900 whitespace-pre-wrap">{searchResult.message}</p>
                      </div>
                    </div>
                  )}

                  {/* Auto-Reply ID */}
                  {searchResult.autoReplyId && (
                    <div>
                      <label className="text-xs font-medium text-gray-500 uppercase mb-1 block">
                        Auto-Reply ID:
                      </label>
                      <p className="text-xs text-gray-400 font-mono p-2 bg-gray-50 rounded border border-gray-200 break-all">
                        {searchResult.autoReplyId}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* History Section */}
          <div>
            <div className="bg-white rounded-lg shadow-lg border border-blue-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-2xl">📜</span>
                Lịch sử tìm kiếm ({searchHistory.length})
              </h2>

              {searchHistory.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <p>Chưa có lịch sử tìm kiếm</p>
                  <p className="text-sm mt-2">Thử tìm kiếm một keyword để bắt đầu</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[600px] overflow-y-auto">
                  {searchHistory.map((item, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border-2 transition-all hover:shadow-md ${
                        item.matched
                          ? 'bg-green-50 border-green-200'
                          : 'bg-red-50 border-red-200'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className="font-mono text-sm bg-white px-2 py-1 rounded border">
                          {item.query}
                        </span>
                        {item.matched ? (
                          <CheckCircle size={20} className="text-green-600" />
                        ) : (
                          <XCircle size={20} className="text-red-600" />
                        )}
                      </div>
                      
                      {item.matched && (
                        <>
                          <div className="text-xs text-gray-600 mb-1">
                            Keyword: <span className="font-mono bg-purple-100 px-1.5 py-0.5 rounded text-purple-800">{item.matchedKeyword}</span>
                          </div>
                          <p className="text-sm text-gray-900 line-clamp-2">{item.message}</p>
                        </>
                      )}
                      
                      <p className="text-xs text-gray-400 mt-2">
                        {new Date(item.timestamp).toLocaleString('vi-VN')}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Info Panel */}
        <div className="mt-8 bg-blue-50 rounded-lg shadow-lg border border-blue-300 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-3">💡 Cách hoạt động</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">1.</span>
              <span>Nhập text bất kỳ vào ô tìm kiếm (ví dụ: &quot;xin chào&quot;, &quot;giá cả&quot;, &quot;hỗ trợ&quot;)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">2.</span>
              <span>Hệ thống sẽ tìm kiếm keyword phù hợp nhất dựa trên FTS (Full-Text Search)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">3.</span>
              <span>Nếu tìm thấy, sẽ trả về tin nhắn tự động tương ứng với keyword đó</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">4.</span>
              <span>Priority thấp hơn sẽ được ưu tiên khớp trước (1 &gt; 2 &gt; 3...)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">5.</span>
              <span>Nếu không tìm thấy keyword nào, sẽ trả về default reply (nếu có)</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

