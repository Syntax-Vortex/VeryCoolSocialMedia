import React from 'react';

export default function ProfileSkeleton() {
  return (
    <div className="p-10 animate-pulse">
      {/* Mobile version: visible on small screens only */}
      <div className="flex flex-col items-center gap-3 sm:hidden">
        <div className="w-24 h-24 rounded-full bg-gray-700" />
        <div className="h-5 w-36 bg-gray-700 rounded" />
        <div className="h-4 w-24 bg-gray-700 rounded" />
      </div>

      {/* Desktop version: hidden on small screens */}
      <div className="hidden sm:flex items-start gap-6">
        {/* Profile Picture */}
        <div className="w-28 h-28 rounded-full bg-gray-700" />

        {/* Info Section */}
        <div className="flex-1 space-y-3">
          {/* Top Row: Name + Button */}
          <div className="flex items-center gap-4">
            <div className="h-6 w-40 bg-gray-700 rounded"></div>
            <div className="h-8 w-28 bg-gray-800 rounded-full" />
          </div>

          {/* Username */}
          <div className="h-5 w-36 bg-gray-700 rounded"></div>

          {/* Stats */}
          <div className="flex gap-6">
            <div className="h-4 w-20 bg-gray-700 rounded"></div>
            <div className="h-4 w-24 bg-gray-700 rounded"></div>
            <div className="h-4 w-24 bg-gray-700 rounded"></div>
          </div>

          {/* Bio */}
          <div className="h-4 w-2/3 bg-gray-700 rounded"></div>
          <div className="h-4 w-1/3 bg-gray-700 rounded"></div>
        </div>
      </div>
    </div>
  );
}
