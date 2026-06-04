import React from 'react';

export default function SkeletonLoader({ type = 'product-card', count = 1 }) {
  const renderSkeleton = () => {
    switch (type) {
      case 'product-card':
        return (
          <div className="border border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-800 shadow-sm animate-pulse">
            <div className="bg-slate-200 dark:bg-slate-700 h-64 w-full" />
            <div className="p-4 space-y-3">
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-2/3" />
              <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-full" />
              <div className="flex justify-between items-center pt-2">
                <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-1/4" />
                <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-1/3" />
              </div>
            </div>
          </div>
        );
      case 'product-details':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-pulse">
            <div className="bg-slate-200 dark:bg-slate-700 rounded-2xl h-96 w-full" />
            <div className="space-y-6">
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/4" />
              <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
              <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-1/3" />
              <div className="space-y-2">
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-full" />
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-5/6" />
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-4/5" />
              </div>
              <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded w-1/2" />
              <div className="flex gap-4 pt-4">
                <div className="h-12 bg-slate-200 dark:bg-slate-700 rounded-lg w-1/3" />
                <div className="h-12 bg-slate-200 dark:bg-slate-700 rounded-lg w-1/3" />
              </div>
            </div>
          </div>
        );
      case 'table-row':
        return (
          <tr className="animate-pulse border-b border-slate-100 dark:border-slate-800">
            <td className="p-4"><div className="h-10 w-10 bg-slate-200 dark:bg-slate-700 rounded-lg" /></td>
            <td className="p-4"><div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-36 md:w-48" /></td>
            <td className="p-4"><div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-12" /></td>
            <td className="p-4"><div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-16" /></td>
            <td className="p-4"><div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-full w-20" /></td>
            <td className="p-4"><div className="flex gap-2"><div className="h-8 w-8 bg-slate-200 dark:bg-slate-700 rounded" /><div className="h-8 w-8 bg-slate-200 dark:bg-slate-700 rounded" /></div></td>
          </tr>
        );
      default:
        return (
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full animate-pulse" />
        );
    }
  };

  return (
    <>
      {Array.from({ length: count }).map((_, idx) => (
        <React.Fragment key={idx}>{renderSkeleton()}</React.Fragment>
      ))}
    </>
  );
}
