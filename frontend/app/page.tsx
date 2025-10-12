import Header from "@/components/Header";
import BreakingNews from "@/components/BreakingNews";
import HeroSection from "@/components/HeroSection";
import NewsCarousel from "@/components/NewsCarousel";
import NewsCard from "@/components/NewsCard";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import {
  mainNews,
  footballNews,
  footballLatestNews,
  basketballNews,
  formulaOneNews,
} from "@/lib/newsData";

export default function Home() {
  return (
    <div className="bg-gray-50">
      <Header />
      <BreakingNews />
      <HeroSection />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Hot News Carousel */}
        <NewsCarousel />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          {/* Main News Section */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {mainNews.map((news, index) => (
                <NewsCard key={index} {...news} />
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {mainNews.slice(0, 3).map((news, index) => (
                <NewsCard key={index} {...news} size="xs" />
              ))}
            </div>

            {/* Latest Football News */}
            <section className="mb-2">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                Latest Football News
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {footballLatestNews.map((news, index) => (
                  <NewsCard key={index} {...news} size="small" />
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <Sidebar />
        </div>

        {/* Football Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Football</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {footballNews.map((news, index) => (
              <NewsCard key={index} {...news} />
            ))}
          </div>
        </section>

        {/* Basketball Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Basketball</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {basketballNews.map((news, index) => (
              <NewsCard key={index} {...news} />
            ))}
          </div>
        </section>

        {/* Formula 1 Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Formula 1</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {formulaOneNews.map((news, index) => (
              <NewsCard key={index} {...news} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
