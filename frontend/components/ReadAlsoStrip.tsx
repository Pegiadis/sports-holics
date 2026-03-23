import Image from "next/image";
import Link from "next/link";
import { NewsArticle } from "@/types";

interface ReadAlsoStripProps {
  articles: NewsArticle[];
}

export default function ReadAlsoStrip({ articles }: ReadAlsoStripProps) {
  if (articles.length === 0) return null;

  const items = articles.slice(0, 4);

  return (
    <div className="py-8">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-1 h-6 bg-primary rounded-full" />
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
          Διαβάστε επίσης
        </h3>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((article, index) => (
          <Link
            key={index}
            href={`/article/${article.slug}`}
            className="group block"
          >
            <div className="bg-white rounded-lg border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200">
              <div className="relative w-full h-24 md:h-28">
                <Image
                  src={article.imageUrl || '/no_back.png'}
                  alt={article.title}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-3">
                <span className={`inline-block text-[10px] font-semibold px-1.5 py-0.5 rounded ${article.categoryColor} mb-1.5`}>
                  {article.category}
                </span>
                <h4 className="text-xs font-semibold text-gray-900 line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                  {article.title}
                </h4>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
