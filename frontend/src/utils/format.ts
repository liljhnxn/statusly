import { StatusType, StatusMeta } from "../types/status";

export function shortenAddress(address: string, chars = 4): string {
  if (!address) return "";
  if (address.length <= chars * 2 + 2) return address;
  return `${address.substring(0, chars + 2)}...${address.substring(address.length - chars)}`;
}

export function formatTimeAgo(timestampInSeconds: number | bigint): string {
  const ts = typeof timestampInSeconds === "bigint" ? Number(timestampInSeconds) : timestampInSeconds;
  if (!ts || ts === 0) return "Never";

  const now = Math.floor(Date.now() / 1000);
  const diff = Math.max(0, now - ts);

  if (diff < 30) return "Just now";
  if (diff < 60) return `${diff}s ago`;

  const minutes = Math.floor(diff / 60);
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(diff / 3600);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(diff / 86400);
  if (days < 30) return `${days}d ago`;

  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}

export const STATUS_DEFINITIONS: Record<StatusType, StatusMeta> = {
  [StatusType.Available]: {
    type: StatusType.Available,
    label: "Available",
    badgeClass: "text-emerald-400 bg-emerald-950/60 border-emerald-800/60",
    dotClass: "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]",
    borderClass: "border-emerald-500/20 hover:border-emerald-500/40",
    bgClass: "from-emerald-950/10 to-transparent",
    iconName: "CheckCircle",
    description: "Free to chat, collaborate, or hang out",
  },
  [StatusType.Busy]: {
    type: StatusType.Busy,
    label: "Busy",
    badgeClass: "text-rose-400 bg-rose-950/60 border-rose-850/60",
    dotClass: "bg-rose-400 shadow-[0_0_8px_rgba(251,113,133,0.6)]",
    borderClass: "border-rose-500/20 hover:border-rose-500/40",
    bgClass: "from-rose-950/10 to-transparent",
    iconName: "Clock",
    description: "Deep in work, notifications muted",
  },
  [StatusType.Studying]: {
    type: StatusType.Studying,
    label: "Studying",
    badgeClass: "text-purple-300 bg-purple-950/60 border-purple-800/60",
    dotClass: "bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.6)]",
    borderClass: "border-purple-500/20 hover:border-purple-500/40",
    bgClass: "from-purple-950/15 to-transparent",
    iconName: "BookOpen",
    description: "Learning, reading, or researching",
  },
  [StatusType.Gaming]: {
    type: StatusType.Gaming,
    label: "Gaming",
    badgeClass: "text-violet-300 bg-violet-950/60 border-violet-800/60",
    dotClass: "bg-violet-400 shadow-[0_0_8px_rgba(167,139,250,0.6)]",
    borderClass: "border-violet-500/20 hover:border-violet-500/40",
    bgClass: "from-violet-950/15 to-transparent",
    iconName: "Gamepad2",
    description: "In game, having fun",
  },
  [StatusType.Away]: {
    type: StatusType.Away,
    label: "Away",
    badgeClass: "text-amber-300 bg-amber-950/50 border-amber-800/50",
    dotClass: "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]",
    borderClass: "border-amber-500/20 hover:border-amber-500/40",
    bgClass: "from-amber-950/10 to-transparent",
    iconName: "Coffee",
    description: "Stepped out, AFK for a bit",
  },
};

