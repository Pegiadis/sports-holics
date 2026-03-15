'use client';

import { NewsArticle } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface SidebarProps {
  latestNews: NewsArticle[];
  hotNews?: NewsArticle[];
}

export default function Sidebar({ latestNews, hotNews = [] }: SidebarProps) {
  const [activeTab, setActiveTab] = useState<'latest' | 'hot'>('latest');

  // Limit to 6 articles for both tabs
  const limitedLatestNews = latestNews.slice(0, 6);
  const limitedHotNews = hotNews.slice(0, 6);
  
  const currentNews = activeTab === 'latest' ? limitedLatestNews : limitedHotNews;
  const showTabs = hotNews.length > 0;

  return (
    <aside className="lg:sticky lg:top-24 self-start">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6 border border-gray-100 border-l-[3px] border-l-primary">
        {/* Tab Navigation */}
        {showTabs ? (
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('latest')}
              className={`flex-1 px-4 py-3 text-sm font-semibold transition-all duration-300 relative ${
                activeTab === 'latest'
                  ? 'text-primary'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                Τελευταία
              </span>
              {activeTab === 'latest' && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-[3px] bg-primary rounded-t-full" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('hot')}
              className={`flex-1 px-4 py-3 text-sm font-semibold transition-all duration-300 relative ${
                activeTab === 'hot'
                  ? 'text-primary'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                </svg>
                Hot News
              </span>
              {activeTab === 'hot' && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-[3px] bg-primary rounded-t-full" />
              )}
            </button>
          </div>
        ) : (
          // Single header when no hot news
          <div className="px-6 pt-6 pb-4">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <span>Τελευταία Νέα</span>
            </h3>
          </div>
        )}

        {/* News List */}
        <div className="p-6 space-y-4">
          {currentNews.length > 0 ? (
            currentNews.map((news, index) => (
              <Link
                key={index}
                href={`/article/${news.slug}`}
                className="block group"
              >
                <div className="flex items-start space-x-3 hover:bg-gray-50 rounded-lg p-2 transition-all duration-300 hover:translate-x-1 hover:shadow-sm">
                  {/* Ranking Number */}
                  <div className="flex-shrink-0 pt-1">
                    <span className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${
                      index < 3
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      {index + 1}
                    </span>
                  </div>
                  <div className="relative w-20 h-20 flex-shrink-0 rounded overflow-hidden">
                    <Image
                      src={news.image || news.imageUrl || '/default-news.jpg'}
                      alt={news.title}
                      fill
                      sizes="80px"
                      loading="lazy"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1">
                    <span className={`inline-block px-2 py-1 text-xs font-semibold rounded mb-1 ${news.categoryColor}`}>
                      {news.category}
                    </span>
                    <h4 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                      {news.title}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1" suppressHydrationWarning>{news.timeAgo}</p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 text-sm">
                Δεν υπάρχουν διαθέσιμα νέα αυτή τη στιγμή.
              </p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
