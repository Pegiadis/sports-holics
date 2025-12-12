import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ShareButtons from "@/components/ShareButtons";
import { fetchBlogArticleBySlug, fetchBlogArticlesByJournalist } from "../../api";
import { renderDynamicZone } from "@/lib/richtext-utils";
import { getImageUrl } from "@/lib/sports-api";

interface BlogArticlePageProps {
  params: Promise<{
    journalist: string;
    article: string;
  }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogArticlePageProps): Promise<Metadata> {
  const { journalist: journalistSlug, article: articleSlug } = await params;
  const article = await fetchBlogArticleBySlug(articleSlug);

  if (!article) {
    return {
      title: 'Blog Article Not Found',
    };
  }

  // Use SEO data if available, otherwise fall back to article data
  const title = article.seo?.metaTitle || article.title;
  const description = article.seo?.metaDescription || article.subtitle || article.title;
  const imageUrl = article.seo?.metaImage?.url
    ? getImageUrl(article.seo.metaImage.url, '/default-blog.jpg')
    : article.coverImageUrl;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const articleUrl = `${siteUrl}/blog/${journalistSlug}/${articleSlug}`;
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
      publishedTime: article.publishedAt,
      authors: [article.journalist.name],
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

export default async function BlogArticlePage({ params }: BlogArticlePageProps) {
  const { journalist: journalistSlug, article: articleSlug } = await params;
  
  const article = await fetchBlogArticleBySlug(articleSlug);

  if (!article) {
    notFound();
  }

  // Verify article belongs to this journalist
  if (article.journalist.slug !== journalistSlug) {
    notFound();
  }

  // Fetch more articles from this journalist
  const moreArticles = await fetchBlogArticlesByJournalist(journalistSlug);
  const relatedArticles = moreArticles
    .filter(a => a.id !== article.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
          <Link href="/blog" className="hover:text-primary transition-colors">
            Blog
          </Link>
          <span>/</span>
          <Link 
            href={`/blog/${article.journalist.slug}`}
            className="hover:text-primary transition-colors"
          >
            {article.journalist.name}
          </Link>
          <span>/</span>
          <span className="text-gray-900">{article.title}</span>
        </div>

        {/* Article Container */}
        <article className="bg-white rounded-xl shadow-lg overflow-hidden mb-12">
          {/* Cover Image */}
          <div className="relative w-full h-[450px] md:h-[550px]">
            <Image
              src={article.coverImageUrl}
              alt={article.title}
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover object-center"
              priority
            />
          </div>

          {/* Article Content */}
          <div className="p-8 md:p-12">
            {/* Category & Meta */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              {article.category && (
                <span className="px-4 py-2 bg-red-100 text-red-800 text-sm font-semibold rounded-full uppercase tracking-wide">
                  {article.category}
                </span>
              )}
              <span className="text-gray-500 text-sm flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {article.readTime} λεπτά ανάγνωσης
              </span>
              <span className="text-gray-500 text-sm">{article.timeAgo}</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              {article.title}
            </h1>

            {/* Subtitle */}
            {article.subtitle && (
              <h2 className="text-xl text-gray-600 mb-8 leading-relaxed">
                {article.subtitle}
              </h2>
            )}

            {/* Author Info */}
            <div className="flex items-center gap-4 pb-8 mb-8 border-b border-gray-200">
              <Link href={`/blog/${article.journalist.slug}`} className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-primary/20 hover:ring-primary/50 transition-all">
                <Image
                  src={article.journalist.avatarUrl}
                  alt={article.journalist.name}
                  fill
                  className="object-cover"
                />
              </Link>
              <div>
                <Link 
                  href={`/blog/${article.journalist.slug}`}
                  className="text-lg font-bold text-gray-900 hover:text-primary transition-colors"
                >
                  {article.journalist.name}
                </Link>
                <p className="text-sm text-gray-600">Δημοσιογράφος</p>
              </div>
            </div>

            {/* Article Body */}
            <div 
              className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg prose-img:shadow-md"
              dangerouslySetInnerHTML={{ __html: renderDynamicZone(article.content) }}
            />

            {/* Share Section */}
            <ShareButtons 
              url={`${process.env.NEXT_PUBLIC_SITE_URL || ''}/blog/${article.journalist.slug}/${article.slug}`}
              title={article.title}
              description={article.subtitle}
            />
          </div>
        </article>

        {/* More from this journalist */}
        {relatedArticles.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-900">
                Περισσότερα από {article.journalist.name}
              </h2>
              <Link
                href={`/blog/${article.journalist.slug}`}
                className="text-primary hover:text-red-700 font-medium transition-colors flex items-center gap-2"
              >
                Δείτε όλα
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((relatedArticle) => (
                <Link
                  key={relatedArticle.id}
                  href={`/blog/${article.journalist.slug}/${relatedArticle.slug}`}
                  className="group"
                >
                  <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <div className="relative h-40 overflow-hidden">
                      <Image
                        src={relatedArticle.coverImageUrl}
                        alt={relatedArticle.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {relatedArticle.title}
                      </h3>
                      <p className="text-xs text-gray-500">{relatedArticle.timeAgo}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Back to Journalist */}
        <div className="text-center">
          <Link
            href={`/blog/${article.journalist.slug}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Επιστροφή στα άρθρα του {article.journalist.name}
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

