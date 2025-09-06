// Core types for the sports website

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  category: ArticleCategory;
  tags: string[];
  imageUrl: string;
  featured: boolean;
  views: number;
}

export interface Team {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  colors: {
    primary: string;
    secondary: string;
  };
  country: string;
  founded: number;
}

export interface Player {
  id: string;
  name: string;
  position: Position;
  number: number;
  team: Team;
  nationality: string;
  age: number;
  height: string;
  weight: string;
  imageUrl: string;
}

export interface Game {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number;
  awayScore: number;
  status: GameStatus;
  date: string;
  venue: string;
  round: number;
  season: string;
  competition: Competition;
}

export interface PlayerStats {
  playerId: string;
  gameId: string;
  points: number;
  rebounds: number;
  assists: number;
  steals: number;
  blocks: number;
  turnovers: number;
  fouls: number;
  minutesPlayed: number;
  fieldGoalsMade: number;
  fieldGoalsAttempted: number;
  threePointersMade: number;
  threePointersAttempted: number;
  freeThrowsMade: number;
  freeThrowsAttempted: number;
}

export interface TeamStats {
  teamId: string;
  season: string;
  gamesPlayed: number;
  wins: number;
  losses: number;
  pointsFor: number;
  pointsAgainst: number;
  rebounds: number;
  assists: number;
  steals: number;
  blocks: number;
}

export interface Standings {
  position: number;
  team: Team;
  gamesPlayed: number;
  wins: number;
  losses: number;
  winPercentage: number;
  pointsFor: number;
  pointsAgainst: number;
  pointsDifference: number;
  streak: string;
  form: string[];
}

// Enums
export const ArticleCategory = {
  NEWS: 'news',
  ANALYSIS: 'analysis',
  INTERVIEW: 'interview',
  MATCH_REPORT: 'match-report',
  TRANSFER: 'transfer',
  OPINION: 'opinion'
} as const;

export type ArticleCategory = typeof ArticleCategory[keyof typeof ArticleCategory];

export const Position = {
  POINT_GUARD: 'PG',
  SHOOTING_GUARD: 'SG',
  SMALL_FORWARD: 'SF',
  POWER_FORWARD: 'PF',
  CENTER: 'C'
} as const;

export type Position = typeof Position[keyof typeof Position];

export const GameStatus = {
  SCHEDULED: 'scheduled',
  LIVE: 'live',
  FINISHED: 'finished',
  POSTPONED: 'postponed',
  CANCELLED: 'cancelled'
} as const;

export type GameStatus = typeof GameStatus[keyof typeof GameStatus];

export const Competition = {
  EUROLEAGUE: 'euroleague',
  EUROCUP: 'eurocup',
  DOMESTIC_LEAGUE: 'domestic-league',
  DOMESTIC_CUP: 'domestic-cup'
} as const;

export type Competition = typeof Competition[keyof typeof Competition];

// UI Types
export interface NavigationItem {
  label: string;
  href: string;
  children?: NavigationItem[];
  icon?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}
