import React from 'react';
import { Clock } from 'lucide-react';

interface Team {
  name: string;
  logo: string;
  score: number;
}

interface LiveScoreCardProps {
  homeTeam: Team;
  awayTeam: Team;
  gameTime: string;
  status: 'live' | 'finished' | 'upcoming';
  league: string;
  quarter?: string;
}

const LiveScoreCard: React.FC<LiveScoreCardProps> = ({
  homeTeam,
  awayTeam,
  gameTime,
  status,
  league,
  quarter,
}) => {
  const statusConfig = {
    live: {
      bg: 'bg-red-100 border-red-200',
      text: 'text-red-800',
      dot: 'bg-red-500',
      label: 'LIVE',
    },
    finished: {
      bg: 'bg-gray-100 border-gray-200',
      text: 'text-gray-800',
      dot: 'bg-gray-500',
      label: 'FINAL',
    },
    upcoming: {
      bg: 'bg-blue-100 border-blue-200',
      text: 'text-blue-800',
      dot: 'bg-blue-500',
      label: 'UPCOMING',
    },
  };

  const config = statusConfig[status];

  return (
    <div className={`rounded-lg border-2 p-4 ${config.bg}`}>
      {/* League and Status */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-gray-600">{league}</span>
        <div className="flex items-center">
          <div className={`w-2 h-2 rounded-full ${config.dot} mr-2 ${status === 'live' ? 'animate-pulse' : ''}`} />
          <span className={`text-xs font-bold ${config.text}`}>
            {config.label}
          </span>
        </div>
      </div>

      {/* Teams and Scores */}
      <div className="space-y-3">
        {/* Home Team */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src={homeTeam.logo}
              alt={homeTeam.name}
              className="w-8 h-8 object-contain"
            />
            <span className="font-medium text-gray-900">{homeTeam.name}</span>
          </div>
          <span className="text-2xl font-bold text-gray-900">
            {homeTeam.score}
          </span>
        </div>

        {/* Away Team */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src={awayTeam.logo}
              alt={awayTeam.name}
              className="w-8 h-8 object-contain"
            />
            <span className="font-medium text-gray-900">{awayTeam.name}</span>
          </div>
          <span className="text-2xl font-bold text-gray-900">
            {awayTeam.score}
          </span>
        </div>
      </div>

      {/* Game Time and Quarter */}
      <div className="mt-4 pt-3 border-t border-gray-200 flex items-center justify-center space-x-2">
        <Clock size={14} className="text-gray-500" />
        <span className="text-sm text-gray-600">
          {gameTime}
          {quarter && status === 'live' && ` • ${quarter}`}
        </span>
      </div>
    </div>
  );
};

export default LiveScoreCard;
