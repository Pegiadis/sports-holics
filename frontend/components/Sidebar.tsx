import { NewsArticle } from "@/types";
import Image from "next/image";
import Link from "next/link";
import SectionTitle from "./SectionTitle";


interface SidebarProps {
  latestNews: NewsArticle[];
}

export default function Sidebar({ latestNews }: SidebarProps) {
  return (
    <aside className="lg:col-span-1">
      {/* Latest News */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <SectionTitle title="Τελευταία Νέα" icon="/speaker-color-icon.svg" variant="default" hideDots={true} />
        <div className="space-y-4">
          {latestNews.length > 0 ? (
            latestNews.map((news, index) => (
            <Link 
              key={index} 
              href={`/article/${news.slug}`}
              className="block group"
            >
              <div className="flex space-x-3 hover:bg-gray-50 rounded-lg p-2 transition-colors">
                <div className="relative w-20 h-20 flex-shrink-0 rounded overflow-hidden">
                  <Image
                    src={news.imageUrl}
                    alt={news.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex-1">
                  <span className={`inline-block px-2 py-1 text-xs font-semibold rounded mb-1 ${news.categoryColor}`}>
                    {news.category}
                  </span>
                  <h4 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                    {news.title}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">{news.timeAgo}</p>
                </div>
              </div>
            </Link>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 text-sm">
                Δεν υπάρχουν διαθέσιμα νέα αυτή τη στιγμή.
              </p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
