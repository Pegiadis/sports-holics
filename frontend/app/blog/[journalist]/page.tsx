import { notFound } from "next/navigation";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JournalistArticlesClient from "@/components/JournalistArticlesClient";
import { fetchJournalistBySlug, countArticlesByJournalist } from "../api";

interface JournalistPageProps {
  params: Promise<{
    journalist: string;
  }>;
}

export default async function JournalistPage({ params }: JournalistPageProps) {
  const { journalist: journalistSlug } = await params;
  
  // Fetch journalist info and article count (fast!)
  const [journalist, articleCount] = await Promise.all([
    fetchJournalistBySlug(journalistSlug),
    countArticlesByJournalist(journalistSlug),
  ]);

  if (!journalist) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Journalist Profile Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Avatar */}
            <div className="relative w-40 h-40 rounded-full overflow-hidden flex-shrink-0 ring-4 ring-primary/20">
              <Image
                src={journalist.avatarUrl}
                alt={journalist.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{journalist.name}</h1>
              {journalist.title && (
                <p className="text-xl text-gray-600 mb-4">{journalist.title}</p>
              )}
              {journalist.specialty && (
                <span className="inline-block px-4 py-2 bg-red-100 text-red-800 text-sm font-semibold rounded-full mb-4">
                  {journalist.specialty}
                </span>
              )}
              {journalist.bio && (
                <p className="text-gray-700 leading-relaxed mb-4">{journalist.bio}</p>
              )}

              {/* Social Links */}
              <div className="flex items-center justify-center md:justify-start gap-4">
                {journalist.twitter && (
                  <a
                    href={journalist.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-black transition-all"
                    aria-label="Twitter/X"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                )}
                {journalist.instagram && (
                  <a
                    href={journalist.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-gradient-to-br hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 transition-all"
                    aria-label="Instagram"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">{articleCount.total}</div>
              <div className="text-gray-600 text-sm">Άρθρα</div>
            </div>
          </div>
        </div>

        {/* Articles Section */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Άρθρα</h2>
          <JournalistArticlesClient
            journalistSlug={journalistSlug}
            journalistName={journalist.name}
            totalCount={articleCount.total}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}

