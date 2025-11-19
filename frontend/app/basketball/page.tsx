import SportPageTemplate from "@/components/SportPageTemplate";
import { fetchBasketballArticlesWithPagination } from "./api";
import { fetchLatestNews, fetchCarouselNews } from "../homepage-api";

// Force dynamic rendering for real-time CMS updates
export const dynamic = 'force-dynamic';

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
      title="Μπάσκετ"
      description="Όλα τα νέα και οι ειδήσεις για το μπάσκετ"
      articles={articles}
      pagination={pagination}
      latestNews={latestNews}
      hotNews={hotNews}
    />
  );
}
