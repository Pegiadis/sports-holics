/**
 * API-Football (v3) service for live scores and fixtures
 * https://v3.football.api-sports.io
 *
 * Free plan constraints:
 * - Seasons up to 2024 only (not 2025+)
 * - No "next" parameter
 * - Date queries restricted to today + tomorrow
 * - Live endpoint works fine
 */

const API_FOOTBALL_BASE = 'https://v3.football.api-sports.io';
const CURRENT_SEASON = 2024;

export interface Match {
  id: number;
  homeTeam: { name: string; logo: string };
  awayTeam: { name: string; logo: string };
  homeScore: number | null;
  awayScore: number | null;
  status: 'NS' | '1H' | 'HT' | '2H' | 'FT' | 'AET' | 'PEN' | 'PST' | 'CANC' | 'LIVE';
  elapsed: number | null;
  date: string;
  venue: string;
  round: string;
}

interface ApiFootballFixture {
  fixture: {
    id: number;
    date: string;
    venue: { name: string | null };
    status: { short: string; elapsed: number | null };
  };
  league: { round: string };
  teams: {
    home: { name: string; logo: string };
    away: { name: string; logo: string };
  };
  goals: { home: number | null; away: number | null };
}

function transformFixture(fixture: ApiFootballFixture): Match {
  return {
    id: fixture.fixture.id,
    homeTeam: { name: fixture.teams.home.name, logo: fixture.teams.home.logo },
    awayTeam: { name: fixture.teams.away.name, logo: fixture.teams.away.logo },
    homeScore: fixture.goals.home,
    awayScore: fixture.goals.away,
    status: fixture.fixture.status.short as Match['status'],
    elapsed: fixture.fixture.status.elapsed,
    date: fixture.fixture.date,
    venue: fixture.fixture.venue.name || '',
    round: fixture.league.round,
  };
}

async function fetchFromApi(endpoint: string, revalidate: number): Promise<ApiFootballFixture[]> {
  const apiKey = process.env.API_SPORTS_KEY;
  if (!apiKey) return [];

  try {
    const response = await fetch(`${API_FOOTBALL_BASE}${endpoint}`, {
      headers: { 'x-apisports-key': apiKey },
      next: { revalidate },
    });

    if (!response.ok) {
      console.warn(`API-Football returned ${response.status} for ${endpoint}`);
      return [];
    }

    const data = await response.json();
    if (data.errors && Object.keys(data.errors).length > 0) {
      console.warn('API-Football errors:', data.errors);
      return [];
    }
    return data.response || [];
  } catch (error) {
    console.warn('API-Football fetch failed:', error);
    return [];
  }
}

export async function fetchLiveMatches(leagueId: number): Promise<Match[]> {
  const fixtures = await fetchFromApi(
    `/fixtures?league=${leagueId}&season=${CURRENT_SEASON}&live=all`,
    120
  );
  return fixtures.map(transformFixture);
}

export async function fetchUpcomingFixtures(leagueId: number): Promise<Match[]> {
  // Free plan: no "next" param, date restricted to today + tomorrow
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const from = today.toISOString().split('T')[0];
  const to = tomorrow.toISOString().split('T')[0];

  const fixtures = await fetchFromApi(
    `/fixtures?league=${leagueId}&season=${CURRENT_SEASON}&from=${from}&to=${to}`,
    3600
  );
  return fixtures
    .filter((f) => f.fixture.status.short === 'NS')
    .map(transformFixture);
}
