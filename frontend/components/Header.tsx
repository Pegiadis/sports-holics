"use client";

import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="h-10">
              <Link href="/">
                <Image
                  src="/no_back.png"
                  alt="Sports Holics"
                  width={120}
                  height={40}
                  className="h-full w-auto object-contain"
                />
              </Link>
            </div>
            <nav className="hidden md:flex space-x-6">
              <Link
                href="/football"
                className="text-gray-700 hover:text-primary font-medium transition-colors"
              >
                Ποδόσφαιρο
              </Link>
              <Link
                href="/basketball"
                className="text-gray-700 hover:text-primary font-medium transition-colors"
              >
                Μπάσκετ
              </Link>
              <Link
                href="/formula1"
                className="text-gray-700 hover:text-primary font-medium transition-colors"
              >
                Formula 1
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
