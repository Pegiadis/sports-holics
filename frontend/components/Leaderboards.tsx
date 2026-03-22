'use client';

import { useState, useEffect } from 'react';

// SofaScore official widget embed URLs
// To update: go to sofascore.com > tournament page > widget/embed button > copy iframe src
const TABS = [
  {
    id: 'super-league',
    label: 'Super League',
    src: 'https://widgets.sofascore.com/embed/tournament/127/season/78175/standings/Super%20League%2025%2F26?widgetTitle=Super%20League%2025%2F26&showCompetitionLogo=true',
    height: 883,
  },
  {
    id: 'champions-league',
    label: 'Champions League',
    src: 'https://widgets.sofascore.com/embed/tournament/138314/season/76953/standings/UEFA%20Champions%20League%2025%2F26?widgetTitle=UEFA%20Champions%20League%2025%2F26&showCompetitionLogo=true',
    height: 1763,
  },
  {
    id: 'euroleague',
    label: 'Euroleague',
    src: 'https://widgets.sofascore.com/embed/tournament/42527/season/78545/standings/Euroleague%2025%2F26?widgetTitle=Euroleague%2025%2F26&showCompetitionLogo=true',
    height: 1123,
  },
] as const;

type TabId = (typeof TABS)[number]['id'];

export default function Leaderboards() {
  const [activeTab, setActiveTab] = useState<TabId>('super-league');
  const [collapsed, setCollapsed] = useState(true);
  const [loading, setLoading] = useState(true);

  const activeWidget = TABS.find((t) => t.id === activeTab)!;

  // Fallback: hide skeleton after 3s in case onLoad missed during hydration
  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timeout);
  }, [activeTab]);

  return (
    <aside className="lg:sticky lg:top-24 self-start">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 border-l-[3px] border-l-primary">
        {/* Header — collapsible on mobile */}
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="w-full flex items-center justify-between px-4 py-3 lg:cursor-default"
        >
          <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2 uppercase tracking-wide">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
            </span>
            Βαθμολογίες
          </h3>
          {/* Chevron — mobile only */}
          <svg
            className={`w-4 h-4 text-gray-400 lg:hidden transition-transform duration-200 ${collapsed ? '' : 'rotate-180'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Body — always visible on desktop, collapsible on mobile */}
        <div className={`${collapsed ? 'hidden' : 'block'} lg:block`}>
          {/* Tabs */}
          <div className="flex border-y border-gray-200">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setLoading(true);
                }}
                className={`flex-1 px-2 py-2.5 text-xs font-semibold transition-all duration-300 relative ${
                  activeTab === tab.id
                    ? 'text-primary'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-[3px] bg-primary rounded-t-full" />
                )}
              </button>
            ))}
          </div>

          {/* Widget */}
          <div className="relative overflow-y-auto" style={{ maxHeight: 600 }}>
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
                <div className="animate-pulse space-y-3 w-full px-4">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-gray-200 rounded-full" />
                      <div className="flex-1 h-4 bg-gray-200 rounded" />
                      <div className="w-8 h-4 bg-gray-200 rounded" />
                    </div>
                  ))}
                </div>
              </div>
            )}
            <iframe
              key={activeTab}
              src={activeWidget.src}
              style={{ width: '100%', height: activeWidget.height, maxWidth: 768 }}
              frameBorder="0"
              scrolling="no"
              onLoad={() => setLoading(false)}
              title={`${activeWidget.label} Βαθμολογίες`}
            />
          </div>

          {/* Attribution */}
          <div className="px-3 py-2 text-[10px] text-gray-400 border-t border-gray-100">
            Powered by{' '}
            <a
              href="https://www.sofascore.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              SofaScore
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}
