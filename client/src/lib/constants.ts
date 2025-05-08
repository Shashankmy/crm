import { DateFilter, LeadSource, LeadStatus, OwnerFilter } from "./enums";

export const STATUS_OPTIONS = [
  { label: "All", value: "" },
  { label: "New", value: LeadStatus.NEW },
  { label: "Contacted", value: LeadStatus.CONTACTED },
  { label: "In Progress", value: LeadStatus.IN_PROGRESS },
  { label: "Qualified", value: LeadStatus.QUALIFIED },
  { label: "Unqualified", value: LeadStatus.UNQUALIFIED },
];

export const SOURCE_OPTIONS = [
  { label: "All", value: "" },
  { label: "Website", value: LeadSource.WEBSITE },
  { label: "Referral", value: LeadSource.REFERRAL },
  { label: "Social Media", value: LeadSource.SOCIAL_MEDIA },
  { label: "Email Campaign", value: LeadSource.EMAIL_CAMPAIGN },
  { label: "Conference", value: LeadSource.CONFERENCE },
  { label: "Other", value: LeadSource.OTHER },
];

export const DATE_OPTIONS = [
  { label: "All time", value: DateFilter.ALL_TIME },
  { label: "Today", value: DateFilter.TODAY },
  { label: "Yesterday", value: DateFilter.YESTERDAY },
  { label: "This week", value: DateFilter.THIS_WEEK },
  { label: "This month", value: DateFilter.THIS_MONTH },
  { label: "Custom range", value: DateFilter.CUSTOM_RANGE },
];

export const OWNER_OPTIONS = [
  { label: "All", value: OwnerFilter.ALL },
  { label: "Me", value: OwnerFilter.ME },
  { label: "Sales Team 1", value: OwnerFilter.SALES_TEAM_1 },
  { label: "Sales Team 2", value: OwnerFilter.SALES_TEAM_2 },
  { label: "Unassigned", value: OwnerFilter.UNASSIGNED },
];

export const NAV_ITEMS = [
  {
    label: "Dashboard",
    icon: "dashboard",
    href: "/",
  },
  {
    label: "Leads",
    icon: "people_alt",
    href: "/leads",
  },
  {
    label: "Tasks",
    icon: "checklist",
    href: "/tasks",
  },
  {
    label: "Calls",
    icon: "phone",
    href: "/calls",
  },
  {
    label: "Reports",
    icon: "assessment",
    href: "/reports",
  },
  {
    label: "Settings",
    icon: "settings",
    href: "/settings",
  },
];

export const SUMMARY_CARDS = [
  {
    title: "Total Leads",
    value: "2,457",
    icon: "people",
    iconColor: "text-primary-500",
    iconBg: "bg-primary-50",
    change: "12% from last month",
    changeType: "positive" as const,
  },
  {
    title: "Converted",
    value: "842",
    icon: "check_circle",
    iconColor: "text-success-500",
    iconBg: "bg-success-50",
    change: "8% from last month",
    changeType: "positive" as const,
  },
  {
    title: "Pending",
    value: "624",
    icon: "hourglass_top",
    iconColor: "text-warning-500",
    iconBg: "bg-warning-50",
    change: "Same as last month",
    changeType: "neutral" as const,
  },
  {
    title: "Failed",
    value: "215",
    icon: "highlight_off",
    iconColor: "text-danger-500",
    iconBg: "bg-danger-50",
    change: "5% from last month",
    changeType: "negative" as const,
  },
];

export const ROWS_PER_PAGE = 10;
