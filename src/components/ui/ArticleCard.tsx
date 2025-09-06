import { Clock, Eye, User, Tag } from 'lucide-react';
import { format } from 'date-fns';
import type { Article } from '../../types';
import Card from './Card';

interface ArticleCardProps {
  article: Article;
  variant?: 'default' | 'featured' | 'compact';
  className?: string;
}

export default function ArticleCard({ 
  article, 
  variant = 'default', 
  className = '' 
}: ArticleCardProps) {
  const formattedDate = format(new Date(article.publishedAt), 'MMM d, yyyy');
  const formattedTime = format(new Date(article.publishedAt), 'HH:mm');

  if (variant === 'featured') {
    return (
      <Card hover className={`overflow-hidden ${className}`} padding="none">
        <div className="relative">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-64 md:h-80 object-cover"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide">
              {article.category.replace('-', ' ')}
            </span>
          </div>
          {article.featured && (
            <div className="absolute top-4 right-4">
              <span className="bg-accent-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                Featured
              </span>
            </div>
          )}
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-bold text-neutral-900 mb-3 line-clamp-2 hover:text-primary-600 transition-colors">
            {article.title}
          </h2>
          <p className="text-neutral-600 mb-4 line-clamp-3">
            {article.excerpt}
          </p>
          <div className="flex items-center justify-between text-sm text-neutral-500">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <User size={14} />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock size={14} />
                <span>{formattedDate}</span>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Eye size={14} />
              <span>{article.views.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  if (variant === 'compact') {
    return (
      <Card hover className={`overflow-hidden ${className}`} padding="none">
        <div className="flex">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-24 h-24 object-cover flex-shrink-0"
          />
          <div className="p-4 flex-1">
            <div className="mb-2">
              <span className="bg-neutral-100 text-neutral-700 px-2 py-1 rounded text-xs font-medium uppercase tracking-wide">
                {article.category.replace('-', ' ')}
              </span>
            </div>
            <h3 className="text-sm font-semibold text-neutral-900 mb-2 line-clamp-2 hover:text-primary-600 transition-colors">
              {article.title}
            </h3>
            <div className="flex items-center justify-between text-xs text-neutral-500">
              <span>{formattedDate}</span>
              <div className="flex items-center space-x-1">
                <Eye size={12} />
                <span>{article.views.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  // Default variant
  return (
    <Card hover className={`overflow-hidden ${className}`} padding="none">
      <div className="relative">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-primary-600 text-white px-2 py-1 rounded text-xs font-medium uppercase tracking-wide">
            {article.category.replace('-', ' ')}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-neutral-900 mb-2 line-clamp-2 hover:text-primary-600 transition-colors">
          {article.title}
        </h3>
        <p className="text-neutral-600 text-sm mb-3 line-clamp-2">
          {article.excerpt}
        </p>
        <div className="flex items-center justify-between text-xs text-neutral-500">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <User size={12} />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock size={12} />
              <span>{formattedDate}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Eye size={12} />
            <span>{article.views.toLocaleString()}</span>
          </div>
        </div>
        {article.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {article.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center space-x-1 bg-neutral-100 text-neutral-600 px-2 py-1 rounded text-xs"
              >
                <Tag size={10} />
                <span>{tag}</span>
              </span>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
