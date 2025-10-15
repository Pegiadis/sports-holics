"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from 'next-intl';
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const t = useTranslations('header');

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="h-10">
              <Image
                src="/no_back.png"
                alt="Sports Holics"
                width={120}
                height={40}
                className="h-full w-auto object-contain"
              />
            </div>
            <nav className="hidden md:flex space-x-6">
              <Link
                href="#"
                className="text-gray-700 hover:text-primary font-medium transition-colors"
              >
                {t('football')}
              </Link>
              <Link
                href="#"
                className="text-gray-700 hover:text-primary font-medium transition-colors"
              >
                {t('basketball')}
              </Link>
              <Link
                href="#"
                className="text-gray-700 hover:text-primary font-medium transition-colors"
              >
                {t('formula1')}
              </Link>
              <Link
                href="#"
                className="text-gray-700 hover:text-primary font-medium transition-colors"
              >
                {t('news')}
              </Link>
              <Link
                href="#"
                className="text-gray-700 hover:text-primary font-medium transition-colors"
              >
                {t('more')}
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            <button className="w-6 h-6 flex items-center justify-center" aria-label="Search">
              <i className="ri-search-line text-gray-600 hover:text-primary cursor-pointer"></i>
            </button>
            <button className="w-6 h-6 flex items-center justify-center" aria-label="User profile">
              <i className="ri-user-line text-gray-600 hover:text-primary cursor-pointer"></i>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

