import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { PageHeader } from "@/components/PageHeader";
import { useToast } from "@/hooks/use-toast";

export default function Reports() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toast } = useToast();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Sample report data
  const leadsByStatus = [
    { status: "New", count: 58, color: "bg-primary-100" },
    { status: "Contacted", count: 42, color: "bg-blue-100" },
    { status: "In Progress", count: 35, color: "bg-warning-100" },
    { status: "Qualified", count: 28, color: "bg-success-100" },
    { status: "Unqualified", count: 15, color: "bg-danger-100" }
  ];

  const leadsBySource = [
    { source: "Website", count: 65, color: "bg-primary-100" },
    { source: "Referral", count: 40, color: "bg-blue-100" },
    { source: "Social Media", count: 30, color: "bg-warning-100" },
    { source: "Email Campaign", count: 25, color: "bg-success-100" },
    { source: "Conference", count: 18, color: "bg-danger-100" }
  ];

  const recentReports = [
    { id: 1, name: "Monthly Sales Report", date: "May 1, 2025", type: "Performance" },
    { id: 2, name: "Lead Conversion Analysis", date: "April 25, 2025", type: "Conversion" },
    { id: 3, name: "Team Activity Summary", date: "April 15, 2025", type: "Activity" },
    { id: 4, name: "Quarterly Review", date: "April 1, 2025", type: "Performance" }
  ];

  // Calculate max value for bar charts
  const maxStatusCount = Math.max(...leadsByStatus.map(item => item.count));
  const maxSourceCount = Math.max(...leadsBySource.map(item => item.count));

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
              Reports
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
            title="Reports" 
            subtitle="View detailed analytics and performance metrics" 
          />

          {/* Report Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow-sm border border-neutral-100 p-4">
              <div className="flex items-center mb-2">
                <div className="rounded-full bg-primary-50 p-2">
                  <span className="material-icons text-primary-500">people</span>
                </div>
                <h3 className="ml-2 text-sm font-medium text-neutral-700">Total Leads</h3>
              </div>
              <div className="text-2xl font-semibold text-neutral-800">178</div>
              <div className="text-xs text-success-500 flex items-center mt-1">
                <span className="material-icons text-xs">arrow_upward</span>
                <span className="ml-1">12% this month</span>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-neutral-100 p-4">
              <div className="flex items-center mb-2">
                <div className="rounded-full bg-success-50 p-2">
                  <span className="material-icons text-success-500">check_circle</span>
                </div>
                <h3 className="ml-2 text-sm font-medium text-neutral-700">Conversion Rate</h3>
              </div>
              <div className="text-2xl font-semibold text-neutral-800">24.5%</div>
              <div className="text-xs text-success-500 flex items-center mt-1">
                <span className="material-icons text-xs">arrow_upward</span>
                <span className="ml-1">3.2% this month</span>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-neutral-100 p-4">
              <div className="flex items-center mb-2">
                <div className="rounded-full bg-warning-50 p-2">
                  <span className="material-icons text-warning-500">schedule</span>
                </div>
                <h3 className="ml-2 text-sm font-medium text-neutral-700">Avg Response Time</h3>
              </div>
              <div className="text-2xl font-semibold text-neutral-800">2.4 hrs</div>
              <div className="text-xs text-danger-500 flex items-center mt-1">
                <span className="material-icons text-xs">arrow_downward</span>
                <span className="ml-1">0.2 hrs slower</span>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-neutral-100 p-4">
              <div className="flex items-center mb-2">
                <div className="rounded-full bg-neutral-50 p-2">
                  <span className="material-icons text-neutral-500">stars</span>
                </div>
                <h3 className="ml-2 text-sm font-medium text-neutral-700">Top Performer</h3>
              </div>
              <div className="text-lg font-semibold text-neutral-800">Shashank M Y</div>
              <div className="text-xs text-neutral-500 flex items-center mt-1">
                <span className="ml-1">45 leads converted</span>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Leads by Status */}
            <div className="bg-white rounded-lg shadow-sm border border-neutral-100 p-4">
              <h3 className="text-lg font-medium mb-4">Leads by Status</h3>
              <div className="space-y-3">
                {leadsByStatus.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-neutral-700">{item.status}</span>
                      <span className="text-sm text-neutral-500">{item.count}</span>
                    </div>
                    <div className="w-full bg-neutral-100 rounded-full h-2.5">
                      <div 
                        className={`${item.color} h-2.5 rounded-full`} 
                        style={{ width: `${(item.count / maxStatusCount) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              <button 
                className="mt-4 text-primary-600 hover:text-primary-700 text-sm flex items-center"
                onClick={() => toast({ title: "View Status Report", description: "Detailed status report would open here" })}
              >
                View Details
                <span className="material-icons text-sm ml-1">arrow_forward</span>
              </button>
            </div>

            {/* Leads by Source */}
            <div className="bg-white rounded-lg shadow-sm border border-neutral-100 p-4">
              <h3 className="text-lg font-medium mb-4">Leads by Source</h3>
              <div className="space-y-3">
                {leadsBySource.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-neutral-700">{item.source}</span>
                      <span className="text-sm text-neutral-500">{item.count}</span>
                    </div>
                    <div className="w-full bg-neutral-100 rounded-full h-2.5">
                      <div 
                        className={`${item.color} h-2.5 rounded-full`} 
                        style={{ width: `${(item.count / maxSourceCount) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              <button 
                className="mt-4 text-primary-600 hover:text-primary-700 text-sm flex items-center"
                onClick={() => toast({ title: "View Source Report", description: "Detailed source report would open here" })}
              >
                View Details
                <span className="material-icons text-sm ml-1">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Recent Reports */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-neutral-100 mb-6">
            <div className="p-4 border-b border-neutral-100 flex justify-between">
              <h2 className="text-lg font-medium">Recent Reports</h2>
              <button 
                className="text-primary-600 hover:text-primary-700 flex items-center text-sm"
                onClick={() => toast({ title: "Generate Report", description: "Report generation form would open here" })}
              >
                <span className="material-icons text-sm mr-1">add</span>
                Generate Report
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-neutral-200">
                <thead className="bg-neutral-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Report Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Date Generated
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-neutral-200">
                  {recentReports.map((report) => (
                    <tr key={report.id} className="hover:bg-neutral-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-neutral-900">{report.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-neutral-500">{report.date}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-50 text-primary-600">
                          {report.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            className="text-neutral-400 hover:text-neutral-500 focus:outline-none"
                            title="View"
                            onClick={() => toast({ title: "View Report", description: `Viewing report: ${report.name}` })}
                          >
                            <span className="material-icons text-sm">visibility</span>
                          </button>
                          <button
                            className="text-neutral-400 hover:text-neutral-500 focus:outline-none"
                            title="Download"
                            onClick={() => toast({ title: "Download Report", description: `Downloading report: ${report.name}` })}
                          >
                            <span className="material-icons text-sm">download</span>
                          </button>
                          <button
                            className="text-neutral-400 hover:text-neutral-500 focus:outline-none"
                            title="Share"
                            onClick={() => toast({ title: "Share Report", description: `Sharing report: ${report.name}` })}
                          >
                            <span className="material-icons text-sm">share</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}