import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { Standings } from '../../types';
import Card from './Card';

interface StandingsTableProps {
  standings: Standings[];
  className?: string;
  showForm?: boolean;
}

const getFormIcon = (result: string) => {
  if (result === 'W') return <div className="w-2 h-2 bg-green-500 rounded-full" />;
  if (result === 'L') return <div className="w-2 h-2 bg-red-500 rounded-full" />;
  return <div className="w-2 h-2 bg-neutral-400 rounded-full" />;
};

const getStreakColor = (streak: string) => {
  if (streak.startsWith('W')) return 'text-green-600 bg-green-50';
  if (streak.startsWith('L')) return 'text-red-600 bg-red-50';
  return 'text-neutral-600 bg-neutral-50';
};

const getPositionTrend = (position: number) => {
  // Mock trend logic - in real app this would be based on previous position
  if (position <= 8) return { icon: TrendingUp, color: 'text-green-500' };
  if (position > 12) return { icon: TrendingDown, color: 'text-red-500' };
  return { icon: Minus, color: 'text-neutral-400' };
};

export default function StandingsTable({ 
  standings, 
  className = '', 
  showForm = true 
}: StandingsTableProps) {
  return (
    <Card className={className} padding="none">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-neutral-50 border-b border-neutral-200">
            <tr>
              <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">
                Pos
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">
                Team
              </th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-neutral-700">
                GP
              </th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-neutral-700">
                W
              </th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-neutral-700">
                L
              </th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-neutral-700">
                Win%
              </th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-neutral-700">
                PF
              </th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-neutral-700">
                PA
              </th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-neutral-700">
                Diff
              </th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-neutral-700">
                Streak
              </th>
              {showForm && (
                <th className="text-center py-3 px-4 text-sm font-semibold text-neutral-700">
                  Form
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {standings.map((team, index) => {
              const trend = getPositionTrend(team.position);
              const TrendIcon = trend.icon;
              const isPlayoffPosition = team.position <= 8;
              const isPlayInPosition = team.position >= 9 && team.position <= 10;

              return (
                <tr
                  key={team.team.id}
                  className={`hover:bg-neutral-50 transition-colors ${
                    isPlayoffPosition ? 'border-l-4 border-l-green-500' :
                    isPlayInPosition ? 'border-l-4 border-l-yellow-500' : ''
                  }`}
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <span className={`
                        text-sm font-semibold w-6 text-center
                        ${isPlayoffPosition ? 'text-green-600' : 
                          isPlayInPosition ? 'text-yellow-600' : 'text-neutral-600'}
                      `}>
                        {team.position}
                      </span>
                      <TrendIcon size={12} className={trend.color} />
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={team.team.logo}
                        alt={team.team.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-semibold text-neutral-900 text-sm">
                          {team.team.name}
                        </div>
                        <div className="text-xs text-neutral-500">
                          {team.team.country}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center text-sm text-neutral-700">
                    {team.gamesPlayed}
                  </td>
                  <td className="py-3 px-4 text-center text-sm font-medium text-green-600">
                    {team.wins}
                  </td>
                  <td className="py-3 px-4 text-center text-sm font-medium text-red-600">
                    {team.losses}
                  </td>
                  <td className="py-3 px-4 text-center text-sm font-medium text-neutral-900">
                    {team.winPercentage.toFixed(1)}%
                  </td>
                  <td className="py-3 px-4 text-center text-sm text-neutral-700">
                    {team.pointsFor}
                  </td>
                  <td className="py-3 px-4 text-center text-sm text-neutral-700">
                    {team.pointsAgainst}
                  </td>
                  <td className={`py-3 px-4 text-center text-sm font-medium ${
                    team.pointsDifference > 0 ? 'text-green-600' : 
                    team.pointsDifference < 0 ? 'text-red-600' : 'text-neutral-600'
                  }`}>
                    {team.pointsDifference > 0 ? '+' : ''}{team.pointsDifference}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStreakColor(team.streak)}`}>
                      {team.streak}
                    </span>
                  </td>
                  {showForm && (
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center space-x-1">
                        {team.form.map((result, idx) => (
                          <div key={idx} className="flex items-center">
                            {getFormIcon(result)}
                          </div>
                        ))}
                      </div>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      {/* Legend */}
      <div className="px-4 py-3 bg-neutral-50 border-t border-neutral-200">
        <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-600">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500"></div>
            <span>Playoff positions (1-8)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500"></div>
            <span>Play-in positions (9-10)</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs">GP: Games Played, W: Wins, L: Losses, PF: Points For, PA: Points Against</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
