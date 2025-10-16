"use client";

import Header from "@/components/Header";
import BreakingNews from "@/components/BreakingNews";
import HeroSection from "@/components/HeroSection";
import NewsCarousel from "@/components/NewsCarousel";
import NewsCard from "@/components/NewsCard";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/SectionDivider";
import SectionTitle from "@/components/SectionTitle";
import { mainNews, latestNews, footballNews, basketballNews, formulaOneNews } from "@/lib/data";

// Hardcoded Greek news data

export default function Home() {
  return (
    <div className="bg-gray-50">
      <Header />
      <BreakingNews />
      <HeroSection />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Hot News Carousel */}
        <SectionTitle title="Σημαντικά Νέα" icon="/flames-icon.png" />
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

            {/* Section Divider */}
            <SectionDivider variant="gradient" />

            {/* Latest Football News */}
            <section className="mb-2">
              <SectionTitle title="Τελευταία Νέα" icon="/speaker-color-icon.svg" />
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {latestNews.map((news, index) => (
                  <NewsCard key={index} {...news} size="xs" />
                ))}
              </div>
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
            {footballNews.map((news, index) => (
              <NewsCard key={index} {...news} />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 mt-8">
            {footballNews.map((news, index) => (
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
            {basketballNews.map((news, index) => (
              <NewsCard key={index} {...news} />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 mt-8">
            {basketballNews.map((news, index) => (
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
            {formulaOneNews.map((news, index) => (
              <NewsCard key={index} {...news} />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 mt-8">
            {formulaOneNews.map((news, index) => (
              <NewsCard key={index} {...news} size="small" />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

