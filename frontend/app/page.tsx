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
import LiveScores from "@/components/LiveScores";
import {
  fetchCarouselNews,
  fetchLatestNews,
  fetchMainNews,
  fetchHomepageFootball,
  fetchHomepageBasketball,
  fetchHomepageFormula1,
  fetchHeroSection,
  fetchBreakingNews,
  fetchJournalists
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
    formula1Articles
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
  ]);
  
  return (
    <div className="bg-gray-50">
      <Header />
      <BreakingNews items={breakingNews} />
      {heroSection && <HeroSection {...heroSection} />}

      {/* Main News — tight to hero */}
      <main>
        <div className="max-w-[90rem] mx-auto px-4 md:px-6 pt-4 pb-10">
          <SectionTitle title="Τρέχουσες Ειδήσεις" icon="/trending.png" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6">
            {/* Live Scores — Left sidebar */}
            <LiveScores />

            {/* Main News — Bento grid */}
            <div className="lg:col-span-6">
              {mainNewsArticles.length > 0 ? (
                <>
                  {/* Bento: 1 large feature + 2 smaller beside it */}
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
                  {/* Remaining cards in row */}
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
            </div>

            {/* Sidebar */}
            <Sidebar latestNews={latestNewsArticles} hotNews={carouselArticles} />
          </div>
        </div>

        {/* Carousel — dark band */}
        {carouselArticles.length > 0 && (
          <div className="sport-section-dark py-12">
            <div className="max-w-[90rem] mx-auto px-4 md:px-6">
              <SectionTitle title="Σημαντικά Νέα" icon="/news-2.png" />
              <NewsCarousel articles={carouselArticles} />
            </div>
          </div>
        )}

        {/* Football */}
        {footballArticles.length > 0 && (
          <section className="py-12 sport-section-accent sport-section-football">
            <div className="max-w-5xl mx-auto px-4 md:px-6">
              <div className="flex items-end justify-between mb-8">
                <SectionTitle title="Ποδόσφαιρο" icon="/football.png" variant="large" className="mb-0" />
                <Link href="/football" className="group hidden md:flex items-center gap-1.5 text-sm font-bold text-red-600 hover:text-red-500 uppercase tracking-wider transition-colors shrink-0 pb-2">
                  Όλα τα άρθρα
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              {/* Bento: 1 large + 2 small beside it */}
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
                  {footballArticles.slice(3, 6).map((news, index) => (
                    <ScrollReveal key={index} delay={index * 80}>
                      <NewsCard {...news} size="xs" />
                    </ScrollReveal>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Basketball — dark band */}
        {basketballArticles.length > 0 && (
          <section className="sport-section-dark py-12 sport-section-accent sport-section-basketball">
            <div className="max-w-5xl mx-auto px-4 md:px-6">
              <div className="flex items-end justify-between mb-8">
                <SectionTitle title="Μπάσκετ" icon="/basketball.png" variant="large" className="mb-0" />
                <Link href="/basketball" className="group hidden md:flex items-center gap-1.5 text-sm font-bold text-red-600 hover:text-red-500 uppercase tracking-wider transition-colors shrink-0 pb-2">
                  Όλα τα άρθρα
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              {/* Bento: 1 large + 2 small beside it */}
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
                  {basketballArticles.slice(3, 6).map((news, index) => (
                    <ScrollReveal key={index} delay={index * 80}>
                      <NewsCard {...news} size="xs" />
                    </ScrollReveal>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Auto Moto */}
        {formula1Articles.length > 0 && (
          <section className="py-12 sport-section-accent sport-section-automoto">
            <div className="max-w-5xl mx-auto px-4 md:px-6">
              <div className="flex items-end justify-between mb-8">
                <SectionTitle title="Auto Moto" icon="/apex.png" variant="large" className="mb-0" />
                <Link href="/formula1" className="group hidden md:flex items-center gap-1.5 text-sm font-bold text-red-600 hover:text-red-500 uppercase tracking-wider transition-colors shrink-0 pb-2">
                  Όλα τα άρθρα
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              {/* Bento: 1 large + 2 small beside it */}
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
                  {formula1Articles.slice(3, 6).map((news, index) => (
                    <ScrollReveal key={index} delay={index * 80}>
                      <NewsCard {...news} size="xs" />
                    </ScrollReveal>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Journalists — dark band */}
        {journalists.length > 0 && (
          <section className="sport-section-dark py-12">
            <div className="max-w-[90rem] mx-auto px-4 md:px-6">
              <ScrollReveal>
                <JournalistsSection journalists={journalists} />
              </ScrollReveal>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
