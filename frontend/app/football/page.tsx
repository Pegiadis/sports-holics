import SportPageTemplate from "@/components/SportPageTemplate";
import { fetchFootballArticlesWithPagination } from "./api";
import { fetchLatestNews, fetchCarouselNews } from "../homepage-api";

// Force dynamic rendering for real-time CMS updates
export const dynamic = 'force-dynamic';

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
