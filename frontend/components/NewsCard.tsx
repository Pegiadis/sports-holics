import Image from "next/image";
import { NewsArticle, NewsCardSize } from "@/types";
import { CATEGORY_COLORS } from "@/lib/constants";

interface NewsCardProps extends NewsArticle {
  size?: NewsCardSize;
}

export default function NewsCard({
  category,
  categoryColor,
  title,
  description,
  timeAgo,
  author,
  imageUrl,
  size = "medium",
}: NewsCardProps) {
  const imageHeight = size === "small" ? "h-32" : "h-48";

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden card-hover h-full">
      <div className={`relative ${imageHeight} w-full`}>
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover object-top"
        />
      </div>
      <div className={size === "small" ? "p-4" : "p-6"}>
        <span
          className={`${CATEGORY_COLORS[category] || categoryColor} px-2 py-1 rounded text-xs font-medium`}
        >
          {category}
        </span>
        <h3
          className={`${size === "small" ? "text-base" : "text-xl"} font-bold mt-2 mb-2`}
        >
          {title}
        </h3>
        <p className="text-gray-600 mb-3 text-sm">{description}</p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>{timeAgo}</span>
          <span>By {author}</span>
        </div>
      </div>
    </article>
  );
}

