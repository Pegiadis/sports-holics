export interface TeamInfo {
  id: number;
  name: string;
  slug: string;
  logoUrl?: string;
  sports: string[];  // Array of sports: ["Ποδόσφαιρο", "Μπάσκετ"]
}

export interface NewsArticle {
  id?: number;
  category: string;
  categoryColor: string;
  title: string;
  subtitle?: string;
  description: string;
  timeAgo: string;
  author: string;
  image?: string; // For news articles from news API
  imageUrl?: string; // For articles from sports API (backward compatibility)
  slug?: string;
  date?: string;
  team?: TeamInfo;
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
