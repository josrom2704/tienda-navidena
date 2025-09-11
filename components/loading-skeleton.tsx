// components/loading-skeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";

export function ProductLoadingSkeleton() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="bg-white rounded-lg h-96 border border-yellow-200 shadow-md p-6">
            <Skeleton className="h-48 w-full mb-4 rounded-lg" />
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-2/3 mb-4" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function CategoryLoadingSkeleton() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="bg-white rounded-xl h-32 border border-yellow-200 shadow-md p-6">
            <Skeleton className="h-12 w-12 mx-auto mb-4 rounded-full" />
            <Skeleton className="h-6 w-3/4 mx-auto mb-2" />
            <Skeleton className="h-4 w-full mx-auto" />
          </div>
        </div>
      ))}
    </div>
  );
}
