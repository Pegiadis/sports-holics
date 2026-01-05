import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TeamArticlesGrid from "@/components/TeamArticlesGrid";
import { fetchTeamBySlug, getSportBadgeColor } from "@/lib/team-api";
import { fetchArticlesByTeam } from "../api";

interface TeamPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: TeamPageProps): Promise<Metadata> {
  const { slug } = await params;
  const team = await fetchTeamBySlug(slug);

  if (!team) {
    return {
      title: 'Η ομάδα δεν βρέθηκε',
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const teamUrl = `${siteUrl}/team/${slug}`;

  return {
    title: `${team.name} - Νέα & Άρθρα | Sports Holics`,
    description: team.description || `Όλα τα νέα και οι αναλύσεις για την ομάδα ${team.name}`,
    openGraph: {
      title: `${team.name} - Νέα & Άρθρα`,
      description: team.description || `Όλα τα νέα και οι αναλύσεις για την ομάδα ${team.name}`,
      url: teamUrl,
      siteName: 'Sports Holics',
      images: [
        {
          url: team.logoUrl,
          width: 400,
          height: 400,
          alt: team.name,
        },
      ],
      locale: 'el_GR',
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: `${team.name} - Νέα & Άρθρα`,
      description: team.description || `Όλα τα νέα και οι αναλύσεις για την ομάδα ${team.name}`,
      images: [team.logoUrl],
      creator: '@sportsholics',
    },
  };
}

export default async function TeamPage({ params }: TeamPageProps) {
  const { slug } = await params;
  
  const [team, articles] = await Promise.all([
    fetchTeamBySlug(slug),
    fetchArticlesByTeam(slug)
  ]);

  if (!team) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
          <Link href="/teams" className="hover:text-primary transition-colors">
            Ομάδες
          </Link>
          <span>/</span>
          <span className="text-gray-900">{team.name}</span>
        </div>

        {/* Team Profile Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Logo */}
            <div className="relative w-40 h-40 flex-shrink-0 bg-gray-50 rounded-2xl p-4">
              <Image
                src={team.logoUrl}
                alt={team.name}
                fill
                className="object-contain p-2"
              />
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-bold text-gray-900 mb-3">{team.name}</h1>
              {/* Display all sports as badges */}
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                {team.sports.map((sport) => (
                  <span 
                    key={sport}
                    className={`inline-block px-4 py-2 ${getSportBadgeColor(sport)} text-sm font-semibold rounded-full`}
                  >
                    {sport}
                  </span>
                ))}
              </div>
              {team.description && (
                <p className="text-gray-700 leading-relaxed mt-4">{team.description}</p>
              )}
            </div>

            {/* Stats */}
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">{articles.length}</div>
              <div className="text-gray-600 text-sm">Άρθρα</div>
            </div>
          </div>
        </div>

        {/* Articles Section */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Άρθρα</h2>
          <TeamArticlesGrid 
            articles={articles} 
            teamName={team.name} 
          />
        </div>

        {/* Back to Teams */}
        <div className="text-center mt-12">
          <Link
            href="/teams"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Επιστροφή στις Ομάδες
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

