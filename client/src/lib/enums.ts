export enum LeadStatus {
  NEW = "New",
  CONTACTED = "Contacted",
  IN_PROGRESS = "In Progress",
  QUALIFIED = "Qualified",
  UNQUALIFIED = "Unqualified"
}

export enum LeadSource {
  WEBSITE = "Website",
  REFERRAL = "Referral",
  SOCIAL_MEDIA = "Social Media",
  EMAIL_CAMPAIGN = "Email Campaign",
  CONFERENCE = "Conference",
  OTHER = "Other"
}

export enum FilterType {
  STATUS = "status",
  SOURCE = "source",
  DATE = "date",
  OWNER = "owner"
}

export enum DateFilter {
  ALL_TIME = "All time",
  TODAY = "Today",
  YESTERDAY = "Yesterday",
  THIS_WEEK = "This week",
  THIS_MONTH = "This month",
  CUSTOM_RANGE = "Custom range"
}

export enum OwnerFilter {
  ALL = "All",
  ME = "Me",
  SALES_TEAM_1 = "Sales Team 1",
  SALES_TEAM_2 = "Sales Team 2",
  UNASSIGNED = "Unassigned"
}

export enum SortDirection {
  ASC = "asc",
  DESC = "desc"
}

export enum SortField {
  NAME = "name",
  STATUS = "status",
  SOURCE = "source",
  CREATED_DATE = "createdDate",
  OWNER = "owner"
}
