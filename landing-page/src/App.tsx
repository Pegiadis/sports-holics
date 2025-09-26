import './App.css'

function App() {

  return (
    <div className="min-h-screen bg-[#0f2942]">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#0f2942]/95 backdrop-blur supports-[backdrop-filter]:bg-[#0f2942]/90 border-b border-[#e8e9e4]/20">
        <div className="mx-auto max-w-[1600px] h-[72px] px-6 lg:px-8 xl:px-12 flex items-center justify-between">
          {/* Left: Brand Logo */}
          <div className="flex items-center">
            <img 
              src="/538544969_4162373800694713_171132891172216337_n.jpg" 
              alt="Sportsholics Logo" 
              className="brand-logo"
            />
          </div>

          {/* Center: Nav links */}
          <div className="hidden md:flex items-center gap-7">
            <a className="nav-link" href="#">Football</a>
            <a className="nav-link" href="#">Basketball</a>
            <a className="nav-link" href="#">Baseball</a>
            <a className="nav-link" href="#">Soccer</a>
            <a className="nav-link" href="#">Live Scores</a>
          </div>

          {/* Right: Search + CTA */}
          <div className="flex items-center gap-4">
            <button aria-label="Search" className="text-[#ffffff] hover:text-[#d81921] transition-colors p-2 rounded-lg hover:bg-[#ffffff]/10">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="7" strokeWidth="2"></circle>
                <path d="M20 20l-3.5-3.5" strokeWidth="2" strokeLinecap="round"></path>
              </svg>
            </button>
            <button className="subscribe-btn">Subscribe</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        {/* Background with overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f2942] via-[#1a365d] to-[#0f2942]"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Content */}
        <div className="relative z-10 mx-auto max-w-[1600px] px-6 lg:px-8 xl:px-12 text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="text-[#ffffff]">The Ultimate Source for</span>
              <br />
              <span className="bg-gradient-to-r from-[#d81921] to-[#ff4444] bg-clip-text text-transparent">
                Sports Fanatics
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-[#e8e9e4] max-w-3xl mx-auto leading-relaxed">
              Breaking news, live scores, and in-depth analysis for every sport you love
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-16 max-w-3xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search sports news..."
                className="w-full px-6 py-4 pr-14 text-lg bg-[#ffffff]/10 backdrop-blur border border-[#e8e9e4]/20 rounded-2xl text-[#ffffff] placeholder-[#e8e9e4]/70 focus:outline-none focus:ring-2 focus:ring-[#d81921] focus:border-transparent transition-all duration-200"
              />
              <button 
                aria-label="Search sports news"
                title="Search sports news"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-[#d81921] text-[#ffffff] rounded-xl hover:bg-[#b01419] transition-colors duration-200"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="11" cy="11" r="7" strokeWidth="2"></circle>
                  <path d="M20 20l-3.5-3.5" strokeWidth="2" strokeLinecap="round"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* News Carousel */}
      <section className="relative bg-[#0f2942]/50 backdrop-blur border-t border-[#e8e9e4]/10">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-8 xl:px-12 py-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-1 h-8 bg-[#d81921] rounded-full"></div>
            <h2 className="text-2xl font-bold text-[#ffffff]">Latest News</h2>
          </div>
          
          <div className="carousel-container overflow-hidden relative">
            <div className="carousel-track flex gap-6 animate-scroll">
              {/* News Item 1 */}
              <div className="carousel-item flex-shrink-0 w-80 bg-[#ffffff]/5 backdrop-blur border border-[#e8e9e4]/10 rounded-xl p-6 hover:bg-[#ffffff]/10 transition-all duration-300 group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-[#d81921] rounded-full animate-pulse"></div>
                  <span className="text-[#e8e9e4] text-sm font-medium">BREAKING</span>
                </div>
                <h3 className="text-[#ffffff] font-semibold mb-2 group-hover:text-[#d81921] transition-colors">
                  Manchester United signs new striker for record fee
                </h3>
                <p className="text-[#e8e9e4]/80 text-sm">
                  The Red Devils complete their biggest transfer of the summer...
                </p>
              </div>

              {/* News Item 2 */}
              <div className="carousel-item flex-shrink-0 w-80 bg-[#ffffff]/5 backdrop-blur border border-[#e8e9e4]/10 rounded-xl p-6 hover:bg-[#ffffff]/10 transition-all duration-300 group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-[#ff8c00] rounded-full"></div>
                  <span className="text-[#e8e9e4] text-sm font-medium">NFL</span>
                </div>
                <h3 className="text-[#ffffff] font-semibold mb-2 group-hover:text-[#d81921] transition-colors">
                  NFL Draft: Top prospects announced for upcoming season
                </h3>
                <p className="text-[#e8e9e4]/80 text-sm">
                  College stars prepare for their professional debut...
                </p>
              </div>

              {/* News Item 3 */}
              <div className="carousel-item flex-shrink-0 w-80 bg-[#ffffff]/5 backdrop-blur border border-[#e8e9e4]/10 rounded-xl p-6 hover:bg-[#ffffff]/10 transition-all duration-300 group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-[#ff6600] rounded-full"></div>
                  <span className="text-[#e8e9e4] text-sm font-medium">NBA</span>
                </div>
                <h3 className="text-[#ffffff] font-semibold mb-2 group-hover:text-[#d81921] transition-colors">
                  NBA Finals Game 7 set for Sunday night showdown
                </h3>
                <p className="text-[#e8e9e4]/80 text-sm">
                  Championship hopes hang in the balance as teams prepare...
                </p>
              </div>

              {/* News Item 4 */}
              <div className="carousel-item flex-shrink-0 w-80 bg-[#ffffff]/5 backdrop-blur border border-[#e8e9e4]/10 rounded-xl p-6 hover:bg-[#ffffff]/10 transition-all duration-300 group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-[#00ff88] rounded-full"></div>
                  <span className="text-[#e8e9e4] text-sm font-medium">TENNIS</span>
                </div>
                <h3 className="text-[#ffffff] font-semibold mb-2 group-hover:text-[#d81921] transition-colors">
                  Wimbledon championship reaches thrilling conclusion
                </h3>
                <p className="text-[#e8e9e4]/80 text-sm">
                  Historic match captivates audiences worldwide...
                </p>
              </div>

              {/* Duplicate items for seamless loop */}
              <div className="carousel-item flex-shrink-0 w-80 bg-[#ffffff]/5 backdrop-blur border border-[#e8e9e4]/10 rounded-xl p-6 hover:bg-[#ffffff]/10 transition-all duration-300 group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-[#d81921] rounded-full animate-pulse"></div>
                  <span className="text-[#e8e9e4] text-sm font-medium">BREAKING</span>
                </div>
                <h3 className="text-[#ffffff] font-semibold mb-2 group-hover:text-[#d81921] transition-colors">
                  Manchester United signs new striker for record fee
                </h3>
                <p className="text-[#e8e9e4]/80 text-sm">
                  The Red Devils complete their biggest transfer of the summer...
                </p>
              </div>

              <div className="carousel-item flex-shrink-0 w-80 bg-[#ffffff]/5 backdrop-blur border border-[#e8e9e4]/10 rounded-xl p-6 hover:bg-[#ffffff]/10 transition-all duration-300 group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-[#ff8c00] rounded-full"></div>
                  <span className="text-[#e8e9e4] text-sm font-medium">NFL</span>
                </div>
                <h3 className="text-[#ffffff] font-semibold mb-2 group-hover:text-[#d81921] transition-colors">
                  NFL Draft: Top prospects announced for upcoming season
                </h3>
                <p className="text-[#e8e9e4]/80 text-sm">
                  College stars prepare for their professional debut...
                </p>
              </div>

              {/* News Item 7 */}
              <div className="carousel-item flex-shrink-0 w-80 bg-[#ffffff]/5 backdrop-blur border border-[#e8e9e4]/10 rounded-xl p-6 hover:bg-[#ffffff]/10 transition-all duration-300 group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-[#ff6600] rounded-full"></div>
                  <span className="text-[#e8e9e4] text-sm font-medium">NBA</span>
                </div>
                <h3 className="text-[#ffffff] font-semibold mb-2 group-hover:text-[#d81921] transition-colors">
                  NBA Finals Game 7 set for Sunday night showdown
                </h3>
                <p className="text-[#e8e9e4]/80 text-sm">
                  Championship hopes hang in the balance as teams prepare...
                </p>
              </div>

              {/* News Item 8 */}
              <div className="carousel-item flex-shrink-0 w-80 bg-[#ffffff]/5 backdrop-blur border border-[#e8e9e4]/10 rounded-xl p-6 hover:bg-[#ffffff]/10 transition-all duration-300 group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-[#00ff88] rounded-full"></div>
                  <span className="text-[#e8e9e4] text-sm font-medium">TENNIS</span>
                </div>
                <h3 className="text-[#ffffff] font-semibold mb-2 group-hover:text-[#d81921] transition-colors">
                  Wimbledon championship reaches thrilling conclusion
                </h3>
                <p className="text-[#e8e9e4]/80 text-sm">
                  Historic match captivates audiences worldwide...
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default App
