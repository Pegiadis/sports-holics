import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import FootballCard from "./FootballCard";
import { fetchFootballArticles } from "./api";
import { fetchLatestNews, fetchCarouselNews } from "../homepage-api";

export default async function FootballPage() {
  // Fetch articles from Strapi
  const [articles, latestNews, hotNews] = await Promise.all([
    fetchFootballArticles(),
    fetchLatestNews(),
    fetchCarouselNews()
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">⚽</span>
            <h1 className="text-4xl font-bold text-gray-900">Ποδόσφαιρο</h1>
          </div>
          <p className="text-gray-600">Όλα τα νέα και οι ειδήσεις για το ποδόσφαιρο</p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Articles List - Main Column */}
          <div className="lg:col-span-3">
            <div className="space-y-12 mb-10">
              {articles.map((article) => (
                <FootballCard key={article.id} article={article} />
              ))}
            </div>

            {/* Empty State */}
            {articles.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  Δεν υπάρχουν διαθέσιμα άρθρα αυτή τη στιγμή.
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <Sidebar latestNews={latestNews} hotNews={hotNews} />
        </div>
      </main>

      <Footer />
    </div>
  );
}

