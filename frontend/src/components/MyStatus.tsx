"use client";

import React, { useState, useEffect } from "react";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { Loader2, Send, Trash2, Sparkles, AlertCircle, CheckCircle2 } from "lucide-react";
import { StatusType, StatusRecord } from "../types/status";
import { STATUS_DEFINITIONS, formatTimeAgo } from "../utils/format";
import { STATUSLY_ABI, STATUSLY_CONTRACT_ADDRESS } from "../config/contract";
import { StatusIcon } from "./StatusIcon";

interface MyStatusProps {
  myStatus: StatusRecord | null;
  isLoadingStatus: boolean;
  onRefresh: () => void;
}

export function MyStatus({ myStatus, isLoadingStatus, onRefresh }: MyStatusProps) {
  const { isConnected } = useAccount();

  const [selectedType, setSelectedType] = useState<StatusType>(StatusType.Available);
  const [message, setMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Wagmi write contract hook
  const {
    data: txHash,
    writeContract,
    isPending: isSignPending,
    error: writeError,
    reset: resetWrite,
  } = useWriteContract();

  // Wait for transaction
  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    error: confirmError,
  } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  // Populate fields if user already has an active status
  useEffect(() => {
    if (myStatus && myStatus.isActive) {
      setSelectedType(myStatus.statusType);
      setMessage(myStatus.message || "");
    }
  }, [myStatus]);

  // Handle post-tx actions
  useEffect(() => {
    if (isConfirmed) {
      onRefresh();
      const timer = setTimeout(() => {
        resetWrite();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isConfirmed, onRefresh, resetWrite]);

  // Sync error states
  useEffect(() => {
    if (writeError) {
      const err = writeError as any;
      setErrorMessage(err?.shortMessage || err?.message || "Transaction was rejected or failed.");
    } else if (confirmError) {
      setErrorMessage("Transaction failed to confirm on-chain.");
    } else {
      setErrorMessage(null);
    }
  }, [writeError, confirmError]);

  const handleUpdate = () => {
    if (!isConnected) return;
    setErrorMessage(null);

    if (message.length > 100) {
      setErrorMessage("Message cannot exceed 100 characters.");
      return;
    }

    writeContract({
      address: STATUSLY_CONTRACT_ADDRESS,
      abi: STATUSLY_ABI,
      functionName: "updateStatus",
      args: [selectedType, message.trim()],
    });
  };

  const handleClear = () => {
    if (!isConnected) return;
    setErrorMessage(null);

    writeContract({
      address: STATUSLY_CONTRACT_ADDRESS,
      abi: STATUSLY_ABI,
      functionName: "clearStatus",
    });
  };

  const isContractSet =
    STATUSLY_CONTRACT_ADDRESS &&
    STATUSLY_CONTRACT_ADDRESS !== "0x0000000000000000000000000000000000000000";

  const isBusy = isSignPending || isConfirming;
  const hasActiveStatus = myStatus && myStatus.isActive;

  if (!isConnected) {
    return (
      <div className="bg-charcoal-900/90 border border-charcoal-800 rounded-2xl p-6 sm:p-8 text-center shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh opacity-50 pointer-events-none" />
        <div className="relative z-10 max-w-md mx-auto space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-charcoal-800 border border-charcoal-700/80 flex items-center justify-center mx-auto text-purple-400">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-semibold text-slate-100">Connect to Share Your Status</h2>
          <p className="text-sm text-slate-400">
            Connect your MetaMask wallet to let everyone know what you are doing in real time on BOT Chain.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-charcoal-900/90 border border-charcoal-800 rounded-2xl p-5 sm:p-7 shadow-xl relative overflow-hidden backdrop-blur-sm">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-5">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-charcoal-800">
          <div>
            <h2 className="text-lg font-semibold text-slate-100 flex items-center gap-2">
              <span>My Status</span>
              {isLoadingStatus && (
                <Loader2 className="w-3.5 h-3.5 animate-spin text-purple-400" />
              )}
            </h2>
            <p className="text-xs text-slate-400">
              Update what you&apos;re currently working on or clear your status.
            </p>
          </div>

          {/* Current Live Status Pill */}
          {hasActiveStatus ? (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-charcoal-850 border border-charcoal-750 self-start sm:self-auto">
              <span className="text-[11px] text-slate-400">Currently:</span>
              <span
                className={`flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-md border ${
                  STATUS_DEFINITIONS[myStatus.statusType].badgeClass
                }`}
              >
                <StatusIcon statusType={myStatus.statusType} className="w-3 h-3" />
                {STATUS_DEFINITIONS[myStatus.statusType].label}
              </span>
              <span className="text-[10px] text-slate-400">
                ({formatTimeAgo(myStatus.timestamp)})
              </span>
            </div>
          ) : (
            <div className="text-xs px-2.5 py-1 rounded-lg bg-charcoal-850 text-slate-400 border border-charcoal-750 self-start sm:self-auto">
              No active status
            </div>
          )}
        </div>

        {/* Warning if contract address not configured */}
        {!isContractSet && (
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-950/40 border border-amber-800/40 text-amber-300 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
            <div>
              <p className="font-medium">Contract Address Not Configured</p>
              <p className="text-amber-300/80 mt-0.5">
                Set <code className="bg-charcoal-900 px-1 py-0.5 rounded text-[11px]">NEXT_PUBLIC_STATUSLY_CONTRACT_ADDRESS</code> in your environment variables to interact with the deployed contract.
              </p>
            </div>
          </div>
        )}

        {/* Status Selection Cards */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-2.5">
            Select Status Type
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {([
              StatusType.Available,
              StatusType.Busy,
              StatusType.Studying,
              StatusType.Gaming,
              StatusType.Away,
            ] as StatusType[]).map((type) => {
              const meta = STATUS_DEFINITIONS[type];
              const isSelected = selectedType === type;

              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => setSelectedType(type)}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-150 text-center group ${
                    isSelected
                      ? `bg-charcoal-800 border-purple-500/70 shadow-[0_0_15px_rgba(139,92,246,0.15)] ring-1 ring-purple-500/40`
                      : `bg-charcoal-850/80 border-charcoal-750 hover:bg-charcoal-800 hover:border-charcoal-700`
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center mb-1.5 transition-transform group-hover:scale-105 ${
                      isSelected ? "text-purple-300 bg-purple-950/60" : "text-slate-400"
                    }`}
                  >
                    <StatusIcon statusType={type} className="w-4 h-4" />
                  </div>
                  <span
                    className={`text-xs font-medium ${
                      isSelected ? "text-slate-100" : "text-slate-300"
                    }`}
                  >
                    {meta.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Optional Message Field */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-medium text-slate-300">
              Short Message <span className="text-slate-400 font-normal">(optional)</span>
            </label>
            <span
              className={`text-[11px] font-mono ${
                message.length > 90
                  ? message.length > 100
                    ? "text-rose-400 font-bold"
                    : "text-amber-400"
                  : "text-slate-400"
              }`}
            >
              {message.length}/100
            </span>
          </div>

          <div className="relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="e.g. Auditing smart contracts, AFK for lunch..."
              maxLength={110}
              disabled={isBusy}
              className="w-full bg-charcoal-850 border border-charcoal-750 focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/40 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-400 outline-none transition-all disabled:opacity-50"
            />
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Visible publicly on-chain. Do not share sensitive personal information.
          </p>
        </div>

        {/* Alerts & Feedback */}
        {errorMessage && (
          <div className="flex items-start gap-2 p-3 rounded-xl bg-rose-950/50 border border-rose-800/50 text-rose-300 text-xs animate-fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
            <span className="break-all">{errorMessage}</span>
          </div>
        )}

        {isConfirmed && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-950/50 border border-emerald-800/50 text-emerald-300 text-xs animate-fade-in">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>Status updated successfully on BOT Chain!</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="button"
            onClick={handleUpdate}
            disabled={isBusy || !isContractSet || message.length > 100}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-purple-600/90 hover:bg-purple-600 text-white shadow-[0_0_20px_rgba(139,92,246,0.2)] border border-purple-500/50 hover:border-purple-400 transition-all duration-150 active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
          >
            {isBusy ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-purple-200" />
                <span>{isSignPending ? "Confirm in MetaMask..." : "Publishing to BOT Chain..."}</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>{hasActiveStatus ? "Update Status" : "Publish Status"}</span>
              </>
            )}
          </button>

          {hasActiveStatus && (
            <button
              type="button"
              onClick={handleClear}
              disabled={isBusy || !isContractSet}
              className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium bg-charcoal-800 hover:bg-rose-950/50 text-slate-300 hover:text-rose-300 border border-charcoal-700 hover:border-rose-800/60 transition-all duration-150 active:scale-95 disabled:opacity-50"
            >
              <Trash2 className="w-4 h-4 text-slate-400 group-hover:text-rose-400" />
              <span>Clear Status</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

