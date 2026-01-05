'use client';

import { useState, useEffect } from 'react';
import JournalistArticlesGrid from './JournalistArticlesGrid';

interface UnifiedArticle {
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

interface JournalistArticlesClientProps {
  journalistSlug: string;
  journalistName: string;
  totalCount: number;
}

export default function JournalistArticlesClient({
  journalistSlug,
  journalistName,
  totalCount,
}: JournalistArticlesClientProps) {
  const [articles, setArticles] = useState<UnifiedArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchAllArticles = async () => {
      setLoading(true);
      setError(false);
      
      try {
        // Fetch ALL articles at once
        const response = await fetch(
          `/api/journalist-articles?slug=${journalistSlug}&page=1&pageSize=${totalCount}`,
          { signal: AbortSignal.timeout(30000) } // 30s timeout for large datasets
        );
        
        if (response.ok) {
          const data = await response.json();
          setArticles(data.articles);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('Error fetching articles:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (totalCount > 0) {
      fetchAllArticles();
    } else {
      setLoading(false);
    }
  }, [journalistSlug, totalCount]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-24">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Φόρτωση άρθρων...</p>
          {totalCount > 100 && (
            <p className="text-gray-500 text-sm mt-2">Φόρτωση {totalCount} άρθρων...</p>
          )}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Σφάλμα φόρτωσης</h3>
        <p className="text-gray-600">Δεν ήταν δυνατή η φόρτωση των άρθρων. Παρακαλώ δοκιμάστε ξανά.</p>
      </div>
    );
  }

  return (
    <JournalistArticlesGrid 
      articles={articles} 
      journalistName={journalistName} 
    />
  );
}

