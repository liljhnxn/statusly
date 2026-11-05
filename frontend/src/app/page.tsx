"use client";

import React, { useEffect, useMemo } from "react";
import { useAccount, useReadContract } from "wagmi";
import { Header } from "../components/Header";
import { MyStatus } from "../components/MyStatus";
import { StatusBoard } from "../components/StatusBoard";
import { STATUSLY_ABI, STATUSLY_CONTRACT_ADDRESS } from "../config/contract";
import { StatusRecord } from "../types/status";
import { botchainMainnet } from "../config/chain";

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
    chainId: botchainMainnet.id,
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
    chainId: botchainMainnet.id,
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

      {/* Footer */}
      <footer className="border-t border-charcoal-800/80 bg-charcoal-950/70 py-6 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            Statusly &mdash; Lightweight Web3 Status Board on{" "}
            <a
              href="https://scan.botchain.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 underline underline-offset-2"
            >
              Botchain Mainnet (Chain ID 677)
            </a>
          </p>
          <p className="text-slate-400">
            Smart contract powered &bull; No database &bull; Direct on-chain state
          </p>
        </div>
      </footer>
    </div>
  );
}

