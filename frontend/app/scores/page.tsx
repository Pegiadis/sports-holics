import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
import ScoresContent from '@/components/ScoresContent';
import { fetchLatestNews, fetchCarouselNews } from '../homepage-api';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Βαθμολογίες - Sports Holics',
  description: 'Βαθμολογίες για Super League, Champions League και Euroleague.',
  keywords: 'βαθμολογίες, Super League, Champions League, Euroleague, ποδόσφαιρο, μπάσκετ',
  openGraph: {
    title: 'Βαθμολογίες - Sports Holics',
    description: 'Βαθμολογίες για τις κορυφαίες διοργανώσεις.',
    type: 'website',
    locale: 'el_GR',
    siteName: 'Sports Holics',
  },
};

export default async function ScoresPage() {
  const now = new Date();
  const [latestNews, hotNews] = await Promise.all([
    fetchLatestNews(now),
    fetchCarouselNews(now),
  ]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <main>
        <div className="max-w-[90rem] mx-auto px-4 md:px-6 py-8">
          <div className="grid grid-cols-1 grid-layout-2col gap-5">
            {/* Scores — Main content */}
            <div>
              <ScoresContent />
            </div>

            {/* Sidebar — Right */}
            <Sidebar latestNews={latestNews} hotNews={hotNews} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
