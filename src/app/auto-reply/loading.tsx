import Skeleton from 'react-loading-skeleton';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header Skeleton */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="space-y-3">
              <Skeleton height={40} width={300} borderRadius={8} />
              <Skeleton height={20} width={450} borderRadius={6} />
            </div>
            <div className="flex gap-3">
              <Skeleton height={48} width={120} borderRadius={8} />
              <Skeleton height={48} width={180} borderRadius={8} />
            </div>
          </div>

          {/* Stats Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm border border-blue-200 p-4">
                <div className="flex items-center gap-3">
                  <Skeleton circle width={48} height={48} />
                  <div className="space-y-2 flex-1">
                    <Skeleton height={16} width="80%" borderRadius={4} />
                    <Skeleton height={28} width={60} borderRadius={6} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Table Skeleton */}
        <div className="bg-white rounded-lg shadow-sm border border-blue-200 overflow-hidden">
          <div className="bg-blue-50 border-b border-blue-200 px-6 py-4">
            <Skeleton height={20} width={200} borderRadius={6} />
          </div>
          <div className="p-6 space-y-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex items-center gap-4">
                <Skeleton width={24} height={24} borderRadius={4} />
                <Skeleton width={40} height={40} borderRadius={6} />
                <div className="flex-1 space-y-2">
                  <Skeleton height={16} width="60%" borderRadius={4} />
                  <Skeleton height={12} width="40%" borderRadius={4} />
                </div>
                <Skeleton width={80} height={24} borderRadius={12} />
                <Skeleton width={80} height={24} borderRadius={12} />
                <div className="flex gap-2">
                  <Skeleton circle width={32} height={32} />
                  <Skeleton circle width={32} height={32} />
                  <Skeleton circle width={32} height={32} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
