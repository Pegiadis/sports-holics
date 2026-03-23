import type { Match } from '@/lib/football-live-api';

function isLive(status: Match['status']): boolean {
  return ['1H', '2H', 'HT', 'LIVE'].includes(status);
}

function isFinished(status: Match['status']): boolean {
  return ['FT', 'AET', 'PEN'].includes(status);
}

function getStatusLabel(status: Match['status'], elapsed: number | null): string {
  const labels: Record<string, string> = {
    'NS': 'Προγραμματισμένο',
    '1H': `${elapsed ?? ''}'`,
    'HT': 'Ημίχρονο',
    '2H': `${elapsed ?? ''}'`,
    'FT': 'Τελικό',
    'AET': 'Παράταση',
    'PEN': 'Πέναλτι',
    'PST': 'Αναβλήθηκε',
    'CANC': 'Ακυρώθηκε',
    'LIVE': `${elapsed ?? ''}'`,
  };
  return labels[status] || status;
}

function formatMatchDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('el-GR', {
    timeZone: 'Europe/Athens',
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date);
}

export default function MatchCard({ match }: { match: Match }) {
  const live = isLive(match.status);
  const finished = isFinished(match.status);

  return (
    <div className={`bg-white rounded-xl border p-4 transition-shadow ${live ? 'border-red-200 shadow-md' : 'border-gray-100 shadow-sm hover:shadow-md'}`}>
      {/* Status bar */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {live && (
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
            </span>
          )}
          <span className={`text-xs font-semibold uppercase tracking-wide ${live ? 'text-red-600' : finished ? 'text-gray-500' : 'text-blue-600'}`}>
            {getStatusLabel(match.status, match.elapsed)}
          </span>
        </div>
        {match.round && (
          <span className="text-xs text-gray-400 truncate max-w-[140px]">{match.round}</span>
        )}
      </div>

      {/* Teams & Score */}
      <div className="flex items-center gap-3">
        {/* Home */}
        <div className="flex-1 flex items-center gap-2 min-w-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={match.homeTeam.logo} alt="" className="w-7 h-7 object-contain flex-shrink-0" />
          <span className="text-sm font-medium text-gray-900 truncate">{match.homeTeam.name}</span>
        </div>

        {/* Score / Time */}
        <div className="flex-shrink-0 text-center min-w-[60px]">
          {match.homeScore !== null && match.awayScore !== null ? (
            <span className={`text-lg font-bold ${live ? 'text-red-600' : 'text-gray-900'}`}>
              {match.homeScore} - {match.awayScore}
            </span>
          ) : (
            <span className="text-xs text-gray-500">{formatMatchDate(match.date)}</span>
          )}
        </div>

        {/* Away */}
        <div className="flex-1 flex items-center justify-end gap-2 min-w-0">
          <span className="text-sm font-medium text-gray-900 truncate text-right">{match.awayTeam.name}</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={match.awayTeam.logo} alt="" className="w-7 h-7 object-contain flex-shrink-0" />
        </div>
      </div>

      {/* Venue (upcoming only) */}
      {!live && !finished && match.venue && (
        <div className="mt-2 text-xs text-gray-400 text-center truncate">
          📍 {match.venue}
        </div>
      )}
    </div>
  );
}
