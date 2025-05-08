import { LeadStatus } from "@/lib/enums";
import { getStatusColor } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: LeadStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const colorClasses = getStatusColor(status);
  
  return (
    <span className={cn("status-badge", colorClasses, className)}>
      {status}
    </span>
  );
}
