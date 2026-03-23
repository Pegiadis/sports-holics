"use client";

import Image from "next/image";
import Link from "next/link";

interface HeroSectionProps {
  title?: string;
  titleHighlight?: string;
  description?: string;
  categoryLabel?: string;
  categoryEmoji?: string;
  timeAgo?: string;
  buttonText?: string;
  buttonLink?: string;
  backgroundImageUrl?: string;
}

export default function HeroSection({
  title = "Τελικός Champions League",
  titleHighlight = "Έτοιμος για Επική Αναμέτρηση",
  description = "Δύο γίγαντες του ποδοσφαίρου ετοιμάζονται για την απόλυτη μάχη καθώς η Manchester City αντιμετωπίζει τη Real Madrid σε αυτό που υπόσχεται να είναι ο πιο συναρπαστικός τελικός Champions League των τελευταίων χρόνων.",
  categoryLabel = "Ποδόσφαιρο",
  categoryEmoji = "🔥",
  timeAgo = "5 λεπτά πριν",
  buttonText = "Διαβάστε περισσότερα →",
  buttonLink = "#",
  backgroundImageUrl = "/216-scaled-1.jpg",
}: HeroSectionProps) {
  return (
    <section className="relative bg-gray-950 overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(239,68,68,0.08),transparent_60%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(30,64,175,0.06),transparent_50%)]"></div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-8 min-h-[420px] md:min-h-[480px]">

          {/* Left: Text content */}
          <div className="lg:col-span-5 flex flex-col justify-center py-10 md:py-14 lg:py-16 z-10 order-2 lg:order-1">
            <div className="animate-heroSlideUp">
              {/* Category + Time */}
              <div className="flex items-center gap-3 mb-5">
                <span className="bg-red-600 px-3.5 py-1.5 rounded-sm text-[11px] font-bold uppercase tracking-widest text-white shadow-lg shadow-red-600/30">
                  {categoryEmoji} {categoryLabel}
                </span>
                <span className="text-white/40 text-xs font-medium tracking-wide" suppressHydrationWarning>
                  {timeAgo}
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-2xl md:text-4xl lg:text-[2.75rem] font-black mb-4 md:mb-5 leading-[1.1] text-white tracking-tight">
                {title}
                {titleHighlight && (
                  <>
                    <br />
                    <span className="hero-highlight-text">{titleHighlight}</span>
                  </>
                )}
              </h1>

              {/* Description */}
              <p className="text-sm md:text-base mb-6 md:mb-8 leading-relaxed text-white/50 line-clamp-3 max-w-lg">
                {description}
              </p>

              {/* CTA */}
              <div className="flex flex-wrap items-center gap-4">
                {buttonLink && buttonLink !== '#' ? (
                  <Link
                    href={buttonLink}
                    className="group inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-7 py-3 rounded-sm font-bold text-sm uppercase tracking-wider shadow-xl shadow-red-600/25 transition-all duration-300 hover:shadow-red-500/40 hover:translate-x-0.5"
                  >
                    {buttonText}
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ) : (
                  <button className="group inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-7 py-3 rounded-sm font-bold text-sm uppercase tracking-wider shadow-xl shadow-red-600/25 transition-all duration-300 hover:shadow-red-500/40 hover:translate-x-0.5">
                    {buttonText}
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right: Featured image — contained, not full-bleed */}
          <div className="lg:col-span-7 relative order-1 lg:order-2">
            {/* Image container with clipped shape */}
            <div className="relative h-[260px] sm:h-[320px] lg:h-full w-full overflow-hidden hero-image-clip">
              <Image
                src={backgroundImageUrl}
                alt={title}
                fill
                priority
                fetchPriority="high"
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover object-center"
              />
              {/* Gradient fades into dark bg */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent lg:hidden"></div>
              <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/30 to-transparent"></div>
              <div className="hidden lg:block absolute inset-0 bg-gradient-to-t from-gray-950/60 via-transparent to-transparent"></div>
            </div>

            {/* Red accent line on image edge */}
            <div className="hidden lg:block absolute left-0 top-[15%] bottom-[15%] w-[3px] bg-gradient-to-b from-transparent via-red-500 to-transparent"></div>
          </div>

        </div>
      </div>

      {/* Bottom edge — transitions to page */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-red-500 to-blue-600"></div>
    </section>
  );
}
