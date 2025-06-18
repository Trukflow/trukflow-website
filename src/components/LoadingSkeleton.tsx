
import { Skeleton } from "@/components/ui/skeleton";

interface LoadingSkeletonProps {
  type?: 'page' | 'card' | 'text' | 'hero';
  count?: number;
}

const LoadingSkeleton = ({ type = 'page', count = 1 }: LoadingSkeletonProps) => {
  const renderSkeleton = () => {
    switch (type) {
      case 'hero':
        return (
          <div className="min-h-screen bg-gray-100 pt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
              <div className="space-y-8">
                <Skeleton className="h-16 w-3/4 mx-auto" />
                <Skeleton className="h-8 w-1/2 mx-auto" />
                <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <Skeleton className="h-14 w-48" />
                  <Skeleton className="h-14 w-48" />
                </div>
              </div>
            </div>
          </div>
        );
      case 'card':
        return (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <Skeleton className="h-48 w-full mb-4" />
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-4" />
            <Skeleton className="h-16 w-full" />
          </div>
        );
      case 'text':
        return (
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>
        );
      default:
        return (
          <div className="min-h-screen bg-gray-100 pt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-lg shadow-lg p-6">
                    <Skeleton className="h-48 w-full mb-4" />
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2 mb-4" />
                    <Skeleton className="h-16 w-full" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i}>{renderSkeleton()}</div>
      ))}
    </>
  );
};

export default LoadingSkeleton;
