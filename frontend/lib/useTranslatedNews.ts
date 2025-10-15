"use client";

import { useTranslations } from 'next-intl';
import { NewsArticle } from "@/types";

export function useTranslatedNews() {
  const t = useTranslations('news');

  // Main News Articles
  const mainNews: NewsArticle[] = [
    {
      category: t('mainNews.0.category'),
      categoryColor: "bg-orange-100 text-orange-800",
      title: t('mainNews.0.title'),
      description: t('mainNews.0.description'),
      timeAgo: "2 hours ago",
      author: t('mainNews.0.author'),
      imageUrl: "/basket1.png",
    },
    {
      category: t('mainNews.1.category'),
      categoryColor: "bg-green-100 text-green-800",
      title: t('mainNews.1.title'),
      description: t('mainNews.1.description'),
      timeAgo: "6 hours ago",
      author: t('mainNews.1.author'),
      imageUrl: "/football1.png",
    },
    {
      category: t('mainNews.2.category'),
      categoryColor: "bg-blue-100 text-blue-800",
      title: t('mainNews.2.title'),
      description: t('mainNews.2.description'),
      timeAgo: "4 hours ago",
      author: t('mainNews.2.author'),
      imageUrl: "/f1.png",
    },
    {
      category: t('mainNews.3.category'),
      categoryColor: "bg-orange-100 text-orange-800",
      title: t('mainNews.3.title'),
      description: t('mainNews.3.description'),
      timeAgo: "8 hours ago",
      author: t('mainNews.3.author'),
      imageUrl: "/greek_basket.png",
    },
  ];

  // Football News
  const footballNews: NewsArticle[] = [
    {
      category: t('footballNews.0.category'),
      categoryColor: "bg-green-100 text-green-800",
      title: t('footballNews.0.title'),
      description: t('footballNews.0.description'),
      timeAgo: "1 hour ago",
      author: t('footballNews.0.author'),
      imageUrl: "/football1.png",
    },
    {
      category: t('footballNews.1.category'),
      categoryColor: "bg-blue-100 text-blue-800",
      title: t('footballNews.1.title'),
      description: t('footballNews.1.description'),
      timeAgo: "2 hours ago",
      author: t('footballNews.1.author'),
      imageUrl: "/football.png",
    },
    {
      category: t('footballNews.2.category'),
      categoryColor: "bg-purple-100 text-purple-800",
      title: t('footballNews.2.title'),
      description: t('footballNews.2.description'),
      timeAgo: "4 hours ago",
      author: t('footballNews.2.author'),
      imageUrl: "/football1.png",
    },
  ];

  // Basketball News
  const basketballNews: NewsArticle[] = [
    {
      category: t('basketballNews.0.category'),
      categoryColor: "bg-orange-100 text-orange-800",
      title: t('basketballNews.0.title'),
      description: t('basketballNews.0.description'),
      timeAgo: "30 minutes ago",
      author: t('basketballNews.0.author'),
      imageUrl: "/basket1.png",
    },
    {
      category: t('basketballNews.1.category'),
      categoryColor: "bg-yellow-100 text-yellow-800",
      title: t('basketballNews.1.title'),
      description: t('basketballNews.1.description'),
      timeAgo: "1 hour ago",
      author: t('basketballNews.1.author'),
      imageUrl: "/basket1.png",
    },
    {
      category: t('basketballNews.2.category'),
      categoryColor: "bg-pink-100 text-pink-800",
      title: t('basketballNews.2.title'),
      description: t('basketballNews.2.description'),
      timeAgo: "3 hours ago",
      author: t('basketballNews.2.author'),
      imageUrl: "/basket1.png",
    },
  ];

  // Formula One News
  const formulaOneNews: NewsArticle[] = [
    {
      category: t('formulaOneNews.0.category'),
      categoryColor: "bg-red-100 text-red-800",
      title: t('formulaOneNews.0.title'),
      description: t('formulaOneNews.0.description'),
      timeAgo: "2 hours ago",
      author: t('formulaOneNews.0.author'),
      imageUrl: "/f1.png",
    },
    {
      category: t('formulaOneNews.1.category'),
      categoryColor: "bg-blue-100 text-blue-800",
      title: t('formulaOneNews.1.title'),
      description: t('formulaOneNews.1.description'),
      timeAgo: "4 hours ago",
      author: t('formulaOneNews.1.author'),
      imageUrl: "/f2.png",
    },
    {
      category: t('formulaOneNews.2.category'),
      categoryColor: "bg-green-100 text-green-800",
      title: t('formulaOneNews.2.title'),
      description: t('formulaOneNews.2.description'),
      timeAgo: "6 hours ago",
      author: t('formulaOneNews.2.author'),
      imageUrl: "/f1.png",
    },
  ];

  // Latest Football News (for the smaller section)
  const footballLatestNews: NewsArticle[] = footballNews;

  // Carousel News (Hot News section)
  const carouselNews: NewsArticle[] = [
    {
      category: t('carouselNews.0.category'),
      categoryColor: "bg-red-100 text-red-800",
      title: t('carouselNews.0.title'),
      description: t('carouselNews.0.description'),
      timeAgo: "30 minutes ago",
      author: t('carouselNews.0.author'),
      imageUrl: "/basket1.png",
    },
    {
      category: t('carouselNews.1.category'),
      categoryColor: "bg-red-100 text-red-800",
      title: t('carouselNews.1.title'),
      description: t('carouselNews.1.description'),
      timeAgo: "45 minutes ago",
      author: t('carouselNews.1.author'),
      imageUrl: "/football1.png",
    },
    {
      category: t('carouselNews.2.category'),
      categoryColor: "bg-red-100 text-red-800",
      title: t('carouselNews.2.title'),
      description: t('carouselNews.2.description'),
      timeAgo: "1 hour ago",
      author: t('carouselNews.2.author'),
      imageUrl: "/f1.png",
    },
    {
      category: t('carouselNews.3.category'),
      categoryColor: "bg-red-100 text-red-800",
      title: t('carouselNews.3.title'),
      description: t('carouselNews.3.description'),
      timeAgo: "2 hours ago",
      author: t('carouselNews.3.author'),
      imageUrl: "/greek_basket.png",
    },
    {
      category: t('carouselNews.4.category'),
      categoryColor: "bg-red-100 text-red-800",
      title: t('carouselNews.4.title'),
      description: t('carouselNews.4.description'),
      timeAgo: "3 hours ago",
      author: t('carouselNews.4.author'),
      imageUrl: "/f2.png",
    },
  ];

  return {
    mainNews,
    footballNews,
    footballLatestNews,
    basketballNews,
    formulaOneNews,
    carouselNews,
  };
}

