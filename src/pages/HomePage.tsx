import React from 'react';
import ArticleCard from '../components/ui/ArticleCard';
import StatsCard from '../components/ui/StatsCard';
import LiveScoreCard from '../components/ui/LiveScoreCard';
import { Trophy, Users, TrendingUp, Calendar } from 'lucide-react';

const HomePage: React.FC = () => {
  // Mock data - in real app this would come from API
  const featuredArticles = [
    {
      title: 'Giannis Antetokounmpo Leads Greece to Victory Against Spain in Eurobasket',
      excerpt: 'The Greek Freak dominated the court with 32 points and 11 rebounds as Greece secured a crucial victory in the Eurobasket tournament. The performance showcased why he remains one of the most dominant players in international basketball.',
      imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      author: 'Maria Kostas',
      publishDate: '2 hours ago',
      readTime: '5 min read',
      views: 15420,
      category: 'BASKETBALL',
      isLive: false,
      isFeatured: true,
    },
    {
      title: 'Olympiacos Reaches Euroleague Final Four',
      excerpt: 'The Reds secured their spot in the Final Four with a commanding performance against Barcelona, setting up an exciting showdown in Athens.',
      imageUrl: 'https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      author: 'Dimitris Papas',
      publishDate: '4 hours ago',
      readTime: '3 min read',
      views: 8932,
      category: 'EUROLEAGUE',
      isLive: false,
      isFeatured: false,
    },
    {
      title: 'Panathinaikos Signs New Star Player',
      excerpt: 'The Greens announce the signing of a promising young talent from the NBA Development League.',
      imageUrl: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      author: 'Anna Stavrou',
      publishDate: '6 hours ago',
      readTime: '4 min read',
      views: 12543,
      category: 'TRANSFERS',
      isLive: false,
      isFeatured: false,
    },
    {
      title: 'Live: Greece vs Belarus - World Cup Qualifiers',
      excerpt: 'Follow the live action as Greece takes on Belarus in the crucial World Cup qualifying match.',
      imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      author: 'Live Coverage',
      publishDate: 'Now',
      readTime: 'Live',
      views: 25678,
      category: 'FOOTBALL',
      isLive: true,
      isFeatured: false,
    },
  ];

  const liveScores = [
    {
      homeTeam: {
        name: 'Greece',
        logo: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
        score: 78,
      },
      awayTeam: {
        name: 'Spain',
        logo: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
        score: 82,
      },
      gameTime: '15:30',
      status: 'live' as const,
      league: 'EUROBASKET',
      quarter: '4th Quarter',
    },
    {
      homeTeam: {
        name: 'Olympiacos',
        logo: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
        score: 89,
      },
      awayTeam: {
        name: 'Barcelona',
        logo: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
        score: 76,
      },
      gameTime: 'Final',
      status: 'finished' as const,
      league: 'EUROLEAGUE',
    },
  ];

  const stats = [
    {
      title: 'Total Articles',
      value: '2,847',
      change: 12,
      changeType: 'increase' as const,
      subtitle: 'This month',
      icon: <Calendar size={24} />,
      color: 'primary' as const,
    },
    {
      title: 'Live Games',
      value: '5',
      subtitle: 'Currently active',
      icon: <Trophy size={24} />,
      color: 'success' as const,
    },
    {
      title: 'Monthly Readers',
      value: '847K',
      change: 8,
      changeType: 'increase' as const,
      subtitle: 'Unique visitors',
      icon: <Users size={24} />,
      color: 'warning' as const,
    },
    {
      title: 'Trending Stories',
      value: '23',
      change: 15,
      changeType: 'increase' as const,
      subtitle: 'Last 24 hours',
      icon: <TrendingUp size={24} />,
      color: 'danger' as const,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <section className="mb-12">
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-xl text-white p-8 lg:p-12">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-6xl font-bold mb-4">
              Your Ultimate Sports Destination
            </h1>
            <p className="text-xl lg:text-2xl text-primary-100 mb-6">
              Stay updated with the latest news, live scores, and in-depth analysis from the world of sports.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors">
                Latest News
              </button>
              <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors">
                Live Scores
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Platform Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Featured Articles */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Latest News</h2>
              <a href="/news" className="text-primary-600 hover:text-primary-700 font-medium">
                View All →
              </a>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {featuredArticles.map((article, index) => (
                <ArticleCard key={index} {...article} />
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Live Scores */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Live Scores</h2>
            <div className="space-y-4">
              {liveScores.map((score, index) => (
                <LiveScoreCard key={index} {...score} />
              ))}
            </div>
          </section>

          {/* Trending Topics */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Trending Topics</h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="space-y-4">
                {[
                  'Giannis Antetokounmpo MVP Race',
                  'Euroleague Final Four Athens',
                  'Greece National Team',
                  'Olympiacos Transfer News',
                  'Panathinaikos New Coach',
                ].map((topic, index) => (
                  <a
                    key={index}
                    href="#"
                    className="block text-gray-700 hover:text-primary-600 transition-colors"
                  >
                    #{index + 1} {topic}
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* Newsletter Signup */}
          <section>
            <div className="bg-primary-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Stay in the Loop
              </h3>
              <p className="text-gray-600 mb-4">
                Get daily sports updates delivered to your inbox.
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <button className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-lg font-medium transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
