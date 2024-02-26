import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { FaRegComment, FaRegHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const PostExcerptSkeleton = () => {
  return (
    <div>
      <div className="p-4 flex space-x-2 border-t">
        <div>
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
        <div className="space-y-1">
          <div className="flex items-center">
            <Skeleton className="w-[350px] h-[20px]" />
          </div>
          <Skeleton className="w-[350px] h-[80px]" />
          <div className="flex space-x-2">
            <Skeleton className="w-[50px] h-[10px]" />
            <Skeleton className="w-[50px] h-[10px]" />
          </div>
        </div>
      </div>

      <div className="p-4 flex space-x-2 border-t">
        <div>
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
        <div className="space-y-1">
          <div className="flex items-center">
            <Skeleton className="w-[350px] h-[20px]" />
          </div>
          <Skeleton className="w-[350px] h-[50px]" />
          <div className="flex space-x-2">
            <Skeleton className="w-[50px] h-[10px]" />
            <Skeleton className="w-[50px] h-[10px]" />
          </div>
        </div>
      </div>

      <div className="p-4 flex space-x-2 border-t">
        <div>
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
        <div className="space-y-1">
          <div className="flex items-center">
            <Skeleton className="w-[350px] h-[20px]" />
          </div>
          <Skeleton className="w-[350px] h-[30px]" />
          <div className="flex space-x-2">
            <Skeleton className="w-[50px] h-[10px]" />
            <Skeleton className="w-[50px] h-[10px]" />
          </div>
        </div>
      </div>

      <div className="p-4 flex space-x-2 border-t">
        <div>
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
        <div className="space-y-1">
          <div className="flex items-center">
            <Skeleton className="w-[350px] h-[20px]" />
          </div>
          <Skeleton className="w-[350px] h-[150px]" />
          <div className="flex space-x-2">
            <Skeleton className="w-[50px] h-[10px]" />
            <Skeleton className="w-[50px] h-[10px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostExcerptSkeleton;
