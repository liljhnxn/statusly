"use client";

import React, { useState, useEffect } from "react";
import { ExternalLink, Copy, Check } from "lucide-react";
import { StatusRecord } from "../types/status";
import { STATUS_DEFINITIONS, shortenAddress, formatTimeAgo } from "../utils/format";
import { StatusIcon } from "./StatusIcon";

interface StatusCardProps {
  record: StatusRecord;
  currentUserAddress?: string;
}

export function StatusCard({ record, currentUserAddress }: StatusCardProps) {
  const [copied, setCopied] = useState(false);
  const [timeAgo, setTimeAgo] = useState(() => formatTimeAgo(record.timestamp));

  // Update timeAgo automatically every 15 seconds
  useEffect(() => {
    setTimeAgo(formatTimeAgo(record.timestamp));
    const interval = setInterval(() => {
      setTimeAgo(formatTimeAgo(record.timestamp));
    }, 15000);
    return () => clearInterval(interval);
  }, [record.timestamp]);

  const meta = STATUS_DEFINITIONS[record.statusType] || STATUS_DEFINITIONS[0];
  const isMe =
    currentUserAddress &&
    currentUserAddress.toLowerCase() === record.user.toLowerCase();

  const handleCopy = () => {
    navigator.clipboard.writeText(record.user);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`group relative rounded-2xl p-4 sm:p-5 bg-charcoal-900/90 border transition-all duration-200 hover:-translate-y-0.5 shadow-lg hover:shadow-xl ${meta.borderClass} ${
        isMe ? "ring-1 ring-purple-500/30" : ""
      }`}
    >
      {/* Subtle background gradient based on status */}
      <div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${meta.bgClass} pointer-events-none opacity-40 group-hover:opacity-70 transition-opacity`}
      />

      <div className="relative z-10 flex flex-col justify-between h-full space-y-3">
        {/* Top bar: Badge and Time */}
        <div className="flex items-center justify-between gap-2">
          {/* Status Badge */}
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg border ${meta.badgeClass}`}
            >
              <StatusIcon statusType={record.statusType} className="w-3.5 h-3.5" />
              <span>{meta.label}</span>
            </span>

            {isMe && (
              <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-md bg-purple-950/80 text-purple-300 border border-purple-800/60">
                You
              </span>
            )}
          </div>

          {/* Time Ago */}
          <span className="text-xs text-slate-400 font-medium">
            {timeAgo}
          </span>
        </div>

        {/* Optional Message */}
        <div className="py-1">
          {record.message && record.message.trim().length > 0 ? (
            <p className="text-sm text-slate-100 font-normal leading-relaxed break-words">
              &ldquo;{record.message}&rdquo;
            </p>
          ) : (
            <p className="text-xs italic text-slate-400 font-light">
              No message attached
            </p>
          )}
        </div>

        {/* Footer: Wallet Address & Explorer Link */}
        <div className="pt-2 border-t border-charcoal-800/80 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-300">
            <span className={`w-1.5 h-1.5 rounded-full ${meta.dotClass}`} />
            <span>{shortenAddress(record.user, 4)}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              title="Copy full address"
              className="p-1 rounded-md hover:bg-charcoal-800 hover:text-slate-200 transition-colors"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-slate-400 hover:text-slate-300" />
              )}
            </button>

            <a
              href={`https://scan.bohr.life/address/${record.user}`}
              target="_blank"
              rel="noopener noreferrer"
              title="View on Botchain Explorer"
              className="p-1 rounded-md hover:bg-charcoal-800 hover:text-slate-200 transition-colors flex items-center gap-1"
            >
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 hover:text-slate-300" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

