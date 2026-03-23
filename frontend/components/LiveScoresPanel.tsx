import type { Match } from '@/lib/football-live-api';
import MatchCard from './MatchCard';

interface LiveScoresPanelProps {
  matches: Match[];
  emptyMessage: string;
}

function MatchSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 animate-pulse">
      <div className="h-3 w-20 bg-gray-200 rounded mb-3" />
      <div className="flex items-center gap-3">
        <div className="flex-1 flex items-center gap-2">
          <div className="w-7 h-7 bg-gray-200 rounded-full" />
          <div className="h-4 w-24 bg-gray-200 rounded" />
        </div>
        <div className="h-5 w-14 bg-gray-200 rounded" />
        <div className="flex-1 flex items-center justify-end gap-2">
          <div className="h-4 w-24 bg-gray-200 rounded" />
          <div className="w-7 h-7 bg-gray-200 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export default function LiveScoresPanel({ matches, emptyMessage }: LiveScoresPanelProps) {
  if (matches.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 p-8 text-center">
        <p className="text-gray-500 text-sm">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {matches.map((match) => (
        <MatchCard key={match.id} match={match} />
      ))}
    </div>
  );
}

export { MatchSkeleton };
