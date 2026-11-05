"use client";

import React, { useState } from "react";
import { useAccount, useConnect, useDisconnect, useSwitchChain, useChainId } from "wagmi";
import { Wallet, LogOut, Check, Copy, AlertTriangle, Radio, ExternalLink } from "lucide-react";
import { shortenAddress } from "../utils/format";
import { botchain } from "../config/chain";

export function Header() {
  const { address, isConnected } = useAccount();
  const { connectors, connect, isPending: isConnecting } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();
  const chainId = useChainId();
  const [copied, setCopied] = useState(false);

  const isWrongNetwork = isConnected && chainId !== botchain.id;

  const handleCopy = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleConnect = () => {
    const metaMaskConnector = connectors.find(
      (c) => c.id === "metaMask" || c.name.toLowerCase().includes("metamask")
    ) || connectors[0];

    if (metaMaskConnector) {
      connect({ connector: metaMaskConnector });
    }
  };

  return (
    <header className="border-b border-charcoal-700/60 bg-charcoal-900/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Logo and Tagline */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600/30 via-charcoal-800 to-emerald-600/20 border border-purple-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.15)]">
            <Radio className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-xl tracking-tight text-slate-100">
                Status<span className="text-purple-400">ly</span>
              </span>
              <a
                href="https://scan.botchain.ai"
                target="_blank"
                rel="noopener noreferrer"
                title="View BOT Chain Explorer"
                className="flex items-center gap-1 text-[10px] font-medium tracking-wide uppercase px-2 py-0.5 rounded-full bg-emerald-950/70 text-emerald-400 border border-emerald-800/60 hover:bg-emerald-900/80 transition-colors"
              >
                <span>BOT Chain (677)</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
            <p className="text-xs text-slate-400 font-medium">
              Let people know what you&apos;re up to.
            </p>
          </div>
        </div>

        {/* Links & Wallet */}
        <div className="flex items-center gap-3">
          <a
            href="https://scan.botchain.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-charcoal-850 hover:bg-charcoal-800 border border-charcoal-750 transition-colors"
          >
            <span>Explorer</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>

          {isConnected && isWrongNetwork && (
            <button
              onClick={() => switchChain({ chainId: botchain.id })}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-amber-950/80 text-amber-300 border border-amber-700/60 hover:bg-amber-900/80 transition-colors"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              <span>Switch to BOT Chain</span>
            </button>
          )}

          {!isConnected ? (
            <button
              onClick={handleConnect}
              disabled={isConnecting}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-purple-600/80 hover:bg-purple-600 text-white shadow-[0_0_20px_rgba(139,92,246,0.25)] border border-purple-500/40 hover:border-purple-400 transition-all duration-200 active:scale-95 disabled:opacity-50"
            >
              <Wallet className="w-4 h-4" />
              <span>{isConnecting ? "Connecting..." : "Connect MetaMask"}</span>
            </button>
          ) : (
            <div className="flex items-center gap-2 bg-charcoal-800/90 border border-charcoal-700 rounded-xl p-1.5 pl-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                <span className="text-xs font-mono font-medium text-slate-200">
                  {shortenAddress(address || "")}
                </span>
              </div>

              <div className="flex items-center gap-1 border-l border-charcoal-700 pl-2">
                <button
                  onClick={handleCopy}
                  title="Copy address"
                  className="p-1.5 rounded-lg hover:bg-charcoal-700 text-slate-400 hover:text-slate-200 transition-colors"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
                <button
                  onClick={() => disconnect()}
                  title="Disconnect wallet"
                  className="p-1.5 rounded-lg hover:bg-rose-950/60 text-slate-400 hover:text-rose-400 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
