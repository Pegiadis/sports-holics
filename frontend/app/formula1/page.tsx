import type { Metadata } from "next";
import SportPageTemplate from "@/components/SportPageTemplate";
import { fetchFormula1ArticlesWithPagination } from "./api";
import { fetchLatestNews, fetchCarouselNews } from "../homepage-api";

// Force dynamic rendering for real-time CMS updates
export const dynamic = 'force-dynamic';

// Metadata for SEO
export const metadata: Metadata = {
  title: 'Formula 1 - Όλα τα νέα και οι ειδήσεις | Sports Holics',
  description: 'Ενημερωθείτε για όλα τα νέα της Formula 1. Grand Prix, οδηγοί, ομάδες, αναλύσεις και αποτελέσματα από το παγκόσμιο πρωτάθλημα.',
  keywords: 'Formula 1, F1, Grand Prix, Φερστάπεν, Χάμιλτον, Μερσεντές, Red Bull, Ferrari',
  openGraph: {
    title: 'Formula 1 - Sports Holics',
    description: 'Ενημερωθείτε για όλα τα νέα της Formula 1',
    type: 'website',
    locale: 'el_GR',
    siteName: 'Sports Holics',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Formula 1 - Sports Holics',
    description: 'Ενημερωθείτε για όλα τα νέα της Formula 1',
    creator: '@sportsholics',
  },
};

export default async function Formula1Page({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const currentPage = Number(searchParams.page) || 1;

  const [{ articles, pagination }, latestNews, hotNews] = await Promise.all([
    fetchFormula1ArticlesWithPagination({ page: currentPage, limit: 10 }),
    fetchLatestNews(),
    fetchCarouselNews()
  ]);

  return (
    <SportPageTemplate
      emoji="🏎️"
      title="Formula 1"
      description="Όλα τα νέα και οι ειδήσεις για τη Formula 1"
      articles={articles}
      pagination={pagination}
      latestNews={latestNews}
      hotNews={hotNews}
    />
  );
}
