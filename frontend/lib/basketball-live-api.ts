/**
 * API-Basketball (v1) service for live scores and fixtures
 * https://v1.basketball.api-sports.io
 *
 * Free plan constraints similar to API-Football:
 * - Limited seasons
 * - Date queries restricted to today + tomorrow
 */

import type { Match } from './football-live-api';

const API_BASKETBALL_BASE = 'https://v1.basketball.api-sports.io';
const CURRENT_SEASON = '2024-2025';

interface ApiBasketballGame {
  id: number;
  date: string;
  status: { short: string | null; timer: string | null };
  league: { season: string };
  teams: {
    home: { name: string; logo: string };
    away: { name: string; logo: string };
  };
  scores: {
    home: { total: number | null };
    away: { total: number | null };
  };
}

function mapBasketballStatus(short: string | null): Match['status'] {
  if (!short) return 'NS';
  const map: Record<string, Match['status']> = {
    'NS': 'NS', 'Q1': '1H', 'Q2': '1H', 'HT': 'HT',
    'Q3': '2H', 'Q4': '2H', 'OT': '2H', 'FT': 'FT',
    'AOT': 'AET', 'POST': 'PST', 'CANC': 'CANC',
  };
  return map[short] || 'LIVE';
}

function transformGame(game: ApiBasketballGame): Match {
  const status = mapBasketballStatus(game.status.short);
  return {
    id: game.id,
    homeTeam: { name: game.teams.home.name, logo: game.teams.home.logo },
    awayTeam: { name: game.teams.away.name, logo: game.teams.away.logo },
    homeScore: game.scores.home.total,
    awayScore: game.scores.away.total,
    status,
    elapsed: game.status.timer ? parseInt(game.status.timer, 10) || null : null,
    date: game.date,
    venue: '',
    round: '',
  };
}

async function fetchFromApi(endpoint: string, revalidate: number): Promise<ApiBasketballGame[]> {
  const apiKey = process.env.API_SPORTS_KEY;
  if (!apiKey) return [];

  try {
    const response = await fetch(`${API_BASKETBALL_BASE}${endpoint}`, {
      headers: { 'x-apisports-key': apiKey },
      next: { revalidate },
    });

    if (!response.ok) {
      console.warn(`API-Basketball returned ${response.status} for ${endpoint}`);
      return [];
    }

    const data = await response.json();
    if (data.errors && Object.keys(data.errors).length > 0) {
      console.warn('API-Basketball errors:', data.errors);
      return [];
    }
    return data.response || [];
  } catch (error) {
    console.warn('API-Basketball fetch failed:', error);
    return [];
  }
}

export async function fetchLiveBasketballMatches(leagueId: number): Promise<Match[]> {
  const games = await fetchFromApi(
    `/games?league=${leagueId}&season=${CURRENT_SEASON}&live=all`,
    120
  );
  return games.map(transformGame);
}

export async function fetchUpcomingBasketballFixtures(leagueId: number): Promise<Match[]> {
  // Free plan: date restricted to today + tomorrow
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const from = today.toISOString().split('T')[0];
  const to = tomorrow.toISOString().split('T')[0];

  const games = await fetchFromApi(
    `/games?league=${leagueId}&season=${CURRENT_SEASON}&date=${from}`,
    3600
  );
  // Also fetch tomorrow
  const tomorrowGames = await fetchFromApi(
    `/games?league=${leagueId}&season=${CURRENT_SEASON}&date=${to}`,
    3600
  );

  return [...games, ...tomorrowGames]
    .filter((g) => g.status.short === 'NS' || g.status.short === null)
    .map(transformGame);
}
