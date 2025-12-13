import type { Metadata } from "next";
import SportPageTemplate from "@/components/SportPageTemplate";
import { fetchFormula1ArticlesWithPagination } from "./api";
import { fetchLatestNews, fetchCarouselNews } from "../homepage-api";

// Force dynamic rendering for real-time CMS updates
export const dynamic = 'force-dynamic';

// Metadata for SEO
export const metadata: Metadata = {
  title: 'Auto Moto - Όλα τα νέα και οι ειδήσεις | Sports Holics',
  description: 'Ενημερωθείτε για όλα τα νέα του μηχανοκίνητου αθλητισμού. Formula 1, MotoGP, Rally, αγώνες, οδηγοί, ομάδες και αναλύσεις.',
  keywords: 'Auto Moto, μηχανοκίνητος αθλητισμός, Formula 1, F1, MotoGP, Rally, αγώνες αυτοκινήτων, μοτοσυκλέτες',
  openGraph: {
    title: 'Auto Moto - Sports Holics',
    description: 'Ενημερωθείτε για όλα τα νέα του μηχανοκίνητου αθλητισμού',
    type: 'website',
    locale: 'el_GR',
    siteName: 'Sports Holics',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Auto Moto - Sports Holics',
    description: 'Ενημερωθείτε για όλα τα νέα του μηχανοκίνητου αθλητισμού',
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
      title="Auto Moto"
      description="Όλα τα νέα και οι ειδήσεις για τον μηχανοκίνητο αθλητισμό"
      articles={articles}
      pagination={pagination}
      latestNews={latestNews}
      hotNews={hotNews}
    />
  );
}
