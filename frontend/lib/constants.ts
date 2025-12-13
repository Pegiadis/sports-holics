// Category color mappings (used as fallback in NewsCard)
export const CATEGORY_COLORS: Record<string, string> = {
  HOT: "bg-red-100 text-red-800",
  FOOTBALL: "bg-green-100 text-green-800",
  BASKETBALL: "bg-orange-100 text-orange-800",
  "AUTO MOTO": "bg-blue-100 text-blue-800",
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
  "ΠΟΔΟΣΦΑΙΡΟ": "bg-green-100 text-green-800",
  "ΜΠΑΣΚΕΤ": "bg-orange-100 text-orange-800",
};

// Breaking news items
export const BREAKING_NEWS = [
  "Manchester United defeats Liverpool 3-1 in Premier League clash",
  "NBA Finals: Lakers lead series 3-2 after dominant Game 5 performance",
  "Auto Moto: Max Verstappen wins Monaco Grand Prix in thrilling race",
] as const;

// Carousel settings
export const CAROUSEL_CONFIG = {
  autoRotateInterval: 5000, // 5 seconds
  totalSlides: 2,
} as const;