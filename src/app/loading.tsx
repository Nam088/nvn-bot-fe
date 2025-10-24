import Skeleton from 'react-loading-skeleton';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-3">
            <Skeleton height={40} width={250} borderRadius={8} />
            <Skeleton height={20} width={400} borderRadius={6} />
          </div>
          <Skeleton height={48} width={160} borderRadius={8} />
        </div>

        {/* Search Skeleton */}
        <div className="bg-white rounded-lg shadow-sm border border-blue-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <Skeleton height={40} borderRadius={8} />
            </div>
            <div className="flex gap-4">
              <Skeleton height={40} width={190} borderRadius={8} />
              <Skeleton height={40} width={190} borderRadius={8} />
              <Skeleton height={40} width={130} borderRadius={8} />
            </div>
          </div>
        </div>

        {/* Table Skeleton */}
        <div className="bg-white rounded-lg shadow-sm border border-blue-200 overflow-hidden">
          {/* Table Header */}
          <div className="bg-blue-50 border-b border-blue-200 px-6 py-3">
            <div className="flex gap-6">
              <Skeleton width={40} height={16} borderRadius={4} />
              <Skeleton width={120} height={16} borderRadius={4} />
              <Skeleton width={100} height={16} borderRadius={4} />
              <Skeleton width={80} height={16} borderRadius={4} />
              <Skeleton width={100} height={16} borderRadius={4} />
            </div>
          </div>
          
          {/* Table Rows */}
          <div className="divide-y divide-blue-200">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="px-6 py-4">
                <div className="flex items-center gap-6">
                  <Skeleton width={24} height={24} borderRadius={4} />
                  <Skeleton width={48} height={48} borderRadius={8} />
                  <div className="flex-1 space-y-2">
                    <Skeleton height={16} width="70%" borderRadius={4} />
                    <Skeleton height={12} width="50%" borderRadius={4} />
                  </div>
                  <div className="flex gap-2">
                    <Skeleton width={60} height={24} borderRadius={12} />
                    <Skeleton width={60} height={24} borderRadius={12} />
                  </div>
                  <Skeleton height={14} width={100} borderRadius={4} />
                  <div className="flex gap-1">
                    <Skeleton circle width={32} height={32} />
                    <Skeleton circle width={32} height={32} />
                    <Skeleton circle width={32} height={32} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
