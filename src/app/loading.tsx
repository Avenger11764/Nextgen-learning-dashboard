export default function Loading() {
  return (
    <div className="flex h-screen overflow-hidden bg-bg-dark text-gray-100">
      
      {/* Skeleton Sidebar (Left) */}
      <aside className="hidden md:flex flex-col w-64 h-screen bg-card-dark/80 border-r border-white/5 p-6 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/5 animate-pulse" />
          <div className="h-4 w-28 bg-white/5 rounded animate-pulse" />
        </div>
        <div className="flex-1 space-y-4 pt-8">
          {Array.from({ length: 5 }).map((_, idx) => (
            <div key={idx} className="h-10 w-full bg-white/5 rounded-xl animate-pulse" />
          ))}
        </div>
        <div className="h-12 w-full bg-white/5 rounded-xl animate-pulse" />
      </aside>

      {/* Main Skeleton Bento Grid (Right) */}
      <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 pb-20 md:pb-8">
        
        {/* Banner skeleton */}
        <div className="h-12 w-full bg-white/5 rounded-2xl animate-pulse" />

        {/* Hero Tile skeleton */}
        <section className="h-[180px] w-full bg-white/5 rounded-3xl animate-pulse" />

        {/* Course Card skeletons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 4 }).map((_, idx) => (
            <article 
              key={idx} 
              className="h-[220px] rounded-3xl bg-white/5 border border-white/5 p-6 flex flex-col justify-between"
            >
              <div className="flex justify-between items-center">
                <div className="w-12 h-12 bg-white/10 rounded-2xl animate-pulse" />
                <div className="w-16 h-6 bg-white/10 rounded-full animate-pulse" />
              </div>
              <div className="space-y-4">
                <div className="h-6 w-3/4 bg-white/10 rounded animate-pulse" />
                <div className="space-y-2">
                  <div className="h-3 w-1/3 bg-white/10 rounded animate-pulse" />
                  <div className="h-2 w-full bg-white/10 rounded-full animate-pulse" />
                </div>
              </div>
            </article>
          ))}

          {/* Activity Chart skeleton */}
          <section className="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-2 h-[300px] bg-white/5 rounded-3xl animate-pulse" />
          
          {/* Side Info card skeleton */}
          <section className="h-[300px] bg-white/5 rounded-3xl animate-pulse" />
        </div>
      </main>
    </div>
  );
}
