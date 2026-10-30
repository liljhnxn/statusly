export enum StatusType {
  Available = 0,
  Busy = 1,
  Studying = 2,
  Gaming = 3,
  Away = 4,
}

export interface StatusRecord {
  user: `0x${string}`;
  statusType: StatusType;
  message: string;
  timestamp: bigint;
  isActive: boolean;
}

export interface StatusMeta {
  type: StatusType;
  label: string;
  badgeClass: string;
  dotClass: string;
  borderClass: string;
  bgClass: string;
  iconName: "CheckCircle" | "Clock" | "BookOpen" | "Gamepad2" | "Coffee";
  description: string;
}

