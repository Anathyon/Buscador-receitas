import React from 'react';
import { Skeleton } from './Skeleton';

export const RecipeCardSkeleton: React.FC = () => {
  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col h-full">
      <div className="relative aspect-video">
        <Skeleton className="w-full h-full" />
        <Skeleton className="absolute top-4 left-4 h-6 w-20 rounded-full" />
      </div>
      
      <div className="p-6 flex flex-col grow">
        <Skeleton className="h-7 w-3/4 mb-4" />
        
        <div className="flex items-center mb-4">
          <Skeleton className="h-4 w-4 mr-2 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>

        <div className="mt-auto pt-4 flex gap-2">
          <Skeleton className="h-6 w-16 rounded" />
          <Skeleton className="h-6 w-16 rounded" />
          <Skeleton className="h-6 w-16 rounded" />
        </div>
      </div>
    </article>
  );
};
