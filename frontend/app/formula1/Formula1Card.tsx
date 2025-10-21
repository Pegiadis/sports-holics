import Image from "next/image";
import Link from "next/link";
import { Formula1Article } from "./types";

interface Formula1CardProps {
  article: Formula1Article;
}

export default function Formula1Card({ article }: Formula1CardProps) {
  return (
    <Link href={`/article/${article.slug}`}>
      <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">
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
            <span className="inline-block bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded uppercase tracking-wide">
              {article.category}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 mb-3 hover:text-red-600 transition-colors">
            {article.title}
          </h2>

          {/* Description */}
          <p className="text-gray-600 text-base mb-4 line-clamp-2">
            {article.description}
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

