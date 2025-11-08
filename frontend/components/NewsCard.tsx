import Image from "next/image";
import Link from "next/link";
import { NewsArticle, NewsCardSize } from "@/types";
import { CATEGORY_COLORS } from "@/lib/constants";

interface NewsCardProps extends NewsArticle {
  size?: NewsCardSize;
}

export default function NewsCard({
  category,
  categoryColor,
  title,
  subtitle,
  timeAgo,
  author,
  imageUrl,
  image,
  slug,
  size = "medium",
}: NewsCardProps) {
  // Support both image and imageUrl properties
  const imageSrc = image || imageUrl || '/default-news.jpg';
  // Define size configurations with aspect ratio approach (like sidebar)
  const sizeConfig = {
    xs: {
      aspectRatio: "aspect-[4/3]", // 4:3 ratio - good for small cards
      padding: "p-3",
      titleSize: "text-sm",
      textSize: "text-xs",
      metaSize: "text-xs",
    },
    small: {
      aspectRatio: "aspect-[16/10]", // 16:10 ratio - slightly wider
      padding: "p-4",
      titleSize: "text-base",
      textSize: "text-sm",
      metaSize: "text-sm",
    },
    medium: {
      aspectRatio: "aspect-[3/2]", // 3:2 ratio - standard photo ratio
      padding: "p-5",
      titleSize: "text-xl",
      textSize: "text-sm",
      metaSize: "text-sm",
    },
    large: {
      aspectRatio: "aspect-[16/9]", // 16:9 ratio - widescreen
      padding: "p-6",
      titleSize: "text-2xl",
      textSize: "text-base",
      metaSize: "text-sm",
    },
  };

  const config = sizeConfig[size];

  const cardContent = (
    <article className="bg-white rounded-lg shadow-md overflow-hidden card-hover h-full flex flex-col transition-transform duration-300 hover:shadow-xl">
      {/* Image section with dynamic aspect ratio */}
      <div className={`relative ${config.aspectRatio} w-full overflow-hidden bg-gray-200`}>
        <Image
          src={imageSrc}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      
      {/* Content section */}
      <div className={`${config.padding} flex flex-col flex-grow`}>
        <div className="mb-2">
          <span
            className={`${CATEGORY_COLORS[category] || categoryColor} px-2 py-1 rounded text-xs font-semibold uppercase tracking-wide`}
          >
            {category}
          </span>
        </div>
        
        <h3 className={`${config.titleSize} font-bold mb-2 leading-tight text-gray-900 line-clamp-3 hover:text-blue-600 transition-colors`}>
          {title}
        </h3>
        
        {subtitle && (
          <p className={`text-gray-600 mb-3 ${config.textSize} leading-relaxed line-clamp-2`}>
            {subtitle}
          </p>
        )}
        
        <div className={`flex items-center justify-between text-gray-500 ${config.metaSize} mt-auto pt-3 border-t border-gray-100`}>
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            {timeAgo}
          </span>
          <span className="text-gray-400">•</span>
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            {author}
          </span>
        </div>
      </div>
    </article>
  );

  // Wrap in Link if slug exists
  if (slug) {
    return (
      <Link href={`/article/${slug}`} className="block h-full">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}

