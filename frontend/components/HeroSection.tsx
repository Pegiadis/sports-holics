"use client";

import Image from "next/image";

export default function HeroSection() {
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
            Ποδόσφαιρο
          </span>
          <h1 className="text-4xl font-bold mt-4 mb-4">
            Τελικός Champions League Έτοιμος για Επική Αναμέτρηση
          </h1>
          <p className="text-lg mb-6">
            Δύο γίγαντες του ποδοσφαίρου ετοιμάζονται για την απόλυτη μάχη καθώς η Manchester City αντιμετωπίζει τη Real Madrid σε αυτό που υπόσχεται να είναι ο πιο συναρπαστικός τελικός Champions League των τελευταίων χρόνων.
          </p>
          <button className="bg-primary hover:bg-red-600 text-white px-6 py-3 rounded-[var(--radius-button)] font-medium whitespace-nowrap transition-colors">
            Διαβάστε περισσότερα
          </button>
        </div>
      </div>
    </section>
  );
}
