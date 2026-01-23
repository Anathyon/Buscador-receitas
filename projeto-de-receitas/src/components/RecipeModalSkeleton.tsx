import React from 'react';
import { Skeleton } from './Skeleton';

interface RecipeModalSkeletonProps {
  onClose: () => void;
}

export const RecipeModalSkeleton: React.FC<RecipeModalSkeletonProps> = ({ onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-pulse"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-hidden relative shadow-2xl flex flex-col md:flex-row h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Side: Image simulation */}
        <div className="w-full md:w-2/5 h-64 md:h-auto relative bg-gray-200">
          <Skeleton className="w-full h-full" />
          <div className="absolute bottom-0 left-0 p-8 w-full z-10">
            <Skeleton className="h-6 w-24 mb-3 rounded-full bg-white/50" />
            <Skeleton className="h-10 w-3/4 mb-3 bg-white/50" />
            <Skeleton className="h-5 w-1/3 bg-white/50" />
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="flex-1 p-8 space-y-8 overflow-hidden flex flex-col">
          {/* Action Buttons */}
          <div className="flex gap-3">
            <Skeleton className="h-14 flex-1 rounded-2xl" />
            <Skeleton className="h-14 flex-1 rounded-2xl" />
          </div>

          {/* Ingredients Section */}
          <div className="shrink-0">
            <Skeleton className="h-7 w-40 mb-4" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-12 w-full rounded-2xl" />
              ))}
            </div>
          </div>

          {/* Instructions Section */}
          <div className="grow space-y-3">
            <Skeleton className="h-7 w-40 mb-4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-11/12" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
        
        {/* Close Button Placeholder */}
        <div className="absolute top-4 right-4 z-50">
             <Skeleton className="h-10 w-10 rounded-full" />
        </div>
      </div>
    </div>
  );
};
