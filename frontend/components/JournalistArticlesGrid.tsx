"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";

interface Article {
  id: number;
  title: string;
  subtitle: string;
  slug: string;
  excerpt: string;
  imageUrl: string;
  category: string;
  categoryColor: string;
  publishedAt: string;
  timeAgo: string;
  isBlog: boolean;
  linkHref: string;
}

interface JournalistArticlesGridProps {
  articles: Article[];
  journalistName: string;
}

const ARTICLES_PER_PAGE = 12; // 4 rows x 3 columns

// Category configuration with Greek labels
const CATEGORIES = [
  { key: "all", label: "Όλα", icon: "M4 6h16M4 10h16M4 14h16M4 18h16" },
  { key: "ΠΟΔΟΣΦΑΙΡΟ", label: "Ποδόσφαιρο", icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" },
  { key: "ΜΠΑΣΚΕΤ", label: "Μπάσκετ", icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM5.23 7.75C6.1 8.62 7.36 9 8.5 9c.96 0 1.89-.26 2.73-.75.17-.1.34-.21.5-.33.16.12.33.23.5.33.84.49 1.77.75 2.73.75 1.14 0 2.4-.38 3.27-1.25.87-.87 1.25-2.13 1.25-3.27 0-.96-.26-1.89-.75-2.73-.1-.17-.21-.34-.33-.5.12-.16.23-.33.33-.5.49-.84.75-1.77.75-2.73 0-1.14-.38-2.4-1.25-3.27" },
  { key: "AUTO MOTO", label: "Auto Moto", icon: "M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" },
  { key: "Blog", label: "Blog", icon: "M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86l-3 3.87L9 13.14 6 17h12l-3.86-5.14z" },
];

export default function JournalistArticlesGrid({ articles, journalistName }: JournalistArticlesGridProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Filter articles by category
  const filteredArticles = useMemo(() => {
    if (selectedCategory === "all") {
      return articles;
    }
    return articles.filter((article) => article.category === selectedCategory);
  }, [articles, selectedCategory]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE);
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
  const endIndex = startIndex + ARTICLES_PER_PAGE;
  const currentArticles = filteredArticles.slice(startIndex, endIndex);

  // Reset to page 1 when category changes
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  // Get count of articles per category for badges
  const getCategoryCount = (categoryKey: string) => {
    if (categoryKey === "all") {
      return articles.length;
    }
    return articles.filter((a) => a.category === categoryKey).length;
  };

  if (articles.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-12 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Δεν υπάρχουν άρθρα ακόμα</h3>
        <p className="text-gray-600">
          Ο {journalistName} δεν έχει δημοσιεύσει άρθρα ακόμα. Ελέγξτε ξανά σύντομα!
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Category Filter Buttons */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 mb-8">
        <div className="flex flex-wrap gap-1">
          {CATEGORIES.map((category) => {
            const count = getCategoryCount(category.key);
            // Only show categories that have articles
            if (count === 0 && category.key !== "all") return null;
            
            const isSelected = selectedCategory === category.key;
            return (
              <button
                key={category.key}
                onClick={() => handleCategoryChange(category.key)}
                className={`
                  relative px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300
                  flex items-center gap-2
                  ${isSelected 
                    ? "bg-primary text-white shadow-lg scale-[1.02]" 
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }
                `}
              >
                <svg 
                  className={`w-4 h-4 transition-colors ${isSelected ? "text-white" : "text-gray-400"}`} 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d={category.icon} />
                </svg>
                <span>{category.label}</span>
                <span className={`
                  text-xs px-2 py-0.5 rounded-md font-semibold transition-colors
                  ${isSelected 
                    ? "bg-white/20 text-white" 
                    : "bg-gray-100 text-gray-500"
                  }
                `}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm text-gray-500 mb-4">
        {filteredArticles.length} {filteredArticles.length === 1 ? "άρθρο" : "άρθρα"}
        {selectedCategory !== "all" && (
          <span> στην κατηγορία {CATEGORIES.find(c => c.key === selectedCategory)?.label}</span>
        )}
      </div>

      {/* Articles Grid */}
      {currentArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentArticles.map((article) => (
            <Link
              key={`${article.category}-${article.id}`}
              href={article.linkHref}
              className="group"
            >
              <article className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col">
                {/* Cover Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={article.imageUrl}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  {/* Category Badge */}
                  <div className="flex items-center gap-3 mb-3">
                    {article.category && (
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${article.categoryColor}`}>
                        {article.category}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h3>

                  {/* Footer */}
                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-xs text-gray-500">{article.timeAgo}</span>
                    <span className="text-primary text-sm font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      Διαβάστε
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md p-12 text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Δεν βρέθηκαν άρθρα</h3>
          <p className="text-gray-600">
            Δεν υπάρχουν άρθρα σε αυτή την κατηγορία.
          </p>
          <button
            onClick={() => handleCategoryChange("all")}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Δείτε όλα τα άρθρα
          </button>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          {/* Previous Button */}
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`
              p-2 rounded-lg transition-all duration-200
              ${currentPage === 1
                ? "text-gray-300 cursor-not-allowed"
                : "text-gray-600 hover:bg-gray-100 hover:text-primary"
              }
            `}
            aria-label="Προηγούμενη σελίδα"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Page Numbers */}
          <div className="flex items-center gap-1">
            {getPageNumbers().map((page, index) => (
              typeof page === "number" ? (
                <button
                  key={index}
                  onClick={() => setCurrentPage(page)}
                  className={`
                    min-w-[40px] h-10 px-3 rounded-lg font-medium transition-all duration-200
                    ${currentPage === page
                      ? "bg-primary text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-100 hover:text-primary"
                    }
                  `}
                >
                  {page}
                </button>
              ) : (
                <span key={index} className="px-2 text-gray-400">
                  {page}
                </span>
              )
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`
              p-2 rounded-lg transition-all duration-200
              ${currentPage === totalPages
                ? "text-gray-300 cursor-not-allowed"
                : "text-gray-600 hover:bg-gray-100 hover:text-primary"
              }
            `}
            aria-label="Επόμενη σελίδα"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}

      {/* Page info */}
      {totalPages > 1 && (
        <div className="text-center text-sm text-gray-500 mt-4">
          Σελίδα {currentPage} από {totalPages}
        </div>
      )}
    </div>
  );
}

