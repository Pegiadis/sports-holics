import Link from "next/link";
import Image from "next/image";
import { NewsArticle } from "@/types";

interface NewsCardProps {
  article: NewsArticle;
}

export default function NewsCard({ article }: NewsCardProps) {
  return (
    <Link
      href={`/article/${article.slug}`}
      className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col md:flex-row gap-6 h-full"
    >
      {/* Image Section */}
      <div className="relative md:w-2/5 h-64 md:h-auto flex-shrink-0 overflow-hidden">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 40vw"
        />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className={`${article.categoryColor} px-3 py-1 rounded-full text-xs font-bold`}>
            {article.category}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
            {article.title}
          </h2>

          {/* Subtitle */}
          {article.subtitle && (
            <p className="text-gray-600 mb-4 line-clamp-2">
              {article.subtitle}
            </p>
          )}

          {/* Description Preview */}
          <div 
            className="text-gray-700 line-clamp-3 prose prose-sm"
            dangerouslySetInnerHTML={{ 
              __html: typeof article.description === 'string' 
                ? article.description.substring(0, 200) 
                : '' 
            }}
          />
        </div>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">
              <span className="font-semibold text-gray-700">{article.author}</span>
            </span>
            <span className="text-gray-400">{article.timeAgo}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

