"use client";

import React, { useMemo } from "react";
import { useAccount, useReadContract } from "wagmi";
import { Globe, ExternalLink, ShieldCheck } from "lucide-react";
import { Header } from "../components/Header";
import { MyStatus } from "../components/MyStatus";
import { StatusBoard } from "../components/StatusBoard";
import { STATUSLY_ABI, STATUSLY_CONTRACT_ADDRESS } from "../config/contract";
import { StatusRecord } from "../types/status";
import { botchain } from "../config/chain";
import { shortenAddress } from "../utils/format";

function BotChainLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" className="text-emerald-400" />
      <path d="M7 12L10.5 15.5L17 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400" />
    </svg>
  );
}

export default function Home() {
  const { address } = useAccount();

  const isContractConfigured =
    STATUSLY_CONTRACT_ADDRESS &&
    STATUSLY_CONTRACT_ADDRESS !== "0x0000000000000000000000000000000000000000";

  // Fetch all active statuses
  const {
    data: allStatusesRaw,
    isLoading: isLoadingAll,
    refetch: refetchAll,
  } = useReadContract({
    address: STATUSLY_CONTRACT_ADDRESS,
    abi: STATUSLY_ABI,
    functionName: "getAllStatuses",
    chainId: botchain.id,
    query: {
      enabled: isContractConfigured,
      refetchInterval: 12000, // auto refetch every 12 seconds
    },
  });

  // Fetch connected user's status
  const {
    data: myStatusRaw,
    isLoading: isLoadingMyStatus,
    refetch: refetchMyStatus,
  } = useReadContract({
    address: STATUSLY_CONTRACT_ADDRESS,
    abi: STATUSLY_ABI,
    functionName: "getStatus",
    args: address ? [address] : undefined,
    chainId: botchain.id,
    query: {
      enabled: isContractConfigured && !!address,
      refetchInterval: 12000,
    },
  });

  // Normalize all statuses data
  const statuses: StatusRecord[] = useMemo(() => {
    if (!allStatusesRaw || !Array.isArray(allStatusesRaw)) return [];
    return (allStatusesRaw as any[])
      .map((item) => ({
        user: item.user as `0x${string}`,
        statusType: Number(item.statusType),
        message: item.message as string,
        timestamp: BigInt(item.timestamp),
        isActive: Boolean(item.isActive),
      }))
      .filter((s) => s.isActive);
  }, [allStatusesRaw]);

  // Normalize connected user's status
  const myStatus: StatusRecord | null = useMemo(() => {
    if (!myStatusRaw) return null;
    const raw = myStatusRaw as any;
    return {
      user: raw.user as `0x${string}`,
      statusType: Number(raw.statusType),
      message: raw.message as string,
      timestamp: BigInt(raw.timestamp),
      isActive: Boolean(raw.isActive),
    };
  }, [myStatusRaw]);

  const handleRefresh = () => {
    refetchAll();
    if (address) {
      refetchMyStatus();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-mesh">
      <Header />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* User Status Card */}
        <section>
          <MyStatus
            myStatus={myStatus}
            isLoadingStatus={isLoadingMyStatus}
            onRefresh={handleRefresh}
          />
        </section>

        {/* Community Status Board */}
        <section>
          <StatusBoard
            statuses={statuses}
            isLoading={isLoadingAll}
            onRefresh={handleRefresh}
            currentUserAddress={address}
          />
        </section>
      </main>

      {/* Ecosystem & Footer Section */}
      <footer className="border-t border-charcoal-800 bg-charcoal-950/90 backdrop-blur-md pt-10 pb-8 text-xs text-slate-400">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
          {/* Ecosystem Banner */}
          <div className="rounded-2xl bg-charcoal-900/80 border border-charcoal-800 p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
            <div className="flex items-center gap-4 text-center md:text-left">
              <div className="w-12 h-12 rounded-2xl bg-emerald-950/60 border border-emerald-800/60 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                <BotChainLogo className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <h3 className="font-bold text-sm text-slate-100 tracking-tight">
                    Powered by BOT Chain
                  </h3>
                  <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-purple-950/70 text-purple-300 border border-purple-800/50">
                    Chain ID 677
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Decentralized, high-performance infrastructure for next-generation on-chain applications.
                </p>
              </div>
            </div>

            {/* Official BOT Chain Links */}
            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <a
                href="https://botchain.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-charcoal-800 hover:bg-charcoal-750 text-slate-200 border border-charcoal-700 hover:border-purple-500/40 transition-all duration-150 shadow-sm"
              >
                <Globe className="w-3.5 h-3.5 text-purple-400" />
                <span>BOT Chain Website</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>

              <a
                href="https://scan.botchain.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-800/60 hover:border-emerald-700 transition-all duration-150 shadow-sm"
              >
                <BotChainLogo className="w-3.5 h-3.5" />
                <span>BOT Chain Explorer</span>
                <ExternalLink className="w-3 h-3 text-emerald-400" />
              </a>
            </div>
          </div>

          {/* Bottom Bar: Statusly Info & Contract Address */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-charcoal-850">
            <div className="flex items-center gap-2 text-slate-400 text-xs">
              <span className="font-semibold text-slate-200">Statusly</span>
              <span>&bull;</span>
              <span>Let people know what you&apos;re up to.</span>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">Smart Contract:</span>
              <a
                href={`https://scan.botchain.ai/address/${STATUSLY_CONTRACT_ADDRESS}#code`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-purple-400 hover:text-purple-300 flex items-center gap-1 bg-charcoal-900 px-2.5 py-1 rounded-lg border border-charcoal-800 hover:border-purple-500/40 transition-colors"
                title="View verified contract on BOT Chain Explorer"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>{shortenAddress(STATUSLY_CONTRACT_ADDRESS, 6)}</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
