import Header from "@/components/Header";
import BreakingNews from "@/components/BreakingNews";
import HeroSection from "@/components/HeroSection";
import NewsCarousel from "@/components/NewsCarousel";
import NewsCard from "@/components/NewsCard";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/SectionDivider";
import SectionTitle from "@/components/SectionTitle";
import {
  fetchCarouselNews,
  fetchLatestNews,
  fetchMainNews,
  fetchHomepageFootball,
  fetchHomepageBasketball,
  fetchHomepageFormula1,
  fetchHeroSection
} from "./homepage-api";

export default async function Home() {
  // Fetch data from Strapi only - no fallback to mock data
  const [
    heroSection,
    carouselArticles,
    mainNewsArticles,
    latestNewsArticles,
    footballArticles,
    basketballArticles,
    formula1Articles
  ] = await Promise.all([
    fetchHeroSection(),
    fetchCarouselNews(),
    fetchMainNews(),
    fetchLatestNews(),
    fetchHomepageFootball(),
    fetchHomepageBasketball(),
    fetchHomepageFormula1(),
  ]);
  
  return (
    <div className="bg-gray-100">
      <Header />
      <BreakingNews />
      <HeroSection {...heroSection} />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Hot News Carousel */}
        {carouselArticles.length > 0 && (
          <>
            <SectionTitle title="Σημαντικά Νέα" icon="/flames-icon.png" />
            <NewsCarousel articles={carouselArticles} />
          </>
        )}

        {/* Main Content Grid */}
        <SectionTitle title="Περισσότερα Νέα" icon="/flames-icon.png" />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          {/* Main News Section */}
          <div className="lg:col-span-3">
            {mainNewsArticles.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {mainNewsArticles.slice(0, 2).map((news, index) => (
                    <NewsCard key={index} {...news} />
                  ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                  {mainNewsArticles.slice(2, 8).map((news, index) => (
                    <NewsCard key={index} {...news} size="xs" />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  Δεν υπάρχουν διαθέσιμα άρθρα αυτή τη στιγμή. Παρακαλώ προσθέστε άρθρα με το flag &quot;Main News&quot; στο CMS.
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <Sidebar latestNews={latestNewsArticles} />
        </div>

        {/* Section Divider */}
        <SectionDivider variant="sporty" />

        {/* Football Section */}
        {footballArticles.length > 0 && (
          <section className="mb-12">
            <SectionTitle title="Ποδόσφαιρο" icon="/soccer_ball2.svg" variant="large" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {footballArticles.slice(0, 3).map((news, index) => (
                <NewsCard key={index} {...news} />
              ))}
            </div>
            {footballArticles.length > 3 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 mt-8">
                {footballArticles.slice(3, 6).map((news, index) => (
                  <NewsCard key={index} {...news} size="small" />
                ))}
              </div>
            )}
            {footballArticles.length > 6 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                {footballArticles.slice(6, 9).map((news, index) => (
                  <NewsCard key={index} {...news} size="small" />
                ))}
              </div>
            )}
          </section>
        )}

        {/* Section Divider */}
        <SectionDivider variant="sporty" />

        {/* Basketball Section */}
        {basketballArticles.length > 0 && (
          <section className="mb-12">
            <SectionTitle title="Μπάσκετ" icon="🏀" variant="large" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {basketballArticles.slice(0, 3).map((news, index) => (
                <NewsCard key={index} {...news} />
              ))}
            </div>
            {basketballArticles.length > 3 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 mt-8">
                {basketballArticles.slice(3, 6).map((news, index) => (
                  <NewsCard key={index} {...news} size="small" />
                ))}
              </div>
            )}
            {basketballArticles.length > 6 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                {basketballArticles.slice(6, 9).map((news, index) => (
                  <NewsCard key={index} {...news} size="small" />
                ))}
              </div>
            )}
          </section>
        )}

        {/* Section Divider */}
        <SectionDivider variant="sporty" />

        {/* Formula 1 Section */}
        {formula1Articles.length > 0 && (
          <section className="mb-12">
            <SectionTitle title="Formula 1" icon="/race.png" variant="large" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {formula1Articles.slice(0, 3).map((news, index) => (
                <NewsCard key={index} {...news} />
              ))}
            </div>
            {formula1Articles.length > 3 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 mt-8">
                {formula1Articles.slice(3, 6).map((news, index) => (
                  <NewsCard key={index} {...news} size="small" />
                ))}
              </div>
            )}
            {formula1Articles.length > 6 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                {formula1Articles.slice(6, 9).map((news, index) => (
                  <NewsCard key={index} {...news} size="small" />
                ))}
              </div>
            )}
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
