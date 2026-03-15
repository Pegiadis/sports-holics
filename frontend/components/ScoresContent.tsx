'use client';

import { useState } from 'react';

// SofaScore official widget embed URLs
// To update: go to sofascore.com > tournament page > widget/embed button > copy iframe src
const TOURNAMENTS = [
  {
    id: 'super-league',
    label: 'Super League',
    icon: '⚽',
    src: 'https://widgets.sofascore.com/embed/tournament/127/season/78175/standings/Super%20League%2025%2F26?widgetTitle=Super%20League%2025%2F26&showCompetitionLogo=true',
    height: 883,
  },
  {
    id: 'champions-league',
    label: 'Champions League',
    icon: '⚽',
    src: 'https://widgets.sofascore.com/embed/tournament/138314/season/76953/standings/UEFA%20Champions%20League%2025%2F26?widgetTitle=UEFA%20Champions%20League%2025%2F26&showCompetitionLogo=true',
    height: 1763,
  },
  {
    id: 'euroleague',
    label: 'Euroleague',
    icon: '🏀',
    src: 'https://widgets.sofascore.com/embed/tournament/42527/season/78545/standings/Euroleague%2025%2F26?widgetTitle=Euroleague%2025%2F26&showCompetitionLogo=true',
    height: 1123,
  },
] as const;

type TournamentId = (typeof TOURNAMENTS)[number]['id'];

export default function ScoresContent() {
  const [activeTournament, setActiveTournament] = useState<TournamentId>('super-league');
  const [loading, setLoading] = useState(true);

  const tournament = TOURNAMENTS.find((t) => t.id === activeTournament)!;

  return (
    <div>
      {/* Page Title */}
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
        Βαθμολογίες
      </h1>

      {/* Tournament Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {TOURNAMENTS.map((t) => (
          <button
            key={t.id}
            onClick={() => {
              setActiveTournament(t.id);
              setLoading(true);
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
              activeTournament === t.id
                ? 'bg-primary text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <span>{t.icon}</span>
            {t.label}
          </button>
        ))}
      </div>

      {/* Widget Container */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <div className="relative">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white z-10 min-h-[400px]">
              <div className="animate-pulse space-y-3 w-full max-w-md px-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-gray-200 rounded-full" />
                    <div className="flex-1 h-4 bg-gray-200 rounded" />
                    <div className="w-8 h-4 bg-gray-200 rounded" />
                  </div>
                ))}
              </div>
            </div>
          )}
          <iframe
            key={activeTournament}
            src={tournament.src}
            style={{ width: '100%', height: tournament.height, maxWidth: '100%' }}
            frameBorder="0"
            scrolling="no"
            onLoad={() => setLoading(false)}
            title={`${tournament.label} Βαθμολογία`}
          />
        </div>
      </div>

      {/* Attribution */}
      <div className="mt-4 text-center text-xs text-gray-400">
        Powered by{' '}
        <a
          href="https://www.sofascore.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          SofaScore
        </a>
      </div>
    </div>
  );
}
