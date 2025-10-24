import Skeleton from 'react-loading-skeleton';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header Skeleton */}
        <div className="mb-8 space-y-3">
          <Skeleton height={40} width={400} borderRadius={8} />
          <Skeleton height={20} width={350} borderRadius={6} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Search Box Skeleton */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg border border-blue-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Skeleton circle width={24} height={24} />
                <Skeleton height={24} width={200} borderRadius={6} />
              </div>
              <div className="space-y-4">
                <div>
                  <Skeleton height={14} width={150} borderRadius={4} className="mb-2" />
                  <Skeleton height={48} borderRadius={8} />
                </div>
                <Skeleton height={48} borderRadius={8} />
              </div>
            </div>

            {/* Result Skeleton */}
            <div className="bg-white rounded-lg shadow-lg border border-blue-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Skeleton circle width={24} height={24} />
                <Skeleton height={24} width={150} borderRadius={6} />
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-3 mb-3">
                    <Skeleton circle width={32} height={32} />
                    <div className="flex-1 space-y-2">
                      <Skeleton height={16} width="60%" borderRadius={4} />
                      <Skeleton height={12} width="40%" borderRadius={4} />
                    </div>
                  </div>
                  <Skeleton height={14} width="100%" borderRadius={4} />
                  <Skeleton height={14} width="90%" borderRadius={4} className="mt-2" />
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <Skeleton count={3} height={14} borderRadius={4} />
                </div>
              </div>
            </div>
          </div>

          {/* History Skeleton */}
          <div className="bg-white rounded-lg shadow-lg border border-blue-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Skeleton circle width={24} height={24} />
              <Skeleton height={24} width={250} borderRadius={6} />
            </div>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-start justify-between mb-2">
                    <Skeleton height={20} width={150} borderRadius={6} />
                    <Skeleton circle width={20} height={20} />
                  </div>
                  <Skeleton height={12} width="80%" borderRadius={4} className="mb-2" />
                  <Skeleton height={14} width="100%" borderRadius={4} />
                  <Skeleton height={14} width="60%" borderRadius={4} className="mt-2" />
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <Skeleton height={10} width={120} borderRadius={4} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
