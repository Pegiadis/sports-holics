import Link from "next/link";
import Image from "next/image";
import { NewsArticle } from "@/types";

interface SidebarWidgetProps {
  title: string;
  icon: string;
  articles: NewsArticle[];
  accentColor?: string;
  variant?: 'numbered' | 'compact' | 'image';
}

export default function SidebarWidget({
  title,
  icon,
  articles,
  accentColor = 'border-l-primary',
  variant = 'numbered',
}: SidebarWidgetProps) {
  if (articles.length === 0) return null;

  const items = articles.slice(0, 5);

  return (
    <div className={`bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 border-l-[3px] ${accentColor}`}>
      <div className="px-4 py-3 border-b border-gray-100">
        <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2 uppercase tracking-wide">
          <Image src={icon} alt="" width={16} height={16} />
          {title}
        </h3>
      </div>

      <div className="p-3 space-y-1">
        {variant === 'numbered' && items.map((article, index) => (
          <Link
            key={index}
            href={`/article/${article.slug}`}
            className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors group"
          >
            <div className="flex-1 min-w-0">
              <span className={`inline-block text-[10px] font-semibold px-1.5 py-0.5 rounded ${article.categoryColor} mb-1`}>
                {article.category}
              </span>
              <h4 className="text-sm font-medium text-gray-900 line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                {article.title}
              </h4>
            </div>
          </Link>
        ))}

        {variant === 'compact' && items.map((article, index) => (
          <Link
            key={index}
            href={`/article/${article.slug}`}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors group"
          >
            <span className={`inline-block text-[10px] font-semibold px-1.5 py-0.5 rounded ${article.categoryColor} flex-shrink-0`}>
              {article.category}
            </span>
            <h4 className="text-sm font-medium text-gray-900 line-clamp-1 group-hover:text-primary transition-colors">
              {article.title}
            </h4>
          </Link>
        ))}

        {variant === 'image' && items.map((article, index) => (
          <Link
            key={index}
            href={`/article/${article.slug}`}
            className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors group"
          >
            <div className="relative w-16 h-12 rounded overflow-hidden flex-shrink-0">
              <Image
                src={article.imageUrl || '/no_back.png'}
                alt={article.title}
                fill
                sizes="64px"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-gray-900 line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                {article.title}
              </h4>
              <span className="text-[10px] text-gray-400 mt-0.5" suppressHydrationWarning>{article.timeAgo}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
