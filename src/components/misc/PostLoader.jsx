const PostLoader = () => {
  return (
    <div className="w-72 rounded-xl bg-[#1e1e2f] p-4 space-y-4 animate-pulse mx-2">
      {/* Title Placeholder */}
      <div className="h-4 bg-gray-700 rounded w-1/2" />

      {/* Image Thumbnails */}
      <div className="flex space-x-2">
        <div className="bg-gray-600 rounded-lg aspect-square w-1/3" />
        <div className="bg-gray-600 rounded-lg aspect-square w-1/3" />
        <div className="bg-gray-600 rounded-lg aspect-square w-1/3" />
      </div>
    </div>
  );
};

export default PostLoader;
