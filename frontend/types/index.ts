export interface NewsArticle {
  category: string;
  categoryColor: string;
  title: string;
  description: string;
  timeAgo: string;
  author: string;
  imageUrl: string;
  slug?: string;  // Optional for backward compatibility with mock data
}

export interface TrendingNewsItem {
  rank: number;
  title: string;
  timeAgo: string;
}

export interface LiveScoreItem {
  match: string;
  league: string;
  score: string;
  isLive: boolean;
}

export interface SocialIcon {
  name: string;
  icon: string;
}

export type NewsCardSize = "xs" | "small" | "medium" | "large";
