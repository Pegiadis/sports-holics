import { TrendingNewsItem, LiveScoreItem } from "@/types";


// Category color mappings
export const CATEGORY_COLORS: Record<string, string> = {
  HOT: "bg-red-100 text-red-800",
  FOOTBALL: "bg-green-100 text-green-800",
  BASKETBALL: "bg-orange-100 text-orange-800",
  "FORMULA 1": "bg-blue-100 text-blue-800",
  "PREMIER LEAGUE": "bg-green-100 text-green-800",
  "CHAMPIONS LEAGUE": "bg-blue-100 text-blue-800",
  "WORLD CUP": "bg-purple-100 text-purple-800",
  "NBA FINALS": "bg-orange-100 text-orange-800",
  "NBA DRAFT": "bg-yellow-100 text-yellow-800",
  WNBA: "bg-pink-100 text-pink-800",
  "MONACO GP": "bg-red-100 text-red-800",
  CHAMPIONSHIP: "bg-blue-100 text-blue-800",
  TECH: "bg-green-100 text-green-800",
  TRANSFER: "bg-blue-100 text-blue-800",
  COACHING: "bg-gray-100 text-gray-800",
};

// Navigation menu items
export const NAV_ITEMS = [
  { label: "Football", href: "#football" },
  { label: "Basketball", href: "#basketball" },
  { label: "Formula 1", href: "#formula-1" },
  { label: "News", href: "#news" },
  { label: "More", href: "#more" },
] as const;

// Breaking news items
export const BREAKING_NEWS = [
  "Manchester United defeats Liverpool 3-1 in Premier League clash",
  "NBA Finals: Lakers lead series 3-2 after dominant Game 5 performance",
  "Formula 1: Max Verstappen wins Monaco Grand Prix in thrilling race",
] as const;

// Carousel settings
export const CAROUSEL_CONFIG = {
  autoRotateInterval: 5000, // 5 seconds
  totalSlides: 2,
} as const;



// Sidebar
export const trendingNews: TrendingNewsItem[] = [
  { rank: 1, title: "Champions League Final Tickets Sold Out", timeAgo: "1 hour ago" },
  { rank: 2, title: "NBA Draft Lottery Results", timeAgo: "3 hours ago" },
  { rank: 3, title: "F1 Driver Contract Extension", timeAgo: "5 hours ago" },
  { rank: 4, title: "F1 Driver Contract Extension", timeAgo: "5 hours ago" }
];

// Sidebar
export const liveScores: LiveScoreItem[] = [
  {
    match: "Manchester United vs Liverpool",
    league: "Premier League",
    score: "3-1",
    isLive: false,
  },
  {
    match: "Lakers vs Warriors",
    league: "NBA",
    score: "108-95",
    isLive: false,
  },
  {
    match: "Red Bull vs Ferrari",
    league: "F1 Practice",
    score: "LIVE",
    isLive: true,
  },
];