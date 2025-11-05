import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import ShareButtons from "@/components/ShareButtons";
import { fetchArticleBySlug } from "@/lib/sports-api";
import { fetchLatestNews } from "@/app/homepage-api";
import { richtextToHtml } from "@/lib/richtext-utils";

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  
  // Fetch article and latest news in parallel
  const [article, latestNews] = await Promise.all([
    fetchArticleBySlug(slug),
    fetchLatestNews()
  ]);

  // If article not found in any sport, show 404
  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb / Back Navigation */}
        <div className="mb-6">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 flex items-center gap-2 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Επιστροφή στην αρχική
          </Link>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Article Container - Main Column */}
          <div className="lg:col-span-3">
            <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Hero Image */}
          <div className="relative w-full h-96">
            <Image
              src={article.imageUrl}
              alt={article.title}
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
              priority
            />
          </div>

          {/* Article Content */}
          <div className="p-8">
            {/* Category Badge */}
            <div className="mb-4">
              <span
                className={`inline-block ${article.categoryColor} text-sm font-semibold px-4 py-2 rounded-full uppercase tracking-wide`}
              >
                {article.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {article.title}
            </h1>

            {/* Subtitle */}
            {article.subtitle && (
              <h2 className="text-xl text-gray-600 mb-6 leading-relaxed">
                {article.subtitle}
              </h2>
            )}

            {/* Meta Information */}
            <div className="flex items-center gap-6 text-gray-600 text-sm mb-8 pb-8 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span className="font-medium">{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{article.timeAgo}</span>
              </div>
            </div>

            {/* Article Body */}
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: richtextToHtml(article.description) }}
            />

            {/* Share Section */}
            <ShareButtons 
              url={`${process.env.NEXT_PUBLIC_SITE_URL || ''}/article/${article.slug}`}
              title={article.title}
              description={article.subtitle}
            />
          </div>
        </article>
          </div>

          {/* Sidebar */}
          <Sidebar latestNews={latestNews} />
        </div>
      </main>

      <Footer />
    </div>
  );
}

