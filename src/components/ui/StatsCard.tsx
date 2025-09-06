import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeType?: 'increase' | 'decrease' | 'neutral';
  subtitle?: string;
  icon?: React.ReactNode;
  color?: 'primary' | 'success' | 'warning' | 'danger';
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  changeType = 'neutral',
  subtitle,
  icon,
  color = 'primary',
}) => {
  const colorClasses = {
    primary: 'bg-primary-500',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    danger: 'bg-red-500',
  };

  const changeIcon = {
    increase: <TrendingUp size={16} />,
    decrease: <TrendingDown size={16} />,
    neutral: <Minus size={16} />,
  };

  const changeColor = {
    increase: 'text-green-600',
    decrease: 'text-red-600',
    neutral: 'text-gray-500',
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide">
            {title}
          </h3>
          <div className="mt-2 flex items-baseline">
            <p className="text-3xl font-bold text-gray-900">{value}</p>
            {change !== undefined && (
              <div className={`ml-3 flex items-center ${changeColor[changeType]}`}>
                {changeIcon[changeType]}
                <span className="ml-1 text-sm font-medium">
                  {Math.abs(change)}%
                </span>
              </div>
            )}
          </div>
          {subtitle && (
            <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
          )}
        </div>
        
        {icon && (
          <div className={`p-3 rounded-full ${colorClasses[color]} text-white`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
