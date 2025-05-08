import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dropdown } from "@/components/ui/dropdown";
import { DATE_OPTIONS, OWNER_OPTIONS, SOURCE_OPTIONS, STATUS_OPTIONS } from "@/lib/constants";
import { DateFilter, FilterType, LeadSource, LeadStatus, OwnerFilter } from "@/lib/enums";

interface SearchFilterBarProps {
  onSearchChange: (search: string) => void;
  onFilterChange: (type: FilterType, value: string) => void;
  onReset: () => void;
  filters: {
    status: string;
    source: string;
    date: string;
    owner: string;
  };
}

export function SearchFilterBar({ 
  onSearchChange, 
  onFilterChange, 
  onReset, 
  filters 
}: SearchFilterBarProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearchChange(value);
  };

  const handleFilterSelect = (type: FilterType, value: string) => {
    onFilterChange(type, value);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6 border border-neutral-100">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div className="w-full md:w-1/3 lg:w-1/4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="material-icons text-neutral-400">search</span>
            </div>
            <Input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-neutral-200 rounded-md"
              placeholder="Search leads..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Dropdown 
            label="Status" 
            options={STATUS_OPTIONS} 
            selectedValue={filters.status} 
            onSelect={(value) => handleFilterSelect(FilterType.STATUS, value as string)}
          />
          <Dropdown 
            label="Source" 
            options={SOURCE_OPTIONS} 
            selectedValue={filters.source} 
            onSelect={(value) => handleFilterSelect(FilterType.SOURCE, value as string)}
          />
          <Dropdown 
            label="Date" 
            options={DATE_OPTIONS} 
            selectedValue={filters.date} 
            onSelect={(value) => handleFilterSelect(FilterType.DATE, value as string)}
          />
          <Dropdown 
            label="Owner" 
            options={OWNER_OPTIONS} 
            selectedValue={filters.owner} 
            onSelect={(value) => handleFilterSelect(FilterType.OWNER, value as string)}
          />
          <Button
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary-600 bg-primary-50 hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <span className="material-icons text-sm mr-1">add</span>
            More Filters
          </Button>
          <Button
            variant="ghost"
            onClick={onReset}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-neutral-600 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <span className="material-icons text-sm mr-1">refresh</span>
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SearchFilterBar;
