import './App.css'

function App() {

  return (
    <div className="min-h-screen bg-[#0f2942]">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#0f2942]/95 backdrop-blur supports-[backdrop-filter]:bg-[#0f2942]/90 border-b border-[#e8e9e4]/20">
        <div className="mx-auto max-w-[1200px] h-[72px] px-6 flex items-center justify-between">
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
    </div>
  )
}

export default App
