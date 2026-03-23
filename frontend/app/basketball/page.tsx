import type { Metadata } from "next";
import SportPageTemplate from "@/components/SportPageTemplate";
import { fetchBasketballArticlesWithPagination } from "./api";
import { fetchLatestNews, fetchCarouselNews } from "../homepage-api";

// Force dynamic rendering for real-time CMS updates
export const dynamic = 'force-dynamic';

// Metadata for SEO
export const metadata: Metadata = {
  title: 'Μπάσκετ - Όλα τα νέα και οι ειδήσεις | Sports Holics',
  description: 'Ενημερωθείτε για όλα τα νέα του μπάσκετ. Μεταγραφές, αγώνες, αναλύσεις και αποτελέσματα από την Ελλάδα, NBA και Euroleague.',
  keywords: 'μπάσκετ, basketball, NBA, Euroleague, Εθνική Ελλάδας μπάσκετ, Παναθηναϊκός, Ολυμπιακός',
  openGraph: {
    title: 'Μπάσκετ - Sports Holics',
    description: 'Ενημερωθείτε για όλα τα νέα του μπάσκετ',
    type: 'website',
    locale: 'el_GR',
    siteName: 'Sports Holics',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Μπάσκετ - Sports Holics',
    description: 'Ενημερωθείτε για όλα τα νέα του μπάσκετ',
    creator: '@sportsholics',
  },
};

export default async function BasketballPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const currentPage = Number(searchParams.page) || 1;

  const [{ articles, pagination }, latestNews, hotNews] = await Promise.all([
    fetchBasketballArticlesWithPagination({ page: currentPage, limit: 10 }),
    fetchLatestNews(),
    fetchCarouselNews()
  ]);

  return (
    <SportPageTemplate
      emoji="🏀"
      icon="/basketball.png"
      title="Μπάσκετ"
      description="Όλα τα νέα και οι ειδήσεις για το μπάσκετ"
      articles={articles}
      pagination={pagination}
      latestNews={latestNews}
      hotNews={hotNews}
    />
  );
}
