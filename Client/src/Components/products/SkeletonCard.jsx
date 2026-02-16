// Skeleton card shown while loading
const SkeletonCard = () => (
  <div className="bg-white/5 border border-white/8 rounded-2xl overflow-hidden animate-pulse">
    <div className="h-52 bg-white/8" />
    <div className="p-4 space-y-3">
      <div className="h-3.5 bg-white/10 rounded w-3/4" />
      <div className="h-3 bg-white/8 rounded w-1/2" />
      <div className="h-5 bg-white/10 rounded w-1/3 mt-1" />
      <div className="flex gap-2 pt-1">
        <div className="flex-1 h-9 bg-blue-600/20 rounded-xl" />
        <div className="flex-1 h-9 bg-white/8 rounded-xl" />
      </div>
    </div>
  </div>
);

export default SkeletonCard;