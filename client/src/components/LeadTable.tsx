import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { Dropdown } from "@/components/ui/dropdown";
import { formatDate, formatTime } from "@/lib/utils";
import { 
  LeadStatus, 
  SortDirection, 
  SortField 
} from "@/lib/enums";
import { Lead } from "@shared/schema";

interface LeadTableProps {
  leads: Lead[];
  totalResults: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onLeadCheck: (id: number, checked: boolean) => void;
  selectedLeads: Set<number>;
  onAllLeadCheck: (checked: boolean) => void;
  onSortChange: (field: SortField, direction: SortDirection) => void;
  sortField: SortField;
  sortDirection: SortDirection;
  rowsPerPage: number;
}

export function LeadTable({
  leads,
  totalResults,
  currentPage,
  totalPages,
  onPageChange,
  onLeadCheck,
  selectedLeads,
  onAllLeadCheck,
  onSortChange,
  sortField,
  sortDirection,
  rowsPerPage,
}: LeadTableProps) {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const getArrowIcon = (field: SortField) => {
    if (field !== sortField) return "unfold_more";
    return sortDirection === SortDirection.ASC ? "arrow_upward" : "arrow_downward";
  };

  const handleSort = (field: SortField) => {
    const newDirection = 
      field === sortField && sortDirection === SortDirection.ASC
        ? SortDirection.DESC
        : SortDirection.ASC;
    onSortChange(field, newDirection);
  };

  const toggleLeadActions = (id: number) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const handleCheckAll = (checked: boolean) => {
    onAllLeadCheck(checked);
  };

  const startItem = (currentPage - 1) * rowsPerPage + 1;
  const endItem = Math.min(startItem + rowsPerPage - 1, totalResults);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-neutral-100 overflow-hidden mb-6">
      <div className="table-container">
        <table className="min-w-full divide-y divide-neutral-200">
          <thead className="bg-neutral-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                <Checkbox
                  checked={leads.length > 0 && selectedLeads.size === leads.length}
                  onCheckedChange={handleCheckAll}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                />
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort(SortField.NAME)}
              >
                <div className="flex items-center">
                  <span>Lead</span>
                  <span className="material-icons text-neutral-400 ml-1 text-sm">
                    {getArrowIcon(SortField.NAME)}
                  </span>
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort(SortField.STATUS)}
              >
                <div className="flex items-center">
                  <span>Status</span>
                  <span className="material-icons text-neutral-400 ml-1 text-sm">
                    {getArrowIcon(SortField.STATUS)}
                  </span>
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort(SortField.SOURCE)}
              >
                <div className="flex items-center">
                  <span>Source</span>
                  <span className="material-icons text-neutral-400 ml-1 text-sm">
                    {getArrowIcon(SortField.SOURCE)}
                  </span>
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort(SortField.CREATED_DATE)}
              >
                <div className="flex items-center">
                  <span>Created</span>
                  <span className="material-icons text-neutral-400 ml-1 text-sm">
                    {getArrowIcon(SortField.CREATED_DATE)}
                  </span>
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort(SortField.OWNER)}
              >
                <div className="flex items-center">
                  <span>Owner</span>
                  <span className="material-icons text-neutral-400 ml-1 text-sm">
                    {getArrowIcon(SortField.OWNER)}
                  </span>
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-neutral-200">
            {leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <Checkbox
                    checked={selectedLeads.has(lead.id)}
                    onCheckedChange={(checked) => onLeadCheck(lead.id, !!checked)}
                    className="lead-checkbox h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="text-sm font-medium text-neutral-900">{lead.name}</div>
                    <div className="ml-2 text-xs text-neutral-500">#{lead.leadId}</div>
                  </div>
                  <div className="text-sm text-neutral-500">{lead.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={lead.status as LeadStatus} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-neutral-900">{lead.source}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-neutral-900">{formatDate(lead.createdAt)}</div>
                  <div className="text-xs text-neutral-500">{formatTime(lead.createdAt)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500">
                      <span className="material-icons text-sm">person</span>
                    </div>
                    <div className="ml-2">
                      <div className="text-sm font-medium text-neutral-900">{lead.owner}</div>
                      <div className="text-xs text-neutral-500">{lead.team}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-neutral-400 hover:text-neutral-500 focus:outline-none"
                      title="Call"
                    >
                      <span className="material-icons text-sm">phone</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-neutral-400 hover:text-neutral-500 focus:outline-none"
                      title="Email"
                    >
                      <span className="material-icons text-sm">email</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-neutral-400 hover:text-neutral-500 focus:outline-none"
                      title="Edit"
                    >
                      <span className="material-icons text-sm">edit</span>
                    </Button>
                    <div className="relative inline-block text-left">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-neutral-400 hover:text-neutral-500 focus:outline-none"
                        title="More"
                        onClick={() => toggleLeadActions(lead.id)}
                      >
                        <span className="material-icons text-sm">more_vert</span>
                      </Button>
                      {openDropdown === lead.id && (
                        <div className="dropdown-content show right-0 mt-2">
                          <div className="py-1">
                            <a href="#" className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100">
                              View details
                            </a>
                            <a href="#" className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100">
                              Add note
                            </a>
                            <a href="#" className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100">
                              Add task
                            </a>
                            <a href="#" className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100">
                              Change status
                            </a>
                            <a href="#" className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100">
                              Assign to
                            </a>
                            <a href="#" className="block px-4 py-2 text-sm text-danger-500 hover:bg-neutral-100">
                              Delete
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
            {leads.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-neutral-500">
                  No leads found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-neutral-200 sm:px-6">
        <div className="flex-1 flex justify-between sm:hidden">
          <Button
            disabled={currentPage <= 1}
            onClick={() => onPageChange(currentPage - 1)}
            variant="outline"
            className="relative inline-flex items-center px-4 py-2 border border-neutral-300 text-sm font-medium rounded-md text-neutral-700 bg-white hover:bg-neutral-50"
          >
            Previous
          </Button>
          <Button
            disabled={currentPage >= totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            variant="outline"
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-neutral-300 text-sm font-medium rounded-md text-neutral-700 bg-white hover:bg-neutral-50"
          >
            Next
          </Button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-neutral-700">
              Showing <span className="font-medium">{startItem}</span> to{" "}
              <span className="font-medium">{endItem}</span> of{" "}
              <span className="font-medium">{totalResults}</span> results
            </p>
          </div>
          <div>
            <nav
              className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              <Button
                disabled={currentPage <= 1}
                onClick={() => onPageChange(currentPage - 1)}
                variant="outline"
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-neutral-300 bg-white text-sm font-medium text-neutral-500 hover:bg-neutral-50"
              >
                <span className="sr-only">Previous</span>
                <span className="material-icons text-sm">chevron_left</span>
              </Button>

              {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                let pageNumber;
                
                if (totalPages <= 5) {
                  pageNumber = i + 1;
                } else if (currentPage <= 3) {
                  if (i < 3) {
                    pageNumber = i + 1;
                  } else if (i === 3) {
                    return (
                      <span
                        key="ellipsis1"
                        className="relative inline-flex items-center px-4 py-2 border border-neutral-300 bg-white text-sm font-medium text-neutral-700"
                      >
                        ...
                      </span>
                    );
                  } else {
                    pageNumber = totalPages;
                  }
                } else if (currentPage >= totalPages - 2) {
                  if (i === 0) {
                    pageNumber = 1;
                  } else if (i === 1) {
                    return (
                      <span
                        key="ellipsis2"
                        className="relative inline-flex items-center px-4 py-2 border border-neutral-300 bg-white text-sm font-medium text-neutral-700"
                      >
                        ...
                      </span>
                    );
                  } else {
                    pageNumber = totalPages - (4 - i);
                  }
                } else {
                  if (i === 0) {
                    pageNumber = 1;
                  } else if (i === 1) {
                    return (
                      <span
                        key="ellipsis3"
                        className="relative inline-flex items-center px-4 py-2 border border-neutral-300 bg-white text-sm font-medium text-neutral-700"
                      >
                        ...
                      </span>
                    );
                  } else if (i === 4) {
                    return (
                      <span
                        key="ellipsis4"
                        className="relative inline-flex items-center px-4 py-2 border border-neutral-300 bg-white text-sm font-medium text-neutral-700"
                      >
                        ...
                      </span>
                    );
                  } else if (i === 5) {
                    pageNumber = totalPages;
                  } else {
                    pageNumber = currentPage + i - 2;
                  }
                }

                return (
                  <Button
                    key={pageNumber}
                    onClick={() => onPageChange(pageNumber)}
                    variant={currentPage === pageNumber ? "default" : "outline"}
                    className={`${
                      currentPage === pageNumber
                        ? "z-10 bg-primary-50 border-primary-500 text-primary-600"
                        : "bg-white border-neutral-300 text-neutral-500 hover:bg-neutral-50"
                    } relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
                  >
                    {pageNumber}
                  </Button>
                );
              })}

              <Button
                disabled={currentPage >= totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                variant="outline"
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-neutral-300 bg-white text-sm font-medium text-neutral-500 hover:bg-neutral-50"
              >
                <span className="sr-only">Next</span>
                <span className="material-icons text-sm">chevron_right</span>
              </Button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeadTable;
