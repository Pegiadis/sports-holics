import type { Metadata } from "next";
import SportPageTemplate from "@/components/SportPageTemplate";
import { fetchFootballArticlesWithPagination } from "./api";
import { fetchLatestNews, fetchCarouselNews } from "../homepage-api";

// Force dynamic rendering for real-time CMS updates
export const dynamic = 'force-dynamic';

// Metadata for SEO
export const metadata: Metadata = {
  title: 'Ποδόσφαιρο - Όλα τα νέα και οι ειδήσεις | Sports Holics',
  description: 'Ενημερωθείτε για όλα τα νέα του ποδοσφαίρου. Μεταγραφές, αγώνες, αναλύσεις και αποτελέσματα από την Ελλάδα και το εξωτερικό.',
  keywords: 'ποδόσφαιρο, αθλητικά νέα, μεταγραφές, Super League, Champions League, Εθνική Ελλάδας',
  openGraph: {
    title: 'Ποδόσφαιρο - Sports Holics',
    description: 'Ενημερωθείτε για όλα τα νέα του ποδοσφαίρου',
    type: 'website',
    locale: 'el_GR',
    siteName: 'Sports Holics',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ποδόσφαιρο - Sports Holics',
    description: 'Ενημερωθείτε για όλα τα νέα του ποδοσφαίρου',
    creator: '@sportsholics',
  },
};

export default async function FootballPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const currentPage = Number(searchParams.page) || 1;

  const [{ articles, pagination }, latestNews, hotNews] = await Promise.all([
    fetchFootballArticlesWithPagination({ page: currentPage, limit: 10 }),
    fetchLatestNews(),
    fetchCarouselNews()
  ]);

  return (
    <SportPageTemplate
      emoji="⚽"
      title="Ποδόσφαιρο"
      description="Όλα τα νέα και οι ειδήσεις για το ποδόσφαιρο"
      articles={articles}
      pagination={pagination}
      latestNews={latestNews}
      hotNews={hotNews}
    />
  );
}
