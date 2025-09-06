import React from 'react';
import { Clock, User, Eye } from 'lucide-react';

interface ArticleCardProps {
  title: string;
  excerpt: string;
  imageUrl: string;
  author: string;
  publishDate: string;
  readTime: string;
  views: number;
  category: string;
  isLive?: boolean;
  isFeatured?: boolean;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  title,
  excerpt,
  imageUrl,
  author,
  publishDate,
  readTime,
  views,
  category,
  isLive = false,
  isFeatured = false,
}) => {
  return (
    <article className={`article-card ${isFeatured ? 'lg:col-span-2' : ''}`}>
      <div className="relative">
        <img
          src={imageUrl}
          alt={title}
          className={`w-full object-cover ${
            isFeatured ? 'h-64 lg:h-80' : 'h-48'
          }`}
        />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-600 text-white">
            {category}
          </span>
        </div>

        {/* Live Badge */}
        {isLive && (
          <div className="absolute top-4 right-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-600 text-white animate-pulse">
              🔴 LIVE
            </span>
          </div>
        )}

        {/* Featured Badge */}
        {isFeatured && (
          <div className="absolute bottom-4 left-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-500 text-black">
              ⭐ FEATURED
            </span>
          </div>
        )}
      </div>

      <div className="p-6">
        <h2 className={`font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors ${
          isFeatured ? 'text-xl lg:text-2xl' : 'text-lg'
        }`}>
          {title}
        </h2>
        
        <p className={`text-gray-600 mb-4 line-clamp-3 ${
          isFeatured ? 'text-base' : 'text-sm'
        }`}>
          {excerpt}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <User size={14} className="mr-1" />
              <span>{author}</span>
            </div>
            <div className="flex items-center">
              <Clock size={14} className="mr-1" />
              <span>{readTime}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Eye size={14} className="mr-1" />
              <span>{views.toLocaleString()}</span>
            </div>
            <span>{publishDate}</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;
