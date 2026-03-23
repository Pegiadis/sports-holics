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
    <section>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-black text-gray-900 tracking-tight">{title}</h2>
        {!showAll && (
          <Link
            href="/blog"
            className="group text-red-600 hover:text-red-500 font-semibold text-sm transition-colors flex items-center gap-1.5 uppercase tracking-wider"
          >
            Δείτε τους όλους
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {displayJournalists.map((journalist) => (
          <Link
            key={journalist.id}
            href={`/blog/${journalist.slug}`}
            className="group"
          >
            <div className="bg-white rounded-xl shadow-sm border border-gray-100/80 overflow-hidden transition-all duration-300 ease-in-out hover:shadow-md hover:border-b-2 hover:border-b-red-500 card-hover">
              {/* Avatar with overlay */}
              <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                <Image
                  src={journalist.avatarUrl}
                  alt={journalist.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Article count badge */}
                {(journalist as JournalistData & { articleCount?: number }).articleCount != null && (
                  <div className="absolute top-3 right-3 z-10 bg-red-600 text-white text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center shadow-md">
                    {(journalist as JournalistData & { articleCount?: number }).articleCount}
                  </div>
                )}
                {/* Hover overlay with CTA */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out flex items-center justify-center">
                  <span className="text-white text-sm font-semibold tracking-wide bg-red-600/80 px-4 py-2 rounded-full backdrop-blur-sm">
                    Δείτε τα άρθρα
                  </span>
                </div>
                {/* Name overlay at bottom */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent pt-16 pb-4 px-4">
                  <h3 className="font-bold text-white text-base mb-0.5">
                    {journalist.name}
                  </h3>
                  {journalist.specialty && (
                    <span className="text-red-300 text-xs font-semibold uppercase tracking-wider">
                      {journalist.specialty}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

