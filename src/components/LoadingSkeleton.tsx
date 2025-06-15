import React from 'react';

const LoadingSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-300" />
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="h-6 bg-gray-300 rounded-full w-24" />
          <div className="h-4 bg-gray-300 rounded w-16" />
        </div>
        <div className="h-6 bg-gray-300 rounded mb-2 w-full" />
        <div className="h-6 bg-gray-300 rounded mb-3 w-3/4" />
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gray-300 rounded w-full" />
          <div className="h-4 bg-gray-300 rounded w-full" />
          <div className="h-4 bg-gray-300 rounded w-2/3" />
        </div>
        <div className="flex items-center justify-between">
          <div className="h-4 bg-gray-300 rounded w-24" />
          <div className="h-4 bg-gray-300 rounded w-20" />
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;