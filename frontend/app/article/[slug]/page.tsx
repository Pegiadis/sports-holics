import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import ShareButtons from "@/components/ShareButtons";
import SocialMediaScripts from "@/components/SocialMediaScripts";
import ArticleContent from "@/components/ArticleContent";
import Leaderboards from "@/components/Leaderboards";
import SidebarWidget from "@/components/SidebarWidget";
import { fetchArticleBySlug, getImageUrl, formatPublishedDate } from "@/lib/sports-api";
import { fetchLatestNews, fetchCarouselNews, fetchTrendingArticles } from "@/app/homepage-api";
import { renderDynamicZone } from "@/lib/richtext-utils";

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await fetchArticleBySlug(slug);

  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  // Use SEO data if available, otherwise fall back to article data
  const title = article.seo?.metaTitle || article.title;
  const description = article.seo?.metaDescription || article.subtitle || article.title;
  const imageUrl = article.seo?.metaImage?.url
    ? getImageUrl(article.seo.metaImage.url, '/no_back.png')
    : article.imageUrl;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const articleUrl = `${siteUrl}/article/${slug}`;
  const canonicalUrl = article.seo?.canonicalURL || articleUrl;

  return {
    title,
    description,
    keywords: article.seo?.keywords,
    robots: article.seo?.metaRobots || 'index, follow',
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: articleUrl,
      siteName: 'Sports Holics',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'el_GR',
      type: 'article',
      publishedTime: article.timeAgo,
      authors: [article.author],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
      creator: '@sportsholics',
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;

  // Fetch article, latest news, hot news, and trending in parallel
  const [article, latestNews, hotNews, trendingArticles] = await Promise.all([
    fetchArticleBySlug(slug),
    fetchLatestNews(),
    fetchCarouselNews(),
    fetchTrendingArticles(undefined, [slug])
  ]);

  // If article not found in any sport, show 404
  if (!article) {
    notFound();
  }

  const trendingFootball = trendingArticles.filter((a) => a.category === 'ΠΟΔΟΣΦΑΙΡΟ').slice(0, 5);
  const trendingBasketball = trendingArticles.filter((a) => a.category === 'ΜΠΑΣΚΕΤ').slice(0, 5);
  const trendingAutoMoto = trendingArticles.filter((a) => a.category === 'AUTO MOTO').slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Back button */}
      <div className="max-w-[90rem] mx-auto px-4 md:px-6 pt-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm font-medium group"
        >
          <svg
            className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5"
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

      {/* Article Body + Sidebar */}
      <main className="max-w-[90rem] mx-auto px-4 md:px-6 py-6">
        <div className="grid grid-cols-1 grid-layout-3col gap-5">
          {/* Left sidebar */}
          <div className="lg:sticky lg:top-24 self-start lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto lg:scrollbar-hide space-y-5">
            <SidebarWidget
              title="Δημοφιλή"
              icon="/trending.png"
              articles={trendingArticles.slice(0, 5)}
              variant="numbered"
            />
            <SidebarWidget
              title="Ποδόσφαιρο"
              icon="/football.png"
              articles={trendingFootball}
              accentColor="border-l-green-500"
              variant="image"
            />
            <SidebarWidget
              title="Μπάσκετ"
              icon="/basketball.png"
              articles={trendingBasketball}
              accentColor="border-l-orange-500"
              variant="compact"
            />
            <SidebarWidget
              title="Auto Moto"
              icon="/apex.png"
              articles={trendingAutoMoto}
              accentColor="border-l-blue-500"
              variant="image"
            />
            <Leaderboards />
          </div>

          {/* Article Content */}
          <div>
            <article className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Article Image — full width, natural aspect ratio */}
              <div className="relative w-full">
                <Image
                  src={article.imageUrl}
                  alt={article.title}
                  width={1200}
                  height={675}
                  sizes="(max-width: 768px) 100vw, 800px"
                  className="w-full h-auto"
                  priority
                />
              </div>

              <div className="p-6 md:p-10">
                {/* Category + Team badges */}
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span
                    className={`${article.categoryColor} text-sm font-semibold px-3.5 py-1.5 rounded-md uppercase tracking-wide`}
                  >
                    {article.category}
                  </span>
                  {article.team && (
                    <Link
                      href={`/team/${article.team.slug}`}
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-sm font-medium transition-colors"
                    >
                      {article.team.logoUrl && (
                        <Image
                          src={article.team.logoUrl}
                          alt={article.team.name}
                          width={18}
                          height={18}
                          className="object-contain"
                        />
                      )}
                      {article.team.name}
                    </Link>
                  )}
                </div>

                {/* Title */}
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 leading-tight mb-4">
                  {article.title}
                </h1>

                {/* Subtitle */}
                {article.subtitle && (
                  <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-5">
                    {article.subtitle}
                  </p>
                )}

                {/* Author + Date */}
                <div className="flex items-center gap-4 mb-6">
                  {article.authorAvatarUrl ? (
                    <Link
                      href={article.authorSlug ? `/blog/${article.authorSlug}` : '#'}
                      className="relative w-11 h-11 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-gray-200 hover:ring-primary/40 transition-all"
                    >
                      <Image
                        src={article.authorAvatarUrl}
                        alt={article.author}
                        fill
                        className="object-cover"
                      />
                    </Link>
                  ) : (
                    <div className="w-11 h-11 rounded-full flex-shrink-0 ring-2 ring-gray-200 bg-gray-100 flex items-center justify-center">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  )}
                  <div>
                    {article.authorSlug ? (
                      <Link
                        href={`/blog/${article.authorSlug}`}
                        className="text-gray-900 font-bold hover:text-primary transition-colors text-sm"
                      >
                        {article.author}
                      </Link>
                    ) : (
                      <span className="text-gray-900 font-bold text-sm">{article.author}</span>
                    )}
                    <div className="flex items-center gap-2 text-gray-500 text-xs mt-0.5">
                      <span>{formatPublishedDate(article.publishedAt)}</span>
                      <span>•</span>
                      <span suppressHydrationWarning>{article.timeAgo}</span>
                    </div>
                  </div>
                </div>

                <hr className="border-gray-200 mb-6" />
              <ArticleContent
                html={renderDynamicZone(article.content)}
                className="prose prose-lg max-w-none"
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

          {/* Right sidebar */}
          <div className="lg:sticky lg:top-24 self-start lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto lg:scrollbar-hide space-y-5">
            <Sidebar latestNews={latestNews} hotNews={hotNews} />
            <SidebarWidget
              title="Μην τα χάσετε"
              icon="/news-2.png"
              articles={trendingArticles.slice(15, 20)}
              accentColor="border-l-yellow-500"
              variant="image"
            />
          </div>
        </div>
      </main>

      <Footer />
      <SocialMediaScripts />
    </div>
  );
}
