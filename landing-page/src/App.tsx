import './App.css'

function App() {

  return (
    <div className="min-h-screen bg-[#0f172a]">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#0f172a]/95 backdrop-blur supports-[backdrop-filter]:bg-[#0f172a]/80 border-b border-slate-800">
        <div className="mx-auto max-w-[1200px] h-[72px] px-6 flex items-center justify-between">
          {/* Left: Brand */}
          <div className="flex items-center">
            <span className="brand-script text-[26px] leading-none text-[#ff6a1a] font-normal">Sportsholics</span>
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
            <button aria-label="Search" className="text-slate-200 hover:text-[#ff1a1a] transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="7" strokeWidth="2"></circle>
                <path d="M20 20l-3.5-3.5" strokeWidth="2" strokeLinecap="round"></path>
              </svg>
            </button>
            <button className="subscribe-btn">Subscribe</button>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default App
