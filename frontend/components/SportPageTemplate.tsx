import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import SectionTitle from "@/components/SectionTitle";
import Pagination from "@/components/Pagination";
import ArticleCard from "@/components/ArticleCard";
import { BaseArticle, PaginationMeta } from "@/lib/sports-api";
import { NewsArticle } from "@/types";

interface SportPageTemplateProps {
  emoji: string;
  icon?: string;
  title: string;
  description: string;
  articles: BaseArticle[];
  pagination: PaginationMeta;
  latestNews: NewsArticle[];
  hotNews: NewsArticle[];
}

export default function SportPageTemplate({
  emoji,
  icon,
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

      <main className="max-w-[90rem] mx-auto px-4 md:px-6 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <SectionTitle title={title} icon={icon || emoji} variant="large" className="mb-2" />
          <p className="text-gray-500 ml-14">{description}</p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 grid-layout-2col gap-5">
          {/* Articles List - Main Column */}
          <div>
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
