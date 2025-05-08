import { useState, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { PageHeader } from "@/components/PageHeader";
import { SummaryCards } from "@/components/SummaryCards";
import { SearchFilterBar } from "@/components/SearchFilterBar";
import { BulkActionsBar } from "@/components/BulkActionsBar";
import { LeadTable } from "@/components/LeadTable";
import { useLeads } from "@/hooks/use-leads";
import { FilterType, LeadStatus, SortDirection, SortField } from "@/lib/enums";
import { ROWS_PER_PAGE } from "@/lib/constants";
import { useToast } from "@/hooks/use-toast";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedLeads, setSelectedLeads] = useState<Set<number>>(new Set());
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    source: "",
    date: "",
    owner: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<SortField>(SortField.CREATED_DATE);
  const [sortDirection, setSortDirection] = useState<SortDirection>(SortDirection.DESC);
  const [activeSection, setActiveSection] = useState("/");

  const { toast } = useToast();
  
  // Handle hash changes to show different sections
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      setActiveSection(hash || "/");
    };
    
    // Set initial value
    handleHashChange();
    
    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);
  
  // Get leads with filters
  const { leads, isLoading, totalLeads, totalPages } = useLeads({
    page: currentPage,
    rowsPerPage: ROWS_PER_PAGE,
    search,
    filters,
    sortField,
    sortDirection,
  });

  // Reset selected leads when leads change
  useEffect(() => {
    setSelectedLeads(new Set());
  }, [currentPage, search, filters, sortField, sortDirection]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleFilterChange = (type: FilterType, value: string) => {
    setFilters(prev => ({ ...prev, [type]: value }));
    setCurrentPage(1);
  };

  const handleSortChange = (field: SortField, direction: SortDirection) => {
    setSortField(field);
    setSortDirection(direction);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearch("");
    setFilters({
      status: "",
      source: "",
      date: "",
      owner: "",
    });
    setCurrentPage(1);
  };

  const handleLeadCheckChange = (id: number, checked: boolean) => {
    const newSelectedLeads = new Set(selectedLeads);
    
    if (checked) {
      newSelectedLeads.add(id);
    } else {
      newSelectedLeads.delete(id);
    }
    
    setSelectedLeads(newSelectedLeads);
  };

  const handleAllLeadCheckChange = (checked: boolean) => {
    if (checked) {
      const allIds = leads.map(lead => lead.id);
      setSelectedLeads(new Set(allIds));
    } else {
      setSelectedLeads(new Set());
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleBulkAssign = () => {
    toast({
      title: "Assign Leads",
      description: `${selectedLeads.size} leads selected for assignment`,
    });
  };

  const handleBulkEdit = () => {
    toast({
      title: "Edit Leads",
      description: `${selectedLeads.size} leads selected for editing`,
    });
  };

  const handleBulkEmail = () => {
    toast({
      title: "Email Leads",
      description: `${selectedLeads.size} leads selected for email`,
    });
  };

  const handleBulkCall = () => {
    toast({
      title: "Call Leads",
      description: `${selectedLeads.size} leads selected for calling`,
    });
  };

  const handleBulkDelete = () => {
    toast({
      title: "Delete Leads",
      description: `${selectedLeads.size} leads selected for deletion`,
      variant: "destructive",
    });
  };

  // Get the section title based on the active section
  const getSectionTitle = () => {
    switch (activeSection) {
      case "/":
        return "Dashboard";
      case "/leads":
        return "Lead Management";
      case "/tasks":
        return "Task Management";
      case "/calls":
        return "Call Management";
      case "/reports":
        return "Reports";
      case "/settings":
        return "Settings";
      default:
        return "Dashboard";
    }
  };

  // Get section subtitle
  const getSectionSubtitle = () => {
    switch (activeSection) {
      case "/":
        return "Overview of your sales performance";
      case "/leads":
        return "Manage and track all your leads in one place";
      case "/tasks":
        return "Organize and manage your daily tasks";
      case "/calls":
        return "Schedule and track your sales calls";
      case "/reports":
        return "View detailed analytics and reports";
      case "/settings":
        return "Configure your account settings";
      default:
        return "Overview of your sales performance";
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-neutral-50">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex flex-col flex-1 w-0 overflow-hidden">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between h-16 bg-white px-4 border-b border-neutral-100">
          <div className="flex items-center">
            <button
              className="text-neutral-500 focus:outline-none"
              onClick={toggleSidebar}
            >
              <span className="material-icons">menu</span>
            </button>
            <h1 className="ml-3 text-lg font-semibold text-neutral-800">
              {getSectionTitle()}
            </h1>
          </div>
          <div>
            <button className="text-neutral-500 focus:outline-none">
              <span className="material-icons">notifications</span>
            </button>
          </div>
        </div>

        {/* Main Content Container */}
        <main className="flex-1 overflow-y-auto bg-neutral-50 p-4 md:p-6">
          {/* Page Header */}
          <PageHeader 
            title={getSectionTitle()} 
            subtitle={getSectionSubtitle()}
          />

          {/* Summary Cards */}
          <SummaryCards />

          {/* Search and Filter Bar */}
          <SearchFilterBar
            onSearchChange={handleSearchChange}
            onFilterChange={handleFilterChange}
            onReset={handleResetFilters}
            filters={filters}
          />

          {/* Bulk Actions Bar */}
          <BulkActionsBar
            selectedCount={selectedLeads.size}
            onSelectAll={handleAllLeadCheckChange}
            isAllSelected={leads.length > 0 && selectedLeads.size === leads.length}
            isIndeterminate={selectedLeads.size > 0 && selectedLeads.size < leads.length}
            onAssign={handleBulkAssign}
            onEdit={handleBulkEdit}
            onEmail={handleBulkEmail}
            onCall={handleBulkCall}
            onDelete={handleBulkDelete}
          />

          {/* Lead Table */}
          <LeadTable
            leads={leads}
            totalResults={totalLeads}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            onLeadCheck={handleLeadCheckChange}
            selectedLeads={selectedLeads}
            onAllLeadCheck={handleAllLeadCheckChange}
            onSortChange={handleSortChange}
            sortField={sortField}
            sortDirection={sortDirection}
            rowsPerPage={ROWS_PER_PAGE}
          />
        </main>
      </div>
    </div>
  );
}
