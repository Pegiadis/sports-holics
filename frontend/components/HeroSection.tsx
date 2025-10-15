"use client";

import Image from "next/image";
import { useTranslations } from 'next-intl';

export default function HeroSection() {
  const tCommon = useTranslations('common');
  const tHeader = useTranslations('header');
  const tHero = useTranslations('heroContent');
  
  return (
    <section className="relative h-96 overflow-hidden">
      {/* Background Image */}
      <Image
        src="/216-scaled-1.jpg"
        alt="Sports Stadium Background"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      
      {/* Content on top of image */}
      <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center z-10">
        <div className="text-white max-w-2xl">
          <span className="bg-primary px-3 py-1 rounded text-sm font-medium uppercase">
            {tHeader('football')}
          </span>
          <h1 className="text-4xl font-bold mt-4 mb-4">
            {tHero('title')}
          </h1>
          <p className="text-lg mb-6">
            {tHero('description')}
          </p>
          <button className="bg-primary hover:bg-red-600 text-white px-6 py-3 rounded-[var(--radius-button)] font-medium whitespace-nowrap transition-colors">
            {tCommon('readMore')}
          </button>
        </div>
      </div>
    </section>
  );
}

