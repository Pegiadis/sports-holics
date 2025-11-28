import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import Pagination from "@/components/Pagination";
import ArticleCard from "@/components/ArticleCard";
import { BaseArticle, PaginationMeta } from "@/lib/sports-api";
import { NewsArticle } from "@/types";

interface SportPageTemplateProps {
  emoji: string;
  title: string;
  description: string;
  articles: BaseArticle[];
  pagination: PaginationMeta;
  latestNews: NewsArticle[];
  hotNews: NewsArticle[];
}

export default function SportPageTemplate({
  emoji,
  title,
  description,
  articles,
  pagination,
  latestNews,
  hotNews,
}: SportPageTemplateProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">{emoji}</span>
            <h1 className="text-4xl font-bold text-gray-900">{title}</h1>
          </div>
          <p className="text-gray-600">{description}</p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Articles List - Main Column */}
          <div className="lg:col-span-3">
            <div className="space-y-6 mb-10">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
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

            {/* Pagination */}
            <Pagination
              currentPage={pagination.page}
              totalPages={pagination.pageCount}
              totalItems={pagination.total}
              itemsPerPage={pagination.pageSize}
            />
          </div>

          {/* Sidebar */}
          <Sidebar latestNews={latestNews} hotNews={hotNews} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
