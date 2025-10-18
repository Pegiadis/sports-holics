import Header from "@/components/Header";
import BreakingNews from "@/components/BreakingNews";
import HeroSection from "@/components/HeroSection";
import NewsCarousel from "@/components/NewsCarousel";
import NewsCard from "@/components/NewsCard";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/SectionDivider";
import SectionTitle from "@/components/SectionTitle";
import { mainNews, latestNews, footballNews, basketballNews, formulaOneNews, carouselNews } from "@/lib/data";
import {
  fetchCarouselNews,
  fetchLatestNews,
  fetchMainNews,
  fetchHomepageFootball,
  fetchHomepageBasketball,
  fetchHomepageFormula1
} from "./homepage-api";

export default async function Home() {
  // Fetch data from Strapi, fallback to mock data
  const [
    carouselArticles,
    mainNewsArticles,
    latestNewsArticles,
    footballArticles,
    basketballArticles,
    formula1Articles
  ] = await Promise.all([
    fetchCarouselNews().then(data => data.length > 0 ? data : carouselNews),
    fetchMainNews().then(data => data.length > 0 ? data : mainNews),
    fetchLatestNews().then(data => data.length > 0 ? data : latestNews),
    fetchHomepageFootball().then(data => data.length > 0 ? data : footballNews),
    fetchHomepageBasketball().then(data => data.length > 0 ? data : basketballNews),
    fetchHomepageFormula1().then(data => data.length > 0 ? data : formulaOneNews),
  ]);
  
  return (
    <div className="bg-gray-50">
      <Header />
      <BreakingNews />
      <HeroSection />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Hot News Carousel */}
        <SectionTitle title="Σημαντικά Νέα" icon="/flames-icon.png" />
        <NewsCarousel articles={carouselArticles} />

        {/* Main Content Grid */}
        <SectionTitle title="Περισσότερα Νέα" icon="/flames-icon.png" />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          {/* Main News Section */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {mainNewsArticles.slice(0, 2).map((news, index) => (
                <NewsCard key={index} {...news} />
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {mainNewsArticles.slice(2, 5).map((news, index) => (
                <NewsCard key={index} {...news} size="xs" />
              ))}
            </div>

            {/* Section Divider */}
            <SectionDivider variant="gradient" />

            {/* Latest News - Carousel with 10 items */}
            <section className="mb-2">
              <SectionTitle title="Τελευταία Νέα" icon="/speaker-color-icon.svg" />
              <NewsCarousel articles={latestNewsArticles} />
            </section>
          </div>

          {/* Sidebar */}
          <Sidebar />
        </div>

        {/* Section Divider */}
        <SectionDivider variant="sporty" />

        {/* Football Section */}
        <section className="mb-12">
          <SectionTitle title="Ποδόσφαιρο" icon="/soccer_ball2.svg" variant="large" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {footballArticles.slice(0, 3).map((news, index) => (
              <NewsCard key={index} {...news} />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 mt-8">
            {footballArticles.slice(3, 6).map((news, index) => (
              <NewsCard key={index} {...news} size="small" />
            ))}
          </div>
        </section>

        {/* Section Divider */}
        <SectionDivider variant="sporty" />

        {/* Basketball Section */}
        <section className="mb-12">
          <SectionTitle title="Μπάσκετ" icon="🏀" variant="large" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {basketballArticles.slice(0, 3).map((news, index) => (
              <NewsCard key={index} {...news} />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 mt-8">
            {basketballArticles.slice(3, 6).map((news, index) => (
              <NewsCard key={index} {...news} size="small" />
            ))}
          </div>
        </section>

        {/* Section Divider */}
        <SectionDivider variant="sporty" />

        {/* Formula 1 Section */}
        <section className="mb-12">
          <SectionTitle title="Formula 1" icon="/formula-1.png" variant="large" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {formula1Articles.slice(0, 3).map((news, index) => (
              <NewsCard key={index} {...news} />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 mt-8">
            {formula1Articles.slice(3, 6).map((news, index) => (
              <NewsCard key={index} {...news} size="small" />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

