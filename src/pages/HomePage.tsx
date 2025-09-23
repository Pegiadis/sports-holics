import { Calendar, TrendingUp, Users, Trophy } from 'lucide-react';
import ArticleCard from '../components/ui/ArticleCard';
import LiveScoreCard from '../components/ui/LiveScoreCard';
import StandingsTable from '../components/ui/StandingsTable';
import Card from '../components/ui/Card';
import { mockArticles, mockGames, mockStandings } from '../data/mockData';

export default function HomePage() {
  const featuredArticles = mockArticles.filter(article => article.featured);
  const recentArticles = mockArticles.filter(article => !article.featured).slice(0, 6);
  const liveGames = mockGames.filter(game => game.status === 'live');
  const upcomingGames = mockGames.filter(game => game.status === 'scheduled').slice(0, 3);
  const recentGames = mockGames.filter(game => game.status === 'finished').slice(0, 3);
  const topStandings = mockStandings.slice(0, 8);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white relative min-h-screen flex items-center bg-cover bg-center bg-no-repeat" style={{backgroundImage: 'url(/images.png)'}}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="container py-8 relative z-10 w-full">
          <div className="max-w-5xl mx-auto text-center">
            <div className="mb-6">
              <img 
                src="/main-logo.jpg" 
                alt="Sports Holics Logo" 
                className="h-16 md:h-24 w-auto mx-auto mb-4 object-contain"
              />
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
              Your Ultimate
              <span className="block text-secondary-400">Euroleague Hub</span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-primary-100 mb-8 leading-relaxed max-w-3xl mx-auto px-4">
              Stay updated with the latest news, live scores, stats, and analysis from Europe's premier basketball competition.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
              <button className="bg-secondary-600 text-white hover:bg-secondary-700 px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg">
                Latest News
              </button>
              <button className="border-2 border-secondary-500 text-secondary-400 hover:bg-secondary-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                Live Scores
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="container -mt-20 relative z-10 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-white text-center shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-center w-12 h-12 bg-secondary-100 rounded-lg mx-auto mb-3">
              <Trophy className="text-secondary-600" size={24} />
            </div>
            <div className="text-2xl font-bold text-neutral-900 mb-1">18</div>
            <div className="text-sm text-neutral-600">Teams</div>
          </Card>
          <Card className="bg-white text-center shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg mx-auto mb-3">
              <Calendar className="text-primary-600" size={24} />
            </div>
            <div className="text-2xl font-bold text-neutral-900 mb-1">34</div>
            <div className="text-sm text-neutral-600">Regular Season Games</div>
          </Card>
          <Card className="bg-white text-center shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-center w-12 h-12 bg-accent-100 rounded-lg mx-auto mb-3">
              <Users className="text-accent-600" size={24} />
            </div>
            <div className="text-2xl font-bold text-neutral-900 mb-1">216</div>
            <div className="text-sm text-neutral-600">Active Players</div>
          </Card>
          <Card className="bg-white text-center shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-lg mx-auto mb-3">
              <TrendingUp className="text-yellow-600" size={24} />
            </div>
            <div className="text-2xl font-bold text-neutral-900 mb-1">82.4</div>
            <div className="text-sm text-neutral-600">Avg Points/Game</div>
          </Card>
        </div>
      </section>

      <div className="container space-y-12 pb-12">
        {/* Live Scores Section */}
        {liveGames.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-neutral-900">Live Now</h2>
              <div className="flex items-center space-x-2 text-red-500">
                <div className="w-2 h-2 bg-red-500 rounded-full live-indicator"></div>
                <span className="text-sm font-medium">Live</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {liveGames.map((game) => (
                <LiveScoreCard key={game.id} game={game} />
              ))}
            </div>
          </section>
        )}

        {/* Featured News */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-neutral-900">Featured Stories</h2>
            <a href="/news" className="text-primary-600 hover:text-primary-700 font-medium">
              View All →
            </a>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {featuredArticles.map((article) => (
              <ArticleCard key={article.id} article={article} variant="featured" />
            ))}
          </div>
        </section>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent News */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-neutral-900">Latest News</h2>
              <a href="/news" className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                View All →
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recentArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Standings */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-neutral-900">Standings</h3>
                <a href="/euroleague/standings" className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                  Full Table →
                </a>
              </div>
              <StandingsTable standings={topStandings} showForm={false} />
            </div>

            {/* Upcoming Games */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-neutral-900">Upcoming Games</h3>
                <a href="/euroleague/schedule" className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                  Full Schedule →
                </a>
              </div>
              <div className="space-y-4">
                {upcomingGames.map((game) => (
                  <LiveScoreCard key={game.id} game={game} />
                ))}
              </div>
            </div>

            {/* Recent Results */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-neutral-900">Recent Results</h3>
                <a href="/euroleague/results" className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                  All Results →
                </a>
              </div>
              <div className="space-y-4">
                {recentGames.map((game) => (
                  <LiveScoreCard key={game.id} game={game} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
