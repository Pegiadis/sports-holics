import { TrendingNewsItem, LiveScoreItem } from "@/types";

export default function Sidebar() {
  const trendingNews: TrendingNewsItem[] = [
    { rank: 1, title: "Champions League Final Tickets Sold Out", timeAgo: "1 hour ago" },
    { rank: 2, title: "NBA Draft Lottery Results", timeAgo: "3 hours ago" },
    { rank: 3, title: "F1 Driver Contract Extension", timeAgo: "5 hours ago" },
  ];

  const liveScores: LiveScoreItem[] = [
    {
      match: "Manchester United vs Liverpool",
      league: "Premier League",
      score: "3-1",
      isLive: false,
    },
    {
      match: "Lakers vs Warriors",
      league: "NBA",
      score: "108-95",
      isLive: false,
    },
    {
      match: "Red Bull vs Ferrari",
      league: "F1 Practice",
      score: "LIVE",
      isLive: true,
    },
  ];

  return (
    <aside className="lg:col-span-1">
      {/* Trending Now */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-lg font-bold mb-4 text-gray-800">Trending Now</h3>
        <div className="space-y-4">
          {trendingNews.map((news) => (
            <div key={news.rank} className="flex items-start space-x-3">
              <span
                className={`${
                  news.rank === 1 ? "bg-primary" : "bg-gray-400"
                } text-white text-xs px-2 py-1 rounded font-bold`}
              >
                {news.rank}
              </span>
              <div>
                <h4 className="font-medium text-sm">{news.title}</h4>
                <p className="text-xs text-gray-500 mt-1">{news.timeAgo}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live Scores */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-lg font-bold mb-4 text-gray-800">Live Scores</h3>
        <div className="space-y-3">
          {liveScores.map((match, index) => (
            <div
              key={index}
              className={`flex justify-between items-center py-2 ${
                index < liveScores.length - 1 ? "border-b" : ""
              }`}
            >
              <div className="text-sm">
                <div className="font-medium">{match.match}</div>
                <div className="text-gray-500 text-xs">{match.league}</div>
              </div>
              <div
                className={`font-bold ${
                  match.isLive ? "text-green-600" : "text-primary"
                }`}
              >
                {match.score}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold mb-4 text-gray-800">Newsletter</h3>
        <p className="text-gray-600 text-sm mb-4">
          Get the latest sports news delivered to your inbox
        </p>
        <div className="space-y-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-primary"
          />
          <button className="w-full bg-primary hover:bg-red-600 text-white py-2 rounded-[var(--radius-button)] text-sm font-medium whitespace-nowrap transition-colors">
            Subscribe
          </button>
        </div>
      </div>
    </aside>
  );
}

