"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { TeamData, getSportBadgeColor } from "@/lib/team-api";

interface TeamsSectionProps {
  teams: TeamData[];
  title?: string;
  showAll?: boolean;
  showFilters?: boolean;
}

type SportFilter = 'all' | 'Ποδόσφαιρο' | 'Μπάσκετ';

export default function TeamsSection({ 
  teams, 
  title = "Οι Ομάδες μας",
  showAll = false,
  showFilters = false
}: TeamsSectionProps) {
  const [activeFilter, setActiveFilter] = useState<SportFilter>('all');

  // Filter teams based on selected sport (check if sport is in the sports array)
  const filteredTeams = activeFilter === 'all' 
    ? teams 
    : teams.filter(team => team.sports.includes(activeFilter));

  const displayTeams = showAll ? filteredTeams : filteredTeams.slice(0, 8);

  if (teams.length === 0) {
    return null;
  }

  const filters: { key: SportFilter; label: string }[] = [
    { key: 'all', label: 'Όλες' },
    { key: 'Ποδόσφαιρο', label: 'Ποδόσφαιρο' },
    { key: 'Μπάσκετ', label: 'Μπάσκετ' },
  ];

  return (
    <section className="mb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
        
        <div className="flex items-center gap-4">
          {/* Sport Filters */}
          {showFilters && (
            <div className="flex gap-2">
              {filters.map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setActiveFilter(filter.key)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeFilter === filter.key
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          )}

          {!showAll && (
            <Link
              href="/teams"
              className="text-red-600 hover:text-red-700 font-medium transition-colors flex items-center gap-2"
            >
              Δείτε όλες
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          )}
        </div>
      </div>

      {displayTeams.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-md">
          <p className="text-gray-600">Δεν βρέθηκαν ομάδες για αυτό το άθλημα.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {displayTeams.map((team) => (
            <Link
              key={team.id}
              href={`/team/${team.slug}`}
              className="group"
            >
              <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2">
                {/* Logo */}
                <div className="relative aspect-square overflow-hidden bg-gray-50 p-6">
                  <Image
                    src={team.logoUrl}
                    alt={team.name}
                    fill
                    className="object-contain group-hover:scale-110 transition-transform duration-300 p-4"
                  />
                </div>

                {/* Info */}
                <div className="p-4 text-center">
                  <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-1">
                    {team.name}
                  </h3>
                  {/* Display all sports as badges */}
                  <div className="flex flex-wrap justify-center gap-1">
                    {team.sports.map((sport) => (
                      <span 
                        key={sport}
                        className={`inline-block px-2 py-0.5 ${getSportBadgeColor(sport)} text-xs font-semibold rounded-full`}
                      >
                        {sport}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
