"use client";

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useTransition } from 'react';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'el', name: 'Ελληνικά', flag: '🇬🇷' },
    { code: 'en', name: 'English', flag: '🇬🇧' }
  ];

  const currentLanguage = languages.find(lang => lang.code === locale) || languages[0];

  const switchLanguage = (newLocale: string) => {
    if (newLocale === locale) {
      setIsOpen(false);
      return;
    }

    startTransition(() => {
      // Replace the locale in the current pathname
      const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`);
      router.push(newPathname);
      setIsOpen(false);
    });
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
        aria-label="Change language"
        disabled={isPending}
      >
        <span className="text-xl">{currentLanguage.flag}</span>
        <span className="hidden sm:inline text-sm font-medium text-gray-700">
          {currentLanguage.code.toUpperCase()}
        </span>
        <i className={`ri-arrow-down-s-line text-gray-600 transition-transform ${isOpen ? 'rotate-180' : ''}`}></i>
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => switchLanguage(lang.code)}
                className={`w-full flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 transition-colors ${
                  locale === lang.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                }`}
                disabled={isPending}
              >
                <span className="text-xl">{lang.flag}</span>
                <span className="font-medium">{lang.name}</span>
                {locale === lang.code && (
                  <i className="ri-check-line ml-auto"></i>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

