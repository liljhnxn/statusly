"use client";

import React, { useState, useMemo } from "react";
import { RefreshCw, Search, Users, Inbox } from "lucide-react";
import { StatusRecord, StatusType } from "../types/status";
import { FilterBar } from "./FilterBar";
import { StatusCard } from "./StatusCard";

interface StatusBoardProps {
  statuses: StatusRecord[];
  isLoading: boolean;
  onRefresh: () => void;
  currentUserAddress?: string;
}

export function StatusBoard({
  statuses,
  isLoading,
  onRefresh,
  currentUserAddress,
}: StatusBoardProps) {
  const [selectedFilter, setSelectedFilter] = useState<StatusType | "ALL">("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  // Compute counts for filter pills
  const counts = useMemo(() => {
    const map: Record<string, number> = {
      ALL: statuses.length,
      [StatusType.Available]: 0,
      [StatusType.Busy]: 0,
      [StatusType.Studying]: 0,
      [StatusType.Gaming]: 0,
      [StatusType.Away]: 0,
    };

    statuses.forEach((s) => {
      if (map[s.statusType] !== undefined) {
        map[s.statusType]++;
      }
    });

    return map;
  }, [statuses]);

  // Filtered and sorted statuses (newest first)
  const filteredStatuses = useMemo(() => {
    return statuses
      .filter((s) => {
        // Status type filter
        if (selectedFilter !== "ALL" && s.statusType !== selectedFilter) {
          return false;
        }

        // Search query filter (matches wallet address or message)
        if (searchQuery.trim().length > 0) {
          const q = searchQuery.toLowerCase().trim();
          const matchesUser = s.user.toLowerCase().includes(q);
          const matchesMessage = s.message.toLowerCase().includes(q);
          if (!matchesUser && !matchesMessage) return false;
        }

        return true;
      })
      .sort((a, b) => Number(b.timestamp - a.timestamp));
  }, [statuses, selectedFilter, searchQuery]);

  return (
    <div className="space-y-5">
      {/* Top Header of Community Board */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-xl font-bold tracking-tight text-slate-100 flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-400" />
              <span>Community Status Board</span>
            </h2>
            <span className="text-xs px-2 py-0.5 rounded-full bg-charcoal-800 text-slate-300 border border-charcoal-700 font-mono">
              {statuses.length} {statuses.length === 1 ? "active user" : "active users"}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time statuses published on Botchain Testnet.
          </p>
        </div>

        {/* Right side controls: Search & Refresh */}
        <div className="flex items-center gap-2.5">
          <div className="relative flex-1 sm:w-56">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search wallet or text..."
              className="w-full bg-charcoal-850 border border-charcoal-750 focus:border-purple-500/60 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-100 placeholder-slate-400 outline-none transition-all"
            />
          </div>

          <button
            type="button"
            onClick={onRefresh}
            disabled={isLoading}
            title="Refresh community statuses"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-charcoal-850 hover:bg-charcoal-800 text-slate-300 border border-charcoal-750 hover:border-charcoal-700 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin text-purple-400" : ""}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <FilterBar
        selectedFilter={selectedFilter}
        onSelectFilter={setSelectedFilter}
        counts={counts}
      />

      {/* Status Cards Grid */}
      {filteredStatuses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredStatuses.map((record) => (
            <StatusCard
              key={record.user}
              record={record}
              currentUserAddress={currentUserAddress}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-charcoal-900/60 border border-charcoal-800/80 rounded-2xl p-10 text-center">
          <div className="w-12 h-12 rounded-2xl bg-charcoal-850 border border-charcoal-750 flex items-center justify-center mx-auto text-slate-400 mb-3">
            <Inbox className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-semibold text-slate-200">
            {statuses.length === 0
              ? "No active statuses yet"
              : "No statuses match your filter"}
          </h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
            {statuses.length === 0
              ? "Be the first person to publish your status on Botchain Testnet!"
              : "Try switching to another filter tab or clearing your search term."}
          </p>
          {selectedFilter !== "ALL" && (
            <button
              onClick={() => setSelectedFilter("ALL")}
              className="mt-4 px-3 py-1.5 rounded-lg text-xs font-medium bg-purple-950/60 text-purple-300 border border-purple-800/60 hover:bg-purple-900/60 transition-colors"
            >
              Reset Filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}

