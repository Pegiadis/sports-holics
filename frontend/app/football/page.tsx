import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FootballCard from "./FootballCard";
import { fetchFootballArticles } from "./api";

export default async function FootballPage() {
  // Fetch articles from Strapi
  const articles = await fetchFootballArticles();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">⚽</span>
            <h1 className="text-4xl font-bold text-gray-900">Ποδόσφαιρο</h1>
          </div>
          <p className="text-gray-600">Όλα τα νέα και οι ειδήσεις για το ποδόσφαιρο</p>
        </div>

        {/* Articles List - Single Column */}
        <div className="space-y-6">
          {articles.map((article) => (
            <FootballCard key={article.id} article={article} />
          ))}

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
      </main>

      <Footer />
    </div>
  );
}

