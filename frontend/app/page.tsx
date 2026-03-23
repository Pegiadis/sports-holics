import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import BreakingNews from "@/components/BreakingNews";
import HeroSection from "@/components/HeroSection";
import NewsCarousel from "@/components/NewsCarousel";
import NewsCard from "@/components/NewsCard";
import Sidebar from "@/components/Sidebar";
import JournalistsSection from "@/components/JournalistsSection";
import Footer from "@/components/Footer";
import SectionTitle from "@/components/SectionTitle";
import ScrollReveal from "@/components/ScrollReveal";
import Leaderboards from "@/components/Leaderboards";
import ReadAlsoStrip from "@/components/ReadAlsoStrip";
import SidebarWidget from "@/components/SidebarWidget";
import {
  fetchCarouselNews,
  fetchLatestNews,
  fetchMainNews,
  fetchHomepageFootball,
  fetchHomepageBasketball,
  fetchHomepageFormula1,
  fetchHeroSection,
  fetchBreakingNews,
  fetchJournalists,
  fetchTrendingArticles
} from "./homepage-api";

// Force dynamic rendering for real-time CMS updates
export const dynamic = 'force-dynamic';
export const revalidate = 0; // Disable caching to prevent hydration mismatches
export const fetchCache = 'force-no-store'; // Ensure no caching at all

// Metadata for SEO
export const metadata: Metadata = {
  title: 'Sports Holics - Τελευταία Αθλητικά Νέα',
  description: 'Ο απόλυτος προορισμός σας για αθλητικά νέα, σκορ και αναλύσεις. Ποδόσφαιρο, Μπάσκετ, Auto Moto και πολλά άλλα.',
  keywords: 'αθλητικά νέα, ποδόσφαιρο, μπάσκετ, Auto Moto, μηχανοκίνητος αθλητισμός, Ελλάδα, διεθνή αθλητικά, σκορ, αναλύσεις',
  openGraph: {
    title: 'Sports Holics - Τελευταία Αθλητικά Νέα',
    description: 'Ο απόλυτος προορισμός σας για αθλητικά νέα, σκορ και αναλύσεις',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    type: 'website',
    locale: 'el_GR',
    siteName: 'Sports Holics',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sports Holics - Τελευταία Αθλητικά Νέα',
    description: 'Ο απόλυτος προορισμός σας για αθλητικά νέα',
    creator: '@sportsholics',
  },
};

export default async function Home() {
  // Capture a single timestamp for all time calculations to ensure SSR/client consistency
  const now = new Date();
  
  // Fetch data from Strapi only - no fallback to mock data
  const [
    breakingNews,
    heroSection,
    carouselArticles,
    mainNewsArticles,
    latestNewsArticles,
    journalists,
    footballArticles,
    basketballArticles,
    formula1Articles,
    trendingArticles
  ] = await Promise.all([
    fetchBreakingNews(),
    fetchHeroSection(now),
    fetchCarouselNews(now),
    fetchMainNews(now),
    fetchLatestNews(now),
    fetchJournalists(['aggelos-ntentas', 'giorgos-koyroy']),
    fetchHomepageFootball(now),
    fetchHomepageBasketball(now),
    fetchHomepageFormula1(now),
    fetchTrendingArticles(now),
  ]);

  // Split trending articles into non-overlapping slices
  const trendingPopular = trendingArticles.slice(0, 5);       // Left sidebar "Δημοφιλή"
  const trendingForStrip3 = trendingArticles.slice(5, 9);     // ReadAlso after Main News
  const trendingForStrip1 = trendingArticles.slice(9, 13);    // ReadAlso between Football & Basketball
  const trendingForStrip2 = trendingArticles.slice(13, 17);   // ReadAlso between Basketball & Auto Moto
  const trendingDontMiss = trendingArticles.slice(17, 20);    // Right sidebar "Μην τα χάσετε"
  const trendingFootball = trendingArticles.filter((a) => a.category === 'ΠΟΔΟΣΦΑΙΡΟ').slice(0, 5);
  const trendingBasketball = trendingArticles.filter((a) => a.category === 'ΜΠΑΣΚΕΤ').slice(0, 5);
  const trendingAutoMoto = trendingArticles.filter((a) => a.category === 'AUTO MOTO').slice(0, 5);

  return (
    <div className="bg-gray-50">
      <Header />
      <BreakingNews items={breakingNews} />
      {heroSection && <HeroSection {...heroSection} />}

      <main>
        {/* Single 3-column layout for entire homepage */}
        <div className="max-w-[90rem] mx-auto px-4 md:px-6 pt-4 pb-10">
          <div className="grid grid-cols-1 grid-layout-3col gap-5">

            {/* Left sidebar — sticky scrollable */}
            <div className="lg:sticky lg:top-24 self-start lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto lg:scrollbar-hide space-y-5">
              <SidebarWidget
                title="Δημοφιλή"
                icon="/trending.png"
                articles={trendingPopular}
                variant="numbered"
              />
              <SidebarWidget
                title="Ποδόσφαιρο"
                icon="/football.png"
                articles={trendingFootball}
                accentColor="border-l-green-500"
                variant="image"
              />
              <SidebarWidget
                title="Μπάσκετ"
                icon="/basketball.png"
                articles={trendingBasketball}
                accentColor="border-l-orange-500"
                variant="compact"
              />
              <SidebarWidget
                title="Auto Moto"
                icon="/apex.png"
                articles={trendingAutoMoto}
                accentColor="border-l-blue-500"
                variant="image"
              />
              <Leaderboards />
            </div>

            {/* Center content */}
            <div className="space-y-10">
              {/* Main News */}
              <section>
                <SectionTitle title="Τρέχουσες Ειδήσεις" icon="/trending.png" />
                {mainNewsArticles.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-5 mb-5">
                      <div className="md:col-span-3 h-full">
                        <NewsCard key={0} {...mainNewsArticles[0]} size="large" priority />
                      </div>
                      <div className="md:col-span-2 flex flex-col gap-5">
                        {mainNewsArticles.slice(1, 3).map((news, index) => (
                          <NewsCard key={index + 1} {...news} size="small" />
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                      {mainNewsArticles.slice(3, 9).map((news, index) => (
                        <ScrollReveal key={index} delay={index * 80}>
                          <NewsCard {...news} size="xs" />
                        </ScrollReveal>
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
              </section>

              {/* Read Also — after Main News */}
              <ReadAlsoStrip articles={trendingForStrip3} />

              {/* Carousel */}
              {carouselArticles.length > 0 && (
                <section>
                  <SectionTitle title="Σημαντικά Νέα" icon="/news-2.png" />
                  <NewsCarousel articles={carouselArticles} />
                </section>
              )}

              {/* Football */}
              {footballArticles.length > 0 && (
                <section className="sport-section-accent sport-section-football rounded-xl pt-1">
                  <div className="flex items-end justify-between mb-8">
                    <SectionTitle title="Ποδόσφαιρο" icon="/football.png" variant="large" className="mb-0" />
                    <Link href="/football" className="group hidden md:flex items-center gap-1.5 text-sm font-bold text-red-600 hover:text-red-500 uppercase tracking-wider transition-colors shrink-0 pb-2">
                      Όλα τα άρθρα
                      <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-5 mb-5">
                    <div className="md:col-span-3 h-full">
                      <ScrollReveal className="h-full">
                        <NewsCard {...footballArticles[0]} size="large" />
                      </ScrollReveal>
                    </div>
                    <div className="md:col-span-2 grid grid-rows-2 gap-5">
                      {footballArticles.slice(1, 3).map((news, index) => (
                        <ScrollReveal key={index} delay={index * 100}>
                          <NewsCard {...news} size="small" />
                        </ScrollReveal>
                      ))}
                    </div>
                  </div>
                  {footballArticles.length > 3 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                      {footballArticles.slice(3, 9).map((news, index) => (
                        <ScrollReveal key={index} delay={index * 80}>
                          <NewsCard {...news} size="xs" />
                        </ScrollReveal>
                      ))}
                    </div>
                  )}
                </section>
              )}

              {/* Read Also — between Football & Basketball */}
              <ReadAlsoStrip articles={trendingForStrip1} />

              {/* Basketball */}
              {basketballArticles.length > 0 && (
                <section className="sport-section-accent sport-section-basketball rounded-xl pt-1">
                  <div className="flex items-end justify-between mb-8">
                    <SectionTitle title="Μπάσκετ" icon="/basketball.png" variant="large" className="mb-0" />
                    <Link href="/basketball" className="group hidden md:flex items-center gap-1.5 text-sm font-bold text-red-600 hover:text-red-500 uppercase tracking-wider transition-colors shrink-0 pb-2">
                      Όλα τα άρθρα
                      <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-5 mb-5">
                    <div className="md:col-span-3 h-full">
                      <ScrollReveal className="h-full">
                        <NewsCard {...basketballArticles[0]} size="large" />
                      </ScrollReveal>
                    </div>
                    <div className="md:col-span-2 grid grid-rows-2 gap-5">
                      {basketballArticles.slice(1, 3).map((news, index) => (
                        <ScrollReveal key={index} delay={index * 100}>
                          <NewsCard {...news} size="small" />
                        </ScrollReveal>
                      ))}
                    </div>
                  </div>
                  {basketballArticles.length > 3 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                      {basketballArticles.slice(3, 9).map((news, index) => (
                        <ScrollReveal key={index} delay={index * 80}>
                          <NewsCard {...news} size="xs" />
                        </ScrollReveal>
                      ))}
                    </div>
                  )}
                </section>
              )}

              {/* Read Also — between Basketball & Auto Moto */}
              <ReadAlsoStrip articles={trendingForStrip2} />

              {/* Auto Moto */}
              {formula1Articles.length > 0 && (
                <section className="sport-section-accent sport-section-automoto rounded-xl pt-1">
                  <div className="flex items-end justify-between mb-8">
                    <SectionTitle title="Auto Moto" icon="/apex.png" variant="large" className="mb-0" />
                    <Link href="/formula1" className="group hidden md:flex items-center gap-1.5 text-sm font-bold text-red-600 hover:text-red-500 uppercase tracking-wider transition-colors shrink-0 pb-2">
                      Όλα τα άρθρα
                      <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-5 mb-5">
                    <div className="md:col-span-3 h-full">
                      <ScrollReveal className="h-full">
                        <NewsCard {...formula1Articles[0]} size="large" />
                      </ScrollReveal>
                    </div>
                    <div className="md:col-span-2 grid grid-rows-2 gap-5">
                      {formula1Articles.slice(1, 3).map((news, index) => (
                        <ScrollReveal key={index} delay={index * 100}>
                          <NewsCard {...news} size="small" />
                        </ScrollReveal>
                      ))}
                    </div>
                  </div>
                  {formula1Articles.length > 3 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                      {formula1Articles.slice(3, 9).map((news, index) => (
                        <ScrollReveal key={index} delay={index * 80}>
                          <NewsCard {...news} size="xs" />
                        </ScrollReveal>
                      ))}
                    </div>
                  )}
                </section>
              )}

              {/* Journalists */}
              {journalists.length > 0 && (
                <ScrollReveal>
                  <JournalistsSection journalists={journalists} />
                </ScrollReveal>
              )}
            </div>

            {/* Right sidebar — sticky scrollable */}
            <div className="lg:sticky lg:top-24 self-start lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto lg:scrollbar-hide space-y-5">
              <Sidebar latestNews={latestNewsArticles} hotNews={carouselArticles} />
              <SidebarWidget
                title="Μην τα χάσετε"
                icon="/news-2.png"
                articles={trendingDontMiss}
                accentColor="border-l-yellow-500"
                variant="image"
              />
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
