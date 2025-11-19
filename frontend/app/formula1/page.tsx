import SportPageTemplate from "@/components/SportPageTemplate";
import { fetchFormula1ArticlesWithPagination } from "./api";
import { fetchLatestNews, fetchCarouselNews } from "../homepage-api";

// Force dynamic rendering for real-time CMS updates
export const dynamic = 'force-dynamic';

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
