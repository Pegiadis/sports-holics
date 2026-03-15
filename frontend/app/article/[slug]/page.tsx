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
import { fetchArticleBySlug, getImageUrl, formatPublishedDate } from "@/lib/sports-api";
import { fetchLatestNews, fetchCarouselNews } from "@/app/homepage-api";
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
  
  // Fetch article, latest news, and hot news in parallel
  const [article, latestNews, hotNews] = await Promise.all([
    fetchArticleBySlug(slug),
    fetchLatestNews(),
    fetchCarouselNews()
  ]);

  // If article not found in any sport, show 404
  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-[90rem] mx-auto px-4 md:px-6 py-8">
        {/* Back Navigation */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 px-4 py-2.5 bg-white hover:bg-gray-50 text-gray-700 hover:text-primary rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 text-sm font-medium group"
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

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 grid-layout-2col gap-5">
          {/* Article Container - Main Column */}
          <div>
            <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Hero Image */}
          <div className="relative w-full h-[450px] md:h-[550px]">
            <Image
              src={article.imageUrl}
              alt={article.title}
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover object-center"
              priority
            />
          </div>

          {/* Article Content */}
          <div className="p-8">
            {/* Category and Team Badges */}
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span
                className={`inline-block ${article.categoryColor} text-sm font-semibold px-4 py-2 rounded-full uppercase tracking-wide`}
              >
                {article.category}
              </span>
              {article.team && (
                <Link 
                  href={`/team/${article.team.slug}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm font-medium transition-colors"
                >
                  {article.team.logoUrl && (
                    <Image
                      src={article.team.logoUrl}
                      alt={article.team.name}
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  )}
                  {article.team.name}
                </Link>
              )}
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

            {/* Author Info */}
            <div className="flex items-center gap-4 pb-8 mb-8 border-b border-gray-200">
              {article.authorAvatarUrl ? (
                <Link 
                  href={article.authorSlug ? `/blog/${article.authorSlug}` : '#'} 
                  className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-primary/20 hover:ring-primary/50 transition-all"
                >
                  <Image
                    src={article.authorAvatarUrl}
                    alt={article.author}
                    fill
                    className="object-cover"
                  />
                </Link>
              ) : (
                <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-gray-200 bg-gray-100 flex items-center justify-center">
                <svg
                    className="w-8 h-8 text-gray-400"
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
                </div>
              )}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                {article.authorSlug ? (
                  <Link
                    href={`/blog/${article.authorSlug}`}
                      className="text-lg font-bold text-gray-900 hover:text-primary transition-colors"
                  >
                    {article.author}
                  </Link>
                ) : (
                    <span className="text-lg font-bold text-gray-900">{article.author}</span>
                )}
              </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                <svg
                      className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>{formatPublishedDate(article.publishedAt)}</span>
              </div>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-500">({article.timeAgo})</span>
                </div>
              </div>
            </div>

            {/* Article Body */}
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

          {/* Sidebar */}
          <Sidebar latestNews={latestNews} hotNews={hotNews} />
        </div>
      </main>

      <Footer />
      <SocialMediaScripts />
    </div>
  );
}

