import { Clock, MapPin, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import type { Game } from '../../types';
import { GameStatus } from '../../types';
import Card from './Card';

interface LiveScoreCardProps {
  game: Game;
  className?: string;
}

const getStatusDisplay = (status: GameStatus, date: string) => {
  switch (status) {
    case GameStatus.LIVE:
      return { text: 'LIVE', className: 'bg-red-500 text-white live-indicator' };
    case GameStatus.FINISHED:
      return { text: 'FINAL', className: 'bg-neutral-500 text-white' };
    case GameStatus.SCHEDULED:
      return { text: format(new Date(date), 'HH:mm'), className: 'bg-primary-100 text-primary-700' };
    case GameStatus.POSTPONED:
      return { text: 'POSTPONED', className: 'bg-yellow-100 text-yellow-700' };
    case GameStatus.CANCELLED:
      return { text: 'CANCELLED', className: 'bg-red-100 text-red-700' };
    default:
      return { text: 'TBD', className: 'bg-neutral-100 text-neutral-700' };
  }
};

export default function LiveScoreCard({ game, className = '' }: LiveScoreCardProps) {
  const statusDisplay = getStatusDisplay(game.status, game.date);
  const formattedDate = format(new Date(game.date), 'MMM d');

  return (
    <Card hover className={`${className}`}>
      <div className="space-y-4">
        {/* Header with competition and status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs text-neutral-600">
            <Calendar size={12} />
            <span>{formattedDate}</span>
            <span>•</span>
            <span className="uppercase font-medium">{game.competition}</span>
            <span>•</span>
            <span>Round {game.round}</span>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusDisplay.className}`}>
            {statusDisplay.text}
          </span>
        </div>

        {/* Teams and scores */}
        <div className="space-y-3">
          {/* Home team */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src={game.homeTeam.logo}
                alt={game.homeTeam.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div>
                <div className="font-semibold text-neutral-900">{game.homeTeam.name}</div>
                <div className="text-xs text-neutral-500">{game.homeTeam.country}</div>
              </div>
            </div>
            <div className="text-2xl font-bold text-neutral-900">
              {game.status !== GameStatus.SCHEDULED ? game.homeScore : '-'}
            </div>
          </div>

          {/* Away team */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src={game.awayTeam.logo}
                alt={game.awayTeam.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div>
                <div className="font-semibold text-neutral-900">{game.awayTeam.name}</div>
                <div className="text-xs text-neutral-500">{game.awayTeam.country}</div>
              </div>
            </div>
            <div className="text-2xl font-bold text-neutral-900">
              {game.status !== GameStatus.SCHEDULED ? game.awayScore : '-'}
            </div>
          </div>
        </div>

        {/* Venue info */}
        <div className="pt-3 border-t border-neutral-100">
          <div className="flex items-center space-x-1 text-xs text-neutral-500">
            <MapPin size={12} />
            <span>{game.venue}</span>
          </div>
        </div>

        {/* Live indicator for live games */}
        {game.status === GameStatus.LIVE && (
          <div className="flex items-center justify-center space-x-2 text-red-500 text-sm font-medium">
            <div className="w-2 h-2 bg-red-500 rounded-full live-indicator"></div>
            <span>Game in progress</span>
          </div>
        )}
      </div>
    </Card>
  );
}
