import { useState, useRef, useEffect } from 'react'
import './App.css'

const sports = [
  {
    id: 1,
    icon: '⚽',
    title: 'Ποδόσφαιρο',
    description: 'Ακολουθήστε το πιο δημοφιλές άθλημα στον κόσμο με κάλυψη της Premier League, La Liga, Serie A, Bundesliga και διεθνών τουρνουά. Αναλύσεις, κριτικές αγώνων και πληροφορίες για παίκτες.'
  },
  {
    id: 2,
    icon: '🏀',
    title: 'Μπάσκετ & Ευρωλίγκα',
    description: 'Πλήρης κάλυψη του NBA και της Ευρωπαϊκής αριστείας στο μπάσκετ. Στιγμιότυπα αγώνων, βαθμολογίες Ευρωλίγκας, μάχες playoffs και εμφανίσεις αστέρων από τις δύο πλευρές του Ατλαντικού.'
  },
  {
    id: 3,
    icon: '🏎️',
    title: 'Formula 1',
    description: 'Ζήστε την ταχύτητα και την ακρίβεια της κορυφής του μηχανοκίνητου αθλητισμού. Προεπισκοπήσεις αγωνιστικών Σαββατοκύριακων, αναλύσεις κατατακτηρίων, βαθμολογίες πρωταθλήματος, τεχνικές πληροφορίες και συνεντεύξεις οδηγών από όλες τις πίστες του κόσμου.'
  }
]

function App() {
  const [isPaused, setIsPaused] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let animationId: number
    let scrollPosition = 0
    const scrollSpeed = 0.3 // pixels per frame

    const animate = () => {
      if (!isPaused && scrollContainer) {
        scrollPosition += scrollSpeed
        
        // Reset position for infinite loop
        const maxScroll = scrollContainer.scrollWidth / 2
        if (scrollPosition >= maxScroll) {
          scrollPosition = 0
        }
        
        scrollContainer.style.transform = `translateX(-${scrollPosition}px)`
      }
      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [isPaused])

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-[#0f2942]">
      {/* Animated Background Gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f2942] via-[#1a365d] to-[#0f2942]"></div>
      
      {/* Background Image with Transparency */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{ 
          backgroundImage: 'url(/538544969_4162373800694713_171132891172216337_n.jpg)',
          backgroundBlendMode: 'overlay'
        }}
      ></div>
      
      {/* Animated Gradient Orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#d81921] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff4444] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-[#1a365d] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      
      {/* Athletics Icons */}
      <div className="absolute top-20 left-10 text-4xl opacity-20 animate-float">🏃</div>
      <div className="absolute top-40 right-20 text-5xl opacity-25 animate-float animation-delay-1000">🏆</div>
      <div className="absolute bottom-40 left-1/4 text-3xl opacity-20 animate-float animation-delay-2000">🥇</div>
      <div className="absolute bottom-20 right-1/4 text-6xl opacity-15 animate-float animation-delay-3000">👟</div>
      <div className="absolute top-1/2 left-1/3 text-4xl opacity-20 animate-float animation-delay-1500">⚡</div>
      <div className="absolute top-1/3 right-1/3 text-3xl opacity-25 animate-float animation-delay-2500">🎯</div>
      <div className="absolute bottom-1/3 left-1/2 text-5xl opacity-15 animate-float animation-delay-3500">⏱️</div>
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-6xl w-full text-center">
          {/* Logo with Glow Effect */}
          <div className="mt-20 mb-12 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-[#d81921] blur-2xl opacity-30 rounded-full"></div>
              <img 
                src="/no_back.png" 
                alt="Sportsholics Logo" 
                className="relative h-32 md:h-40 w-auto drop-shadow-2xl transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            <h1 className="text-6xl md:text-8xl font-bold leading-tight">
              <span className="text-[#ffffff] drop-shadow-lg">Χτίζουμε</span>
              <br />
              <span className="bg-gradient-to-r from-[#d81921] via-[#ff4444] to-[#d81921] bg-clip-text text-transparent animate-gradient-x">
                Κάτι Υπέροχο
              </span>
            </h1>

            <p className="text-2xl md:text-3xl text-[#e8e9e4] max-w-3xl mx-auto leading-relaxed font-light">
              Το αθλητικό μας blog είναι υπό κατασκευή. Εργαζόμαστε σκληρά για να σας φέρουμε τα τελευταία νέα, 
              σκορ και αναλύσεις από τον κόσμο του αθλητισμού.
            </p>

            {/* Sports Icons Grid */}
            <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {/* Football */}
              <div className="bg-[#ffffff]/5 backdrop-blur border border-[#e8e9e4]/10 rounded-2xl p-6 hover:bg-[#ffffff]/10 transition-all duration-300 hover:scale-105 hover:border-[#d81921]/50">
                <div className="text-4xl mb-2">⚽</div>
                <p className="text-[#e8e9e4] font-semibold">Ποδόσφαιρο</p>
              </div>
              
              {/* Basketball */}
              <div className="bg-[#ffffff]/5 backdrop-blur border border-[#e8e9e4]/10 rounded-2xl p-6 hover:bg-[#ffffff]/10 transition-all duration-300 hover:scale-105 hover:border-[#d81921]/50">
                <div className="text-4xl mb-2">🏀</div>
                <p className="text-[#e8e9e4] font-semibold">Μπάσκετ</p>
              </div>
              
              {/* Formula 1 */}
              <div className="bg-[#ffffff]/5 backdrop-blur border border-[#e8e9e4]/10 rounded-2xl p-6 hover:bg-[#ffffff]/10 transition-all duration-300 hover:scale-105 hover:border-[#d81921]/50">
                <div className="text-4xl mb-2">🏎️</div>
                <p className="text-[#e8e9e4] font-semibold">Formula 1</p>
              </div>
            </div>

            {/* Sports Details Carousel */}
            <div className="mt-12 max-w-6xl mx-auto">
              <div className="bg-[#ffffff]/5 backdrop-blur-lg border border-[#e8e9e4]/10 rounded-3xl p-8 md:p-12">
                <h2 className="text-3xl md:text-4xl font-bold text-[#ffffff] mb-8 text-center">
                  <span className="bg-gradient-to-r from-[#d81921] to-[#ff4444] bg-clip-text text-transparent">
                    Τι Θα Καλύψουμε
                  </span>
                </h2>
                
                {/* Continuous Scrolling Carousel */}
                <div 
                  className="relative overflow-hidden"
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                >
                  {/* Gradient Overlays for fade effect */}
                  <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#0f2942]/80 to-transparent z-10 pointer-events-none"></div>
                  <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#0f2942]/80 to-transparent z-10 pointer-events-none"></div>
                  
                  {/* Scrolling Container */}
                  <div className="overflow-hidden py-4">
                    <div 
                      ref={scrollRef}
                      className="flex gap-8 will-change-transform"
                    >
                      {/* Duplicate the array twice for infinite loop effect */}
                      {[...sports, ...sports].map((sport, index) => (
                        <div 
                          key={`${sport.id}-${index}`}
                          className="flex-shrink-0 w-[400px]"
                        >
                          <div className="bg-[#ffffff]/5 backdrop-blur border border-[#e8e9e4]/10 rounded-2xl p-8 h-full hover:bg-[#ffffff]/10 transition-all duration-300 hover:scale-105 hover:border-[#d81921]/50">
                            <div className="flex flex-col items-center text-center space-y-4">
                              <span className="text-6xl">{sport.icon}</span>
                              <h3 className="text-2xl font-bold text-[#e8e9e4]">
                                {sport.title}
                              </h3>
                              <p className="text-[#e8e9e4]/80 leading-relaxed">
                                {sport.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Coming Soon Badge with Animation */}
            <div className="inline-flex items-center gap-3 px-8 py-4 bg-[#ffffff]/10 backdrop-blur-lg border border-[#e8e9e4]/20 rounded-full shadow-2xl hover:scale-105 transition-transform duration-300">
              <div className="w-3 h-3 bg-[#d81921] rounded-full animate-pulse shadow-lg shadow-[#d81921]/50"></div>
              <span className="text-[#e8e9e4] font-bold text-lg">Έρχεται Σύντομα</span>
            </div>

            {/* Footer */}
            <div className="pt-12 pb-20">
              <p className="text-[#e8e9e4]/70 text-base">
                Μείνετε συντονισμένοι για ενημερώσεις • Ακολουθήστε μας στα social media
              </p>
              <div className="mt-6 flex justify-center gap-4">
                {/* Instagram */}
                <div 
                  onClick={() => window.open('https://www.instagram.com/sportsholics.gr/', '_blank')}
                  className="w-12 h-12 bg-[#ffffff]/10 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-[#833AB4] hover:via-[#E1306C] hover:to-[#F77737] transition-all cursor-pointer border border-[#e8e9e4]/20 hover:scale-110 group"
                >
                  <svg className="w-6 h-6 fill-[#e8e9e4] group-hover:fill-white transition-colors" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>

                {/* Twitter/X */}
                <div 
                  onClick={() => window.open('https://x.com/sportsholics_gr?t=KWX1YZspcZdMVfJxXN0Erw&s=09', '_blank')}
                  className="w-12 h-12 bg-[#ffffff]/10 rounded-full flex items-center justify-center hover:bg-[#1DA1F2] transition-all cursor-pointer border border-[#e8e9e4]/20 hover:scale-110 group"
                >
                  <svg className="w-5 h-5 fill-[#e8e9e4] group-hover:fill-white transition-colors" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </div>

                {/* Facebook */}
                <div 
                  onClick={() => window.open('https://www.facebook.com/p/Sportsholics-61579664206346/', '_blank')}
                  className="w-12 h-12 bg-[#ffffff]/10 rounded-full flex items-center justify-center hover:bg-[#1877F2] transition-all cursor-pointer border border-[#e8e9e4]/20 hover:scale-110 group"
                >
                  <svg className="w-6 h-6 fill-[#e8e9e4] group-hover:fill-white transition-colors" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
