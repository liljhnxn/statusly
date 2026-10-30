"use client";

import React from "react";
import { StatusType } from "../types/status";
import { STATUS_DEFINITIONS } from "../utils/format";
import { StatusIcon } from "./StatusIcon";

interface FilterBarProps {
  selectedFilter: StatusType | "ALL";
  onSelectFilter: (filter: StatusType | "ALL") => void;
  counts: Record<string, number>;
}

export function FilterBar({ selectedFilter, onSelectFilter, counts }: FilterBarProps) {
  const filterOptions: Array<{ key: StatusType | "ALL"; label: string }> = [
    { key: "ALL", label: "All Statuses" },
    { key: StatusType.Available, label: "Available" },
    { key: StatusType.Busy, label: "Busy" },
    { key: StatusType.Studying, label: "Studying" },
    { key: StatusType.Gaming, label: "Gaming" },
    { key: StatusType.Away, label: "Away" },
  ];

  return (
    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
      {filterOptions.map((opt) => {
        const isSelected = selectedFilter === opt.key;
        const count = counts[opt.key] || 0;

        return (
          <button
            key={opt.key}
            type="button"
            onClick={() => onSelectFilter(opt.key)}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-150 border ${
              isSelected
                ? "bg-purple-950/60 border-purple-500/60 text-purple-200 shadow-[0_0_12px_rgba(139,92,246,0.15)]"
                : "bg-charcoal-850 border-charcoal-750 text-slate-400 hover:text-slate-200 hover:bg-charcoal-800"
            }`}
          >
            {opt.key !== "ALL" && (
              <StatusIcon statusType={opt.key as StatusType} className="w-3.5 h-3.5" />
            )}
            <span>{opt.label}</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                isSelected
                  ? "bg-purple-900/80 text-purple-200"
                  : "bg-charcoal-750 text-slate-400"
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}

