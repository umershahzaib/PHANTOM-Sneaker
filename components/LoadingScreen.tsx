export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-phantom-black">
      <div className="text-center space-y-8">
        {/* Animated Logo */}
        <div className="animate-pulse">
          <h1 className="font-display text-6xl md:text-8xl font-bold tracking-tight-display text-phantom-white">
            PHANTOM
          </h1>
        </div>

        {/* Loading Spinner */}
        <div className="flex justify-center">
          <div className="w-16 h-16 border-4 border-phantom-graphite-light border-t-phantom-blue rounded-full animate-spin"></div>
        </div>

        {/* Loading Text */}
        <p className="text-phantom-silver/70 text-sm tracking-widest animate-pulse">
          LOADING EXPERIENCE
        </p>
      </div>
    </div>
  )
}
