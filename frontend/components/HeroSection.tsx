export default function HeroSection() {
  return (
    <section
      className="relative h-96 bg-cover bg-center"
      style={{
        backgroundImage: `url('/216-scaled-1.jpg')`,
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
        <div className="text-white max-w-2xl">
          <span className="bg-primary px-3 py-1 rounded text-sm font-medium">
            FOOTBALL
          </span>
          <h1 className="text-4xl font-bold mt-4 mb-4">
            Champions League Final Set for Epic Showdown
          </h1>
          <p className="text-lg mb-6">
            Two football giants prepare for the ultimate battle as Manchester
            City faces Real Madrid in what promises to be the most thrilling
            Champions League final in recent history.
          </p>
          <button className="bg-primary hover:bg-red-600 text-white px-6 py-3 rounded-[var(--radius-button)] font-medium whitespace-nowrap transition-colors">
            Read Full Story
          </button>
        </div>
      </div>
    </section>
  );
}

