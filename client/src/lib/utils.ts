import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { LeadStatus } from "./enums";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getStatusColor(status: LeadStatus) {
  switch (status) {
    case LeadStatus.NEW:
      return "bg-primary-50 text-primary-500";
    case LeadStatus.CONTACTED:
      return "bg-blue-50 text-blue-500";
    case LeadStatus.IN_PROGRESS:
      return "bg-warning-50 text-warning-500";
    case LeadStatus.QUALIFIED:
      return "bg-success-50 text-success-500";
    case LeadStatus.UNQUALIFIED:
      return "bg-danger-50 text-danger-500";
    default:
      return "bg-neutral-50 text-neutral-500";
  }
}

export function formatDate(date: Date | string): string {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatTime(date: Date | string): string {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function generateLeadId(): string {
  return `LD-${Math.floor(1000 + Math.random() * 9000)}`;
}

export function truncateText(text: string, maxLength: number): string {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}

export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return function(...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}
