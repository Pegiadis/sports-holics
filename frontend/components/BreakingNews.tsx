"use client";

import Link from "next/link";

interface BreakingNewsItem {
  id: number;
  text: string;
  link?: string;
}

interface BreakingNewsProps {
  items?: BreakingNewsItem[];
}

export default function BreakingNews({ items = [] }: BreakingNewsProps) {
  // Default items if none provided
  const defaultItems: BreakingNewsItem[] = [
    { id: 1, text: "Manchester United defeats Liverpool 3-1 in Premier League clash", link: undefined },
    { id: 2, text: "NBA Finals: Lakers lead series 3-2 after dominant Game 5 performance", link: undefined },
    { id: 3, text: "Formula 1: Max Verstappen wins Monaco Grand Prix in thrilling race", link: undefined },
  ];

  const newsItems = items.length > 0 ? items : defaultItems;

  return (
    <div className="bg-gray-900 text-white py-2 overflow-hidden">
      <div className="breaking-news whitespace-nowrap">
        <span className="text-primary font-bold">ΕΚΤΑΚΤΑ ΝΕΑ:</span>
        {newsItems.map((item, index) => (
          <span key={item.id}>
            {item.link ? (
              <Link
                href={item.link}
                className="ml-2 hover:text-primary transition-colors"
              >
                {item.text}
              </Link>
            ) : (
              <span className="ml-2">{item.text}</span>
            )}
            {index < newsItems.length - 1 && <span className="mx-8">•</span>}
          </span>
        ))}
      </div>
    </div>
  );
}
