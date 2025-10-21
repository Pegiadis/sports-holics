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
  description,
  timeAgo,
  author,
  imageUrl,
  slug,
  size = "medium",
}: NewsCardProps) {
  // Define size configurations
  const sizeConfig = {
    xs: {
      imageHeight: "h-20",
      padding: "p-3",
      titleSize: "text-sm",
      textSize: "text-xs",
      metaSize: "text-xs",
    },
    small: {
      imageHeight: "h-32",
      padding: "p-4",
      titleSize: "text-base",
      textSize: "text-sm",
      metaSize: "text-sm",
    },
    medium: {
      imageHeight: "h-48",
      padding: "p-6",
      titleSize: "text-xl",
      textSize: "text-sm",
      metaSize: "text-sm",
    },
    large: {
      imageHeight: "h-64",
      padding: "p-6",
      titleSize: "text-2xl",
      textSize: "text-base",
      metaSize: "text-sm",
    },
  };

  const config = sizeConfig[size];

  const cardContent = (
    <article className="bg-white rounded-lg shadow-md overflow-hidden card-hover h-full">
      <div className={`relative ${config.imageHeight} w-full`}>
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-top"
        />
      </div>
      <div className={config.padding}>
        <span
          className={`${CATEGORY_COLORS[category] || categoryColor} px-2 py-1 rounded text-xs font-medium`}
        >
          {category}
        </span>
        <h3 className={`${config.titleSize} font-bold mt-2 mb-2`}>
          {title}
        </h3>
        <p className={`text-gray-600 mb-3 ${config.textSize}`}>{description}</p>
        <div className={`flex items-center justify-between text-gray-500 ${config.metaSize}`}>
          <span>{timeAgo}</span>
          <span>By {author}</span>
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

