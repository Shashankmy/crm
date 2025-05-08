import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Lead } from "@shared/schema";
import { FilterType, SortDirection, SortField } from "@/lib/enums";
import { queryClient } from "@/lib/queryClient";

interface UseLeadsParams {
  page: number;
  rowsPerPage: number;
  search: string;
  filters: {
    status: string;
    source: string;
    date: string;
    owner: string;
  };
  sortField: SortField;
  sortDirection: SortDirection;
}

interface UseLeadsResult {
  leads: Lead[];
  totalLeads: number;
  totalPages: number;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

export function useLeads({
  page,
  rowsPerPage,
  search,
  filters,
  sortField,
  sortDirection,
}: UseLeadsParams): UseLeadsResult {
  // Construct the query string with all parameters
  const queryParams = new URLSearchParams();
  queryParams.append("page", page.toString());
  queryParams.append("limit", rowsPerPage.toString());
  queryParams.append("sortField", sortField);
  queryParams.append("sortDirection", sortDirection);
  
  if (search) {
    queryParams.append("search", search);
  }
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      queryParams.append(key, value);
    }
  });

  const queryString = queryParams.toString();
  
  // Fetch leads from the API
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [`/api/leads?${queryString}`],
    staleTime: 1000 * 60, // 1 minute
  });

  return {
    leads: data?.leads || [],
    totalLeads: data?.total || 0,
    totalPages: data?.totalPages || 0,
    isLoading,
    isError,
    error: error as Error | null,
  };
}
