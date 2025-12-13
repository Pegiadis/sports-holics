import Image from "next/image";
import Link from "next/link";
import { BaseArticle } from "@/lib/sports-api";
import { richtextToPlainText } from "@/lib/richtext-utils";

interface ArticleCardProps {
  article: BaseArticle;
}

// Map categories to card colors
function getCategoryColors(category: string): { badge: string; hover: string } {
  const colorMap: Record<string, { badge: string; hover: string }> = {
    'ΠΟΔΟΣΦΑΙΡΟ': { badge: 'bg-green-500', hover: 'hover:text-green-600' },
    'ΜΠΑΣΚΕΤ': { badge: 'bg-orange-500', hover: 'hover:text-orange-600' },
    'AUTO MOTO': { badge: 'bg-red-500', hover: 'hover:text-red-600' },
    'NEWS': { badge: 'bg-purple-500', hover: 'hover:text-purple-600' },
  };

  return colorMap[category] || { badge: 'bg-gray-500', hover: 'hover:text-gray-600' };
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const colors = getCategoryColors(article.category);

  return (
    <Link href={`/article/${article.slug}`}>
      <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer mb-3">
        <div className="flex flex-col md:flex-row">
          {/* Image Section - Left */}
          <div className="relative w-full md:w-80 h-48 md:h-auto flex-shrink-0">
            <Image
              src={article.imageUrl}
              alt={article.title}
              fill
              sizes="(max-width: 768px) 100vw, 320px"
              className="object-cover"
            />
          </div>

          {/* Content Section - Right */}
          <div className="flex-1 p-6">
            {/* Category Badge */}
            <div className="mb-3">
              <span className={`inline-block ${colors.badge} text-white text-xs font-semibold px-3 py-1 rounded uppercase tracking-wide`}>
                {article.category}
              </span>
            </div>

            {/* Title */}
            <h2 className={`text-2xl font-bold text-gray-900 mb-3 ${colors.hover} transition-colors`}>
              {article.title}
            </h2>

            {/* Description */}
            <p className="text-gray-600 text-base mb-4 line-clamp-2">
              {richtextToPlainText(article.content)}
            </p>

            {/* Meta Info */}
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>{article.timeAgo}</span>
              <span className="font-medium">By {article.author}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
