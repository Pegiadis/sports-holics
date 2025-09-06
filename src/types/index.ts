export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  author: string;
  publishDate: string;
  readTime: string;
  views: number;
  category: string;
  tags: string[];
  isLive?: boolean;
  isFeatured?: boolean;
}

export interface Team {
  id: string;
  name: string;
  logo: string;
  score?: number;
}

export interface Game {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  gameTime: string;
  status: 'live' | 'finished' | 'upcoming';
  league: string;
  quarter?: string;
  date: string;
}

export interface Stats {
  title: string;
  value: string | number;
  change?: number;
  changeType?: 'increase' | 'decrease' | 'neutral';
  subtitle?: string;
  color?: 'primary' | 'success' | 'warning' | 'danger';
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'editor' | 'writer' | 'user';
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
}

export interface League {
  id: string;
  name: string;
  sport: string;
  country: string;
  logo?: string;
  season: string;
}
