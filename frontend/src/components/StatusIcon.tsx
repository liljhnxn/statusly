import React from "react";
import { CheckCircle, Clock, BookOpen, Gamepad2, Coffee } from "lucide-react";
import { StatusType } from "../types/status";

interface StatusIconProps {
  statusType: StatusType;
  className?: string;
}

export function StatusIcon({ statusType, className = "w-4 h-4" }: StatusIconProps) {
  switch (statusType) {
    case StatusType.Available:
      return <CheckCircle className={className} />;
    case StatusType.Busy:
      return <Clock className={className} />;
    case StatusType.Studying:
      return <BookOpen className={className} />;
    case StatusType.Gaming:
      return <Gamepad2 className={className} />;
    case StatusType.Away:
      return <Coffee className={className} />;
    default:
      return <CheckCircle className={className} />;
  }
}

