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
  // Don't render if no items
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-900 text-white py-2 overflow-hidden">
      <div className="breaking-news whitespace-nowrap">
        <span className="text-primary font-bold">ΕΚΤΑΚΤΑ ΝΕΑ:</span>
        {items.map((item, index) => (
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
            {index < items.length - 1 && <span className="mx-8">•</span>}
          </span>
        ))}
      </div>
    </div>
  );
}
