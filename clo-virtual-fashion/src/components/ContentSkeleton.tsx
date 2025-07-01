const ContentSkeleton = () => {
  return (
    <div className="bg-gray-800 rounded animate-pulse overflow-hidden">
      <div className="aspect-[3/4] bg-gray-700" />
      <div className="px-3 py-2 space-y-2">
        <div className="h-4 bg-gray-700 rounded w-3/4" />
        <div className="h-3 bg-gray-700 rounded w-1/2" />
      </div>
    </div>
  );
};

export default ContentSkeleton;
