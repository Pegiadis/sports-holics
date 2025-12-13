"use client";

import Image from "next/image";
import Link from "next/link";
import { JournalistData } from "@/app/homepage-api";

interface JournalistsSectionProps {
  journalists: JournalistData[];
  title?: string;
  showAll?: boolean;
}

export default function JournalistsSection({ 
  journalists, 
  title = "Οι Δημοσιογράφοι μας",
  showAll = false 
}: JournalistsSectionProps) {
  const displayJournalists = showAll ? journalists : journalists.slice(0, 4);

  if (journalists.length === 0) {
    return null;
  }

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
        {!showAll && (
          <Link
            href="/blog"
            className="text-red-600 hover:text-red-700 font-medium transition-colors flex items-center gap-2"
          >
            Δείτε τους όλους
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {displayJournalists.map((journalist) => (
          <Link
            key={journalist.id}
            href={`/blog/${journalist.slug}`}
            className="group"
          >
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2">
              {/* Avatar */}
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                <Image
                  src={journalist.avatarUrl}
                  alt={journalist.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Info */}
              <div className="p-4 text-center">
                <h3 className="font-bold text-lg text-gray-900 mb-1 group-hover:text-primary transition-colors">
                  {journalist.name}
                </h3>
                {journalist.title && (
                  <p className="text-sm text-gray-600 mb-2">{journalist.title}</p>
                )}
                {journalist.specialty && (
                  <span className="inline-block px-3 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-full">
                    {journalist.specialty}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

    </section>
  );
}

